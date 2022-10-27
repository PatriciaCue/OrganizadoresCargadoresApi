import { Organization } from "src/organization/entities/organization.entity"

//Information BD Register
export class ChargePoint {
  //EVCC_01234
  //^[A-Z]{4}_[0-9]{4}$
  id: string//uuiid;
  cpo:Organization
}

