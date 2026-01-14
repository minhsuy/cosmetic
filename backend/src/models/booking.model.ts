// import { Schema, model, Types } from 'mongoose'
// import { BOOKING_STATUS, BookingStatus } from '~/constant/const'

// export interface IBooking {
//   _id: Types.ObjectId

//   staffId: Types.ObjectId
//   userId?: Types.ObjectId | null
//   guestInfoId?: Types.ObjectId | null

//   serviceId: Types.ObjectId
//   scheduleId?: Types.ObjectId | null

//   note?: string

//   startTime: Date
//   endTime: Date

//   status: BookingStatus

//   createdById?: Types.ObjectId
//   updatedById?: Types.ObjectId
//   deletedById?: Types.ObjectId
//   isDeleted: boolean

//   createdAt: Date
//   updatedAt: Date
// }

// const BookingSchema = new Schema<IBooking>(
//   {
//     staffId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

//     userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
//     guestInfoId: { type: Schema.Types.ObjectId, ref: 'GuestInfo', default: null, index: true },

//     serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true, index: true },

//     scheduleId: { type: Schema.Types.ObjectId, ref: 'Schedule', default: null },

//     note: { type: String, trim: true, default: '' },

//     startTime: { type: Date, required: true, index: true },
//     endTime: { type: Date, required: true, index: true },

//     status: { type: String, enum: BOOKING_STATUS, default: 'PENDING', index: true },

//     createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
//     updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
//     deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
//     isDeleted: { type: Boolean, default: false, index: true }
//   },
//   {
//     collection: 'bookings',
//     versionKey: false,
//     timestamps: true
//   }
// )

// /**
//  * Rule 1: Booking phải thuộc về đúng 1 trong 2: userId hoặc guestInfoId
//  * (khách có account) XOR (khách vãng lai)
//  */
// BookingSchema.pre('validate', function (next) {
//   const hasUser = !!this.get('userId')
//   const hasGuest = !!this.get('guestInfoId')
//   if (hasUser === hasGuest) {
//     return next(new Error('Booking must have exactly one of userId or guestInfoId.'))
//   }
//   next()
// })

// /**
//  * Rule 2: endTime > startTime
//  */
// BookingSchema.pre('validate', function (next) {
//   const start = this.get('startTime')
//   const end = this.get('endTime')
//   if (start && end && new Date(end).getTime() <= new Date(start).getTime()) {
//     return next(new Error('endTime must be greater than startTime.'))
//   }
//   next()
// })

// // Index hay dùng để query theo staff và khung giờ
// BookingSchema.index({ staffId: 1, startTime: 1, endTime: 1 })
// BookingSchema.index({ serviceId: 1, startTime: 1 })
// BookingSchema.index({ status: 1, isDeleted: 1 })

// // Gợi ý check trùng lịch (làm ở service layer khi create/update):
// // BookingModel.findOne({
// //   staffId,
// //   isDeleted: false,
// //   status: { $in: ["PENDING", "CONFIRMED"] },
// //   startTime: { $lt: endTime },
// //   endTime: { $gt: startTime },
// // });

// export const BookingModel = model<IBooking>('Booking', BookingSchema)
