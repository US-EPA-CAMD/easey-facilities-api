import { ValidationArguments, IsNumber, IsString, IsOptional, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsValidDateFormat } from '../pipes/is-valid-date-format.pipe';

class RepresentativeDataDTO {
  @IsNumber()
  representativeRecordId: number;

  @IsString()
  representativeType: string;

  @IsNumber()
  personRecordId: number;

  @IsString()
  cdxUserId: string;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })  
  beginDate: string | null;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  endDate: string | null;

  @IsString()
  program: string;
}

class UnitOwnerDataDTO {
  @IsNumber()
  unitOwnerRecordId: number;

  @IsString()
  ownerType: string;

  @IsNumber()
  companyRecordId: number;

  @IsString()
  companyName: string;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  beginDate: string | null;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  endDate: string | null;
}

class UnitDataDTO {
  @IsNumber()
  unitRecordId: number;

  @IsString()
  unitIdentifer: string;

  @IsString()
  operatingStatus: string;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  operatingStatusBeginDate: string | null;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  commenceOperationDate: string | null;

  @IsOptional()
  @IsDateString()
  @IsValidDateFormat({
    message: (args: ValidationArguments) => {
      return `Ensure ${args.property} is a valid date format of YYYY-MM-DD.`;
    },
  })
  commenceCommercialOperationDate: string | null;

  @IsString()
  sourceCategory: string;

  @IsString()
  naicsCode: string;

  @IsString()
  unitType: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitOwnerDataDTO)
  unitOwnerData: UnitOwnerDataDTO[];
}

export class CertificateOfRepresentationDTO {
  @IsNumber()
  facilityRecordId: number;

  @IsNumber()
  orisCode: number;

  @IsString()
  facilityName: string;

  @IsString()
  state: string;

  @IsString()
  stateIdentifier: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  version:string | null

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RepresentativeDataDTO)
  representativeData: RepresentativeDataDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDataDTO)
  unitData: UnitDataDTO[];

  @IsString()
  @IsOptional()
  lastUpdated: string;
}
