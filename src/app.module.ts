import { Module } from '@nestjs/common';
import { ConteudosModule } from './conteudos/conteudos.module';

@Module({
  imports: [ConteudosModule]
})
export class AppModule { }
