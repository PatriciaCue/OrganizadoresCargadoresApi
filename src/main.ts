import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted:true,
  }));
  
  //Swagger
  const config = new DocumentBuilder()
  .setTitle('Organization - ChargePoint API')
  .setDescription('Organization - ChargePoint API description: The app develops the CRUD of the Organizations and the chargepoints. A charge point must be relationated with an Organization. ')
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('ChargePoint')
  .addTag('Organization')
  .addTag('User')
  .addBearerAuth( 
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    'access-token', 
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
