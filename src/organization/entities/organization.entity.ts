import { ChargePoint } from "src/charge-point/entities/charge-point.entity";

export class Organization {
  id:string; //uuid
  name:string;
  legalEntity?:string; //optional
  chargePoint:ChargePoint[];
}
