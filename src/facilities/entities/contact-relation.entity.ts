import { BaseEntity, Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'CONTACT_RELATION' })
export class ContactRelation extends BaseEntity {
  @PrimaryColumn()
  CNT_REL_ID: number;

  @Column()
  CNT_ID: number;

  @Column()
  PPL_ID: number;

  @Column({ type: 'varchar', length: 25 })
  RELATION_TYPE_CD: string;
}
