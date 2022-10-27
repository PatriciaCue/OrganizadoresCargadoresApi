import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { ChargePointModule } from './charge-point/charge-point.module';

@Module({
  imports: [OrganizationModule, ChargePointModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
