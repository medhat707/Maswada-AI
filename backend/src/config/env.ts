import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  clerk: {
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY || '',
  },
  databaseUrl: process.env.DATABASE_URL || 'postgres://localhost:5432/maswada',
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    organization: process.env.OPENAI_ORGANIZATION_ID || '',
    model: process.env.OPENAI_MODEL || 'gpt-5-mini',
  },
};

// Validate required config
if (!config.clerk.secretKey && config.nodeEnv !== 'test') {
  console.warn('⚠️  CLERK_SECRET_KEY is not set. Authentication will fail.');
}
if (!config.clerk.publishableKey && config.nodeEnv !== 'test') {
  console.warn('⚠️  CLERK_PUBLISHABLE_KEY is not set.');
}
