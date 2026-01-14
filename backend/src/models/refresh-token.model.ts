import { Schema, model, Types } from 'mongoose'

export interface IRefreshToken {
  _id: Types.ObjectId
  userId: Types.ObjectId
  token: string
  expriesAt: Date
  revokedAt?: Date
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    token: {
      type: String,
      required: true,
      index: true
    },
    expriesAt: {
      type: Date,
      required: true,
      index: true
    },
    revokedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
)

RefreshTokenSchema.index({ token: 1 }, { unique: true })

// TTL : Time To Live
RefreshTokenSchema.index({ expriesAt: 1 }, { expireAfterSeconds: 0 })

RefreshTokenSchema.index({ userId: 1, createdAt: -1 })

export const RefreshTokenModel = model<IRefreshToken>('RefreshToken', RefreshTokenSchema)
