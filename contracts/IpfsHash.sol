pragma solidity ^0.4.0;

//
library IpfsHash {

    // decode ipfs hash to hex, strip prefix
    // ex: 1220aa7ef8aced767773e8a47753ed0ef452a35845db3f02cd85b92c75ff593ee991
    // { codec: 12, size: 20, hash: aa7ef8aced767773e8a47753ed0ef452a35845db3f02cd85b92c75ff593ee991 }
    struct Multihash {
        bytes32 hash;
        uint8 codec;
        uint8 size;
    }

    function create(Multihash storage self, bytes32 _hash, uint8 _codec, uint8 _size)
    public
    returns (bool)
    {
        if (_size > 32) {
            return false;
        }
        self.hash = _hash;
        self.codec = _codec;
        self.size = _size;
        return true;
    }

    function getHash(Multihash storage _multiHash)
    internal
    constant
    returns(uint8, uint8, bytes32)
    {
        // on dapp just concat all these in one string, transform to Buffer and encode it
        return (_multiHash.codec, _multiHash.size, _multiHash.hash);
    }
}
