pragma solidity ^0.4.0;


//
library IpfsHash {

    // decode ipfs hash to hex, strip prefix
    // ex: 1220aa7ef8aced767773e8a47753ed0ef452a35845db3f02cd85b92c75ff593ee991
    // { codec: 12, size: 20, hash: aa7ef8aced767773e8a47753ed0ef452a35845db3f02cd85b92c75ff593ee991 }
    struct Multihash {
    bytes32 hash;
    uint8 fn;
    uint8 digestSize;
    }

    function create(Multihash storage self, bytes32 _hash, uint8 _fn, uint8 _digestSize)
    public
    returns (bool)
    {
        if (_digestSize > 32) {
            return false;
        }
        self.hash = _hash;
        self.fn = _fn;
        self.digestSize = _digestSize;
        return true;
    }

    function getHash(Multihash _multiHash)
    internal
    constant
    returns (uint8, uint8, bytes32)
    {
        // on dapp just concat all these in one string, transform to Buffer and encode it
        return (_multiHash.fn, _multiHash.digestSize, _multiHash.hash);
    }
}
