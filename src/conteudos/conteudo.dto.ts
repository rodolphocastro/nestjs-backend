import { ConteudoModel } from "./conteudo.model";
import { ApiProperty } from "@nestjs/swagger";

export class ConteudoCreateDto {
    @ApiProperty() id: number;
    @ApiProperty() name: string;
    @ApiProperty() duration: number;
    @ApiProperty() provider: string;
    @ApiProperty() mediaType: string;
    @ApiProperty() providerId: string;
    @ApiProperty() expiresAt: Date;
}

export class ConteudoUpdateDto {
    @ApiProperty() name: string;
    @ApiProperty() duration: number;
    @ApiProperty() provider: string;
    @ApiProperty() mediaType: string;
    @ApiProperty() providerId: string;
    @ApiProperty() expiresAt: Date;
}

export class ConteudoFactory {
    static buildModelFromCreate(dto: ConteudoCreateDto): ConteudoModel {
        const model = dto as ConteudoModel;
        return model;
    }

    static applyUpdateToModel(model: ConteudoModel, dto: ConteudoUpdateDto): void {
        model.name = dto.name;
        model.duration = dto.duration;
        model.provider = dto.provider;
        model.mediaType = dto.mediaType;
        model.providerId = dto.providerId;
        model.expiresAt = dto.expiresAt;
        model.watched = false;
    }
}
