import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.program_year_dim' })
export class ProgramYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @PrimaryColumn({
    name: 'prg_code',
  })
  programCode: string;

  @Column({
    name: 'report_freq',
  })
  reportFreq: string;
}
