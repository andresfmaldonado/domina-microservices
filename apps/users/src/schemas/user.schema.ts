import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop() userId: number;
    @Prop() name: string;
    @Prop() age: number;
    @Prop() password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);