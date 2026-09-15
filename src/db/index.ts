import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// In a real application, ensure POSTGRES_URL is set in your environment
// For this standalone demo without a live DB, we provide a dummy fallback
const connectionString = process.env.POSTGRES_URL || 'postgres://postgres:postgres@localhost:5432/ztech';

export const client = postgres(connectionString, { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
