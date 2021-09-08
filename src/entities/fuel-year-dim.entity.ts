import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'camddmw.fuel_year_dim' })
export class FuelYearDim extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  unitId: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  opYear: number;

  @PrimaryColumn({
    name: 'fuel_yr_dim',
  })
  fuelYrDim: number;

  @Column({
    name: 'fuel_code',
  })
  fuelCode: string;
}
