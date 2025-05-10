import { IsString, IsUrl } from "class-validator";

export class CreateUrlDto {
    @IsString()
    originalUrl: string

    @IsString()
    userId : string
}