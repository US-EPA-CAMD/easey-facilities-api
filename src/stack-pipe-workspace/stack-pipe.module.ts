import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StackPipeMap } from '../maps/stack-pipe.map';
import { StackPipeWorkspaceController } from './stack-pipe.controller';
import { StackPipeWorkspaceRepository } from './stack-pipe.repository';
import { StackPipeWorkspaceService } from './stack-pipe.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StackPipeWorkspaceRepository]),
    HttpModule,
  ],
  controllers: [StackPipeWorkspaceController],
  providers: [
    StackPipeMap,
    StackPipeWorkspaceRepository,
    StackPipeWorkspaceService,
  ],
  exports: [
    TypeOrmModule,
    StackPipeMap,
    StackPipeWorkspaceRepository,
    StackPipeWorkspaceService,
  ],
})
export class StackPipeWorkspaceModule {}
