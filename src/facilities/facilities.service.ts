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
import { ApplicableFacilityAttributesParamsDTO } from 'src/dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilitiesRepository)
    private facilitiesRepository: FacilitiesRepository,
    private facilityMap: FacilityMap,
    @InjectRepository(ProgramYearDimRepository)
    private readonly programYearRepository: ProgramYearDimRepository,
    private readonly applicableFacilityAttributesMap: ApplicableFacilityAttributesMap,
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

  getFacilityAttributes(): string {
    return 'hello getFacilityAttributes';
  }

  async getApplicableFacilitiesAttributes(
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
