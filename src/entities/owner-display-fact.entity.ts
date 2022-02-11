import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { UnitFact } from './unit-fact.entity';

import { NumericColumnTransformer } from '@us-epa-camd/easey-common/transforms';

@Entity({ name: 'camddmw.owner_display_fact' })
export class OwnerDisplayFact extends BaseEntity {
  @PrimaryColumn({
    name: 'unit_id',
    transformer: new NumericColumnTransformer(),
  })
  id: number;

  @PrimaryColumn({
    name: 'op_year',
    transformer: new NumericColumnTransformer(),
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
