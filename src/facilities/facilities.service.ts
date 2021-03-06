import { Request } from 'express';
import { Not, IsNull, FindManyOptions } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesRepository } from './facilities.repository';
import { ResponseHeaders } from './../utils/response.headers';
import { FacilityMap } from '../maps/facility.map';

@Injectable()
export class FacilitiesService {
  constructor(@InjectRepository(FacilitiesRepository)
    private repository: FacilitiesRepository,
    private map: FacilityMap,    
  ) {}

  async getFacilities(facilityParamsDTO: FacilityParamsDTO, req: Request): Promise<FacilityDTO[]> {
    const { state, page, perPage } = facilityParamsDTO;

    let findOpts: FindManyOptions = {
      select: [ "id", "orisCode", "name", "state" ],
      order: {
        id: "ASC",
      }
    }

    if (state) {
      findOpts.where = { orisCode: Not(IsNull()), state: state }
    }
    else {
      findOpts.where = { orisCode: Not(IsNull()) }      
    }

    if (page && perPage) {
      findOpts.skip = (page - 1) * perPage;
      findOpts.take = perPage;
    }

    const [results, totalCount] = await this.repository.findAndCount(findOpts);

    ResponseHeaders.setPagination(page, perPage, totalCount, req);
    return this.map.many(results);
  }

  async getFacilityById(id: number): Promise<FacilityDTO> {
    const facility = await this.repository.findOne(id);

    if (facility === undefined) {
      throw new NotFoundException(`Facility with Id ${id} does not exist`);
    }

    return this.map.one(facility);
  }
}
