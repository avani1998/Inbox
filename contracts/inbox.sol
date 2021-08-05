pragma solidity ^0.4.17; //version of solidity

contract Inbox { //contract definition
    string public message; //instance variable - type access name
    /* this variable is automatically stored with the contract on the blockchain (storage variable)
    public storage variable has a seperate function that allows to access the message
    */
    // function <name> () <function type> returns <return type()> {}
    // only view functins have return statements
    function Inbox(string initialMessage) public {
        message = initialMessage;
        //call functions - do not cost ethers, can return
    }
   
    function setMessage (string newMessage) public {
        message =newMessage;
        //transaction function - never returns , costs ethers
    }
   
}