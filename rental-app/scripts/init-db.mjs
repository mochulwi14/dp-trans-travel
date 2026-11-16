import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
const appRoot=fileURLToPath(new URL('../',import.meta.url));
export const dbPath=process.env.KRT_DB_PATH||path.join(appRoot,'.runtime','managgemen_dp_trans.sqlite');
fs.mkdirSync(path.dirname(dbPath),{recursive:true});
const previousPath=path.join(appRoot,'.runtime','kelola.sqlite');
if(!process.env.KRT_DB_PATH&&!fs.existsSync(dbPath)&&fs.existsSync(previousPath)){const {DatabaseSync}=await import('node:sqlite');const old=new DatabaseSync(previousPath);old.prepare('VACUUM INTO ?').run(dbPath);old.close();console.log('Existing database copied to managgemen_dp_trans.sqlite; original preserved.');}
if(!fs.existsSync(dbPath)){fs.copyFileSync(path.join(appRoot,'database','managgemen_dp_trans.sqlite'),dbPath);console.log('Local database created with separate sample data.');}else console.log('Existing local database preserved.');
