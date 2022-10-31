import { IsNotEmpty, Matches } from "class-validator";
import { Organization } from "src/organization/entities/organization.entity";

const regex= new RegExp(/^([A-Z]){4}-([0-9]){4}$/gi);
export class CreateChargePointDto {
  ////EVCC_01234
  //[A-Z]{4}_[0-9]{4}$
  ///([A-Z]){4}-([0-9]){4}/
  @Matches(regex , {message: 'The pattern has to be 4 letters - 4 numbers: sample ACBD-1234'})
  //@Matches(regex)
  //@Matches(regex,{each:true})
  @IsNotEmpty()
  identity:string;
  @IsNotEmpty()
  //@Validate(OrganizationExists)
  cpo:Organization;
}
