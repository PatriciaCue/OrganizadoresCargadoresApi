import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChargePointService } from './charge-point.service';
import { CreateChargePointDto } from './dto/create-charge-point.dto';
import { UpdateChargePointDto } from './dto/update-charge-point.dto';
import { ChargePoint } from './entities/charge-point.entity';

@Controller('chargePoint')
export class ChargePointController {
  constructor(private readonly chargePointService: ChargePointService) {}

  @Post()
  create(@Body() createChargePointDto: CreateChargePointDto) {
    return this.chargePointService.create(createChargePointDto);
  }

  @Get()
  findAll() :Promise<ChargePoint[]>{
    return this.chargePointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<ChargePoint> {
    return this.chargePointService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargePointDto: UpdateChargePointDto) {
    return this.chargePointService.update(id, updateChargePointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargePointService.remove(id);
  }
}
