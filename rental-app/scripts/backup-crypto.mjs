import fs from 'node:fs';import crypto from 'node:crypto';
const [action,input,output,keyFile]=process.argv.slice(2);
if(!['encrypt','decrypt'].includes(action)||!input||!output||!keyFile){console.error('Usage: node scripts/backup-crypto.mjs encrypt|decrypt input output private-key-file');process.exit(1)}
const magic=Buffer.from('KRTDB01\n');
if(action==='encrypt'){
 if(fs.existsSync(keyFile)||fs.existsSync(output))throw Error('Output/key already exists; use new filenames.');
 const key=crypto.randomBytes(32),nonce=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',key,nonce);cipher.setAAD(magic);
 const ciphertext=Buffer.concat([cipher.update(fs.readFileSync(input)),cipher.final()]);
 fs.writeFileSync(keyFile,JSON.stringify({format:'kelola-backup-key-v1',key:key.toString('base64')})+'\n',{mode:0o600,flag:'wx'});
 fs.writeFileSync(output,Buffer.concat([magic,nonce,cipher.getAuthTag(),ciphertext]),{flag:'wx'});
 console.log('Encrypted backup written. Keep the separate key private.');
}else{
 if(fs.existsSync(output))throw Error('Output already exists.');const bytes=fs.readFileSync(input);if(!bytes.subarray(0,magic.length).equals(magic))throw Error('Invalid encrypted backup format.');
 const key=Buffer.from(JSON.parse(fs.readFileSync(keyFile,'utf8')).key,'base64');if(key.length!==32)throw Error('Invalid key.');
 const decipher=crypto.createDecipheriv('aes-256-gcm',key,bytes.subarray(8,20));decipher.setAAD(magic);decipher.setAuthTag(bytes.subarray(20,36));
 const plaintext=Buffer.concat([decipher.update(bytes.subarray(36)),decipher.final()]);fs.writeFileSync(output,plaintext,{mode:0o600,flag:'wx'});console.log('Backup decrypted locally. Do not commit the decrypted file.');
}
