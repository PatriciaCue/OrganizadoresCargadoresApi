import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChargePointService } from './charge-point.service';
import { CreateChargePointDto } from './dto/create-charge-point.dto';
import { UpdateChargePointDto } from './dto/update-charge-point.dto';
import { ChargePoint } from './entities/charge-point.entity';
import { AuthGuard } from '@nestjs/passport';

//Swagger//
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiBody
} from '@nestjs/swagger';

@ApiTags('ChargePoint')
@Controller('chargePoint')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
export class ChargePointController {
  constructor(private readonly chargePointService: ChargePointService) {}

  @Post()
  @ApiOperation({summary:'Create charge point'})
  @ApiOkResponse({status: 200, description:'Return the charge points created', type:ChargePoint})
  @ApiUnauthorizedResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found Organization'})
  create(@Body() createChargePointDto: CreateChargePointDto) {
    return this.chargePointService.create(createChargePointDto);
  }

  @ApiOperation({summary:'Get all charge point'})
  @ApiResponse({status: 200, description:'Return and array with all the charge points', type:ChargePoint})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @Get()
  findAll() :Promise<ChargePoint[]>{
    return this.chargePointService.findAll();
  }

  @ApiOperation({summary:'Get a charge point'})
  @ApiCreatedResponse({status: 200, description:'Return a charge points', type:ChargePoint})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found charge point'})
  @Get(':id')
  findOne(@Param('id') id: string):Promise<ChargePoint> {
    return this.chargePointService.findOne(id);
  }

  @ApiOperation({summary:'Update a charge point'})
  @ApiResponse({status: 200, description:'Update a charge points', type:ChargePoint})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found charge point'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargePointDto: UpdateChargePointDto) {
    return this.chargePointService.update(id, updateChargePointDto);
  }

  @ApiOperation({summary:'Delete a charge point'})
  @ApiResponse({status: 200, description:'Delete a charge points'})
  @ApiResponse({status: 401, description:'Unauthorized'})
  @ApiResponse({status: 404, description:'Not found charge point'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargePointService.remove(id);
  }
}
