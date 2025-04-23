import {
    ApiTags,
    ApiSecurity,
    ApiOkResponse,
    ApiBearerAuth,
  } from '@nestjs/swagger';
  import { Controller, UseGuards, Get, Query} from '@nestjs/common';
  import { ClientTokenGuard } from '@us-epa-camd/easey-common/guards';
  import { Logger } from '@us-epa-camd/easey-common';
  import { CertOfRepListService} from './certOfRepList.service'
  import { CertificateOfRepresentationDTO } from 'src/dtos/certificate-of-representation.dto';
  import { CertOfRepParamsDTO } from 'src/dtos/certOfRep.params.dto';
  @Controller()
  @ApiSecurity('APIKey')
  @ApiTags('Certificate of Representatio')
  export class CertOfRepController {
    constructor(
      private certOfRepListService: CertOfRepListService,
      private readonly logger:Logger
    ) {
      this.logger.setContext('CertOfRepController')
    }
  
    @Get('/')
      @ApiOkResponse({
        description: 'Returns cert of rep data for all facilities associated with the given program or that has been updated since the lastUpdated date provided',
        type: [CertificateOfRepresentationDTO]
      })
    async certOfRep(
     @Query() certOfRepParamsDTO: CertOfRepParamsDTO,
  ): Promise<CertificateOfRepresentationDTO[]> {
      return this.certOfRepListService.getCertOfRepList(certOfRepParamsDTO?.lastUpdated,certOfRepParamsDTO?.programCode);
    }
  }
  