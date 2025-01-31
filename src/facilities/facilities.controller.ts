import { Request } from 'express';

import {
  ApiTags,
  ApiOkResponse,
  ApiQuery,
  getSchemaPath,
  ApiExtraModels,
  ApiSecurity,
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

import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';
import { fieldMappings } from '../constants/field-mappings';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesService } from './facilities.service';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import { ApiQueryAttributesMultiSelect } from '../utils/swagger-decorator.const';
import { BadRequestResponse, NotFoundResponse } from '@us-epa-camd/easey-common/utilities/common-swagger';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Facilities')
export class FacilitiesController {
  
  constructor(
    private readonly service: FacilitiesService
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(FacilityDTO)
  async getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request,
  ): Promise<ArrayResponse<FacilityDTO>> {
    const facilities = await this.service.getFacilities(facilityParamsDTO, req);
    return {
      items: facilities
    };
  }

  @Get('/attributes')
  @UseInterceptors(Json2CsvInterceptor)
  @ApiOkResponse({
    description: 'Retrieves Facility Unit Attributes',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath(FacilityAttributesDTO),
        },
      },
      'text/csv': {
        schema: {
          type: 'string',
          example: fieldMappings.facilities.attributes.data
            .map(i => i.label)
            .join(','),
        },
      },
    },
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiQueryAttributesMultiSelect()
  @ApiExtraModels(FacilityAttributesDTO)
  async getAllFacilityAttributes(
    @Query()
    paginiatedFacilityattributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    @Req() req: Request,
  ):  Promise<ArrayResponse<FacilityAttributesDTO>> {
    const unitAttributes = await this.service.getAllFacilityAttributes(
      paginiatedFacilityattributesParamsDTO,
      req,
    );
    return {
      items: unitAttributes
    }
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
  @ApiExtraModels(ApplicableFacilityAttributesDTO)
  async getApplicableFacilityAttributes(
    @Query()
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ArrayResponse<ApplicableFacilityAttributesDTO>> {
    const applicableAttributes = await this.service.getApplicableFacilityAttributes(
      applicableFacilityAttributesParamsDTO,
    );
    return {
      items:applicableAttributes
    }
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Retrieves a single Facilitiy By Id',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(FacilityDTO)
  getFacilityById(@Param('id', ParseIntPipe) id: number): Promise<FacilityDTO> {
    return this.service.getFacilityById(id);
  }
}
