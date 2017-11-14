pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/MintableToken.sol';
import './AETH.sol';


contract OngoingSale is CappedCrowdsale, Ownable {

    bool public isFinalized = false;

    event Finalized();

    function OngoingSale(uint256 _startBlock, uint256 _endBlock, uint256 _rate, address _wallet, uint256 _cap)
    public
    Crowdsale(_startBlock, _endBlock, _rate, _wallet)
    CappedCrowdsale(_cap)
    {

    }

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
    public
    onlyOwner
    {
        require(!isFinalized);
        require(hasEnded());

        finalization();
        Finalized();

        isFinalized = true;
        token.transferOwnership(msg.sender);
    }


    // mark token minting as finished and prevent tokens to be minted
    function finalization()
    internal
    {
        token.finishMinting();
    }
}
