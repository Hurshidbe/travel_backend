import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Package } from "src/modules/packages/entities/package.entity";
import { booking_statuses } from "src/shared/enums";

@Schema({timestamps : true})
export class Booking {
    @Prop({required : true,ref : Package.name, type : Types.ObjectId})
    packageId! : Types.ObjectId

    @Prop({required : true})
    packageTitle!:string

    @Prop({required : true})
    fullName! : string

    @Prop({required : true})
    phone! : string

    @Prop({required : true})
    peopleCount!:number

    @Prop({required : false})
    message? : string

    @Prop({required : false, default: booking_statuses.PENDING})
    status? : booking_statuses

    @Prop({required : true})
    unitPrice! : number

    @Prop({required : true})
    totalPrice! : number

    @Prop({required : false, trim : true, uppercase: true})
    promoCodeUsed? : string
}

export const BookingSchema = SchemaFactory.createForClass(Booking)