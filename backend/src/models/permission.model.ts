import { Schema, model, Types } from 'mongoose'
import { HTTP_METHOD, HttpMethod, MODULE_NAME, ModuleName } from '~/constant/const'

export interface IPermission {
  _id: Types.ObjectId
  name: string
  path: string
  method: HttpMethod
  module: ModuleName

  description?: string

  createdById?: Types.ObjectId
  updatedById?: Types.ObjectId
  deletedById?: Types.ObjectId
  isDeleted: boolean
  createdAt: Date
}

const PermissionSchema = new Schema<IPermission>(
  {
    name: { type: String, required: true, trim: true },
    path: { type: String, required: true, trim: true },
    method: { type: String, required: true, enum: HTTP_METHOD, index: true },
    module: { type: String, required: true, enum: MODULE_NAME, index: true },

    description: { type: String, trim: true, default: '' },

    createdById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    updatedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    deletedById: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    isDeleted: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true
  }
)

export const PermissionModel = model<IPermission>('Permission', PermissionSchema)
