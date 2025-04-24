import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { EntityManager } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import * as https from 'https';
import * as crypto from 'crypto';
import { CertificateOfRepresentationDTO } from 'src/dtos/certificate-of-representation.dto';


@Injectable()
export class CertOfRepListService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly entityManager: EntityManager,
    private readonly logger: Logger,
  ) {}

  returnManager() {
    return this.entityManager;
  }

  async getClientToken(): Promise<string> {
    this.logger.debug('getClientToken ...');

    //Construct the URL
    const url =`${this.configService.get<string>('app.authApi.uri')}/tokens/client`;
    this.logger.debug('using authApi: ' + url);

    //Construct the headers
    const headers = {
      "x-api-key": this.configService.get<string>('app.apiKey'),
    };

    //Construct the body
    const body = {
      clientId: this.configService.get<string>('app.clientId'),
      clientSecret: this.configService.get<string>('app.clientSecret')
    };

    this.logger.debug('Calling auth-api token validation API: ' +  url);
    try {
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );

      if (!response.data) {
        this.logger.error('Invalid response from auth-api token validation API');
        return '';
      }

      return response.data.token;
    } catch (error) {
      this.logger.error('Error occurred during the API call to auth-api token validation API', error);
      return '';
    }
  }

  async getCertOfRepList(
    lastUpdated: string,
    programCode: string
  ): Promise<CertificateOfRepresentationDTO[]> {

    this.logger.debug('get Cert of Reps with params', { lastUpdated, programCode});

    const certOfRepApiUrl = this.configService.get<string>('app.certOfRepApi');
    if (!certOfRepApiUrl) {
      throw new HttpException('certOfRepApiUrl is not configured', HttpStatus.NOT_FOUND);
    }

    this.logger.debug('using certOfRepApiUrl: ' + certOfRepApiUrl);

    //Obtain client token
    const clientToken = await this.getClientToken();
    if (!clientToken) {
      throw new HttpException('Unable to obtain client token from auth-api. Cannot proceed with certOfRep API call', HttpStatus.BAD_REQUEST);
    }

    const headers = {
      'x-api-key': this.configService.get<string>('app.apiKey'),
      'x-client-id': this.configService.get<string>('app.clientId'),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
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
    id: number
  ): Promise<CertificateOfRepresentationDTO[]> {

    this.logger.debug('get Cert of Rep By ID with param ', id);

    const certOfRepApiUrl = this.configService.get<string>('app.certOfRepApi');
    if (!certOfRepApiUrl) {
      throw new HttpException('certOfRepApiUrl is not configured', HttpStatus.NOT_FOUND);
    }

    this.logger.debug('using certOfRepApiUrl: ' + certOfRepApiUrl+'/'+id);

    //Obtain client token
    const clientToken = await this.getClientToken();
    if (!clientToken) {
      throw new HttpException('Unable to obtain client token from auth-api. Cannot proceed with certOfRep/id API call', HttpStatus.BAD_REQUEST);
    }

    const headers = {
      'x-api-key': this.configService.get<string>('app.apiKey'),
      'x-client-id': this.configService.get<string>('app.clientId'),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${clientToken}`,
    };

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
