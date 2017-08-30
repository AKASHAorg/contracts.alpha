pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './AETH.sol';


contract OngoingSale is CappedCrowdsale, Ownable {
    using SafeMath for uint256;

    bool public isFinalized = false;

    event Finalized();

    /**
    * @dev overwrites default method with AETH token deployment
    */
    function createTokenContract()
    internal
    returns (MintableToken)
    {
        return new AETH();
    }

    // mark crowdsale as finished
    function finalize()
    onlyOwner
    {
        require(!isFinalized);
        require(hasEnded());

        finalization();
        Finalized();

        isFinalized = true;
    }

    // mark token minting as finished and prevent tokens to be minted
    function finalization()
    internal
    {
        token.finishMinting();
    }
}
