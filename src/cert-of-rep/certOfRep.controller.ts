import {
    ApiTags,
    ApiSecurity,
    ApiOkResponse,
    ApiBearerAuth,
    ApiExtraModels,
    ApiQuery
  } from '@nestjs/swagger';
  import { Request } from 'express';
  import { Controller, UseGuards, Get, Query,   ParseIntPipe, Param, Req } from '@nestjs/common';
  import { ClientTokenGuard } from '@us-epa-camd/easey-common/guards';
  import { Logger } from '@us-epa-camd/easey-common';
  import { CertOfRepListService} from './certOfRepList.service'
  import { CertificateOfRepresentationDTOList } from '../dtos/certificate-of-representation.dto';
  import { CertOfRepParamsDTO } from '../dtos/certOfRep.params.dto';
  import { BadRequestResponse, NotFoundResponse } from '@us-epa-camd/easey-common/utilities/common-swagger';

  @Controller()
  @ApiSecurity('APIKey')
  @ApiTags('Certificate of Representation')
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
    @UseGuards(ClientTokenGuard)
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
      const apiKey = request.headers['x-api-key'] as string;
      
      return this.certOfRepListService.getCertOfRepList(certOfRepParamsDTO?.lastUpdated,certOfRepParamsDTO?.programCode, clientId,token,apiKey);
    }



      @Get('/:id')
      @ApiSecurity('ClientId')
      @ApiBearerAuth('ClientToken')
      @UseGuards(ClientTokenGuard)
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
        const apiKey = request.headers['x-api-key'] as string;

        return this.certOfRepListService.getCertOfRepById(id,clientId,token,apiKey,programCode);
      }
  }
  