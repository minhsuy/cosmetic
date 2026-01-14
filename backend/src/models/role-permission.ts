import { Schema, model, Types } from 'mongoose'

export interface IRolePermission {
  _id: Types.ObjectId
  roleId: Types.ObjectId
  permissionId: Types.ObjectId
  createdAt: Date
}

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true, index: true },
    permissionId: { type: Schema.Types.ObjectId, ref: 'Permission', required: true, index: true }
  },
  {
    timestamps: true
  }
)

RolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true })

export const RolePermissionModel = model<IRolePermission>('RolePermission', RolePermissionSchema)
