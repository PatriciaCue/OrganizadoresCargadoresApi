import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {

  constructor(@InjectRepository(Organization) private organizationsRepository: Repository<Organization> ){}

  //TODO: añadir try and catch por si hay problemas con la BD, conexion...
  create(newOrganizationDto: CreateOrganizationDto) : Promise<Organization> {
      const newOrganization = new Organization();
      newOrganization.name=newOrganizationDto.name;
      newOrganization.legalEntity=newOrganizationDto.legalEntity;
      newOrganization.chargePoints=[];
      return this.organizationsRepository.save(newOrganization);  
  }

  async findAll() : Promise<Organization[]> {
    
    try {
      const organizations = await this.organizationsRepository.find({relations:['chargePoints']}); 
      return organizations;  
    
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async findOne(organizationId: string) : Promise<Organization> {
    try {
      const organization = await this.organizationsRepository.findOne({relations:['chargePoints'], where:{id:organizationId}});
      if(!organization) throw new NotFoundException(`Organization with ${organizationId} not found`); 
      return organization;
    
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
    
  }
  //TODO: Optional name
  async update(organizationId: string, updateOrganizationDto: UpdateOrganizationDto) : Promise<Organization> {
    
    const { name, legalEntity } = updateOrganizationDto;
    const toUpdatedOrganization = await this.findOne(organizationId);
    console.log(toUpdatedOrganization,'toUpdatedOrganization');
    //No puedo dejar el nombre vacio cuando modifico???¿¿Como lo hago opcional??
    if(name) toUpdatedOrganization.name=updateOrganizationDto.name;
    if(legalEntity) toUpdatedOrganization.legalEntity=updateOrganizationDto.legalEntity;
    //this.organizationsRepository.update
    return this.organizationsRepository.save(toUpdatedOrganization);
  }

  async remove(organizationId: string) :Promise<any> {
    const deleteOrganization = await this.organizationsRepository.delete({id: organizationId});
    if(!deleteOrganization.affected) throw new NotFoundException(`Organization with ${organizationId} not found`);
    return `Organization with #${organizationId} removed`;
  }
}
