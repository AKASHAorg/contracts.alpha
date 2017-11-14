pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/HasNoEther.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';


contract StakedToken is HasNoEther {
    using SafeMath for uint256;

    mapping (uint256 => StandardToken) tokens;

    struct Stake {
    uint256 tokenId;
    uint256 amount;
    }
    // resource => (staker => (token => amount
    // this will go in AETH token
    mapping (bytes32 => mapping (address => Stake[])) stakes;

    uint256 public totalTokens;
    //@TODO: find optimal structure

    function StakedToken()
    public
    HasNoEther()
    {

    }

    function saveStake(bytes32 _resource, address _staker, uint256 _amount, uint _idToken)
    public
    {

    }

    function registerToken(address _token)
    public
    onlyOwner
    {
        tokens[totalTokens] = StandardToken(_token);
        totalTokens = totalTokens.add(1);
    }

    function getToken(uint _idToken)
    public
    view
    returns (address)
    {
        return tokens[_idToken];
    }

}
