import { Prop, Schema } from "@nestjs/mongoose";
import { contact_type } from "src/shared/enums";

@Schema({timestamps : true})
export class Message {

    @Prop({required : true})
    name! : string
    
    @Prop({required : true})
    contact!: string

    @Prop({required : true})
    message! : string
// from backend
    @Prop({required : true, default : false})
    isRead! : boolean

    @Prop({required: false})
    contactType?: contact_type
}
