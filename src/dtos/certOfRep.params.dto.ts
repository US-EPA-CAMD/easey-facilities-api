import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsValidDateFormat } from '../pipes/is-valid-date-format.pipe';

export class CertOfRepParamsDTO {
  @IsOptional()
  @IsValidDateFormat({
    message: 'Ensure lastUpdated is a valid date format.',
  })
  @ApiProperty({
    description: 'Cert of Rep data that has been updated since the lastUpdated',
    example: "1900-01-01T00:00:00",
    required: false
  })
  lastUpdated?: string;


  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Cert of Rep data associated with the given program',
    example: 'ARP',
    required: false
  })
  programCode?: string;
}
