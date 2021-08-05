const assert =require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface,bytecode}=require ('../compile.js');

/**
 * We always create an instance of the web3 library
 * Provider can be through of as a communiation layer between Web3
 * and some ethreum network.
 */

const web3=new Web3(ganache.provider());

// class Car{
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(()=> {
//     car=new Car();
// })
// describe('Car',() => {
//     it('isCarParked',()=>{
//         //const car=new Car();
//         assert.strictEqual(car.park(),'stopped');
//     });

//     it ('isCarDrive',()=>{
//         //const car=new Car();
//         assert.strictEqual(car.drive(),'vroom');
//     });
// });
let accounts,inbox;
const INITIAL_STRING='Hi there!';
beforeEach(async ()=>{
    // Get a list of all accounts 
    accounts=await web3.eth.getAccounts();
    /*web3.eth.getAccounts()
        .then(fetchedAccounts=>{
            console.log(fetchedAccounts);
        });
    */
    // Use one of these accounts to deploy contractt
    inbox = await new web3.eth.Contract(JSON.parse(interface)) 
        .deploy({ data: bytecode, arguments:[INITIAL_STRING]})
        .send({ from: accounts[0], gas:'1000000'})
});

describe('Inbox',()=>{
    //check if contract is sucessfully deployed
    // and return address of deployed contract
    it('deploys a contract',()=>{
        //console.log(accounts);
        //console.log(inbox);
        assert.ok(inbox.options.address); //if address exists, if null or undefined test fails
    });
    //when deploy there should be an initial mesaage value
    it('has default message',async ()=>{
        const message = await inbox.methods.message().call();
        assert.strictEqual(message,INITIAL_STRING)
    });
    //check of message is updated
    it('can change the message',async()=>{
        //update message
        await inbox.methods.setMessage('Bye!').send({ from:accounts[0]});
        //sending a function returns a hash and requires address of account that is going to pay for the transaction
        const updatedMessage=await inbox.methods.message().call();
        assert.strictEqual(updatedMessage,'Bye!');
    });
});