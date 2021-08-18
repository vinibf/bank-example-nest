import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { Guid } from "guid-typescript";

export class CreateOperationDto{

    //@IsNotEmpty({message: "originId é obrigatório"})
    //@IsUUID(null ,{message: "originId deve ser um Guid"})
    //@ApiProperty({ description: 'Id da conta corrente origem', type: () => String })
    public originId : Guid

    @IsNotEmpty({message: "destintyId é obrigatório"})
    @IsUUID(null ,{message: "destinyId deve ser um Guid"})
    @ApiProperty({ description: 'Id da conta corrente destino', type: () => String })
    public destinyId : Guid

    @IsNumber({}, {message : "value tem que ser numerico"})
    @ApiProperty({ description: 'valor da transferência', type: () => String })
    public value : number
}