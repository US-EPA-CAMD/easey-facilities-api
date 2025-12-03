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
import { BadRequestResponse, NotFoundResponse } from '@us-epa-camd/easey-common/utilities/common-swagger';

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
import { ApiQueryAttributesMultiSelect } from '../utils/swagger-decorator.const';
import { ApiExcludeControllerByEnv } from '../decorators/swagger-decorator';
import { ArrayResponse } from '@us-epa-camd/easey-common/interfaces/common.interface';

@Controller()
@ApiSecurity('APIKey')
@ApiTags('Facilities')
@ApiExcludeControllerByEnv()
export class FacilitiesWorkspaceController {
  constructor(private readonly service: FacilitiesWorkspaceService) {}

  @Get()
  @RoleGuard({}, LookupType.Facility)
  @ApiOkResponse({
    description: 'Retrieves a list of Facilities',
    content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(FacilityDTO) },
              },
            },
          },
        },
      }
  })
  @BadRequestResponse()
  @NotFoundResponse()
  @ApiExtraModels(FacilityDTO)
  async getFacilities(
    @Query(ValidationPipe) facilityParamsDTO: FacilityParamsDTO,
    @Req() req: Request,
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<ArrayResponse<FacilityDTO>> {
    const facilites = await this.service.getFacilities(facilityParamsDTO, req, allowedOrisCodes);
    return {
      items: facilites
    };
  }

  @Get('/attributes')
  @RoleGuard({}, LookupType.Facility)
  @UseInterceptors(Json2CsvInterceptor)
  @ApiOkResponse({
    description: 'Retrieves Facility Unit Attributes',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: { $ref: getSchemaPath(FacilityAttributesDTO) },
            }
           },
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
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<ArrayResponse<FacilityAttributesDTO>> {
    const unitAttributes = await this.service.getAllFacilityAttributes(
      paginiatedFacilityattributesParamsDTO,
      req,
      allowedOrisCodes,
    );
    return {
      items:unitAttributes
    }
  }

  @Get('/attributes/applicable')
  @RoleGuard({}, LookupType.Facility)
  @ApiOkResponse({
    description: 'Retrieves Applicable Facility Attributes',
    content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(ApplicableFacilityAttributesDTO) },
              },
            },
          },
        },
      }
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
    @AllowedOrisCodes() allowedOrisCodes: number[],
  ): Promise<ArrayResponse<ApplicableFacilityAttributesDTO>> {
    const applicableAttributes = await this.service.getApplicableFacilityAttributes(
      applicableFacilityAttributesParamsDTO,
      allowedOrisCodes,
    );
    return {
      items:applicableAttributes
    }
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
