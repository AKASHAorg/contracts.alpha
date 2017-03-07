// This file is an automatically generated Go binding. Do not modify as any
// change will likely be lost upon the next re-generation!

package main

import (
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

// BaseStoreABI is the input ABI used to generate the binding from.
const BaseStoreABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"type\":\"constructor\"}]"

// BaseStoreBin is the compiled bytecode used for deploying new contracts.
const BaseStoreBin = `0x606060405234610000575b60008054600160a060020a03191633600160a060020a03161790555b5b60fd806100356000396000f300606060405263ffffffff60e060020a60003504166313af40358114602c57806383197ef0146044575b6000565b346000576042600160a060020a03600435166050565b005b346000576042608c565b005b605660ac565b1515605f576000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b609260ac565b1515609b576000565b600054600160a060020a0316ff5b5b565b6000805433600160a060020a039081169116141560ca5750600160ce565b5060005b905600a165627a7a723058208f6acb061bff1bf7a6aa441412d623f3fa957b0cbb0342bd20db69695f04263e0029`

// DeployBaseStore deploys a new Ethereum contract, binding an instance of BaseStore to it.
func DeployBaseStore(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *BaseStore, error) {
	parsed, err := abi.JSON(strings.NewReader(BaseStoreABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(BaseStoreBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &BaseStore{BaseStoreCaller: BaseStoreCaller{contract: contract}, BaseStoreTransactor: BaseStoreTransactor{contract: contract}}, nil
}

// BaseStore is an auto generated Go binding around an Ethereum contract.
type BaseStore struct {
	BaseStoreCaller     // Read-only binding to the contract
	BaseStoreTransactor // Write-only binding to the contract
}

// BaseStoreCaller is an auto generated read-only Go binding around an Ethereum contract.
type BaseStoreCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BaseStoreTransactor is an auto generated write-only Go binding around an Ethereum contract.
type BaseStoreTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BaseStoreSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type BaseStoreSession struct {
	Contract     *BaseStore        // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// BaseStoreCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type BaseStoreCallerSession struct {
	Contract *BaseStoreCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts    // Call options to use throughout this session
}

// BaseStoreTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type BaseStoreTransactorSession struct {
	Contract     *BaseStoreTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts    // Transaction auth options to use throughout this session
}

// BaseStoreRaw is an auto generated low-level Go binding around an Ethereum contract.
type BaseStoreRaw struct {
	Contract *BaseStore // Generic contract binding to access the raw methods on
}

// BaseStoreCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type BaseStoreCallerRaw struct {
	Contract *BaseStoreCaller // Generic read-only contract binding to access the raw methods on
}

// BaseStoreTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type BaseStoreTransactorRaw struct {
	Contract *BaseStoreTransactor // Generic write-only contract binding to access the raw methods on
}

// NewBaseStore creates a new instance of BaseStore, bound to a specific deployed contract.
func NewBaseStore(address common.Address, backend bind.ContractBackend) (*BaseStore, error) {
	contract, err := bindBaseStore(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &BaseStore{BaseStoreCaller: BaseStoreCaller{contract: contract}, BaseStoreTransactor: BaseStoreTransactor{contract: contract}}, nil
}

// NewBaseStoreCaller creates a new read-only instance of BaseStore, bound to a specific deployed contract.
func NewBaseStoreCaller(address common.Address, caller bind.ContractCaller) (*BaseStoreCaller, error) {
	contract, err := bindBaseStore(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &BaseStoreCaller{contract: contract}, nil
}

// NewBaseStoreTransactor creates a new write-only instance of BaseStore, bound to a specific deployed contract.
func NewBaseStoreTransactor(address common.Address, transactor bind.ContractTransactor) (*BaseStoreTransactor, error) {
	contract, err := bindBaseStore(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &BaseStoreTransactor{contract: contract}, nil
}

// bindBaseStore binds a generic wrapper to an already deployed contract.
func bindBaseStore(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(BaseStoreABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BaseStore *BaseStoreRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BaseStore.Contract.BaseStoreCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BaseStore *BaseStoreRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseStore.Contract.BaseStoreTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BaseStore *BaseStoreRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BaseStore.Contract.BaseStoreTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BaseStore *BaseStoreCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BaseStore.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BaseStore *BaseStoreTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseStore.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BaseStore *BaseStoreTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BaseStore.Contract.contract.Transact(opts, method, params...)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseStore *BaseStoreTransactor) Destroy(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseStore.contract.Transact(opts, "destroy")
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseStore *BaseStoreSession) Destroy() (*types.Transaction, error) {
	return _BaseStore.Contract.Destroy(&_BaseStore.TransactOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseStore *BaseStoreTransactorSession) Destroy() (*types.Transaction, error) {
	return _BaseStore.Contract.Destroy(&_BaseStore.TransactOpts)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseStore *BaseStoreTransactor) SetOwner(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _BaseStore.contract.Transact(opts, "setOwner", newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseStore *BaseStoreSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _BaseStore.Contract.SetOwner(&_BaseStore.TransactOpts, newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseStore *BaseStoreTransactorSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _BaseStore.Contract.SetOwner(&_BaseStore.TransactOpts, newOwner)
}
