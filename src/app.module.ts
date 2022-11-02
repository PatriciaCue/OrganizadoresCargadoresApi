import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { ChargePointModule } from './charge-point/charge-point.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './utilities/user/user.module';

@Module({
  imports: [OrganizationModule, 
            ChargePointModule,
            UserModule,
            TypeOrmModule.forRoot(
              {
                "type": "mysql",
                "host": "localhost",
                "port": 3306,
                "username": "root",
                "password": "password",
                "database": "apidb",
                "entities": ["dist/**/*.entity.js"], 
                "synchronize": true 
              }
            ),
          
          ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
