import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UnitFact } from './unit-fact.entity';

@Entity({ name: 'camddmw.owner_display_fact' })
export class OwnerDisplayFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
  })
  year: number;

  @Column({
    name: 'own_display',
  })
  ownDisplay: string;

  @Column({
    name: 'opr_display',
  })
  oprDisplay: string;

  @OneToOne(
    () => UnitFact,
    uf => uf.ownerDisplayFact,
  )
  unitFact: UnitFact;
}
