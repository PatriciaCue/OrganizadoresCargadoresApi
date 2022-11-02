import { Module } from '@nestjs/common';
import { ChargePointService } from './charge-point.service';
import { ChargePointController } from './charge-point.controller';
import { ChargePoint } from './entities/charge-point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationService } from 'src/organization/organization.service';
import { Organization } from 'src/organization/entities/organization.entity';
import { AuthModule } from 'src/utilities/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([ChargePoint]),
           TypeOrmModule.forFeature([Organization]),
           AuthModule],
  controllers: [ChargePointController],
  providers: [ChargePointService]
})
export class ChargePointModule {}
