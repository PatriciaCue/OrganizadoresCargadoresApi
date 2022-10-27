import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrganizationService {

  private organizations: Organization[]=[];

  create(createOrganizationDto: CreateOrganizationDto) {
    const newOrganization = new Organization();
    
    newOrganization.id=uuidv4(),
    newOrganization.name=createOrganizationDto.name,
    newOrganization.legalEntity=createOrganizationDto.legalEntity,
    newOrganization.chargePoint=[]
    
    //Añadimos la organizacion al array que hemos creado
    //Despues tendriamos que añadirlo a nuestra BD
    this.organizations.push(newOrganization);
    console.log(newOrganization,'newOrganization');
    console.log(createOrganizationDto,'createOrganizationDto');
    return 'This action adds a new organization';
  }

  findAll() {
    //Quitar el id, cuando muestra el resultado??
    return this.organizations;
    //return `This action returns all organization`;
  }

  findOne(id: string) {
    if(this.organizations.length == 0)throw new NotFoundException(`Organizations empty`) 
    const organization = this.organizations.filter((org)=> org.id === id );
    if(organization.length == 0) throw new NotFoundException(`Organization with ${id} not found`)
    return organization;
    //return `This action returns a #${id} organization`;
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    
    const { name, legalEntity } = updateOrganizationDto;
    const updatedOrganization = this.findOne(id)[0];
    
    if(name) updatedOrganization.name=updateOrganizationDto.name;
    if(legalEntity) updatedOrganization.legalEntity=updateOrganizationDto.legalEntity;

    this.organizations = this.organizations.map( organizationsDB => {
      if(organizationsDB.id === id) return updatedOrganization;
      return organizationsDB;
    })
    
    return updatedOrganization;
    //return `This action updates a #${id} organization`;
  }

  remove(id: string) {
    this.findOne(id);
    this.organizations = this.organizations.filter(organization => organization.id !== id);
    return `This action removes a #${id} organization`;
  }
}
