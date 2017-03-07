// This file is an automatically generated Go binding. Do not modify as any
// change will likely be lost upon the next re-generation!

package main

import (
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
)

// BaseModuleABI is the input ABI used to generate the binding from.
const BaseModuleABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newRegistry\",\"type\":\"address\"}],\"name\":\"setRegistry\",\"outputs\":[],\"payable\":false,\"type\":\"function\"}]"

// BaseModuleBin is the compiled bytecode used for deploying new contracts.
const BaseModuleBin = `0x60606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610176806100316000396000f300606060405263ffffffff60e060020a60003504166313af4035811461003a57806383197ef014610055578063a91ee0dc14610064575b610000565b3461000057610053600160a060020a036004351661007f565b005b34610000576100536100bf565b005b3461000057610053600160a060020a03600435166100e3565b005b610087610123565b151561009257610000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6100c7610123565b15156100d257610000565b600054600160a060020a0316ff5b5b565b6100eb610123565b15156100f657610000565b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6000805433600160a060020a039081169116141561014357506001610147565b5060005b905600a165627a7a723058209de01748a726c978c8c5d95bc1fa6eb19dd860c3d1ad664b656d7d4d755d37830029`

// DeployBaseModule deploys a new Ethereum contract, binding an instance of BaseModule to it.
func DeployBaseModule(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *BaseModule, error) {
	parsed, err := abi.JSON(strings.NewReader(BaseModuleABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(BaseModuleBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &BaseModule{BaseModuleCaller: BaseModuleCaller{contract: contract}, BaseModuleTransactor: BaseModuleTransactor{contract: contract}}, nil
}

// BaseModule is an auto generated Go binding around an Ethereum contract.
type BaseModule struct {
	BaseModuleCaller     // Read-only binding to the contract
	BaseModuleTransactor // Write-only binding to the contract
}

// BaseModuleCaller is an auto generated read-only Go binding around an Ethereum contract.
type BaseModuleCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BaseModuleTransactor is an auto generated write-only Go binding around an Ethereum contract.
type BaseModuleTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// BaseModuleSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type BaseModuleSession struct {
	Contract     *BaseModule       // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// BaseModuleCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type BaseModuleCallerSession struct {
	Contract *BaseModuleCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts     // Call options to use throughout this session
}

// BaseModuleTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type BaseModuleTransactorSession struct {
	Contract     *BaseModuleTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts     // Transaction auth options to use throughout this session
}

// BaseModuleRaw is an auto generated low-level Go binding around an Ethereum contract.
type BaseModuleRaw struct {
	Contract *BaseModule // Generic contract binding to access the raw methods on
}

// BaseModuleCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type BaseModuleCallerRaw struct {
	Contract *BaseModuleCaller // Generic read-only contract binding to access the raw methods on
}

// BaseModuleTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type BaseModuleTransactorRaw struct {
	Contract *BaseModuleTransactor // Generic write-only contract binding to access the raw methods on
}

// NewBaseModule creates a new instance of BaseModule, bound to a specific deployed contract.
func NewBaseModule(address common.Address, backend bind.ContractBackend) (*BaseModule, error) {
	contract, err := bindBaseModule(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &BaseModule{BaseModuleCaller: BaseModuleCaller{contract: contract}, BaseModuleTransactor: BaseModuleTransactor{contract: contract}}, nil
}

// NewBaseModuleCaller creates a new read-only instance of BaseModule, bound to a specific deployed contract.
func NewBaseModuleCaller(address common.Address, caller bind.ContractCaller) (*BaseModuleCaller, error) {
	contract, err := bindBaseModule(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &BaseModuleCaller{contract: contract}, nil
}

// NewBaseModuleTransactor creates a new write-only instance of BaseModule, bound to a specific deployed contract.
func NewBaseModuleTransactor(address common.Address, transactor bind.ContractTransactor) (*BaseModuleTransactor, error) {
	contract, err := bindBaseModule(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &BaseModuleTransactor{contract: contract}, nil
}

// bindBaseModule binds a generic wrapper to an already deployed contract.
func bindBaseModule(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(BaseModuleABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BaseModule *BaseModuleRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BaseModule.Contract.BaseModuleCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BaseModule *BaseModuleRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseModule.Contract.BaseModuleTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BaseModule *BaseModuleRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BaseModule.Contract.BaseModuleTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_BaseModule *BaseModuleCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _BaseModule.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_BaseModule *BaseModuleTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseModule.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_BaseModule *BaseModuleTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _BaseModule.Contract.contract.Transact(opts, method, params...)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseModule *BaseModuleTransactor) Destroy(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _BaseModule.contract.Transact(opts, "destroy")
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseModule *BaseModuleSession) Destroy() (*types.Transaction, error) {
	return _BaseModule.Contract.Destroy(&_BaseModule.TransactOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_BaseModule *BaseModuleTransactorSession) Destroy() (*types.Transaction, error) {
	return _BaseModule.Contract.Destroy(&_BaseModule.TransactOpts)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseModule *BaseModuleTransactor) SetOwner(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _BaseModule.contract.Transact(opts, "setOwner", newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseModule *BaseModuleSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _BaseModule.Contract.SetOwner(&_BaseModule.TransactOpts, newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_BaseModule *BaseModuleTransactorSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _BaseModule.Contract.SetOwner(&_BaseModule.TransactOpts, newOwner)
}

// SetRegistry is a paid mutator transaction binding the contract method 0xa91ee0dc.
//
// Solidity: function setRegistry(newRegistry address) returns()
func (_BaseModule *BaseModuleTransactor) SetRegistry(opts *bind.TransactOpts, newRegistry common.Address) (*types.Transaction, error) {
	return _BaseModule.contract.Transact(opts, "setRegistry", newRegistry)
}

// SetRegistry is a paid mutator transaction binding the contract method 0xa91ee0dc.
//
// Solidity: function setRegistry(newRegistry address) returns()
func (_BaseModule *BaseModuleSession) SetRegistry(newRegistry common.Address) (*types.Transaction, error) {
	return _BaseModule.Contract.SetRegistry(&_BaseModule.TransactOpts, newRegistry)
}

// SetRegistry is a paid mutator transaction binding the contract method 0xa91ee0dc.
//
// Solidity: function setRegistry(newRegistry address) returns()
func (_BaseModule *BaseModuleTransactorSession) SetRegistry(newRegistry common.Address) (*types.Transaction, error) {
	return _BaseModule.Contract.SetRegistry(&_BaseModule.TransactOpts, newRegistry)
}

// BaseStoreABI is the input ABI used to generate the binding from.
const BaseStoreABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"type\":\"constructor\"}]"

// BaseStoreBin is the compiled bytecode used for deploying new contracts.
const BaseStoreBin = `0x606060405234610000575b60008054600160a060020a03191633600160a060020a03161790555b5b60fd806100356000396000f300606060405263ffffffff60e060020a60003504166313af40358114602c57806383197ef0146044575b6000565b346000576042600160a060020a03600435166050565b005b346000576042608c565b005b605660ac565b1515605f576000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b609260ac565b1515609b576000565b600054600160a060020a0316ff5b5b565b6000805433600160a060020a039081169116141560ca5750600160ce565b5060005b905600a165627a7a72305820353739b94d8a86e81343d848537ea36b6abe592ee9dd97393335f067de2cb4a60029`

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

// ProfileABI is the input ABI used to generate the binding from.
const ProfileABI = "[{\"constant\":true,\"inputs\":[],\"name\":\"_id\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"sendTip\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":true,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"chunks\",\"type\":\"bytes32[2]\"}],\"name\":\"setHash\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"_hash\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"type\":\"function\"},{\"inputs\":[{\"name\":\"registrar\",\"type\":\"address\"},{\"name\":\"chunks\",\"type\":\"bytes32[2]\"},{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"forwardAddr\",\"type\":\"address\"}],\"payable\":false,\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Tip\",\"type\":\"event\"}]"

// ProfileBin is the compiled bytecode used for deploying new contracts.
const ProfileBin = `0x6060604052346100005760405160a080610429833981016040528051606082015160808301519192602001915b5b60008054600160a060020a03191633600160a060020a03161790555b600160038482604082015b828111156100715782518255602090920191600190910190610054565b5b506100929291505b8082111561008e576000815560010161007a565b5090565b505060048054600160a060020a03808716600160a060020a031992831617909255600080549284169290911691909117905560038290555b505050505b61034b806100de6000396000f3006060604052361561005c5763ffffffff60e060020a60003504166305180237811461006157806313af403514610080578063502c40651461009b57806383197ef0146100b7578063a5685446146100c6578063b32ae69d146100fc575b610000565b346100005761006e61011e565b60408051918252519081900360200190f35b3461000057610099600160a060020a0360043516610124565b005b6100a3610164565b604080519115158252519081900360200190f35b34610000576100996101e4565b005b3461000057604080518082018252610099916004916044918390600290839083908082843750939550610210945050505050565b005b346100005761006e6004356102e1565b60408051918252519081900360200190f35b60035481565b61012c6102f8565b151561013757610000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b60008054604051600160a060020a03909116903480156108fc029184818181858888f193505050501561005c5760408051600160a060020a033316815234602082015281517f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a10266929181900390910190a15060016101e1565b610000565b90565b60045433600160a060020a039081169116146101ff57610000565b600054600160a060020a0316ff5b5b565b6102186102f8565b151561022357610000565b600160038282604082015b8281111561024b578251825560209092019160019091019061022e565b5b5061026c9291505b808211156102685760008155600101610254565b5090565b505060048054600354604080517f1f8db42d0000000000000000000000000000000000000000000000000000000081529384019190915251600160a060020a0390911691631f8db42d91602480830192600092919082900301818387803b156100005760325a03f115610000575050505b5b50565b6001816002811015610000570160005b5054905081565b6000805433600160a060020a0390811691161415610318575060016101e1565b5060005b905600a165627a7a723058208e19b5349cb6081010b5ff3799f94cee1de238a0bad43c8dc2a6628d1b67dab50029`

// DeployProfile deploys a new Ethereum contract, binding an instance of Profile to it.
func DeployProfile(auth *bind.TransactOpts, backend bind.ContractBackend, registrar common.Address, chunks [2][32]byte, id [32]byte, forwardAddr common.Address) (common.Address, *types.Transaction, *Profile, error) {
	parsed, err := abi.JSON(strings.NewReader(ProfileABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(ProfileBin), backend, registrar, chunks, id, forwardAddr)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &Profile{ProfileCaller: ProfileCaller{contract: contract}, ProfileTransactor: ProfileTransactor{contract: contract}}, nil
}

// Profile is an auto generated Go binding around an Ethereum contract.
type Profile struct {
	ProfileCaller     // Read-only binding to the contract
	ProfileTransactor // Write-only binding to the contract
}

// ProfileCaller is an auto generated read-only Go binding around an Ethereum contract.
type ProfileCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ProfileTransactor is an auto generated write-only Go binding around an Ethereum contract.
type ProfileTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// ProfileSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type ProfileSession struct {
	Contract     *Profile          // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// ProfileCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type ProfileCallerSession struct {
	Contract *ProfileCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts  // Call options to use throughout this session
}

// ProfileTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type ProfileTransactorSession struct {
	Contract     *ProfileTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts  // Transaction auth options to use throughout this session
}

// ProfileRaw is an auto generated low-level Go binding around an Ethereum contract.
type ProfileRaw struct {
	Contract *Profile // Generic contract binding to access the raw methods on
}

// ProfileCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type ProfileCallerRaw struct {
	Contract *ProfileCaller // Generic read-only contract binding to access the raw methods on
}

// ProfileTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type ProfileTransactorRaw struct {
	Contract *ProfileTransactor // Generic write-only contract binding to access the raw methods on
}

// NewProfile creates a new instance of Profile, bound to a specific deployed contract.
func NewProfile(address common.Address, backend bind.ContractBackend) (*Profile, error) {
	contract, err := bindProfile(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &Profile{ProfileCaller: ProfileCaller{contract: contract}, ProfileTransactor: ProfileTransactor{contract: contract}}, nil
}

// NewProfileCaller creates a new read-only instance of Profile, bound to a specific deployed contract.
func NewProfileCaller(address common.Address, caller bind.ContractCaller) (*ProfileCaller, error) {
	contract, err := bindProfile(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &ProfileCaller{contract: contract}, nil
}

// NewProfileTransactor creates a new write-only instance of Profile, bound to a specific deployed contract.
func NewProfileTransactor(address common.Address, transactor bind.ContractTransactor) (*ProfileTransactor, error) {
	contract, err := bindProfile(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &ProfileTransactor{contract: contract}, nil
}

// bindProfile binds a generic wrapper to an already deployed contract.
func bindProfile(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(ProfileABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Profile *ProfileRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Profile.Contract.ProfileCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Profile *ProfileRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Profile.Contract.ProfileTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Profile *ProfileRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Profile.Contract.ProfileTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_Profile *ProfileCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _Profile.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_Profile *ProfileTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Profile.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_Profile *ProfileTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _Profile.Contract.contract.Transact(opts, method, params...)
}

// _hash is a free data retrieval call binding the contract method 0xb32ae69d.
//
// Solidity: function _hash( uint256) constant returns(bytes32)
func (_Profile *ProfileCaller) _hash(opts *bind.CallOpts, arg0 *big.Int) ([32]byte, error) {
	var (
		ret0 = new([32]byte)
	)
	out := ret0
	err := _Profile.contract.Call(opts, out, "_hash", arg0)
	return *ret0, err
}

// _hash is a free data retrieval call binding the contract method 0xb32ae69d.
//
// Solidity: function _hash( uint256) constant returns(bytes32)
func (_Profile *ProfileSession) _hash(arg0 *big.Int) ([32]byte, error) {
	return _Profile.Contract._hash(&_Profile.CallOpts, arg0)
}

// _hash is a free data retrieval call binding the contract method 0xb32ae69d.
//
// Solidity: function _hash( uint256) constant returns(bytes32)
func (_Profile *ProfileCallerSession) _hash(arg0 *big.Int) ([32]byte, error) {
	return _Profile.Contract._hash(&_Profile.CallOpts, arg0)
}

// _id is a free data retrieval call binding the contract method 0x05180237.
//
// Solidity: function _id() constant returns(bytes32)
func (_Profile *ProfileCaller) _id(opts *bind.CallOpts) ([32]byte, error) {
	var (
		ret0 = new([32]byte)
	)
	out := ret0
	err := _Profile.contract.Call(opts, out, "_id")
	return *ret0, err
}

// _id is a free data retrieval call binding the contract method 0x05180237.
//
// Solidity: function _id() constant returns(bytes32)
func (_Profile *ProfileSession) _id() ([32]byte, error) {
	return _Profile.Contract._id(&_Profile.CallOpts)
}

// _id is a free data retrieval call binding the contract method 0x05180237.
//
// Solidity: function _id() constant returns(bytes32)
func (_Profile *ProfileCallerSession) _id() ([32]byte, error) {
	return _Profile.Contract._id(&_Profile.CallOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_Profile *ProfileTransactor) Destroy(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Profile.contract.Transact(opts, "destroy")
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_Profile *ProfileSession) Destroy() (*types.Transaction, error) {
	return _Profile.Contract.Destroy(&_Profile.TransactOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_Profile *ProfileTransactorSession) Destroy() (*types.Transaction, error) {
	return _Profile.Contract.Destroy(&_Profile.TransactOpts)
}

// SendTip is a paid mutator transaction binding the contract method 0x502c4065.
//
// Solidity: function sendTip() returns(bool)
func (_Profile *ProfileTransactor) SendTip(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _Profile.contract.Transact(opts, "sendTip")
}

// SendTip is a paid mutator transaction binding the contract method 0x502c4065.
//
// Solidity: function sendTip() returns(bool)
func (_Profile *ProfileSession) SendTip() (*types.Transaction, error) {
	return _Profile.Contract.SendTip(&_Profile.TransactOpts)
}

// SendTip is a paid mutator transaction binding the contract method 0x502c4065.
//
// Solidity: function sendTip() returns(bool)
func (_Profile *ProfileTransactorSession) SendTip() (*types.Transaction, error) {
	return _Profile.Contract.SendTip(&_Profile.TransactOpts)
}

// SetHash is a paid mutator transaction binding the contract method 0xa5685446.
//
// Solidity: function setHash(chunks bytes32[2]) returns()
func (_Profile *ProfileTransactor) SetHash(opts *bind.TransactOpts, chunks [2][32]byte) (*types.Transaction, error) {
	return _Profile.contract.Transact(opts, "setHash", chunks)
}

// SetHash is a paid mutator transaction binding the contract method 0xa5685446.
//
// Solidity: function setHash(chunks bytes32[2]) returns()
func (_Profile *ProfileSession) SetHash(chunks [2][32]byte) (*types.Transaction, error) {
	return _Profile.Contract.SetHash(&_Profile.TransactOpts, chunks)
}

// SetHash is a paid mutator transaction binding the contract method 0xa5685446.
//
// Solidity: function setHash(chunks bytes32[2]) returns()
func (_Profile *ProfileTransactorSession) SetHash(chunks [2][32]byte) (*types.Transaction, error) {
	return _Profile.Contract.SetHash(&_Profile.TransactOpts, chunks)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_Profile *ProfileTransactor) SetOwner(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _Profile.contract.Transact(opts, "setOwner", newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_Profile *ProfileSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _Profile.Contract.SetOwner(&_Profile.TransactOpts, newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_Profile *ProfileTransactorSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _Profile.Contract.SetOwner(&_Profile.TransactOpts, newOwner)
}

// RegistryControllerABI is the input ABI used to generate the binding from.
const RegistryControllerABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"store\",\"type\":\"address\"}],\"name\":\"setStore\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"unregister\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"emitUpdate\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"ipfs\",\"type\":\"bytes32[2]\"}],\"name\":\"register\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"check_format\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"addressOf\",\"outputs\":[{\"name\":\"profileAddress\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"address\"}],\"name\":\"isRegistered\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"newController\",\"type\":\"address\"}],\"name\":\"migrate\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"key\",\"type\":\"address\"}],\"name\":\"addressOfKey\",\"outputs\":[{\"name\":\"profileAddress\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"id\",\"type\":\"bytes32\"},{\"indexed\":false,\"name\":\"profile\",\"type\":\"address\"}],\"name\":\"Register\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"id\",\"type\":\"bytes32\"},{\"indexed\":false,\"name\":\"profile\",\"type\":\"address\"}],\"name\":\"UpdateProfile\",\"type\":\"event\"}]"

// RegistryControllerBin is the compiled bytecode used for deploying new contracts.
const RegistryControllerBin = `0x60606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610e4d806100316000396000f300606060405236156100935763ffffffff60e060020a600035041663087cbd40811461009857806313af4035146100b35780631a0919dc146100ce5780631f8db42d146100f257806330d00012146101045780636b4316db1461015a57806383197ef01461017e578063bb34534c1461018d578063c3c5a547146101b9578063ce5494bb146101e6578063d5a760f514610201575b610000565b34610000576100b1600160a060020a0360043516610236565b005b34610000576100b1600160a060020a0360043516610276565b005b34610000576100de6004356102b6565b604080519115158252519081900360200190f35b34610000576100b16004356103ac565b005b346100005760408051808201825261013e91600480359290916064919060249060029083908390808284375093955061046c945050505050565b60408051600160a060020a039092168252519081900360200190f35b34610000576100de6004356105e4565b604080519115158252519081900360200190f35b34610000576100b16107c9565b005b346100005761013e6004356107ed565b60408051600160a060020a039092168252519081900360200190f35b34610000576100de600160a060020a0360043516610857565b604080519115158252519081900360200190f35b34610000576100b1600160a060020a03600435166108d0565b005b346100005761013e600160a060020a0360043516610963565b60408051600160a060020a039092168252519081900360200190f35b61023e6109d1565b151561024957610000565b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b61027e6109d1565b151561028957610000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b6000600060006102c533610963565b600154604080516000602091820181905282517f2874528e000000000000000000000000000000000000000000000000000000008152600481018a9052600160a060020a03338116602483015293519597509290931693632874528e936044808501948390030190829087803b156100005760325a03f1156100005750506040515191505080156103a05781600160a060020a03166383197ef06040518163ffffffff1660e060020a028152600401809050600060405180830381600087803b156100005760325a03f11561000057505050600192506103a5565b600092505b5050919050565b6001546040805160006020918201819052825160e060020a63d1a7c77f028152600481018690529251600160a060020a0333811695169363d1a7c77f936024808301949193928390030190829087803b156100005760325a03f11561000057505060405151600160a060020a031691909114905061042957610000565b60408051600160a060020a0333168152905182917fdf5c699569cbe77bd306dae8199f30a79b466d3420dd133672100ae9fa686604919081900360200190a25b50565b60006000600061047b856105e4565b151561048657610000565b30848633604051610429806109f98339600160a060020a0386169101908152602081018460408083835b8051825260208311156104d057601f1990920191602091820191016104b0565b505050919091019384525050600160a060020a03166020820152604080519182900301925090506000f0801561000057600154604080516000602091820181905282517f5ebd9a83000000000000000000000000000000000000000000000000000000008152600481018b9052600160a060020a033381166024830152868116604483015293519597509290931693635ebd9a83936064808501948390030190829087803b156100005760325a03f1156100005750506040515191505080151561059957610000565b60408051600160a060020a0384168152905186917f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca6919081900360200190a28192505b505092915050565b6000805b602060ff821610156107b957828160ff166020811015610000571a60f860020a02600160f860020a031916600060f860020a021415610626576107b9565b7f7a000000000000000000000000000000000000000000000000000000000000008360ff83166020811015610000571a60f860020a02600160f860020a031916118061072857507f61000000000000000000000000000000000000000000000000000000000000008360ff83166020811015610000571a60f860020a02600160f860020a0319161080156106f757507f39000000000000000000000000000000000000000000000000000000000000008360ff83166020811015610000571a60f860020a02600160f860020a031916115b80156107285750828160ff166020811015610000571a60f860020a02600160f860020a031916605f60f860020a0214155b5b806107a157507f30000000000000000000000000000000000000000000000000000000000000008360ff83166020811015610000571a60f860020a02600160f860020a0319161080156107a15750828160ff166020811015610000571a60f860020a02600160f860020a031916602e60f860020a0214155b5b156107b057600091506107c3565b5b6001016105e8565b60038160ff161191505b50919050565b6107d16109d1565b15156107dc57610000565b600054600160a060020a0316ff5b5b565b6001546040805160006020918201819052825160e060020a63d1a7c77f0281526004810186905292519093600160a060020a03169263d1a7c77f92602480830193919282900301818787803b156100005760325a03f115610000575050604051519150505b919050565b6001546040805160006020918201819052825160e060020a63b96b099f028152600160a060020a038681166004830152935191948594169263b96b099f9260248084019382900301818787803b156100005760325a03f1156100005750505060405180519050600160a060020a0316141590505b919050565b6108d86109d1565b15156108e357610000565b600154604080517f13af4035000000000000000000000000000000000000000000000000000000008152600160a060020a038481166004830152915191909216916313af403591602480830192600092919082900301818387803b156100005760325a03f115610000575050600054600160a060020a03169050ff5b5b50565b6001546040805160006020918201819052825160e060020a63b96b099f028152600160a060020a03868116600483015293519194939093169263b96b099f92602480830193919282900301818787803b156100005760325a03f115610000575050604051519150505b919050565b6000805433600160a060020a03908116911614156109f1575060016109f5565b5060005b9056006060604052346100005760405160a080610429833981016040528051606082015160808301519192602001915b5b60008054600160a060020a03191633600160a060020a03161790555b600160038482604082015b828111156100715782518255602090920191600190910190610054565b5b506100929291505b8082111561008e576000815560010161007a565b5090565b505060048054600160a060020a03808716600160a060020a031992831617909255600080549284169290911691909117905560038290555b505050505b61034b806100de6000396000f3006060604052361561005c5763ffffffff60e060020a60003504166305180237811461006157806313af403514610080578063502c40651461009b57806383197ef0146100b7578063a5685446146100c6578063b32ae69d146100fc575b610000565b346100005761006e61011e565b60408051918252519081900360200190f35b3461000057610099600160a060020a0360043516610124565b005b6100a3610164565b604080519115158252519081900360200190f35b34610000576100996101e4565b005b3461000057604080518082018252610099916004916044918390600290839083908082843750939550610210945050505050565b005b346100005761006e6004356102e1565b60408051918252519081900360200190f35b60035481565b61012c6102f8565b151561013757610000565b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b60008054604051600160a060020a03909116903480156108fc029184818181858888f193505050501561005c5760408051600160a060020a033316815234602082015281517f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a10266929181900390910190a15060016101e1565b610000565b90565b60045433600160a060020a039081169116146101ff57610000565b600054600160a060020a0316ff5b5b565b6102186102f8565b151561022357610000565b600160038282604082015b8281111561024b578251825560209092019160019091019061022e565b5b5061026c9291505b808211156102685760008155600101610254565b5090565b505060048054600354604080517f1f8db42d0000000000000000000000000000000000000000000000000000000081529384019190915251600160a060020a0390911691631f8db42d91602480830192600092919082900301818387803b156100005760325a03f115610000575050505b5b50565b6001816002811015610000570160005b5054905081565b6000805433600160a060020a0390811691161415610318575060016101e1565b5060005b905600a165627a7a723058208e19b5349cb6081010b5ff3799f94cee1de238a0bad43c8dc2a6628d1b67dab50029a165627a7a7230582061822769febcb3b21dc064e6c93f4b3f75ca1d4179ba1cee4f4139c1ad7f48440029`

// DeployRegistryController deploys a new Ethereum contract, binding an instance of RegistryController to it.
func DeployRegistryController(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *RegistryController, error) {
	parsed, err := abi.JSON(strings.NewReader(RegistryControllerABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(RegistryControllerBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &RegistryController{RegistryControllerCaller: RegistryControllerCaller{contract: contract}, RegistryControllerTransactor: RegistryControllerTransactor{contract: contract}}, nil
}

// RegistryController is an auto generated Go binding around an Ethereum contract.
type RegistryController struct {
	RegistryControllerCaller     // Read-only binding to the contract
	RegistryControllerTransactor // Write-only binding to the contract
}

// RegistryControllerCaller is an auto generated read-only Go binding around an Ethereum contract.
type RegistryControllerCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// RegistryControllerTransactor is an auto generated write-only Go binding around an Ethereum contract.
type RegistryControllerTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// RegistryControllerSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type RegistryControllerSession struct {
	Contract     *RegistryController // Generic contract binding to set the session for
	CallOpts     bind.CallOpts       // Call options to use throughout this session
	TransactOpts bind.TransactOpts   // Transaction auth options to use throughout this session
}

// RegistryControllerCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type RegistryControllerCallerSession struct {
	Contract *RegistryControllerCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts             // Call options to use throughout this session
}

// RegistryControllerTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type RegistryControllerTransactorSession struct {
	Contract     *RegistryControllerTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts             // Transaction auth options to use throughout this session
}

// RegistryControllerRaw is an auto generated low-level Go binding around an Ethereum contract.
type RegistryControllerRaw struct {
	Contract *RegistryController // Generic contract binding to access the raw methods on
}

// RegistryControllerCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type RegistryControllerCallerRaw struct {
	Contract *RegistryControllerCaller // Generic read-only contract binding to access the raw methods on
}

// RegistryControllerTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type RegistryControllerTransactorRaw struct {
	Contract *RegistryControllerTransactor // Generic write-only contract binding to access the raw methods on
}

// NewRegistryController creates a new instance of RegistryController, bound to a specific deployed contract.
func NewRegistryController(address common.Address, backend bind.ContractBackend) (*RegistryController, error) {
	contract, err := bindRegistryController(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &RegistryController{RegistryControllerCaller: RegistryControllerCaller{contract: contract}, RegistryControllerTransactor: RegistryControllerTransactor{contract: contract}}, nil
}

// NewRegistryControllerCaller creates a new read-only instance of RegistryController, bound to a specific deployed contract.
func NewRegistryControllerCaller(address common.Address, caller bind.ContractCaller) (*RegistryControllerCaller, error) {
	contract, err := bindRegistryController(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &RegistryControllerCaller{contract: contract}, nil
}

// NewRegistryControllerTransactor creates a new write-only instance of RegistryController, bound to a specific deployed contract.
func NewRegistryControllerTransactor(address common.Address, transactor bind.ContractTransactor) (*RegistryControllerTransactor, error) {
	contract, err := bindRegistryController(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &RegistryControllerTransactor{contract: contract}, nil
}

// bindRegistryController binds a generic wrapper to an already deployed contract.
func bindRegistryController(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(RegistryControllerABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_RegistryController *RegistryControllerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _RegistryController.Contract.RegistryControllerCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_RegistryController *RegistryControllerRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryController.Contract.RegistryControllerTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_RegistryController *RegistryControllerRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _RegistryController.Contract.RegistryControllerTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_RegistryController *RegistryControllerCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _RegistryController.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_RegistryController *RegistryControllerTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryController.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_RegistryController *RegistryControllerTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _RegistryController.Contract.contract.Transact(opts, method, params...)
}

// AddressOf is a free data retrieval call binding the contract method 0xbb34534c.
//
// Solidity: function addressOf(id bytes32) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerCaller) AddressOf(opts *bind.CallOpts, id [32]byte) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _RegistryController.contract.Call(opts, out, "addressOf", id)
	return *ret0, err
}

// AddressOf is a free data retrieval call binding the contract method 0xbb34534c.
//
// Solidity: function addressOf(id bytes32) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerSession) AddressOf(id [32]byte) (common.Address, error) {
	return _RegistryController.Contract.AddressOf(&_RegistryController.CallOpts, id)
}

// AddressOf is a free data retrieval call binding the contract method 0xbb34534c.
//
// Solidity: function addressOf(id bytes32) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerCallerSession) AddressOf(id [32]byte) (common.Address, error) {
	return _RegistryController.Contract.AddressOf(&_RegistryController.CallOpts, id)
}

// AddressOfKey is a free data retrieval call binding the contract method 0xd5a760f5.
//
// Solidity: function addressOfKey(key address) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerCaller) AddressOfKey(opts *bind.CallOpts, key common.Address) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _RegistryController.contract.Call(opts, out, "addressOfKey", key)
	return *ret0, err
}

// AddressOfKey is a free data retrieval call binding the contract method 0xd5a760f5.
//
// Solidity: function addressOfKey(key address) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerSession) AddressOfKey(key common.Address) (common.Address, error) {
	return _RegistryController.Contract.AddressOfKey(&_RegistryController.CallOpts, key)
}

// AddressOfKey is a free data retrieval call binding the contract method 0xd5a760f5.
//
// Solidity: function addressOfKey(key address) constant returns(profileAddress address)
func (_RegistryController *RegistryControllerCallerSession) AddressOfKey(key common.Address) (common.Address, error) {
	return _RegistryController.Contract.AddressOfKey(&_RegistryController.CallOpts, key)
}

// Check_format is a free data retrieval call binding the contract method 0x6b4316db.
//
// Solidity: function check_format(id bytes32) constant returns(bool)
func (_RegistryController *RegistryControllerCaller) Check_format(opts *bind.CallOpts, id [32]byte) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _RegistryController.contract.Call(opts, out, "check_format", id)
	return *ret0, err
}

// Check_format is a free data retrieval call binding the contract method 0x6b4316db.
//
// Solidity: function check_format(id bytes32) constant returns(bool)
func (_RegistryController *RegistryControllerSession) Check_format(id [32]byte) (bool, error) {
	return _RegistryController.Contract.Check_format(&_RegistryController.CallOpts, id)
}

// Check_format is a free data retrieval call binding the contract method 0x6b4316db.
//
// Solidity: function check_format(id bytes32) constant returns(bool)
func (_RegistryController *RegistryControllerCallerSession) Check_format(id [32]byte) (bool, error) {
	return _RegistryController.Contract.Check_format(&_RegistryController.CallOpts, id)
}

// IsRegistered is a free data retrieval call binding the contract method 0xc3c5a547.
//
// Solidity: function isRegistered(key address) constant returns(bool)
func (_RegistryController *RegistryControllerCaller) IsRegistered(opts *bind.CallOpts, key common.Address) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _RegistryController.contract.Call(opts, out, "isRegistered", key)
	return *ret0, err
}

// IsRegistered is a free data retrieval call binding the contract method 0xc3c5a547.
//
// Solidity: function isRegistered(key address) constant returns(bool)
func (_RegistryController *RegistryControllerSession) IsRegistered(key common.Address) (bool, error) {
	return _RegistryController.Contract.IsRegistered(&_RegistryController.CallOpts, key)
}

// IsRegistered is a free data retrieval call binding the contract method 0xc3c5a547.
//
// Solidity: function isRegistered(key address) constant returns(bool)
func (_RegistryController *RegistryControllerCallerSession) IsRegistered(key common.Address) (bool, error) {
	return _RegistryController.Contract.IsRegistered(&_RegistryController.CallOpts, key)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryController *RegistryControllerTransactor) Destroy(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "destroy")
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryController *RegistryControllerSession) Destroy() (*types.Transaction, error) {
	return _RegistryController.Contract.Destroy(&_RegistryController.TransactOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryController *RegistryControllerTransactorSession) Destroy() (*types.Transaction, error) {
	return _RegistryController.Contract.Destroy(&_RegistryController.TransactOpts)
}

// EmitUpdate is a paid mutator transaction binding the contract method 0x1f8db42d.
//
// Solidity: function emitUpdate(id bytes32) returns()
func (_RegistryController *RegistryControllerTransactor) EmitUpdate(opts *bind.TransactOpts, id [32]byte) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "emitUpdate", id)
}

// EmitUpdate is a paid mutator transaction binding the contract method 0x1f8db42d.
//
// Solidity: function emitUpdate(id bytes32) returns()
func (_RegistryController *RegistryControllerSession) EmitUpdate(id [32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.EmitUpdate(&_RegistryController.TransactOpts, id)
}

// EmitUpdate is a paid mutator transaction binding the contract method 0x1f8db42d.
//
// Solidity: function emitUpdate(id bytes32) returns()
func (_RegistryController *RegistryControllerTransactorSession) EmitUpdate(id [32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.EmitUpdate(&_RegistryController.TransactOpts, id)
}

// Migrate is a paid mutator transaction binding the contract method 0xce5494bb.
//
// Solidity: function migrate(newController address) returns()
func (_RegistryController *RegistryControllerTransactor) Migrate(opts *bind.TransactOpts, newController common.Address) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "migrate", newController)
}

// Migrate is a paid mutator transaction binding the contract method 0xce5494bb.
//
// Solidity: function migrate(newController address) returns()
func (_RegistryController *RegistryControllerSession) Migrate(newController common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.Migrate(&_RegistryController.TransactOpts, newController)
}

// Migrate is a paid mutator transaction binding the contract method 0xce5494bb.
//
// Solidity: function migrate(newController address) returns()
func (_RegistryController *RegistryControllerTransactorSession) Migrate(newController common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.Migrate(&_RegistryController.TransactOpts, newController)
}

// Register is a paid mutator transaction binding the contract method 0x30d00012.
//
// Solidity: function register(id bytes32, ipfs bytes32[2]) returns(address)
func (_RegistryController *RegistryControllerTransactor) Register(opts *bind.TransactOpts, id [32]byte, ipfs [2][32]byte) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "register", id, ipfs)
}

// Register is a paid mutator transaction binding the contract method 0x30d00012.
//
// Solidity: function register(id bytes32, ipfs bytes32[2]) returns(address)
func (_RegistryController *RegistryControllerSession) Register(id [32]byte, ipfs [2][32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.Register(&_RegistryController.TransactOpts, id, ipfs)
}

// Register is a paid mutator transaction binding the contract method 0x30d00012.
//
// Solidity: function register(id bytes32, ipfs bytes32[2]) returns(address)
func (_RegistryController *RegistryControllerTransactorSession) Register(id [32]byte, ipfs [2][32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.Register(&_RegistryController.TransactOpts, id, ipfs)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryController *RegistryControllerTransactor) SetOwner(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "setOwner", newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryController *RegistryControllerSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.SetOwner(&_RegistryController.TransactOpts, newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryController *RegistryControllerTransactorSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.SetOwner(&_RegistryController.TransactOpts, newOwner)
}

// SetStore is a paid mutator transaction binding the contract method 0x087cbd40.
//
// Solidity: function setStore(store address) returns()
func (_RegistryController *RegistryControllerTransactor) SetStore(opts *bind.TransactOpts, store common.Address) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "setStore", store)
}

// SetStore is a paid mutator transaction binding the contract method 0x087cbd40.
//
// Solidity: function setStore(store address) returns()
func (_RegistryController *RegistryControllerSession) SetStore(store common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.SetStore(&_RegistryController.TransactOpts, store)
}

// SetStore is a paid mutator transaction binding the contract method 0x087cbd40.
//
// Solidity: function setStore(store address) returns()
func (_RegistryController *RegistryControllerTransactorSession) SetStore(store common.Address) (*types.Transaction, error) {
	return _RegistryController.Contract.SetStore(&_RegistryController.TransactOpts, store)
}

// Unregister is a paid mutator transaction binding the contract method 0x1a0919dc.
//
// Solidity: function unregister(id bytes32) returns(bool)
func (_RegistryController *RegistryControllerTransactor) Unregister(opts *bind.TransactOpts, id [32]byte) (*types.Transaction, error) {
	return _RegistryController.contract.Transact(opts, "unregister", id)
}

// Unregister is a paid mutator transaction binding the contract method 0x1a0919dc.
//
// Solidity: function unregister(id bytes32) returns(bool)
func (_RegistryController *RegistryControllerSession) Unregister(id [32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.Unregister(&_RegistryController.TransactOpts, id)
}

// Unregister is a paid mutator transaction binding the contract method 0x1a0919dc.
//
// Solidity: function unregister(id bytes32) returns(bool)
func (_RegistryController *RegistryControllerTransactorSession) Unregister(id [32]byte) (*types.Transaction, error) {
	return _RegistryController.Contract.Unregister(&_RegistryController.TransactOpts, id)
}

// RegistryStoreABI is the input ABI used to generate the binding from.
const RegistryStoreABI = "[{\"constant\":false,\"inputs\":[{\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"remove\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"has_store\",\"outputs\":[{\"name\":\"owned\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"owner\",\"type\":\"address\"},{\"name\":\"profile\",\"type\":\"address\"}],\"name\":\"add\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"destroy\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"},{\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"can_store\",\"outputs\":[{\"name\":\"eligible\",\"type\":\"bool\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"ethkey\",\"type\":\"address\"}],\"name\":\"get_by_address\",\"outputs\":[{\"name\":\"profile\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"id\",\"type\":\"bytes32\"}],\"name\":\"get_by_id\",\"outputs\":[{\"name\":\"profile\",\"type\":\"address\"}],\"payable\":false,\"type\":\"function\"}]"

// RegistryStoreBin is the compiled bytecode used for deploying new contracts.
const RegistryStoreBin = `0x60606040525b60008054600160a060020a03191633600160a060020a03161790555b5b610413806100316000396000f300606060405236156100725763ffffffff60e060020a60003504166313af403581146100775780632874528e146100925780632a1887bc146100c25780635ebd9a83146100f257806383197ef0146101285780638d34cbb714610137578063b96b099f14610167578063d1a7c77f1461019c575b610000565b3461000057610090600160a060020a03600435166101c8565b005b34610000576100ae600435600160a060020a03602435166101fb565b604080519115158252519081900360200190f35b34610000576100ae600435600160a060020a036024351661026e565b604080519115158252519081900360200190f35b34610000576100ae600435600160a060020a03602435811690604435166102a3565b604080519115158252519081900360200190f35b3461000057610090610321565b005b34610000576100ae600435600160a060020a0360243516610345565b604080519115158252519081900360200190f35b3461000057610180600160a060020a0360043516610381565b60408051600160a060020a039092168252519081900360200190f35b34610000576101806004356103a2565b60408051600160a060020a039092168252519081900360200190f35b6101d06103c0565b15156101db57610000565b60008054600160a060020a031916600160a060020a0383161790555b5b50565b60006102056103c0565b151561021057610000565b61021a838361026e565b15610263575060008281526002602090815260408083208054600160a060020a0319908116909155600160a060020a038516845260019283905292208054909216909155610267565b5060005b5b92915050565b600160a060020a0380821660009081526001602090815260408083205486845260029092529091205482169116145b92915050565b60006102ad6103c0565b15156102b857610000565b6102c28484610345565b156103155750600160a060020a0380831660009081526001602081815260408084208054958716600160a060020a0319968716811790915588855260029092529092208054909316909117909155610319565b5060005b5b9392505050565b6103296103c0565b151561033457610000565b600054600160a060020a0316ff5b5b565b600080610351846103a2565b600160a060020a03161480156103785750600061036d83610381565b600160a060020a0316145b90505b92915050565b600160a060020a03808216600090815260016020526040902054165b919050565b600081815260026020526040902054600160a060020a03165b919050565b6000805433600160a060020a03908116911614156103e0575060016103e4565b5060005b905600a165627a7a7230582030eff4dbdbaed5f457f5c28430efcdef368d625d49d214185b915791c3fee8630029`

// DeployRegistryStore deploys a new Ethereum contract, binding an instance of RegistryStore to it.
func DeployRegistryStore(auth *bind.TransactOpts, backend bind.ContractBackend) (common.Address, *types.Transaction, *RegistryStore, error) {
	parsed, err := abi.JSON(strings.NewReader(RegistryStoreABI))
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	address, tx, contract, err := bind.DeployContract(auth, parsed, common.FromHex(RegistryStoreBin), backend)
	if err != nil {
		return common.Address{}, nil, nil, err
	}
	return address, tx, &RegistryStore{RegistryStoreCaller: RegistryStoreCaller{contract: contract}, RegistryStoreTransactor: RegistryStoreTransactor{contract: contract}}, nil
}

// RegistryStore is an auto generated Go binding around an Ethereum contract.
type RegistryStore struct {
	RegistryStoreCaller     // Read-only binding to the contract
	RegistryStoreTransactor // Write-only binding to the contract
}

// RegistryStoreCaller is an auto generated read-only Go binding around an Ethereum contract.
type RegistryStoreCaller struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// RegistryStoreTransactor is an auto generated write-only Go binding around an Ethereum contract.
type RegistryStoreTransactor struct {
	contract *bind.BoundContract // Generic contract wrapper for the low level calls
}

// RegistryStoreSession is an auto generated Go binding around an Ethereum contract,
// with pre-set call and transact options.
type RegistryStoreSession struct {
	Contract     *RegistryStore    // Generic contract binding to set the session for
	CallOpts     bind.CallOpts     // Call options to use throughout this session
	TransactOpts bind.TransactOpts // Transaction auth options to use throughout this session
}

// RegistryStoreCallerSession is an auto generated read-only Go binding around an Ethereum contract,
// with pre-set call options.
type RegistryStoreCallerSession struct {
	Contract *RegistryStoreCaller // Generic contract caller binding to set the session for
	CallOpts bind.CallOpts        // Call options to use throughout this session
}

// RegistryStoreTransactorSession is an auto generated write-only Go binding around an Ethereum contract,
// with pre-set transact options.
type RegistryStoreTransactorSession struct {
	Contract     *RegistryStoreTransactor // Generic contract transactor binding to set the session for
	TransactOpts bind.TransactOpts        // Transaction auth options to use throughout this session
}

// RegistryStoreRaw is an auto generated low-level Go binding around an Ethereum contract.
type RegistryStoreRaw struct {
	Contract *RegistryStore // Generic contract binding to access the raw methods on
}

// RegistryStoreCallerRaw is an auto generated low-level read-only Go binding around an Ethereum contract.
type RegistryStoreCallerRaw struct {
	Contract *RegistryStoreCaller // Generic read-only contract binding to access the raw methods on
}

// RegistryStoreTransactorRaw is an auto generated low-level write-only Go binding around an Ethereum contract.
type RegistryStoreTransactorRaw struct {
	Contract *RegistryStoreTransactor // Generic write-only contract binding to access the raw methods on
}

// NewRegistryStore creates a new instance of RegistryStore, bound to a specific deployed contract.
func NewRegistryStore(address common.Address, backend bind.ContractBackend) (*RegistryStore, error) {
	contract, err := bindRegistryStore(address, backend, backend)
	if err != nil {
		return nil, err
	}
	return &RegistryStore{RegistryStoreCaller: RegistryStoreCaller{contract: contract}, RegistryStoreTransactor: RegistryStoreTransactor{contract: contract}}, nil
}

// NewRegistryStoreCaller creates a new read-only instance of RegistryStore, bound to a specific deployed contract.
func NewRegistryStoreCaller(address common.Address, caller bind.ContractCaller) (*RegistryStoreCaller, error) {
	contract, err := bindRegistryStore(address, caller, nil)
	if err != nil {
		return nil, err
	}
	return &RegistryStoreCaller{contract: contract}, nil
}

// NewRegistryStoreTransactor creates a new write-only instance of RegistryStore, bound to a specific deployed contract.
func NewRegistryStoreTransactor(address common.Address, transactor bind.ContractTransactor) (*RegistryStoreTransactor, error) {
	contract, err := bindRegistryStore(address, nil, transactor)
	if err != nil {
		return nil, err
	}
	return &RegistryStoreTransactor{contract: contract}, nil
}

// bindRegistryStore binds a generic wrapper to an already deployed contract.
func bindRegistryStore(address common.Address, caller bind.ContractCaller, transactor bind.ContractTransactor) (*bind.BoundContract, error) {
	parsed, err := abi.JSON(strings.NewReader(RegistryStoreABI))
	if err != nil {
		return nil, err
	}
	return bind.NewBoundContract(address, parsed, caller, transactor), nil
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_RegistryStore *RegistryStoreRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _RegistryStore.Contract.RegistryStoreCaller.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_RegistryStore *RegistryStoreRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryStore.Contract.RegistryStoreTransactor.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_RegistryStore *RegistryStoreRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _RegistryStore.Contract.RegistryStoreTransactor.contract.Transact(opts, method, params...)
}

// Call invokes the (constant) contract method with params as input values and
// sets the output to result. The result type might be a single field for simple
// returns, a slice of interfaces for anonymous returns and a struct for named
// returns.
func (_RegistryStore *RegistryStoreCallerRaw) Call(opts *bind.CallOpts, result interface{}, method string, params ...interface{}) error {
	return _RegistryStore.Contract.contract.Call(opts, result, method, params...)
}

// Transfer initiates a plain transaction to move funds to the contract, calling
// its default method if one is available.
func (_RegistryStore *RegistryStoreTransactorRaw) Transfer(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryStore.Contract.contract.Transfer(opts)
}

// Transact invokes the (paid) contract method with params as input values.
func (_RegistryStore *RegistryStoreTransactorRaw) Transact(opts *bind.TransactOpts, method string, params ...interface{}) (*types.Transaction, error) {
	return _RegistryStore.Contract.contract.Transact(opts, method, params...)
}

// Can_store is a free data retrieval call binding the contract method 0x8d34cbb7.
//
// Solidity: function can_store(id bytes32, owner address) constant returns(eligible bool)
func (_RegistryStore *RegistryStoreCaller) Can_store(opts *bind.CallOpts, id [32]byte, owner common.Address) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _RegistryStore.contract.Call(opts, out, "can_store", id, owner)
	return *ret0, err
}

// Can_store is a free data retrieval call binding the contract method 0x8d34cbb7.
//
// Solidity: function can_store(id bytes32, owner address) constant returns(eligible bool)
func (_RegistryStore *RegistryStoreSession) Can_store(id [32]byte, owner common.Address) (bool, error) {
	return _RegistryStore.Contract.Can_store(&_RegistryStore.CallOpts, id, owner)
}

// Can_store is a free data retrieval call binding the contract method 0x8d34cbb7.
//
// Solidity: function can_store(id bytes32, owner address) constant returns(eligible bool)
func (_RegistryStore *RegistryStoreCallerSession) Can_store(id [32]byte, owner common.Address) (bool, error) {
	return _RegistryStore.Contract.Can_store(&_RegistryStore.CallOpts, id, owner)
}

// Get_by_address is a free data retrieval call binding the contract method 0xb96b099f.
//
// Solidity: function get_by_address(ethkey address) constant returns(profile address)
func (_RegistryStore *RegistryStoreCaller) Get_by_address(opts *bind.CallOpts, ethkey common.Address) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _RegistryStore.contract.Call(opts, out, "get_by_address", ethkey)
	return *ret0, err
}

// Get_by_address is a free data retrieval call binding the contract method 0xb96b099f.
//
// Solidity: function get_by_address(ethkey address) constant returns(profile address)
func (_RegistryStore *RegistryStoreSession) Get_by_address(ethkey common.Address) (common.Address, error) {
	return _RegistryStore.Contract.Get_by_address(&_RegistryStore.CallOpts, ethkey)
}

// Get_by_address is a free data retrieval call binding the contract method 0xb96b099f.
//
// Solidity: function get_by_address(ethkey address) constant returns(profile address)
func (_RegistryStore *RegistryStoreCallerSession) Get_by_address(ethkey common.Address) (common.Address, error) {
	return _RegistryStore.Contract.Get_by_address(&_RegistryStore.CallOpts, ethkey)
}

// Get_by_id is a free data retrieval call binding the contract method 0xd1a7c77f.
//
// Solidity: function get_by_id(id bytes32) constant returns(profile address)
func (_RegistryStore *RegistryStoreCaller) Get_by_id(opts *bind.CallOpts, id [32]byte) (common.Address, error) {
	var (
		ret0 = new(common.Address)
	)
	out := ret0
	err := _RegistryStore.contract.Call(opts, out, "get_by_id", id)
	return *ret0, err
}

// Get_by_id is a free data retrieval call binding the contract method 0xd1a7c77f.
//
// Solidity: function get_by_id(id bytes32) constant returns(profile address)
func (_RegistryStore *RegistryStoreSession) Get_by_id(id [32]byte) (common.Address, error) {
	return _RegistryStore.Contract.Get_by_id(&_RegistryStore.CallOpts, id)
}

// Get_by_id is a free data retrieval call binding the contract method 0xd1a7c77f.
//
// Solidity: function get_by_id(id bytes32) constant returns(profile address)
func (_RegistryStore *RegistryStoreCallerSession) Get_by_id(id [32]byte) (common.Address, error) {
	return _RegistryStore.Contract.Get_by_id(&_RegistryStore.CallOpts, id)
}

// Has_store is a free data retrieval call binding the contract method 0x2a1887bc.
//
// Solidity: function has_store(id bytes32, owner address) constant returns(owned bool)
func (_RegistryStore *RegistryStoreCaller) Has_store(opts *bind.CallOpts, id [32]byte, owner common.Address) (bool, error) {
	var (
		ret0 = new(bool)
	)
	out := ret0
	err := _RegistryStore.contract.Call(opts, out, "has_store", id, owner)
	return *ret0, err
}

// Has_store is a free data retrieval call binding the contract method 0x2a1887bc.
//
// Solidity: function has_store(id bytes32, owner address) constant returns(owned bool)
func (_RegistryStore *RegistryStoreSession) Has_store(id [32]byte, owner common.Address) (bool, error) {
	return _RegistryStore.Contract.Has_store(&_RegistryStore.CallOpts, id, owner)
}

// Has_store is a free data retrieval call binding the contract method 0x2a1887bc.
//
// Solidity: function has_store(id bytes32, owner address) constant returns(owned bool)
func (_RegistryStore *RegistryStoreCallerSession) Has_store(id [32]byte, owner common.Address) (bool, error) {
	return _RegistryStore.Contract.Has_store(&_RegistryStore.CallOpts, id, owner)
}

// Add is a paid mutator transaction binding the contract method 0x5ebd9a83.
//
// Solidity: function add(id bytes32, owner address, profile address) returns(bool)
func (_RegistryStore *RegistryStoreTransactor) Add(opts *bind.TransactOpts, id [32]byte, owner common.Address, profile common.Address) (*types.Transaction, error) {
	return _RegistryStore.contract.Transact(opts, "add", id, owner, profile)
}

// Add is a paid mutator transaction binding the contract method 0x5ebd9a83.
//
// Solidity: function add(id bytes32, owner address, profile address) returns(bool)
func (_RegistryStore *RegistryStoreSession) Add(id [32]byte, owner common.Address, profile common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.Add(&_RegistryStore.TransactOpts, id, owner, profile)
}

// Add is a paid mutator transaction binding the contract method 0x5ebd9a83.
//
// Solidity: function add(id bytes32, owner address, profile address) returns(bool)
func (_RegistryStore *RegistryStoreTransactorSession) Add(id [32]byte, owner common.Address, profile common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.Add(&_RegistryStore.TransactOpts, id, owner, profile)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryStore *RegistryStoreTransactor) Destroy(opts *bind.TransactOpts) (*types.Transaction, error) {
	return _RegistryStore.contract.Transact(opts, "destroy")
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryStore *RegistryStoreSession) Destroy() (*types.Transaction, error) {
	return _RegistryStore.Contract.Destroy(&_RegistryStore.TransactOpts)
}

// Destroy is a paid mutator transaction binding the contract method 0x83197ef0.
//
// Solidity: function destroy() returns()
func (_RegistryStore *RegistryStoreTransactorSession) Destroy() (*types.Transaction, error) {
	return _RegistryStore.Contract.Destroy(&_RegistryStore.TransactOpts)
}

// Remove is a paid mutator transaction binding the contract method 0x2874528e.
//
// Solidity: function remove(id bytes32, owner address) returns(bool)
func (_RegistryStore *RegistryStoreTransactor) Remove(opts *bind.TransactOpts, id [32]byte, owner common.Address) (*types.Transaction, error) {
	return _RegistryStore.contract.Transact(opts, "remove", id, owner)
}

// Remove is a paid mutator transaction binding the contract method 0x2874528e.
//
// Solidity: function remove(id bytes32, owner address) returns(bool)
func (_RegistryStore *RegistryStoreSession) Remove(id [32]byte, owner common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.Remove(&_RegistryStore.TransactOpts, id, owner)
}

// Remove is a paid mutator transaction binding the contract method 0x2874528e.
//
// Solidity: function remove(id bytes32, owner address) returns(bool)
func (_RegistryStore *RegistryStoreTransactorSession) Remove(id [32]byte, owner common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.Remove(&_RegistryStore.TransactOpts, id, owner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryStore *RegistryStoreTransactor) SetOwner(opts *bind.TransactOpts, newOwner common.Address) (*types.Transaction, error) {
	return _RegistryStore.contract.Transact(opts, "setOwner", newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryStore *RegistryStoreSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.SetOwner(&_RegistryStore.TransactOpts, newOwner)
}

// SetOwner is a paid mutator transaction binding the contract method 0x13af4035.
//
// Solidity: function setOwner(newOwner address) returns()
func (_RegistryStore *RegistryStoreTransactorSession) SetOwner(newOwner common.Address) (*types.Transaction, error) {
	return _RegistryStore.Contract.SetOwner(&_RegistryStore.TransactOpts, newOwner)
}
