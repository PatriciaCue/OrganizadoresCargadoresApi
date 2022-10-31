import { Organization } from "src/organization/entities/organization.entity"
import { Entity , PrimaryGeneratedColumn ,Column, ManyToOne, JoinColumn} from "typeorm"

//Information BD Register
@Entity()
export class ChargePoint {
  @PrimaryGeneratedColumn('uuid')
  id: string//uuiid;
  @Column()
  identity:string
  @ManyToOne(() => Organization, (organization) => organization.chargePoints)
  @JoinColumn({name: 'OrganizationId'})
  cpo:Organization
}

