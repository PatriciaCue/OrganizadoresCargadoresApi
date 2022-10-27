import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name:string;
  //Razon Social /^[0-9]{8,8}[A-Za-z]$/g
  @IsOptional()
  legalEntity?:string; //optional
}
