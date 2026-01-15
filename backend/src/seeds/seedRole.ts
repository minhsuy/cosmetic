// src/seeds/seedRoles.ts
import mongoose from 'mongoose'
import ENV from '~/env'
import { RoleModel } from '~/models/role.model'
import { EUserRole } from '~/constant/enum'

export async function seedRoles() {
  const roles = Object.values(EUserRole).map((name) => ({
    name,
    isActive: true,
    description: `${name} role`,
    isDeleted: false
  }))

  await Promise.all(roles.map((r) => RoleModel.updateOne({ name: r.name }, { $setOnInsert: r }, { upsert: true })))

  console.log('[seed] roles done')
}

if (require.main === module) {
  ;(async () => {
    try {
      if (!ENV.DB_URL) throw new Error('Missing env: DB_URL')
      await mongoose.connect(ENV.DB_URL)
      await seedRoles()
      await mongoose.disconnect()
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}
