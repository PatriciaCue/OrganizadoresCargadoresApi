import { ChargePoint } from "src/charge-point/entities/charge-point.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Organization {
  @ApiProperty({
    description:'uuid of the organization',
    type:String
  })
  @PrimaryGeneratedColumn('uuid')
  id:string;
  
  @ApiProperty({
    description:'The name of the organization',
    type:String
  })
  @Column()
  name:string;
  
  @ApiProperty({
    description:'The legal entity of the organization',
    type:String
  })
  @Column()
  legalEntity?:string;
  
  @ApiProperty({
    description:'Charge points of the organization',
    type:()=>ChargePoint
  })
  @OneToMany(type=> ChargePoint, chargePoint => chargePoint.cpo)
  chargePoints:ChargePoint[];
}
