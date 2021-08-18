import { ApiBasicAuth, ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

//@ApiBasicAuth()
export class UserDto {

  @IsNotEmpty({ message: 'username é obrigatório' })
  @ApiProperty({
    description: 'campo obrigatório para o nome do usuario',
    type: () => String,
  })
  public username: string

  @IsNotEmpty({ message: 'password é obrigatório' })
  @ApiProperty({
    description: 'campo obrigatório para a senha do usuario',
    type: () => String,
  })
  public password: string
}
