// Force pg to be bundled — Sequelize loads it dynamically and Vercel's tree-shaker misses it
import 'pg';
import { createApp } from '../src/app';
import { initializeDatabase } from '../src/db/sequelize';

const app = createApp();

let dbInitialized = false;

export default async function handler(req: any, res: any) {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
  return app(req, res);
}
