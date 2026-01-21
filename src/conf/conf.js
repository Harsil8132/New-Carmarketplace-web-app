const PUBLISHABLE_KEY = String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
const DRIZZLE_DATABASE_URL = String(import.meta.env.VITE_DRIZZLE_DATABASE_URL)
const CLOUDINARY_CLOUD_NAME = String(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)
const CLOUDINARY_API_KEY = String(import.meta.env.VITE_CLOUDINARY_API_KEY)
const CLOUDINARY_API_SECRET = String(import.meta.env.VITE_CLOUDINARY_API_SECRET)
const SENDBIRD_APP_ID = String(import.meta.env.VITE_SENDBIRD_APP_ID)
const SENDBIRD_API_TOKEN = String(import.meta.env.VITE_SENDBIRD_API_TOKEN)

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

if (!DRIZZLE_DATABASE_URL) {
  throw new Error("Missing Publishable Key")
}


export const conf = {
  PUBLISHABLE_KEY,
  DRIZZLE_DATABASE_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  SENDBIRD_APP_ID,
  SENDBIRD_API_TOKEN
}
