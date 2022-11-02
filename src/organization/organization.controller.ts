import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { AuthGuard } from '@nestjs/passport';

//Swagger//
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Organization')
@Controller('organization')
@UseGuards(AuthGuard('jwt'))
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiOperation({summary:'Create organization'})
  @ApiResponse({status: 200, description:'Return the organization created', type:Organization})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @Post()
  create(@Body() createOrganizationDto: CreateOrganizationDto):Promise<Organization> {
    return this.organizationService.create(createOrganizationDto);
  }

  @ApiOperation({summary:'Get all organizations'})
  @ApiResponse({status: 200, description:'Return an array of the organizations', type:Organization})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found organization'})
  @Get()
  findAll() : Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @ApiOperation({summary:'Get a organization'})
  @ApiResponse({status: 200, description:'Return an organization', type:Organization})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found organization'})
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @ApiOperation({summary:'Update a organization'})
  @ApiResponse({status: 200, description:'Update a organization', type:Organization})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found organization'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) : Promise<Organization> {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @ApiOperation({summary:'Delete a organization'})
  @ApiResponse({status: 200, description:'Delete a organization', type:Organization})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found organization'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}
