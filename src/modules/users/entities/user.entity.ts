import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { user_role } from "src/shared/enums";

@Schema({timestamps : true})
export class User {

    @Prop({required : true})
    name! : string

    @Prop({required : true, unique : true})
    email! : string

    @Prop({enum : user_role, default : user_role.ADMIN})
    role!: user_role

    @Prop({default : ['packages','bbokings']})
    permissions! : string[]
    
    @Prop({required : true})
    password!:string
}

export const UserSchema = SchemaFactory.createForClass(User)