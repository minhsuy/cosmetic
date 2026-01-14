import { Schema, model, Types } from 'mongoose'
import { BOOKING_STATUS, BookingStatus } from '~/constant/const'

export interface IBooking {
  _id: Types.ObjectId

  staffId: Types.ObjectId

  userId?: Types.ObjectId | null
  guestInfoId?: Types.ObjectId | null

  serviceId: Types.ObjectId

  startTime: Date
  endTime: Date

  status: BookingStatus

  note?: string

  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean

  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>(
  {
    staffId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    guestInfoId: { type: Schema.Types.ObjectId, ref: 'GuestInfo', default: null, index: true },

    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true, index: true },

    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true, index: true },

    status: { type: String, enum: BOOKING_STATUS, default: 'PENDING', index: true },

    note: { type: String, trim: true, default: '' },

    createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true
  }
)

export const BookingModel = model<IBooking>('Booking', BookingSchema)
