// src/seeds/seedRolePermissions.ts
import mongoose from 'mongoose'
import ENV from '~/env'
import { RoleModel } from '~/models/role.model'
import { PermissionModel } from '~/models/permission.model'
import { EUserRole } from '~/constant/enum'
import { RolePermissionModel } from '~/models/role-permission'

const allowAll = async (roleId: any) => {
  const perms = await PermissionModel.find({ isDeleted: false }).select('_id')
  const ops = perms.map((p) => ({
    updateOne: {
      filter: { roleId, permissionId: p._id },
      update: { $setOnInsert: { roleId, permissionId: p._id } },
      upsert: true
    }
  }))
  if (ops.length) await RolePermissionModel.bulkWrite(ops)
}

const allowByPaths = async (roleId: any, paths: string[]) => {
  const perms = await PermissionModel.find({ isDeleted: false, path: { $in: paths } }).select('_id')
  const ops = perms.map((p) => ({
    updateOne: {
      filter: { roleId, permissionId: p._id },
      update: { $setOnInsert: { roleId, permissionId: p._id } },
      upsert: true
    }
  }))
  if (ops.length) await RolePermissionModel.bulkWrite(ops)
}

export async function seedRolePermissions() {
  const roles = await RoleModel.find({ isDeleted: false, isActive: true })

  const admin = roles.find((r) => r.name === EUserRole.ADMIN)
  const manager = roles.find((r) => r.name === EUserRole.MANAGER)
  const staff = roles.find((r) => r.name === EUserRole.STAFF)
  const customer = roles.find((r) => r.name === EUserRole.CUSTOMER)

  if (!admin || !manager || !staff || !customer) {
    throw new Error('Missing roles. Run seed roles first.')
  }

  // ADMIN: all
  await allowAll(admin._id)

  // MANAGER: manage booking/service/category (full)
  await allowByPaths(manager._id, [
    '/bookings',
    '/bookings/:id',
    '/bookings/:id/cancel',
    '/bookings/:id/confirm',
    '/services',
    '/services/:id',
    '/categories',
    '/categories/:id',
    '/categories/:id/services'
  ])

  // STAFF: view booking + confirm/cancel, view services/categories
  await allowByPaths(staff._id, [
    '/bookings',
    '/bookings/:id',
    '/bookings/:id/cancel',
    '/bookings/:id/confirm',
    '/services',
    '/services/:id',
    '/categories',
    '/categories/:id',
    '/categories/:id/services'
  ])

  // CUSTOMER: auth + view services/categories + create booking + my bookings
  await allowByPaths(customer._id, [
    '/auth/register',
    '/auth/login',
    '/auth/refresh',
    '/auth/logout',
    '/services',
    '/services/:id',
    '/categories',
    '/categories/:id',
    '/categories/:id/services',
    '/bookings',
    '/bookings/me',
    '/bookings/:id'
  ])

  console.log('[seed] role-permissions done')
}

if (require.main === module) {
  ;(async () => {
    try {
      if (!ENV.DB_URL) throw new Error('Missing env: DB_URL')
      await mongoose.connect(ENV.DB_URL)
      await seedRolePermissions()
      await mongoose.disconnect()
      process.exit(0)
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })()
}
