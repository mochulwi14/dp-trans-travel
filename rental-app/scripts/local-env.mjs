import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
export function database(filename=':memory:'){
 if(filename!==':memory:')fs.mkdirSync(path.dirname(filename),{recursive:true});
 const sql=new DatabaseSync(filename);
 sql.exec(fs.readFileSync(new URL('../drizzle/0000_business.sql',import.meta.url),'utf8').replaceAll('CREATE TABLE ','CREATE TABLE IF NOT EXISTS '));
 return {sql,prepare(query){let values=[];return {bind(...args){values=args;return this},async first(){return sql.prepare(query).get(...values)||null},async all(){return {results:sql.prepare(query).all(...values)}},async run(){const r=sql.prepare(query).run(...values);return {meta:{changes:Number(r.changes)}}}}}};
}
export function bucket(directory){
 const data=new Map();if(directory)fs.mkdirSync(directory,{recursive:true});
 const filename=id=>{if(!/^[a-zA-Z0-9_-]+$/.test(id))throw Error('Invalid file ID');return path.join(directory,id)};
 return {async put(id,body){if(directory)fs.writeFileSync(filename(id),Buffer.from(body));else data.set(id,body)},async get(id){if(directory){const file=filename(id);return fs.existsSync(file)?{body:fs.readFileSync(file)}:null}return data.has(id)?{body:data.get(id)}:null},async delete(id){if(directory)fs.rmSync(filename(id),{force:true});else data.delete(id)}};
}
