import { Controller, Get, Param, NotFoundException, Post, Body, BadRequestException, Put, Delete } from '@nestjs/common';
import { StateService } from './state/state.service';
import { ConteudoCreateDto, ConteudoFactory, ConteudoUpdateDto } from './conteudo.dto';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { ConteudoModel } from './conteudo.model';

@ApiTags('conteudos')
@Controller('conteudos')
export class ConteudosController {
    constructor(private readonly conteudoState: StateService) { }

    @Get()
    @ApiOkResponse({ type: [ConteudoModel] })
    listConteudo(): ConteudoModel[] {
        return this.conteudoState.list();
    }

    @Get(':id')
    @ApiOkResponse({ type: ConteudoModel })
    @ApiNotFoundResponse()
    getConteudo(@Param('id') id: number): ConteudoModel {
        const result = this.conteudoState.get(id);
        if (result == null) {
            throw new NotFoundException();
        }
        return result;
    }

    @Post()
    @ApiCreatedResponse({ type: ConteudoModel })
    @ApiBadRequestResponse()
    createConteudo(@Body() newConteudo: ConteudoCreateDto): ConteudoModel {
        const model = ConteudoFactory.buildModelFromCreate(newConteudo);
        try {
            this.conteudoState.insert(model);
        } catch (error) {
            throw new BadRequestException(error);
        }
        return model;
    }

    @Put(':id')
    @ApiOkResponse({ type: ConteudoModel })
    @ApiNotFoundResponse()
    updateConteudo(@Param('id') id: number, @Body() updateConteudo: ConteudoUpdateDto) {
        const result = this.conteudoState.get(id);
        if (result == null) {
            throw new NotFoundException();
        }

        ConteudoFactory.applyUpdateToModel(result, updateConteudo);

        return result;
    }


    @Delete(':id')
    @ApiNotFoundResponse()
    @ApiNoContentResponse()
    deleteConteudo(@Param('id') id: number) {
        const result = this.conteudoState.get(id);
        if (result == null) {
            throw new NotFoundException();
        }

        this.conteudoState.delete(result);

        return null;
    }
}
