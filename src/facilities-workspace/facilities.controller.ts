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

import {
  ApiQueryAttributesMultiSelect,
  BadRequestResponse,
  NotFoundResponse,
} from '../utils/swagger-decorator.const';

import { fieldMappings } from '../constants/field-mappings';
import { FacilityDTO } from '../dtos/facility.dto';
import { FacilityParamsDTO } from '../dtos/facility.params.dto';
import { FacilitiesWorkspaceService } from './facilities.service';
import { ApplicableFacilityAttributesParamsDTO } from '../dtos/applicable-facility-attributes.params.dto';
import { ApplicableFacilityAttributesDTO } from '../dtos/applicable-facility-attributes.dto';
import { PaginatedFacilityAttributesParamsDTO } from '../dtos/facility-attributes.param.dto';
import { FacilityAttributesDTO } from '../dtos/facility-attributes.dto';
import {
  AllowedOrisCodes,
  RoleGuard,
} from '@us-epa-camd/easey-common/decorators';
import { LookupType } from '@us-epa-camd/easey-common/enums';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Facilities')
export class FacilitiesWorkspaceController {
  constructor(private readonly service: FacilitiesWorkspaceService) {}

  @Get()
  @RoleGuard({}, LookupType.Facility)
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(FacilityDTO)
  getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request,
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<FacilityDTO[]> {
    return this.service.getFacilities(facilityParamsDTO, req, allowedOrisCodes);
  }

  @Get('/attributes')
  @RoleGuard({}, LookupType.Facility)
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
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<FacilityAttributesDTO[]> {
    return this.service.getAllFacilityAttributes(
      paginiatedFacilityattributesParamsDTO,
      req,
      allowedOrisCodes,
    );
  }

  @Get('/attributes/applicable')
  @RoleGuard({}, LookupType.Facility)
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
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<ApplicableFacilityAttributesDTO[]> {
    return this.service.getApplicableFacilityAttributes(
      applicableFacilityAttributesParamsDTO,
      allowedOrisCodes,
    );
  }

  @Get('/:id')
  @RoleGuard({ pathParam: 'id' }, LookupType.Facility)
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
