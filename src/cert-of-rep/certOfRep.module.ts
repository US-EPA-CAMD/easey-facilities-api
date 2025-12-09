import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CertOfRepController } from './certOfRep.controller';
import { CertOfRepListService} from './certOfRepList.service'

@Module({
  imports: [HttpModule],
  controllers: [CertOfRepController],
  providers: [
    CertOfRepListService
  ],
})
export class CertificateOfRepresentationModule {}
