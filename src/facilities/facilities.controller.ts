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
  StreamableFile,
} from '@nestjs/common';
import { Json2CsvInterceptor } from '@us-epa-camd/easey-common/interceptors';

import { fieldMappings } from '../constants/field-mappings';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesService } from './facilities.service';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import {
  StreamFacilityAttributesParamsDTO,
  PaginatedFacilityAttributesParamsDTO,
} from '../dtos/facility-attributes.param.dto';
import {
  ApiQueryAttributesMultiSelect,
  BadRequestResponse,
  NotFoundResponse,
  ExcludeQuery,
} from '../utils/swagger-decorator.const';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Facilities')
export class FacilitiesController {
  constructor(private readonly service: FacilitiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(FacilityDTO)
  getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request,
  ): Promise<FacilityDTO[]> {
    return this.service.getFacilities(facilityParamsDTO, req);
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
  getAllFacilityAttributes(
    @Query()
    paginiatedFacilityattributesParamsDTO: PaginatedFacilityAttributesParamsDTO,
    @Req() req: Request,
  ): Promise<FacilityAttributesDTO[]> {
    return this.service.getAllFacilityAttributes(
      paginiatedFacilityattributesParamsDTO,
      req,
    );
  }

  @Get('/attributes/stream')
  @ApiOkResponse({
    description: 'Streams a list of Facilities',
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
  @ExcludeQuery()
  streamFacilitiesUnitAttributes(
    @Req() req: Request,
    @Query()
    streamFacilityAttributesParamsDTO: StreamFacilityAttributesParamsDTO,
  ): Promise<StreamableFile> {
    return this.service.streamFacilitiesUnitAttributes(
      req,
      streamFacilityAttributesParamsDTO,
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
  @ApiExtraModels(ApplicableFacilityAttributesDTO)
  getApplicableFacilityAttributes(
    @Query()
    applicableFacilityAttributesParamsDTO: ApplicableFacilityAttributesParamsDTO,
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    return this.service.getApplicableFacilityAttributes(
      applicableFacilityAttributesParamsDTO,
    );
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
