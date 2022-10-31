import { IsNotEmpty } from "class-validator";
import { Organization } from "src/organization/entities/organization.entity";

export class CreateChargePointDto {
  @IsNotEmpty()
  //@Validate(OrganizationExists)
  cpo:Organization;
}
