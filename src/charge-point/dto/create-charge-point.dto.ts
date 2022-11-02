import { IsNotEmpty, Matches } from "class-validator";
import { Organization } from "src/organization/entities/organization.entity";
import { ApiProperty } from '@nestjs/swagger';

const regex= new RegExp(/^([A-Z]){4}-([0-9]){4}$/gi);
export class CreateChargePointDto {
  @ApiProperty({
    description:'Identity of the charge point',
    type:String,
    default:'EVCC-01234'
  })
  ////EVCC-01234
  ///([A-Z]){4}-([0-9]){4}/
  @Matches(regex , {message: 'The pattern has to be 4 letters - 4 numbers: sample ACBD-1234'})
  @IsNotEmpty()
  identity:string;

  @ApiProperty({
    description:'Organization with charge point is relationated',
    type:[Organization]
  })
  @IsNotEmpty()
  //@Validate(OrganizationExists)
  cpo:Organization;
}
