import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { LoggerModule } from '@us-epa-camd/easey-common/logger';
import { CertOfRepController } from './certOfRep.controller';
import { CertOfRepListService } from './certOfRepList.service';
import { CertOfRepParamsDTO } from '../dtos/certOfRep.params.dto';
import { CertificateOfRepresentationDTOList } from '../dtos/certificate-of-representation.dto';
import { Request } from 'express';

jest.mock('./certOfRepList.service');

describe('-- Cert Of Rep Controller --', () => {
  let controller: CertOfRepController;
  let service: CertOfRepListService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule, LoggerModule],
      controllers: [CertOfRepController],
      providers: [
        {
          provide: DataSource,
          useValue: {},
        },
       CertOfRepListService,
       ConfigService
      ],
    }).compile();

    controller = module.get(CertOfRepController);
    service = module.get<CertOfRepListService>(CertOfRepListService);

  });


  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });


  it('certOfRep', async () => {
    const mockRequest: Partial<Request> = {
      headers: {
        'authorization': 'Bearer jwt',
        'x-client-id': 'client-1',
        'x-api-key': 'api-key-11',
      },
    };
    
    expect(async () => {
        const mockedValues = new CertificateOfRepresentationDTOList();
        jest
          .spyOn(service, 'getCertOfRepList')
          .mockResolvedValue(mockedValues);
    
      await controller.certOfRep(new CertOfRepParamsDTO(), mockRequest as Request);
    }).not.toThrow();
  });

  it('getFacilityById', async () => {
    const mockRequest: Partial<Request> = {
      headers: {
        'authorization': 'Bearer jwt',
        'x-client-id': 'client-1',
        'x-api-key': 'api-key-11',
      },
    };
    expect(async () => {
        const mockedValues = new CertificateOfRepresentationDTOList();
        jest
          .spyOn(service, 'getCertOfRepById')
          .mockResolvedValue(mockedValues);
    
      await controller.getFacilityById( Number(), mockRequest as Request, String());
    }).not.toThrow();
  });
});
