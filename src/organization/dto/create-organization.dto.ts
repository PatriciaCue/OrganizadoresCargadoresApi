import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    description:'The name of the organization',
    type:String
  })
  @IsString()
  @IsNotEmpty()
  name:string;
  //Razon Social /^[0-9]{8,8}[A-Za-z]$/g
  @ApiProperty({
    description:'The legal entity of the organization',
    type:String
  })
  @IsOptional()
  legalEntity?:string; //optional
}
