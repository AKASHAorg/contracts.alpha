pragma solidity ^0.4.0;


import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/crowdsale/RefundVault.sol';
import './OngoingSale.sol';


/**
 * @title AethSale
 * @dev Extension of OngoingSale contract that adds a funding goal, and
 * the possibility of users getting a refund if goal is not met.
 * Uses a RefundVault as the crowdsale's vault.
 * @dev Based on: https://github.com/OpenZeppelin/zeppelin-solidity/blob/master/contracts/crowdsale/RefundableCrowdsale.sol
 */
contract AethSale is OngoingSale {
    using SafeMath for uint256;

    // minimum amount of funds to be raised in weis
    uint256 public goal;

    // force sale endblock after goal is reached
    // this is the last block for cap to be reached
    uint256 public endBlockAfterGoal;

    // refund vault used to hold funds while crowdsale is running
    RefundVault public vault;

    function AethSale(
    uint256 _startTime,
    uint256 _endTime,
    uint256 _rate,
    address _wallet,
    uint256 _cap,
    uint256 _goal,
    uint256 _endBlockAfterGoal
    )
    public
    OngoingSale(_startTime, _endTime, _rate, _wallet, _cap)
    {
        vault = new RefundVault(wallet);
        goal = _goal;
        endBlockAfterGoal = _endBlockAfterGoal;
    }

    // We're overriding the fund forwarding from Crowdsale.
    // In addition to sending the funds, we want to call
    // the RefundVault deposit function
    function forwardFunds()
    internal
    {
        vault.deposit.value(msg.value)(msg.sender);
    }

    // if crowdsale is unsuccessful, investors can claim refunds here
    function claimRefund()
    public
    {
        require(isFinalized);
        require(!goalReached());

        vault.refund(msg.sender);
    }

    // vault finalization task, called when owner calls finalize()
    function finalization()
    internal
    {
        if (goalReached()) {
            vault.close();
        }
        else {
            vault.enableRefunds();
        }

        super.finalization();
    }

    // check if an address has contract code
    function isContract(address _addr)
    constant
    internal
    returns (bool)
    {
        uint codeSize;
        if (_addr == 0) return false;
        assembly {
        codeSize := extcodesize(_addr)
        }
        return codeSize > 0;
    }

    // @return true if the transaction can buy tokens
    function validPurchase()
    internal
    constant
    returns (bool)
    {
        // reject transactions from contracts
        bool isNormalAccount = !isContract(msg.sender);
        return super.validPurchase() && isNormalAccount && !afterGoalReached();
    }

    // @return true if tx is after reaching goal
    function afterGoalReached()
    internal
    constant
    returns (bool)
    {
        bool afterGoalCap = goalReached() && block.number > endBlockAfterGoal;
        return afterGoalCap;
    }

    // @return true if buying period has ended
    function hasEnded()
    public
    constant
    returns (bool)
    {
        // check if goal reached and within allowed block period
        return super.hasEnded() || afterGoalReached();
    }

    // @return true
    function goalReached()
    public
    constant
    returns (bool)
    {
        return weiRaised >= goal;
    }
}
