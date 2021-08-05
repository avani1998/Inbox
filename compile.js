const path = require('path');
const fs = require('fs');
const solc=require('solc');
//cannot require('Inbox.sol') because JS engine first executes the contents and then imports
// will throw error

const inboxPath = path.resolve(__dirname,'contracts','inbox.sol');
//read contents of Inbox.sol
const source =fs.readFileSync(inboxPath,'utf8');
//gets source code in cource variable

//cnow actually compile 
/*
@params source code of contract to compile and number of contracts to compile
returns bytecode and interface(ABI)
*/
//solc.compile(source,1);
//solc.compile(source,1));
//now make it acceassible to other files 
module.exports=solc.compile(source,1).contracts[':Inbox'];