import { IsDefined, validate } from 'class-validator';
import * as typeorm from 'typeorm';
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon';

import { IsYearFormat } from '../pipes/is-year-format.pipe';
import { IsInDateRange } from '../pipes/is-in-date-range.pipe';
import { IsOrisCode } from '../pipes/is-oris-code.pipe';
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
        orisCode: string,
        controlTech: string,
        unitType: string,
        unitFuel: string,
        sourceCategory: string,
        state: string,
        program: string,
      ) {
        this.year = year;
        this.orisCode = orisCode;
        this.controlTech = controlTech;
        this.unitType = unitType;
        this.unitFuel = unitFuel;
        this.sourceCategory = sourceCategory;
        this.state = state;
        this.program = program;
      }

      @IsInDateRange([new Date(1995, 0), new Date()], true, true, true)
      @IsYearFormat()
      @IsDefined()
      year: string;

      @IsOrisCode()
      orisCode: string;


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
      program: string;
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
    let mock: Mock;
    const fakeManager = createStubInstance(typeorm.EntityManager);
    fakeManager.findOne.resolves(['value']);
    mock = new Mock('getManager', fakeManager);

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
          'program',
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
