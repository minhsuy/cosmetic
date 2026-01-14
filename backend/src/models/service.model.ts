import { Schema, model, Types } from 'mongoose'
import { SERVICE_STATUS, ServiceStatus } from '~/constant/const'

export interface IService {
  _id: Types.ObjectId
  cateId: Types.ObjectId

  name: string
  basePrice: number
  virtualPrice?: number
  durationMinutes: number

  isActive: boolean
  status: ServiceStatus
  soldCount: number

  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean

  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<IService>(
  {
    cateId: { type: Schema.Types.ObjectId, ref: 'Cate', required: true, index: true },

    name: { type: String, required: true, trim: true, index: true },

    basePrice: { type: Number, required: true, min: 0 },
    virtualPrice: { type: Number, min: 0, default: null },

    durationMinutes: { type: Number, required: true, min: 1 },

    isActive: { type: Boolean, default: true, index: true },
    status: { type: String, enum: SERVICE_STATUS, default: 'ACTIVE', index: true },

    soldCount: { type: Number, default: 0, min: 0 },

    createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true
  }
)
export const ServiceModel = model<IService>('Service', ServiceSchema)
