import { Request } from 'express';

import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  Req,
  Get,
  Query,
  Param,
  Controller,
  ParseIntPipe,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesService } from './facilities.service';

@ApiTags('Facilities')
@Controller()
export class FacilitiesController {
  constructor(
    private service: FacilitiesService,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request
  ): Promise<FacilityDTO[]> {
    return this.service.getFacilities(facilityParamsDTO, req);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Retrieves a single Facilitiy By Id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  getFacilityById(@Param('id', ParseIntPipe) id: number): Promise<FacilityDTO> {
    return this.service.getFacilityById(id);
  }
}
