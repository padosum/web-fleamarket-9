import { config } from 'dotenv';
import { join } from 'path';

const envPath = join(process.cwd(), '.env.development');
config({ path: envPath });

export const BASE_URL = process.env.REACT_APP_DATA_API;
