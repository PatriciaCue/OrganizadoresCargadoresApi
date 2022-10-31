import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChargePointDto } from './dto/create-charge-point.dto';
import { UpdateChargePointDto } from './dto/update-charge-point.dto';
import { ChargePoint } from './entities/charge-point.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Organization } from 'src/organization/entities/organization.entity';

@Injectable()
export class ChargePointService {

  constructor(@InjectRepository(ChargePoint) private chargePointsRepository: Repository<ChargePoint>,
              @InjectRepository(Organization) private organizationsRepository: Repository<Organization> ) {}

  async create(createChargePointDto: CreateChargePointDto) {
    
    const cpoId=createChargePointDto.cpo.id;
    const organization = await this.organizationsRepository.findOne({where:{id:cpoId}});
    if(!organization) throw new NotFoundException(`Organization with ${cpoId} not found`);

    const newChargePoint = new ChargePoint();
    newChargePoint.cpo=organization;
    return this.chargePointsRepository.save(newChargePoint);
  }

  async findAll():Promise<ChargePoint[]> {
    
    try {
      const chargePoints = await this.chargePointsRepository.find({relations:['cpo']});
      return chargePoints;
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async findOne(chargePointId: string):Promise<ChargePoint> {
    try {
      //const chargePoint = await this.chargePointsRepository.findOne({where:{id:chargePointId}});
      const chargePoint = await this.chargePointsRepository.findOne({relations:['cpo'],where:{id:chargePointId}});
      if(!chargePoint) throw new NotFoundException(`Charge point with ${chargePointId} not found`); 
      return chargePoint;
    
    } catch (error) {
      throw new NotFoundException(`${error}`);
    }
  }

  async update(chargePointId: string, updateChargePointDto: UpdateChargePointDto) {
    const { cpo } = updateChargePointDto;
    const toUpdatedChargePoint = await this.findOne(chargePointId);
    console.log(toUpdatedChargePoint,'toUpdatedChargePoint');
    if(cpo) toUpdatedChargePoint.cpo=updateChargePointDto.cpo;
    return this.chargePointsRepository.save(toUpdatedChargePoint);
  }

  async remove(chargePointId: string) {
    const deleteChargePoint = await this.chargePointsRepository.delete({id:chargePointId});
    if(!deleteChargePoint.affected) throw new NotFoundException(`chargePoint with ${chargePointId} not found`);
    return `This action removes a #${chargePointId} chargePoint`;
  }
}
