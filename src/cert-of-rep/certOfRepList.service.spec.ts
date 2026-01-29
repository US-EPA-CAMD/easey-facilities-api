import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Logger } from '@us-epa-camd/easey-common/logger';
import { of } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';
import { CertOfRepListService } from './certOfRepList.service';
import { CertificateOfRepresentationDTOList } from '../dtos/certificate-of-representation.dto';

describe('CertOfRepListService', () => {
  let service: CertOfRepListService;
  let httpService: HttpService;
  let configService: ConfigService;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CertOfRepListService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            request: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            debug: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mock-config-value'),
          },
        },
      ],
    }).compile();

    service = module.get<CertOfRepListService>(CertOfRepListService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCertOfRepList', () => {
    it('should return a list of cert of rep', async () => {
      const mockCertOfReps = [
        new CertificateOfRepresentationDTOList()
      ];
      const mockResponse: AxiosResponse = {
        data: mockCertOfReps,
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosHeaders,
        config: { method: 'GET', headers: {} as AxiosHeaders },
      };

      jest.spyOn(httpService, 'request').mockReturnValue(of(mockResponse));

      const result = await service.getCertOfRepList(new Date(), '', '', '');

      expect(result).toEqual(mockCertOfReps);
    });
  });

  describe('getCertOfRepById', () => {
    it('should return a cert of rep', async () => {
      const mockCertOfReps = [
        new CertificateOfRepresentationDTOList()
      ];
      const mockResponse: AxiosResponse = {
        data: mockCertOfReps,
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosHeaders,
        config: { method: 'GET', headers: {} as AxiosHeaders },
      };

      jest.spyOn(httpService, 'request').mockReturnValue(of(mockResponse));

      const result = await service.getCertOfRepById(Number(), '', '', '' );

      expect(result).toEqual(mockCertOfReps);
    });
  });
});
