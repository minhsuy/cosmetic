import dotenv from 'dotenv'
dotenv.config()

const ENV: Record<string, string | undefined> = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN
}

export default ENV
