import mongoose from 'mongoose'
import ENV from '~/env'
import { PermissionModel } from '~/models/permission.model'
import { HttpMethod, ModuleName } from '~/constant/const'

type SeedPermission = {
  name: string
  module: ModuleName
  method: HttpMethod
  path: string
  description?: string
}

const PERMISSIONS: SeedPermission[] = [
  // ================= AUTH =================
  { name: 'Auth - Register', module: 'AUTH', method: 'POST', path: '/auth/register' },
  { name: 'Auth - Login', module: 'AUTH', method: 'POST', path: '/auth/login' },
  { name: 'Auth - Refresh', module: 'AUTH', method: 'POST', path: '/auth/refresh' },
  { name: 'Auth - Logout', module: 'AUTH', method: 'POST', path: '/auth/logout' },
  { name: 'Auth - Forgot Password', module: 'AUTH', method: 'POST', path: '/auth/forgot-password' },

  // ================= BOOKING =================
  { name: 'Booking - List', module: 'BOOKING', method: 'GET', path: '/bookings' },
  { name: 'Booking - Detail', module: 'BOOKING', method: 'GET', path: '/bookings/:id' },
  { name: 'Booking - Create', module: 'BOOKING', method: 'POST', path: '/bookings' },
  { name: 'Booking - Update', module: 'BOOKING', method: 'PATCH', path: '/bookings/:id' },
  { name: 'Booking - Cancel', module: 'BOOKING', method: 'PATCH', path: '/bookings/:id/cancel' },
  { name: 'Booking - Confirm', module: 'BOOKING', method: 'PATCH', path: '/bookings/:id/confirm' },
  { name: 'Booking - Delete', module: 'BOOKING', method: 'DELETE', path: '/bookings/:id' },

  { name: 'Booking - My bookings', module: 'BOOKING', method: 'GET', path: '/bookings/me' },

  // ================= CATEGORY =================
  { name: 'Category - List', module: 'CATEGORY', method: 'GET', path: '/categories' },
  { name: 'Category - Detail', module: 'CATEGORY', method: 'GET', path: '/categories/:id' },
  { name: 'Category - Create', module: 'CATEGORY', method: 'POST', path: '/categories' },
  { name: 'Category - Update', module: 'CATEGORY', method: 'PATCH', path: '/categories/:id' },
  { name: 'Category - Delete', module: 'CATEGORY', method: 'DELETE', path: '/categories/:id' },

  // ================= SERVICE =================
  { name: 'Service - List', module: 'SERVICE', method: 'GET', path: '/services' },
  { name: 'Service - Detail', module: 'SERVICE', method: 'GET', path: '/services/:id' },
  { name: 'Service - Create', module: 'SERVICE', method: 'POST', path: '/services' },
  { name: 'Service - Update', module: 'SERVICE', method: 'PATCH', path: '/services/:id' },
  { name: 'Service - Delete', module: 'SERVICE', method: 'DELETE', path: '/services/:id' },

  { name: 'Service - By category', module: 'SERVICE', method: 'GET', path: '/categories/:id/services' }
]

export async function seedPermissions() {
  const ops = PERMISSIONS.map((p) => ({
    updateOne: {
      filter: { method: p.method, path: p.path },
      update: {
        $set: {
          name: p.name,
          module: p.module,
          description: p.description ?? '',
          isDeleted: false
        }
      },
      upsert: true
    }
  }))

  const result = await PermissionModel.bulkWrite(ops)
  console.log('[seed] permissions done:', {
    upserted: result.upsertedCount,
    modified: result.modifiedCount,
    matched: result.matchedCount
  })
}

if (require.main === module) {
  ;(async () => {
    try {
      if (!ENV.DB_URL) throw new Error('Missing env: DB_URL')
      await mongoose.connect(ENV.DB_URL)
      await seedPermissions()
      await mongoose.disconnect()
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}
