import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { customer_lang } from "src/shared/enums";

@Schema({timestamps : true})
export class Customer {

   @Prop({required : true}) 
   fullName!:string

   @Prop({required : true, unique : true}) 
   phone!:string

   @Prop({required : true, unique :true, uppercase : true}) 
   promoCode!:string

   @Prop({required : false, default :0})
   referralCount? : number

   @Prop({required:false, default : customer_lang.UZ}) 
   language? : customer_lang

   @Prop({required : false, unique : true, parse:true}) 
   telegramChatId? : number
}
