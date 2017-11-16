pragma solidity ^0.4.0;


contract AETHinterface {

    function bonded(address _holder)
    public
    constant
    returns (uint256 _bonded);


    function consumeEssence(address _to, uint256 _amount)
    external
    returns (bool);

}
