import { Request } from 'express';
import { Not, IsNull, FindManyOptions } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { v4 as uuid } from 'uuid';
import { Transform } from 'stream';
import { plainToClass } from 'class-transformer';
import { PlainToCSV, PlainToJSON } from '@us-epa-camd/easey-common/transforms';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { FacilityAttributesParamsDTO, PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { fieldMappings } from '../constants/field-mappings';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilitiesRepository)
    private readonly facilitiesRepository: FacilitiesRepository,
    private readonly facilityMap: FacilityMap,
    @InjectRepository(ProgramYearDimRepository)
    private readonly programYearRepository: ProgramYearDimRepository,
    private readonly applicableFacilityAttributesMap: ApplicableFacilityAttributesMap,
    @InjectRepository(FacilityUnitAttributesRepository)
    private readonly facilityUnitAttributesRepository: FacilityUnitAttributesRepository,
    private readonly facilityAttributesMap: FacilityAttributesMap,
    private readonly logger: Logger,
  ) {}

  async getFacilities(
    facilityParamsDTO: FacilityParamsDTO,
    req: Request,
  ): Promise<FacilityDTO[]> {
    let results;
    let totalCount;

    try {
      this.logger.info('Getting facilities');
      const { stateCode, page, perPage } = facilityParamsDTO;

      const findOpts: FindManyOptions = {
        select: ['id', 'facilityId', 'facilityName', 'stateCode'],
        order: {
          id: 'ASC',
        },
      };

      if (stateCode) {
        findOpts.where = { facilityId: Not(IsNull()), stateCode: stateCode };
      } else {
        findOpts.where = { facilityId: Not(IsNull()) };
      }

      if (page && perPage) {
        findOpts.skip = (page - 1) * perPage;
        findOpts.take = perPage;
      }

      [results, totalCount] = await this.facilitiesRepository.findAndCount(
        findOpts,
      );

      ResponseHeaders.setPagination(page, perPage, totalCount, req);
      this.logger.info('Got facilities');
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    return this.facilityMap.many(results);
  }

  async getFacilityById(id: number): Promise<FacilityDTO> {
    const facility = await this.facilitiesRepository.findOne(id);

    if (facility === undefined) {
      this.logger.error(NotFoundException, 'Facility id does not exist', true, {
        id: id,
      });
    }

    return this.facilityMap.one(facility);
  }

  async streamFacilitiesUnitAttributes(
    req: Request,
    facilityAttributesParamsDTO: FacilityAttributesParamsDTO,
  ): Promise<StreamableFile> {
    const stream = await this.facilityUnitAttributesRepository.streamAllFacilityUnitAttributes(
      facilityAttributesParamsDTO,
    );
    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.facilities.attributes),
    );
    const toDto = new Transform({
      objectMode:true,
      transform(data, _enc, callback) {
        delete data.id;

        const commercialOperationDate = new Date(data.commercialOperationDate);
        data.commercialOperationDate = commercialOperationDate.toISOString().split('T')[0];

        let associatedGeneratorsAndNameplateCapacityStr = '';
        const array = [data.ownerOperator, data.oprDisplay];
        const ownOprList = array
          .filter(e => e)
          .join(',')
          .slice(0, -1)
          .split('),');
        const ownOprUniqueList = [...new Set(ownOprList)];
        const ownerOperator = ownOprUniqueList.join('),');

        const generatorIdArr = data.associatedGeneratorsAndNameplateCapacity?.split(', ');
        const arpNameplateCapacityArr = data.arpNameplateCapacity?.split(', ');
        const otherNameplateCapacityArr = data.otherNameplateCapacity?.split(
          ', ',
        );

        for (let index = 0; index < generatorIdArr.length; index++) {
          associatedGeneratorsAndNameplateCapacityStr += generatorIdArr[index];
          if (
            arpNameplateCapacityArr &&
            arpNameplateCapacityArr[index] !== 'null'
          ) {
            associatedGeneratorsAndNameplateCapacityStr += ` (${Number(
              arpNameplateCapacityArr[index],
            )})`;
          } else if (
            otherNameplateCapacityArr &&
            otherNameplateCapacityArr[index] !== 'null'
          ) {
            associatedGeneratorsAndNameplateCapacityStr += ` (${Number(
              otherNameplateCapacityArr[index],
            )})`;
          }
          if (generatorIdArr.length > 1 && index < generatorIdArr.length - 1) {
            associatedGeneratorsAndNameplateCapacityStr += ', ';
          }
        }   
        delete data.oprDisplay;
        // delete data.generatorId;
        delete data.arpNameplateCapacity;
        delete data.otherNameplateCapacity;


        data.ownerOperator = ownerOperator.length > 0 ? `${ownerOperator})` : null;
        data.associatedGeneratorsAndNameplateCapacity = associatedGeneratorsAndNameplateCapacityStr;

        const dto = plainToClass(FacilityAttributesDTO, data, {
          enableImplicitConversion: true,
        });

        callback(null, dto);
      },
    });

    if (req.headers.accept === 'text/csv') {
      const toCSV = new PlainToCSV(fieldMappings.facilities.attributes);
      return new StreamableFile(stream.pipe(toDto).pipe(toCSV), {
        type: req.headers.accept,
        disposition: `attachment; filename="facilities-attributes-${uuid()}.csv"`,
      });
    }

    const objToString = new PlainToJSON();
    return new StreamableFile(stream.pipe(toDto).pipe(objToString), {
      type: req.headers.accept,
      disposition: `attachment; filename="facilities-attributes-${uuid()}.json`,
    });
  }

  async getAllFacilityAttributes(
    paginatedFacilityAttributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    this.logger.info('Getting all facility attributes');
    let query;
    try {
      query = await this.facilityUnitAttributesRepository.getAllFacilityAttributes(
        paginatedFacilityAttributesParamsDTO,
        req,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.facilities.attributes),
    );

    this.logger.info('Got all facility attributes');

    return this.facilityAttributesMap.many(query);
  }

  async getApplicableFacilityAttributes(
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    const archivedYear = new Date().getFullYear() - 4;
    const yearData = applicableFacilityAttributesParamsDTO.year.map(
      el => Number(el) >= archivedYear,
    );
    let isArchived = false;
    let isUnion = false;

    if (yearData.includes(false)) {
      isArchived = true;
      if (yearData.includes(true)) {
        isUnion = true;
      }
    }

    this.logger.info('Getting all applicable facility attributes');

    let query;
    try {
      query = await this.programYearRepository.getApplicableFacilityAttributes(
        applicableFacilityAttributesParamsDTO,
        isArchived,
        isUnion,
      );
    } catch (e) {
      this.logger.error(InternalServerErrorException, e.message, true);
    }

    this.logger.info('Got all applicable facility attributes');

    return this.applicableFacilityAttributesMap.many(query);
  }
}
