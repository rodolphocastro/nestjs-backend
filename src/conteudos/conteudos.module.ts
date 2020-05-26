import { Module } from '@nestjs/common';
import { StateService } from './state/state.service';
import { ConteudosController } from './conteudos.controller';

@Module({
  providers: [StateService],
  controllers: [ConteudosController]
})
export class ConteudosModule {}
