import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto{
    @IsNotEmpty({message : 'password é obrigatório'})
    @ApiProperty({ description: 'campo obrigatório para a senha do usuario', type: () => String })
    public password : string
}