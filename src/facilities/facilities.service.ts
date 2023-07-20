import { Request } from 'express';
import { Not, IsNull, FindManyOptions } from 'typeorm';

import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { EaseyException } from '@us-epa-camd/easey-common/exceptions';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';

import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { UnitFactRepository } from './unit-fact.repository';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from './facility-unit-attributes.repository';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectRepository(FacilitiesRepository)
    private readonly facilitiesRepository: FacilitiesRepository,
    private readonly facilityMap: FacilityMap,
    @InjectRepository(UnitFactRepository)
    private readonly unitFactRepository: UnitFactRepository,
    private readonly applicableFacilityAttributesMap: ApplicableFacilityAttributesMap,
    @InjectRepository(FacilityUnitAttributesRepository)
    private readonly facilityUnitAttributesRepository: FacilityUnitAttributesRepository,
    private readonly facilityAttributesMap: FacilityAttributesMap,
  ) {}

  async getFacilities(
    facilityParamsDTO: FacilityParamsDTO,
    req: Request,
  ): Promise<FacilityDTO[]> {
    let results: Plant[];
    let totalCount: number;

    try {
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

      ResponseHeaders.setPagination(req, page, perPage, totalCount);
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.facilityMap.many(results);
  }

  async getFacilityById(id: number): Promise<FacilityDTO> {
    const facility = await this.facilitiesRepository.findOne({
      facilityId: id,
    });

    if (facility === undefined) {
      throw new EaseyException(
        new Error('Facility id does not exist'),
        HttpStatus.INTERNAL_SERVER_ERROR,
        { id: id },
      );
    }

    return this.facilityMap.one(facility);
  }

  async getAllFacilityAttributes(
    paginatedFacilityAttributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    let query;
    try {
      query = await this.facilityUnitAttributesRepository.getAllFacilityAttributes(
        paginatedFacilityAttributesParamsDTO,
        req,
      );
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    req.res.setHeader(
      fieldMappingHeader,
      JSON.stringify(fieldMappings.facilities.attributes.data),
    );

    req.res.setHeader(
      excludableColumnHeader,
      JSON.stringify(fieldMappings.facilities.attributes.excludableColumns),
    );

    return this.facilityAttributesMap.many(query);
  }

  async getApplicableFacilityAttributes(
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    let query;
    try {
      query = await this.unitFactRepository.getApplicableFacilityAttributes(
        applicableFacilityAttributesParamsDTO.year,
      );
    } catch (e) {
      throw new EaseyException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.applicableFacilityAttributesMap.many(query);
  }
}
