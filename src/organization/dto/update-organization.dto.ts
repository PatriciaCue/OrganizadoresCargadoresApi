import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization.dto';
import { IsOptional } from "class-validator";

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @IsOptional()
  name:string;
  //Razon Social /^[0-9]{8,8}[A-Za-z]$/g
  @IsOptional()
  legalEntity?:string; //optional
}
