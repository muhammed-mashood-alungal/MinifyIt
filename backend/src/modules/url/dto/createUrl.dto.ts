import { IsString, IsUrl } from "class-validator";

export class CreateUrlDto {
    @IsUrl()
    originalUrl: string

    @IsString()
    userId : string
}