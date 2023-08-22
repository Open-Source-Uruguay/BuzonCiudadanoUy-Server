import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const envFilePath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env';
dotenv.config({ path: envFilePath });

const secretKey = fs.readFileSync(path.resolve(__dirname, '../../secrets/secret.key'), 'utf8');
const secretPub = fs.readFileSync(path.resolve(__dirname, '../../secrets/secret.pub'), 'utf8');
const refreshKey = fs.readFileSync(path.resolve(__dirname, '../../secrets/refresh.key'), 'utf8');
const refreshPub = fs.readFileSync(path.resolve(__dirname, '../../secrets/refresh.pub'), 'utf8');

export const config = () => ({
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  secretKey: secretKey,
  secretPub: secretPub,
  refreshKey: refreshKey,
  refreshPub: refreshPub
});