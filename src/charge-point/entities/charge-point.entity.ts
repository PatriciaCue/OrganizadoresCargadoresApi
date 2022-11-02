import { Organization } from "src/organization/entities/organization.entity"
import { Entity , PrimaryGeneratedColumn ,Column, ManyToOne, JoinColumn} from "typeorm"
import { ApiProperty } from '@nestjs/swagger';

//Information BD Register
@Entity()
export class ChargePoint {
  @ApiProperty({
    description:'uuid of the charge point',
    type:String
  })
  @PrimaryGeneratedColumn('uuid')
  id: string//uuiid;


  @ApiProperty({
    description:'Identity of the charge point',
    type:String,
    default:'EVCC-01234'
  })
  @Column()
  identity:string

  @ApiProperty({
    description:'Organization with charge point is relationated',
    type:()=>Organization
  })
  @ManyToOne(() => Organization, (organization) => organization.chargePoints)
  @JoinColumn({name: 'OrganizationId'})
  cpo:Organization
}

