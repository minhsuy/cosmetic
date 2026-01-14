import { Schema, model, Types } from 'mongoose'
import { EUserRole } from '~/constant/enum'
export interface IRole {
  _id: Types.ObjectId
  name: string
  isActive: boolean
  description?: string
  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean
}
const RoleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
    enum: Object.values(EUserRole),
    index: true
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },

  isDeleted: { type: Boolean, default: false, index: true }
})

export const RoleModel = model<IRole>('Role', RoleSchema)
