import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument} from 'mongoose'


export type UrlDocument = HydratedDocument<Url>
@Schema()
export class Url {
    @Prop()
    orginalUrl : string;

    @Prop()
    shortCode : string;

    @Prop()
    shortUrl : string

    @Prop()
    userId : string

}

export const UserSchema = SchemaFactory.createForClass(Url)