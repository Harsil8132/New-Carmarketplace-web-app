import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.js",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.VITE_DRIZZLE_DATABASE_URL,
  },
});
