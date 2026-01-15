export const HTTP_METHOD = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
export type HttpMethod = (typeof HTTP_METHOD)[number]

// module name
export const MODULE_NAME = ['PRODUCT', 'SERVICE', 'CATEGORY', 'BOOKING', 'USER', 'ROLE', 'AUTH'] as const
export type ModuleName = (typeof MODULE_NAME)[number]

// service status
export const SERVICE_STATUS = ['ACTIVE', 'INACTIVE'] as const
export type ServiceStatus = (typeof SERVICE_STATUS)[number]

// booking  status
export const BOOKING_STATUS = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'] as const
export type BookingStatus = (typeof BOOKING_STATUS)[number]
