import { Request } from 'express';
import { Not, IsNull, FindManyOptions } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { ResponseHeaders } from './../utils/response.headers';
import { FacilityMap } from '../maps/facility.map';
import { ProgramYearDimRepository } from './program-year-dim.repository';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { fieldMappings } from '../constants/field-mappings';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilitiesRepository)
    private readonly facilitiesRepository: FacilitiesRepository,
    private readonly facilityMap: FacilityMap,
    @InjectRepository(ProgramYearDimRepository)
    private readonly programYearRepository: ProgramYearDimRepository,
    private readonly applicableFacilityAttributesMap: ApplicableFacilityAttributesMap,
    private readonly facilityAttributesMap: FacilityAttributesMap,
  ) {}

  async getFacilities(
    facilityParamsDTO: FacilityParamsDTO,
    req: Request,
  ): Promise<FacilityDTO[]> {
    const { state, page, perPage } = facilityParamsDTO;

    const findOpts: FindManyOptions = {
      select: ['id', 'orisCode', 'name', 'state'],
      order: {
        id: 'ASC',
      },
    };

    if (state) {
      findOpts.where = { orisCode: Not(IsNull()), state: state };
    } else {
      findOpts.where = { orisCode: Not(IsNull()) };
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
      throw new NotFoundException(`Facility with Id ${id} does not exist`);
    }

    return this.facilityMap.one(facility);
  }

  async getAllFacilityAttributes(
    facilityAttributesParamsDTO: FacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    const query = await this.programYearRepository.getAllFacilityAttributes(
      facilityAttributesParamsDTO,
      req,
    );

    req.res.setHeader(
      'X-Field-Mappings',
      JSON.stringify(fieldMappings.facilities.attributes),
    );

    return this.facilityAttributesMap.many(query);
  }

  async getApplicableFacilityAtrributes(
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
