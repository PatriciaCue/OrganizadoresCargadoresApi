import { Module } from '@nestjs/common';
import { ChargePointService } from './charge-point.service';
import { ChargePointController } from './charge-point.controller';

@Module({
  controllers: [ChargePointController],
  providers: [ChargePointService]
})
export class ChargePointModule {}
