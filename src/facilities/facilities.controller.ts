import { Request } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
  ApiExtraModels,
} from '@nestjs/swagger';
import {
  Req,
  Get,
  Query,
  Param,
  Controller,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';

import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesService } from './facilities.service';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { FacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import {
  ApiQueryAttributesMultiSelect,
  BadRequestResponse,
  NotFoundResponse,
} from '../utils/swagger-decorator.const';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { Json2CsvInterceptor } from '../interceptors/json2csv.interceptor';

@ApiTags('Facilities')
@Controller()
@UseInterceptors(Json2CsvInterceptor)
export class FacilitiesController {
  constructor(private readonly service: FacilitiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request,
  ): Promise<FacilityDTO[]> {
    return this.service.getFacilities(facilityParamsDTO, req);
  }

  @Get('/attributes')
  @ApiOkResponse({
    description: 'Retrieves Facility Attributes',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(FacilityAttributesDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryAttributesMultiSelect()
  @ApiExtraModels(FacilityAttributesDTO)
  getFacilityAtrributes(
    @Query()
    facilityattributesParamsDTO: FacilityAttributesParamsDTO,
    @Req() req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    return this.service.getAllFacilityAttributes(
      facilityattributesParamsDTO,
      req,
    );
  }

  @Get('/attributes/applicable')
  @ApiOkResponse({
    description: 'Retrieves Applicable Facility Attributes',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQuery({
    style: 'pipeDelimited',
    name: 'year',
    required: true,
    explode: false,
  })
  getApplicableFacilityAtrributes(
    @Query()
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    return this.service.getApplicableFacilityAtrributes(
      applicableFacilityAttributesParamsDTO,
    );
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Retrieves a single Facilitiy By Id',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  getFacilityById(@Param('id', ParseIntPipe) id: number): Promise<FacilityDTO> {
    return this.service.getFacilityById(id);
  }
}
