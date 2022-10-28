import { Organization } from "src/organization/entities/organization.entity"
import { Entity , PrimaryGeneratedColumn ,Column, ManyToOne} from "typeorm"

//Information BD Register
@Entity()
export class ChargePoint {
  //EVCC_01234
  //^[A-Z]{4}_[0-9]{4}$
  @PrimaryGeneratedColumn('uuid')
  id: string//uuiid;
  @ManyToOne(() => Organization, (organization) => organization.chargePoints)
  cpo:Organization
}

