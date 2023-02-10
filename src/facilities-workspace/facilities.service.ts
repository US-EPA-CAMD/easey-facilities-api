import { Request } from 'express';
import { Not, IsNull, FindManyOptions, In } from 'typeorm';

import { HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { LoggingException } from '@us-epa-camd/easey-common/exceptions';
import { ResponseHeaders } from '@us-epa-camd/easey-common/utilities';

import {
  excludableColumnHeader,
  fieldMappingHeader,
  fieldMappings,
} from '../constants/field-mappings';

import { Plant } from '../entities/plant.entity';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from '../facilities/facilities.repository';
import { FacilityMap } from '../maps/facility.map';
import { UnitFactRepository } from '../facilities/unit-fact.repository';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesMap } from '../maps/applicable-facility-attributes.map';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { FacilityAttributesMap } from '../maps/facility-attributes.map';
import { FacilityUnitAttributesRepository } from '../facilities/facility-unit-attributes.repository';

@Injectable()
export class FacilitiesWorkspaceService {
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
    allowedOrisCodes: number[],
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

      if (allowedOrisCodes !== null) {
        findOpts.where = {
          ...findOpts.where,
          facilityId: In(allowedOrisCodes),
        };
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
      throw new LoggingException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.facilityMap.many(results);
  }

  async getFacilityById(id: number): Promise<FacilityDTO> {
    const facility = await this.facilitiesRepository.findOne({
      facilityId: id,
    });

    if (facility === undefined) {
      throw new LoggingException(
        'Facility id does not exist',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { id: id },
      );
    }

    return this.facilityMap.one(facility);
  }

  async getAllFacilityAttributes(
    paginatedFacilityAttributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    req: Request,
    allowedOrisCodes: number[],
  ): Promise<FacilityAttributesDTO[]> {
    let query;
    try {
      query = await this.facilityUnitAttributesRepository.getAllFacilityAttributes(
        paginatedFacilityAttributesParamsDTO,
        req,
        allowedOrisCodes,
      );
    } catch (e) {
      throw new LoggingException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
    allowedOrisCodes: number[],
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    let query;
    try {
      query = await this.unitFactRepository.getApplicableFacilityAttributes(
        applicableFacilityAttributesParamsDTO.year,
        allowedOrisCodes,
      );
    } catch (e) {
      throw new LoggingException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return this.applicableFacilityAttributesMap.many(query);
  }
}
