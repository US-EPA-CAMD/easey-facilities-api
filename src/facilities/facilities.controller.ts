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
    description: 'Retrieved Facilities',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request
  ): Promise<FacilityDTO[]> {
    return this.service.getFacilities(facilityParamsDTO, req);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Retrieved Facilitiy By ID',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityById(@Param('id', ParseIntPipe) id: number): Promise<FacilityDTO> {
    return this.service.getFacilityById(id);
  }
}
