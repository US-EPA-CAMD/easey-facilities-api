import { Request } from 'express';

import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
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
import { ApplicableFacilityAttributesParamsDTO } from 'src/dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';

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

  @Get('/attributes')
  @ApiOkResponse({
    description: 'Retrieves Facility Attributes',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  getFacilityAtrributes(): string {
    return this.service.getFacilityAttributes();
  }

  @Get('/attributes/applicable')
  @ApiOkResponse({
    description: 'Retrieves Applicable Facility Attributes',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource not found',
  })
  @ApiQuery({
    style: 'pipeDelimited',
    name: 'year',
    required: true,
    explode: false,
  })
  getApplicableFacilityAtrributes(@Query() applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
    ): Promise<ApplicableFacilityAttributesDTO[]> {
    return this.service.getApplicableFacilitiesAttributes(applicableFacilityAttributesParamsDTO);
  }

}
