import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const openApiOptions = new DocumentBuilder()
    .setTitle('Teste Backend')
    .setDescription('API para o teste de backend da Skore.IO')
    .setVersion('0.1')
    .build();
  const openApiDocs = SwaggerModule.createDocument(app, openApiOptions);
  SwaggerModule.setup('api', app, openApiDocs);

  await app.listen(3000);
}

bootstrap();
