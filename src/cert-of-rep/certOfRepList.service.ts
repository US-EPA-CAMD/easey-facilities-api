import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import * as crypto from 'crypto';
import { CertificateOfRepresentationDTOList } from 'src/dtos/certificate-of-representation.dto';


@Injectable()
export class CertOfRepListService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  async getCertOfRepList(
    lastUpdated: Date,
    programCode: string,
    clientId: string,
    token:string,
  ): Promise<CertificateOfRepresentationDTOList> {

    this.logger.debug('get Cert of Reps with params', { lastUpdated, programCode});

    const certOfRepApiUrl = this.configService.get<string>('app.certOfRepApi');
    if (!certOfRepApiUrl) {
      throw new HttpException('certOfRepApiUrl is not configured', HttpStatus.NOT_FOUND);
    }

    this.logger.debug('using certOfRepApiUrl: ' + certOfRepApiUrl);

    const headers = {
      'x-client-id': clientId,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      programCode : programCode,
      lastUpdated : lastUpdated
    };

    this.logger.debug('Making API call to:', { url: certOfRepApiUrl });

    const allowLegacyRenegotiationforNodeJsOptions = {
      httpsAgent: new https.Agent({
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
    };

    //The CBS API expects a GET request with a body.
    //Using the httpService.request method
    try {

      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request({
          method: 'GET',
          url: certOfRepApiUrl,
          headers: headers,
          data: body,
          ...allowLegacyRenegotiationforNodeJsOptions,
        }),
      );

      const certOfRepList = response.data

      if (Array.isArray(response.data) && response.data.length > 0) {
        this.logger.debug('First item of the  list: ', response.data[0]);
      } else {
        this.logger.debug('response.data is is empty.');
      }

      return certOfRepList;
    } catch (error) {
      this.logger.error('Error occurred during the API call to cert of reps', error.message || error);
      if (error.response) {
        this.logger.error('API response error status:', error.response.status || '');
        this.logger.error('API response error data:', error.response.data || '');
      }

      throw new HttpException('Error occurred during the API call to cert of reps: ' + error.message || error , error.response.status);
    }
  }

  async getCertOfRepById(
    id: number,
    clientId: string,
    token:string,
    programCode: string,
  ): Promise<CertificateOfRepresentationDTOList> {

    this.logger.debug('get Cert of Rep By ID with param ', id);
    this.logger.debug('get Cert of Reps with programCode', { programCode});

    const certOfRepApiUrl = this.configService.get<string>('app.certOfRepApi');
    if (!certOfRepApiUrl) {
      throw new HttpException('certOfRepApiUrl is not configured', HttpStatus.NOT_FOUND);
    }

    this.logger.debug('using certOfRepApiUrl: ' + certOfRepApiUrl+'/'+id);

    const headers = {
      'x-client-id': clientId,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      programCode : programCode,
    }

    this.logger.debug('Making API call to:', { url: certOfRepApiUrl });

    const allowLegacyRenegotiationforNodeJsOptions = {
      httpsAgent: new https.Agent({
        secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
      }),
    };


    //The CBS API expects a GET
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.request({
          method: 'GET',
          url: `${certOfRepApiUrl}/${id}`, 
          headers: headers,
          data: body,
          ...allowLegacyRenegotiationforNodeJsOptions
        }),
      );

      const certOfRepList = response.data

      if (Array.isArray(response.data) && response.data.length > 0) {
        this.logger.debug('First item of the  list: ', response.data[0]);
      } else {
        this.logger.debug('response.data is is empty.');
      }

      return certOfRepList;
    } catch (error) {
      this.logger.error('Error occurred during the API call to cert of rep by ID', error.message || error);
      if (error.response) {
        this.logger.error('API response error status:', error.response.status || '');
        this.logger.error('API response error data:', error.response.data || '');
      }

      throw new HttpException('Error occurred during the API call to cert of rep by ID: ' + error.message || error , error.response.status);
    }
  }
}
