import { Schema, model, Types } from 'mongoose'
import { EUserStatus } from '~/constant/enum'

export interface IUser {
  _id: Types.ObjectId
  fullName: string
  phone?: string
  address?: string
  email: string
  password: string
  tokenCode?: string
  roleId: Types.ObjectId
  status: EUserStatus
  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, index: true },
    address: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true
    },
    password: { type: String, required: true },

    tokenCode: { type: String, trim: true },

    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true, index: true },
    status: {
      type: String,
      enum: Object.values(EUserStatus),
      default: EUserStatus.ACTIVE,
      index: true
    },
    createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true
  }
)
export const UserModel = model<IUser>('User', UserSchema)
