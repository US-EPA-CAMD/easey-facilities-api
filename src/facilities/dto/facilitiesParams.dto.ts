import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDTO } from './pagination.dto';

export class FacilityParamsDTO extends PaginationDTO {
  @IsOptional()
  @ApiPropertyOptional()
  state: string;

  @IsOptional()
  @ApiPropertyOptional()
  region: string;
}
