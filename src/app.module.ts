import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConteudosModule } from './conteudos/conteudos.module';

@Module({
  imports: [ConteudosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
