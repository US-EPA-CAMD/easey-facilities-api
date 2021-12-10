import { Request } from 'express';
import { Not, IsNull, FindManyOptions } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@us-epa-camd/easey-common/logger';

import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
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
    private Logger: Logger,
  ) {}

  async getFacilities(
    facilityParamsDTO: FacilityParamsDTO,
    req: Request,
  ): Promise<FacilityDTO[]> {
    const { state, page, perPage } = facilityParamsDTO;

    const findOpts: FindManyOptions = {
      select: ['id', 'facilityId', 'facilityName', 'state'],
      order: {
        id: 'ASC',
      },
    };

    if (state) {
      findOpts.where = { facilityId: Not(IsNull()), state: state };
    } else {
      findOpts.where = { facilityId: Not(IsNull()) };
    }

    if (page && perPage) {
      findOpts.skip = (page - 1) * perPage;
      findOpts.take = perPage;
    }

    const [results, totalCount] = await this.facilitiesRepository.findAndCount(
      findOpts,
    );

    ResponseHeaders.setPagination(page, perPage, totalCount, req);
    return this.facilityMap.many(results);
  }

  async getFacilityById(id: number): Promise<FacilityDTO> {
    const facility = await this.facilitiesRepository.findOne(id);

    if (facility === undefined) {
      this.Logger.error(NotFoundException, 'Facility id does not exist', true, {
        id: id,
      });
    }

    return this.facilityMap.one(facility);
  }

  async getAllFacilityAttributes(
    facilityAttributesParamsDTO: FacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    const query = await this.facilityUnitAttributesRepository.getAllFacilityAttributes(
      facilityAttributesParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.facilities.attributes),
    );

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

    const query = await this.programYearRepository.getApplicableFacilityAttributes(
      applicableFacilityAttributesParamsDTO,
      isArchived,
      isUnion,
    );

    return this.applicableFacilityAttributesMap.many(query);
  }
}
