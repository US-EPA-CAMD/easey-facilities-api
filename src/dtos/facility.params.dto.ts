import { IsOptional } from 'class-validator';
import { PaginationDTO } from './pagination.dto';

export class FacilityParamsDTO extends PaginationDTO {
  @IsOptional()
  state?: string;

  @IsOptional()
  region?: string;
}
