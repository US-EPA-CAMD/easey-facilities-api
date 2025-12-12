import {
    ApiTags,
    ApiSecurity,
    ApiOkResponse,
    ApiBearerAuth,
    ApiExtraModels,
    ApiQuery
  } from '@nestjs/swagger';
  import { Request } from 'express';
  import { Controller, Get, Query,   ParseIntPipe, Param, Req } from '@nestjs/common';
  import { Logger } from '@us-epa-camd/easey-common';
  import { CertOfRepListService} from './certOfRepList.service'
  import { CertificateOfRepresentationDTOList } from '../dtos/certificate-of-representation.dto';
  import { CertOfRepParamsDTO } from '../dtos/certOfRep.params.dto';
  import { BadRequestResponse, NotFoundResponse } from '@us-epa-camd/easey-common/utilities/common-swagger';
  import { ApiExcludeControllerByEnv } from '../decorators/swagger-decorator';

  @Controller()
  @ApiSecurity('APIKey')
  @ApiTags('Certificate of Representation')
  @ApiExcludeControllerByEnv()
  export class CertOfRepController {
    constructor(
      private certOfRepListService: CertOfRepListService,
      private readonly logger:Logger
    ) {
      this.logger.setContext('CertOfRepController')
    }
  
    @Get('/')
    @ApiSecurity('ClientId')
    @ApiBearerAuth('ClientToken')
    @BadRequestResponse()
    @NotFoundResponse()
    @ApiExtraModels(CertificateOfRepresentationDTOList)
      @ApiOkResponse({
        description: 'Returns cert of rep data for all facilities associated with the given program or that has been updated since the lastUpdated date provided',
        type: CertificateOfRepresentationDTOList
      })
    async certOfRep(
     @Query() certOfRepParamsDTO: CertOfRepParamsDTO,
     @Req() request: Request
    ): Promise<CertificateOfRepresentationDTOList> {
      const authorizationHeader = request.headers['authorization'] as string;
      const clientId = request.headers['x-client-id'] as string;
      const token = authorizationHeader?.split(' ')[1].trim();
      
      return this.certOfRepListService.getCertOfRepList(certOfRepParamsDTO?.lastUpdated,certOfRepParamsDTO?.programCode, clientId,token);
    }



      @Get('/:id')
      @ApiSecurity('ClientId')
      @ApiBearerAuth('ClientToken')
      @ApiOkResponse({
        description: 'Retrieves a Cert of Rep By Id',
        type: CertificateOfRepresentationDTOList
      })
      @BadRequestResponse()
      @NotFoundResponse()
      @ApiExtraModels(CertificateOfRepresentationDTOList)
      @ApiQuery({ name: 'programCode', required: false, type: String })
      getFacilityById(
        @Param('id', ParseIntPipe) id: number,
        @Req() request: Request,
        @Query('programCode') programCode?: string,
      ): Promise<CertificateOfRepresentationDTOList> {
        const authorizationHeader = request.headers['authorization'] as string;
        const clientId = request.headers['x-client-id'] as string;
        const token = authorizationHeader?.split(' ')[1].trim();

        return this.certOfRepListService.getCertOfRepById(id,clientId,token,programCode);
      }
  }
  