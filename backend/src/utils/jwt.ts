import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'
import { TokenType } from '~/constant/enum'
import { SignTokenArgs } from '~/type'

export interface CustomJwtPayload extends JwtPayload {
  userId: string
  tokenType: TokenType
  role?: string
}

export const signTokenAsync = ({ expiresIn, userId, type, role, secret }: SignTokenArgs): Promise<string> => {
  if (!secret) throw new Error('Missing secret')

  const payload: CustomJwtPayload = {
    userId,
    role,
    tokenType: type
  }

  const options: SignOptions = { expiresIn } as SignOptions

  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err)
      if (!token) return reject(new Error('Token generation failed'))
      resolve(token)
    })
  })
}
export const verifyToken = ({ token, secret }: { token: string; secret: string }) => {
  if (!secret) throw new Error('Missing secret')
  return new Promise<CustomJwtPayload>((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      if (!decoded) return reject(new Error('Token verification failed'))
      resolve(decoded as CustomJwtPayload)
    })
  })
}
