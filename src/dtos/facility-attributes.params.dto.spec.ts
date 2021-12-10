import { IsDefined, validate } from 'class-validator';
import * as typeorm from 'typeorm';
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon';

import { IsYearFormat, IsOrisCode } from '@us-epa-camd/easey-common/pipes';

import { IsControlTechnology } from '../pipes/is-control-technology.pipe';
import { IsUnitType } from '../pipes/is-unit-type.pipe';
import { IsUnitFuelType } from '../pipes/is-unit-fuel-type.pipe';
import { IsStateCode } from '../pipes/is-state-code.pipe';
import { IsEmissionsProgram } from '../pipes/is-emissions-program.pipe';
import { IsSourceCategory } from '../pipes/is-source-category.pipe';

describe('-- Facility Attributes Params DTO --', () => {
  describe('getAllFacilityAtrributes with query parameters', () => {
    class MyClass {
      constructor(
        year: string,
        facilityId: string,
        controlTech: string,
        unitType: string,
        unitFuel: string,
        sourceCategory: string,
        state: string,
        programCodeInfo: string,
      ) {
        this.year = year;
        this.facilityId = facilityId;
        this.controlTech = controlTech;
        this.unitType = unitType;
        this.unitFuel = unitFuel;
        this.sourceCategory = sourceCategory;
        this.state = state;
        this.programCodeInfo = programCodeInfo;
      }

      @IsYearFormat()
      @IsDefined()
      year: string;

      @IsOrisCode()
      facilityId: string;

      @IsControlTechnology()
      controlTech: string;

      @IsUnitType()
      unitType: string;

      @IsUnitFuelType()
      unitFuel: string;

      @IsSourceCategory()
      sourceCategory: string;

      @IsStateCode()
      state: string;

      @IsEmissionsProgram()
      programCodeInfo: string;
    }

    /**
     * This class is used to mock EntityManager and ConnectionManager
     */
    class Mock {
      sandbox: SinonSandbox;
      constructor(method: string | any, fakeData: any, args?: any) {
        this.sandbox = createSandbox();
        if (args) {
          this.sandbox
            .stub(typeorm, method)
            .withArgs(args)
            .returns(fakeData);
        } else {
          this.sandbox.stub(typeorm, method).returns(fakeData);
        }
      }
      close() {
        this.sandbox.restore();
      }
    }
    const fakeManager = createStubInstance(typeorm.EntityManager);
    fakeManager.findOne.resolves(['value']);
    const mock: Mock = new Mock('getManager', fakeManager);

    it('should pass all validation pipes', async () => {
      const results = await validate(
        new MyClass(
          '2020',
          '612',
          'control',
          'unitType',
          'unitFuel',
          'sourceCategory',
          'state',
          'programCodeInfo',
        ),
      );
      expect(results.length).toBe(0);
    });

    it('should fail all of the validation pipes', async () => {
      fakeManager.findOne.resolves(null);
      const results = await validate(
        new MyClass(
          null,
          '0',
          'control',
          'unitType',
          'unitFuel',
          'sourceCategory',
          'state',
          'MATS',
        ),
      );
      expect(results.length).toBe(8);
    });
    mock.close;
  });
});
