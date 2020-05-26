import { ApiProperty } from "@nestjs/swagger";

export class ConteudoModel {

    @ApiProperty() id: number;
    @ApiProperty() name: string;
    @ApiProperty() duration: number;
    @ApiProperty() provider: string;
    @ApiProperty() mediaType: string;
    @ApiProperty() providerId: string;
    @ApiProperty() expiresAt: Date;
    @ApiProperty() watched = false;

    @ApiProperty() public get expired(): boolean {
        return this.expiresAt <= new Date();
    }
}
