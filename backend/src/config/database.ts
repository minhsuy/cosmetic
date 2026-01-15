import mongoose from 'mongoose'
import ENV from '~/env'

class DatabaseService {
  private readonly uri: string
  constructor() {
    this.uri = ENV.DB_URL as string
  }
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri)
      console.log('Database connected')
    } catch (error) {
      console.error('Database connection failed', error)
      process.exit(1)
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService
