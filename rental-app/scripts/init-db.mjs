import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const appRoot=fileURLToPath(new URL('../',import.meta.url));
export const dbPath=process.env.KRT_DB_PATH||path.join(appRoot,'.runtime','kelola.sqlite');
fs.mkdirSync(path.dirname(dbPath),{recursive:true});
if(!fs.existsSync(dbPath)){fs.copyFileSync(path.join(appRoot,'database','example.sqlite'),dbPath);console.log('Local database created with separate sample data.');}else console.log('Existing local database preserved.');
