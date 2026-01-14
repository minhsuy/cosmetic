import { Schema, model, Types } from 'mongoose'

export interface ICate {
  _id: Types.ObjectId
  name: string
  parentId?: Types.ObjectId | null
  isActive: boolean

  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean

  createdAt: Date
  updatedAt: Date
}

const CateSchema = new Schema<ICate>(
  {
    name: { type: String, required: true, trim: true, index: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Cate', default: null, index: true },
    isActive: { type: Boolean, default: true, index: true },

    createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true
  }
)

export const CategoryModel = model<ICate>('Cate', CateSchema)
