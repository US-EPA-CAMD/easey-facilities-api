import { IsDefined, validate } from 'class-validator';
import * as typeorm from 'typeorm';
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon';

import { IsYearFormat, IsInYearRange } from '@us-epa-camd/easey-common/pipes';

describe('-- Applicable Facility Attributes Params DTO --', () => {
  describe('getApplicableFacilityAtrributes with query parameters', () => {
    class MyClass {
      constructor(year: string) {
        this.year = year;
      }
      @IsInYearRange([new Date(1995, 0), new Date()])
      @IsYearFormat()
      @IsDefined()
      year: string;
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
      const results = await validate(new MyClass('2017'));
      expect(results.length).toBe(0);
    });

    it('should fail)', async () => {
      const results = await validate(new MyClass('1900'));
      expect(results.length).toBe(1);
    });
    mock.close;
  });
});
