import { IsNotEmpty } from "class-validator";

export class CreateCurrentAccountDto {
  
  @IsNotEmpty()
  public agency: string
}
