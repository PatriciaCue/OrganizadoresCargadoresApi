import { type } from "os";
import { ChargePoint } from "src/charge-point/entities/charge-point.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id:string;
  @Column()
  name:string;
  @Column()
  legalEntity?:string;
  @OneToMany(type=> ChargePoint, chargePoint => chargePoint.cpo)
  chargePoints:ChargePoint[];
}
