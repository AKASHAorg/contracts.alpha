pragma solidity ^0.4.0;


contract ResolverInterface {
    function addr(bytes32 node) constant returns (address ret);

    function setAddr(bytes32 node, address newAddress);

    function hash(bytes32 node) constant returns (uint8 fn, uint8 digestSize, bytes32 ipfsHash);

    function setHash(bytes32 node, uint8 fn, uint8 digestSize, bytes32 ipfsHash);
}