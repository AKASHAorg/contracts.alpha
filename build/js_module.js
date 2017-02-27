'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['AKASHA'] = (function builder () {
  var environments = {
      'develop': {},
      'live': {},
      'AETH': {}
    };

  function ContractWrapper (headers, _web3) {
    if (!_web3) {
      throw new Error('Must supply a Web3 connection!');
    }

    this.headers = headers;
    this._class = _web3.eth.contract(headers.interface);
  }

  ContractWrapper.prototype.deploy = function () {
    var args = new Array(arguments);
    args[args.length - 1].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  var passthroughs = ['at', 'new'];
  for (var i = 0; i < passthroughs.length; i += 1) {
    ContractWrapper.prototype[passthroughs[i]] = (function (passthrough) {
      return function () {
        return this._class[passthrough].apply(this._class, arguments);
      };
    })(passthroughs[i]);
  }

  function constructor (_web3, env) {
    if (!env) {
      env = {
      'objects': {},
      'type': 'internal'
    };
    }
    if(typeof env === "object" && !("objects" in env)) {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = {objects: environments[env]};
    }

    if (typeof _web3 === 'undefined') {
      if (!env.rpcURL) {
        throw new Error('Need either a Web3 instance or an RPC URL!');
      }
      _web3 = new Web3(new Web3.providers.HttpProvider(env.rpcURL));
    }

    this.headers = {
      'Profile': {
        'interface': [
          {
            'constant': true,
            'inputs': [],
            'name': '_id',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'sendTip',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': true,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'chunks',
                'type': 'bytes32[2]'
              }
            ],
            'name': 'setHash',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'name': '_hash',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [
              {
                'name': 'registrar',
                'type': 'address'
              },
              {
                'name': 'chunks',
                'type': 'bytes32[2]'
              },
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'forwardAddr',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'from',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'Tip',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '606060405234156200000d57fe5b60405160a0806200111e833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6200010c6001620001b964010000000002620004f8176401000000009004565b5b8260039060026200012092919062000438565b5083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600581600019169055505b50505050620004ab565b620001d762000203640100000000026200099e176401000000009004565b1515620001e45762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000266576001905062000435565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620002b2576000905062000435565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200041357fe5b60325a03f115156200042157fe5b50505060405180519050905062000435565b5b5b90565b826002810192821562000470579160200282015b828111156200046f5782518290600019169055916020019190600101906200044c565b5b5090506200047f919062000483565b5090565b620004a891905b80821115620004a45760008160009055506001016200048a565b5090565b90565b610c6380620004bb6000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305180237146100d057806313af4035146100fe578063328d8f72146101345780633af32abf14610156578063502c4065146101a45780636aa633b6146101c65780637a9e5e4b146101f057806383197ef0146102265780638da5cb5b146102385780639281aa0b1461028a578063a5685446146102cb578063b32ae69d1461030e578063b70096131461034a578063bf7e214f146103df575bfe5b34156100d857fe5b6100e0610431565b60405180826000191660001916815260200191505060405180910390f35b341561010657fe5b610132600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610437565b005b341561013c57fe5b610154600480803515159060200190919050506104f8565b005b341561015e57fe5b61018a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061052a565b604051808215151515815260200191505060405180910390f35b6101ac610591565b604051808215151515815260200191505060405180910390f35b34156101ce57fe5b6101d661066e565b604051808215151515815260200191505060405180910390f35b34156101f857fe5b610224600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610686565b005b341561022e57fe5b610236610747565b005b341561024057fe5b6102486107e1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029257fe5b6102c9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610807565b005b34156102d357fe5b61030c60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610877565b005b341561031657fe5b61032c6004808035906020019091905050610948565b60405180826000191660001916815260200191505060405180910390f35b341561035257fe5b6103c5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610963565b604051808215151515815260200191505060405180910390f35b34156103e757fe5b6103ef610978565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60055481565b61043f61099e565b151561044a57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61050061099e565b151561050b57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600061053461066e565b80156105895750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f1935050505015610666577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16001905061066b565b610000565b90565b6000600160149054906101000a900460ff1690505b90565b61068e61099e565b151561069957610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107a357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61080f61099e565b151561081a57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b61087f61099e565b151561088a57610000565b80600390600261089b929190610bcc565b50600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6005546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b151561093357fe5b60325a03f1151561094057fe5b5050505b5b50565b60038160028110151561095757fe5b0160005b915090505481565b600061096e8461052a565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109ff5760019050610bc9565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a495760009050610bc9565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515610ba957fe5b60325a03f11515610bb657fe5b505050604051805190509050610bc9565b5b5b90565b8260028101928215610c01579160200282015b82811115610c00578251829060001916905591602001919060010190610bdf565b5b509050610c0e9190610c12565b5090565b610c3491905b80821115610c30576000816000905550600101610c18565b5090565b905600a165627a7a72305820c5bfd995cb71dbce56a24f33931164e7bbee76a0f413ece72a6a763fc17e3e400029'
      },
      'Callback': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'addr',
                'type': 'address'
              },
              {
                'name': 'eventName',
                'type': 'string'
              },
              {
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b6101258061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636985e72414603a575bfe5b3415604157fe5b60f1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060f3565b005b5b5050505600a165627a7a723058208b6f836c217725e8e375b5c2fdb6dcfdc0d79c8272371a905636598073a5ed420029'
      },
      'SMS': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'number',
                'type': 'string'
              },
              {
                'name': 'message',
                'type': 'string'
              }
            ],
            'name': 'send',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b6101058061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bd6de11c14603a575bfe5b3415604157fe5b60d2600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060d4565b005b5b50505600a165627a7a7230582072aa61a3a29456a1e84e422209f9257fd1a029d42979cec0f8435ec31036eff20029'
      },
      'Script': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101ef806100c96000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100665780639fc288d1146100a9578063d900596c146100bb575b341561005d57fe5b6100645b5b565b005b341561006e57fe5b6100a760048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100cd565b005b34156100b157fe5b6100b9610145565b005b34156100c357fe5b6100cb610184565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a7230582084d29301b3855ebbd9ae4c3c9c78455e9b0b0d83b0e5aa2a099f74291f5658710029'
      },
      'System': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'input',
                'type': 'string'
              }
            ],
            'name': 'to_uint',
            'outputs': [
              {
                'name': 'output',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b60dd8061001b6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360cfa96314603a575bfe5b3415604157fe5b608f600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060a5565b6040518082815260200191505060405180910390f35b6000600b90505b9190505600a165627a7a723058202551b4d9c0305ff57c854f97751e7450b5aed3e17d9f695debf9ca9deca002f40029'
      },
      'RegistryController': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'store',
                'type': 'address'
              }
            ],
            'name': 'setStore',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'unregister',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'emitUpdate',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'ipfs',
                'type': 'bytes32[2]'
              }
            ],
            'name': 'register',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'check_format',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'addressOf',
            'outputs': [
              {
                'name': 'profileAddress',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'address'
              }
            ],
            'name': 'isRegistered',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newController',
                'type': 'address'
              }
            ],
            'name': 'migrate',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'key',
                'type': 'address'
              }
            ],
            'name': 'addressOfKey',
            'outputs': [
              {
                'name': 'profileAddress',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'profile',
                'type': 'address'
              }
            ],
            'name': 'Register',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'profile',
                'type': 'address'
              }
            ],
            'name': 'UpdateProfile',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000d55176401000000009004565b5b62000356565b620000f56200012164010000000002620017bf176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000184576001905062000353565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d0576000905062000353565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033157fe5b60325a03f115156200033f57fe5b50505060405180519050905062000353565b5b5b90565b612b4f80620003666000396000f3006060604052361562000119576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063087cbd40146200011b57806313af403514620001545780631a0919dc146200018d5780631f8db42d14620001cc57806330d0001214620001f3578063328d8f7214620002865780633af32abf14620002ab5780636aa633b614620002fc5780636b4316db14620003295780637a9e5e4b146200036857806383197ef014620003a15780638da5cb5b14620003b65780639281aa0b146200040b578063b7009613146200044f578063bb34534c14620004e7578063bf7e214f146200054e578063c3c5a54714620005a3578063ce5494bb14620005f4578063d5a760f5146200062d575bfe5b34156200012457fe5b62000152600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620006a6565b005b34156200015d57fe5b6200018b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000703565b005b34156200019657fe5b620001b2600480803560001916906020019091905050620007c8565b604051808215151515815260200191505060405180910390f35b3415620001d557fe5b620001f16004808035600019169060200190919050506200095a565b005b3415620001fc57fe5b62000244600480803560001916906020019091908060400190600280602002604051908101604052809291908260026020028082843782019150505050509190505062000ab8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156200028f57fe5b620002a96004808035151590602001909190505062000d55565b005b3415620002b457fe5b620002e2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000d8b565b604051808215151515815260200191505060405180910390f35b34156200030557fe5b6200030f62000df5565b604051808215151515815260200191505060405180910390f35b34156200033257fe5b6200034e60048080356000191690602001909190505062000e0d565b604051808215151515815260200191505060405180910390f35b34156200037157fe5b6200039f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620011f2565b005b3415620003aa57fe5b620003b4620012b7565b005b3415620003bf57fe5b620003c96200130c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156200041457fe5b6200044d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505062001332565b005b34156200045857fe5b620004cd600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050620013a6565b604051808215151515815260200191505060405180910390f35b3415620004f057fe5b6200050c600480803560001916906020019091905050620013bd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156200055757fe5b620005616200147e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415620005ac57fe5b620005da600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620014a4565b604051808215151515815260200191505060405180910390f35b3415620005fd57fe5b6200062b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620015b9565b005b34156200063657fe5b62000664600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620016da565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b620006b0620017bf565b1515620006bd5762000000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6200070d620017bf565b15156200071a5762000000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000620007d933620016da565b9150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632874528e85336000604051602001526040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b1515620008ae57fe5b60325a03f11515620008bc57fe5b50505060405180519050905080156200094e578173ffffffffffffffffffffffffffffffffffffffff166383197ef06040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b15156200093357fe5b60325a03f115156200094157fe5b5050506001925062000953565b600092505b5050919050565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562000a1057fe5b60325a03f1151562000a1e57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1614151562000a4c5762000000565b80600019167fdf5c699569cbe77bd306dae8199f30a79b466d3420dd133672100ae9fa68660433604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b50565b60006000600062000ac98562000e0d565b151562000ad65762000000565b3084863362000ae4620019f4565b808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018460026020028083836000831462000b50575b80518252602083111562000b505760208201915060208101905060208303925062000b2a565b50505090500183600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f080151562000bb057fe5b9150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ebd9a838633856000604051602001526040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018084600019166000191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019350505050602060405180830381600087803b151562000cb957fe5b60325a03f1151562000cc757fe5b50505060405180519050905080151562000ce15762000000565b84600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca683604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28192505b505092915050565b62000d5f620017bf565b151562000d6c5762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600062000d9762000df5565b801562000ded5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b60006000600090505b602060ff168160ff161015620011e25760007f010000000000000000000000000000000000000000000000000000000000000002838260ff1660208110151562000e5c57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000eae57620011e2565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff1660208110151562000ee457fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180620010b9575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff1660208110151562000f6757fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191610801562001032575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff1660208110151562000feb57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015620010b85750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015156200107057fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80620011c3575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515620010f657fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015620011c25750602e7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015156200117a57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15620011d35760009150620011ec565b5b808060010191505062000e16565b60038160ff161191505b50919050565b620011fc620017bf565b1515620012095762000000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b620012c1620017bf565b1515620012ce5762000000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6200133c620017bf565b1515620013495762000000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000620013b38462000d8b565b90505b9392505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156200145e57fe5b60325a03f115156200146c57fe5b5050506040518051905090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156200158157fe5b60325a03f115156200158f57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff16141590505b919050565b620015c3620017bf565b1515620015d05762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166313af4035826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156200168a57fe5b60325a03f115156200169857fe5b505050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156200179f57fe5b60325a03f11515620017ad57fe5b5050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620018225760019050620019f1565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156200186e5760009050620019f1565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515620019cf57fe5b60325a03f11515620019dd57fe5b505050604051805190509050620019f1565b5b5b90565b60405161111e8062001a06833901905600606060405234156200000d57fe5b60405160a0806200111e833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6200010c6001620001b964010000000002620004f8176401000000009004565b5b8260039060026200012092919062000438565b5083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600581600019169055505b50505050620004ab565b620001d762000203640100000000026200099e176401000000009004565b1515620001e45762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000266576001905062000435565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620002b2576000905062000435565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200041357fe5b60325a03f115156200042157fe5b50505060405180519050905062000435565b5b5b90565b826002810192821562000470579160200282015b828111156200046f5782518290600019169055916020019190600101906200044c565b5b5090506200047f919062000483565b5090565b620004a891905b80821115620004a45760008160009055506001016200048a565b5090565b90565b610c6380620004bb6000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305180237146100d057806313af4035146100fe578063328d8f72146101345780633af32abf14610156578063502c4065146101a45780636aa633b6146101c65780637a9e5e4b146101f057806383197ef0146102265780638da5cb5b146102385780639281aa0b1461028a578063a5685446146102cb578063b32ae69d1461030e578063b70096131461034a578063bf7e214f146103df575bfe5b34156100d857fe5b6100e0610431565b60405180826000191660001916815260200191505060405180910390f35b341561010657fe5b610132600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610437565b005b341561013c57fe5b610154600480803515159060200190919050506104f8565b005b341561015e57fe5b61018a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061052a565b604051808215151515815260200191505060405180910390f35b6101ac610591565b604051808215151515815260200191505060405180910390f35b34156101ce57fe5b6101d661066e565b604051808215151515815260200191505060405180910390f35b34156101f857fe5b610224600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610686565b005b341561022e57fe5b610236610747565b005b341561024057fe5b6102486107e1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029257fe5b6102c9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610807565b005b34156102d357fe5b61030c60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610877565b005b341561031657fe5b61032c6004808035906020019091905050610948565b60405180826000191660001916815260200191505060405180910390f35b341561035257fe5b6103c5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610963565b604051808215151515815260200191505060405180910390f35b34156103e757fe5b6103ef610978565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60055481565b61043f61099e565b151561044a57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61050061099e565b151561050b57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600061053461066e565b80156105895750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f1935050505015610666577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a16001905061066b565b610000565b90565b6000600160149054906101000a900460ff1690505b90565b61068e61099e565b151561069957610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107a357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61080f61099e565b151561081a57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b61087f61099e565b151561088a57610000565b80600390600261089b929190610bcc565b50600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6005546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b151561093357fe5b60325a03f1151561094057fe5b5050505b5b50565b60038160028110151561095757fe5b0160005b915090505481565b600061096e8461052a565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109ff5760019050610bc9565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a495760009050610bc9565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515610ba957fe5b60325a03f11515610bb657fe5b505050604051805190509050610bc9565b5b5b90565b8260028101928215610c01579160200282015b82811115610c00578251829060001916905591602001919060010190610bdf565b5b509050610c0e9190610c12565b5090565b610c3491905b80821115610c30576000816000905550600101610c18565b5090565b905600a165627a7a72305820c5bfd995cb71dbce56a24f33931164e7bbee76a0f413ece72a6a763fc17e3e400029a165627a7a72305820f56c18027258aefd9d1f9df2d1eacdc22d09417cd4886a08f77893b1ef1619340029'
      },
      'RegistryStore': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'remove',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'has_store',
            'outputs': [
              {
                'name': 'owned',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'owner',
                'type': 'address'
              },
              {
                'name': 'profile',
                'type': 'address'
              }
            ],
            'name': 'add',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'can_store',
            'outputs': [
              {
                'name': 'eligible',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'ethkey',
                'type': 'address'
              }
            ],
            'name': 'get_by_address',
            'outputs': [
              {
                'name': 'profile',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'get_by_id',
            'outputs': [
              {
                'name': 'profile',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d7640100000000026200084b176401000000009004565b5b62000356565b620000f5620001216401000000000262000d24176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000184576001905062000353565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d0576000905062000353565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033157fe5b60325a03f115156200033f57fe5b50505060405180519050905062000353565b5b5b90565b610f7e80620003666000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100e65780632874528e1461011c5780632a1887bc14610177578063328d8f72146101d25780633af32abf146101f45780635ebd9a83146102425780636aa633b6146102bc5780637a9e5e4b146102e657806383197ef01461031c5780638d34cbb71461032e5780638da5cb5b146103895780639281aa0b146103db578063b70096131461041c578063b96b099f146104b1578063bf7e214f14610527578063d1a7c77f14610579575bfe5b34156100ee57fe5b61011a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105dd565b005b341561012457fe5b61015d60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061069e565b604051808215151515815260200191505060405180910390f35b341561017f57fe5b6101b860048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610777565b604051808215151515815260200191505060405180910390f35b34156101da57fe5b6101f26004808035151590602001909190505061084b565b005b34156101fc57fe5b610228600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061087d565b604051808215151515815260200191505060405180910390f35b341561024a57fe5b6102a260048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108e4565b604051808215151515815260200191505060405180910390f35b34156102c457fe5b6102cc6109f6565b604051808215151515815260200191505060405180910390f35b34156102ee57fe5b61031a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a0e565b005b341561032457fe5b61032c610acf565b005b341561033657fe5b61036f60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b20565b604051808215151515815260200191505060405180910390f35b341561039157fe5b610399610ba3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103e357fe5b61041a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610bc9565b005b341561042457fe5b610497600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610c39565b604051808215151515815260200191505060405180910390f35b34156104b957fe5b6104e5600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c4e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561052f57fe5b610537610cb8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561058157fe5b61059b600480803560001916906020019091905050610cde565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105e5610d24565b15156105f057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006106a8610d24565b15156106b357610000565b6106bd8383610777565b1561076b5760046000846000191660001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560019050610770565b600090505b5b92915050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660046000856000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b92915050565b610853610d24565b151561085e57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006108876109f6565b80156108dc5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006108ee610d24565b15156108f957610000565b6109038484610b20565b156109e95781600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160046000866000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190506109ee565b600090505b5b9392505050565b6000600160149054906101000a900460ff1690505b90565b610a16610d24565b1515610a2157610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610ad7610d24565b1515610ae257610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600073ffffffffffffffffffffffffffffffffffffffff16610b4384610cde565b73ffffffffffffffffffffffffffffffffffffffff16148015610b9a5750600073ffffffffffffffffffffffffffffffffffffffff16610b8283610c4e565b73ffffffffffffffffffffffffffffffffffffffff16145b90505b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610bd1610d24565b1515610bdc57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000610c448461087d565b90505b9392505050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060046000836000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d855760019050610f4f565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610dcf5760009050610f4f565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515610f2f57fe5b60325a03f11515610f3c57fe5b505050604051805190509050610f4f565b5b5b905600a165627a7a723058204c02dcc6ca00d339d535642a852a424698a41c0ea101c9e4d28359aebe9ee0f60029'
      },
      'Feed': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'idIndex',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowersById',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowingFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowersFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'next',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowersNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'prev',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowingPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'unFollow',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowersCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'next',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowingNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowersLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'following',
                'type': 'bytes32'
              }
            ],
            'name': 'isFollower',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'repository',
                'type': 'string'
              },
              {
                'name': 'newVersion',
                'type': 'bytes32'
              },
              {
                'name': 'releaseNotes',
                'type': 'string'
              }
            ],
            'name': 'setVersion',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'follow',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getAppState',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              },
              {
                'name': '',
                'type': 'string'
              },
              {
                'name': '',
                'type': 'string'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowingLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getFollowingCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'follower',
                'type': 'bytes32'
              },
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'isFollowing',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'prev',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowersPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'idIndex',
                'type': 'uint256'
              }
            ],
            'name': 'getFollowingById',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'following',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'follower',
                'type': 'address'
              }
            ],
            'name': 'Follow',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'newVersion',
                'type': 'bytes32'
              }
            ],
            'name': 'UpdateVersion',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000d8d176401000000009004565b5b62000356565b620000f56200012164010000000002620036f9176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000184576001905062000353565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d0576000905062000353565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033157fe5b60325a03f115156200033f57fe5b50505060405180519050905062000353565b5b5b90565b613a0c80620003666000396000f30060606040523615610173576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af403514610175578063140eccef146101ab5780631c9be5f414610218578063328d8f72146102505780633af32abf14610272578063624d47fc146102c05780636aa633b6146102f85780636b40adb2146103225780636e1d7eab14610363578063739453e3146103a45780637775ec3a146103c85780637a1fa187146104005780637a9e5e4b146104415780637c32db101461047757806383197ef0146104af5780638a3ace18146104c15780638da5cb5b1461050a5780639281aa0b1461055c578063a1e85c0f1461059d578063a66b774814610647578063a91ee0dc1461066b578063b5d78d8c146106a1578063b7009613146107c3578063bd10e57c14610858578063bf7e214f14610890578063d83bc5c5146108e2578063da72f92b1461091a578063f91427f414610963578063ffe466c9146109a4575bfe5b341561017d57fe5b6101a9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a11565b005b34156101b357fe5b6101d6600480803560001916906020019091908035906020019091905050610ad2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561022057fe5b61023a600480803560001916906020019091905050610c05565b6040518082815260200191505060405180910390f35b341561025857fe5b61027060048080351515906020019091905050610d8d565b005b341561027a57fe5b6102a6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610dbf565b604051808215151515815260200191505060405180910390f35b34156102c857fe5b6102e2600480803560001916906020019091905050610e26565b6040518082815260200191505060405180910390f35b341561030057fe5b610308610fae565b604051808215151515815260200191505060405180910390f35b341561032a57fe5b61034d600480803560001916906020019091908035906020019091905050610fc6565b6040518082815260200191505060405180910390f35b341561036b57fe5b61038e600480803560001916906020019091908035906020019091905050611157565b6040518082815260200191505060405180910390f35b34156103ac57fe5b6103c66004808035600019169060200190919050506112e8565b005b34156103d057fe5b6103ea600480803560001916906020019091905050611a98565b6040518082815260200191505060405180910390f35b341561040857fe5b61042b600480803560001916906020019091908035906020019091905050611c20565b6040518082815260200191505060405180910390f35b341561044957fe5b610475600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611db1565b005b341561047f57fe5b610499600480803560001916906020019091905050611e72565b6040518082815260200191505060405180910390f35b34156104b757fe5b6104bf611ffa565b005b34156104c957fe5b6104f06004808035600019169060200190919080356000191690602001909190505061204b565b604051808215151515815260200191505060405180910390f35b341561051257fe5b61051a612242565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561056457fe5b61059b600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050612268565b005b34156105a557fe5b610645600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080356000191690602001909190803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506122d8565b005b341561064f57fe5b61066960048080356000191690602001909190505061236c565b005b341561067357fe5b61069f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612d31565b005b34156106a957fe5b6106b1612d8a565b6040518084600019166000191681526020018060200180602001838103835285818151815260200191508051906020019080838360008314610712575b805182526020831115610712576020820191506020810190506020830392506106ee565b505050905090810190601f16801561073e5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360008314610786575b80518252602083111561078657602082019150602081019050602083039250610762565b505050905090810190601f1680156107b25780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34156107cb57fe5b61083e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050612ee7565b604051808215151515815260200191505060405180910390f35b341561086057fe5b61087a600480803560001916906020019091905050612efc565b6040518082815260200191505060405180910390f35b341561089857fe5b6108a0613084565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156108ea57fe5b6109046004808035600019169060200190919050506130aa565b6040518082815260200191505060405180910390f35b341561092257fe5b61094960048080356000191690602001909190803560001916906020019091905050613232565b604051808215151515815260200191505060405180910390f35b341561096b57fe5b61098e600480803560001916906020019091908035906020019091905050613435565b6040518082815260200191505060405180910390f35b34156109ac57fe5b6109cf6004808035600019169060200190919080359060200190919050506135c6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610a196136f9565b1515610a2457610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515610b7657fe5b60325a03f11515610b8357fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515610ca957fe5b60325a03f11515610cb657fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610d6e57fe5b60325a03f41515610d7b57fe5b5050506040518051905090505b919050565b610d956136f9565b1515610da057610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610dc9610fae565b8015610e1e5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515610eca57fe5b60325a03f11515610ed757fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610f8f57fe5b60325a03f41515610f9c57fe5b5050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561106a57fe5b60325a03f1151561107757fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561113757fe5b60325a03f4151561114457fe5b5050506040518051905090505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156111fb57fe5b60325a03f1151561120857fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156112c857fe5b60325a03f415156112d557fe5b5050506040518051905090505b92915050565b6000600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156113b257fe5b60325a03f115156113bf57fe5b5050506040518051905015156113d457610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561147257fe5b60325a03f1151561147f57fe5b505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561154d57fe5b60325a03f1151561155a57fe5b505050604051805190509250600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156116f757610000565b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156117b257fe5b60325a03f415156117bf57fe5b5050506040518051905050600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561197e57fe5b60325a03f4151561198b57fe5b5050506040518051905050600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050505050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515611b3c57fe5b60325a03f11515611b4957fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515611c0157fe5b60325a03f41515611c0e57fe5b5050506040518051905090505b919050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515611cc457fe5b60325a03f11515611cd157fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515611d9157fe5b60325a03f41515611d9e57fe5b5050506040518051905090505b92915050565b611db96136f9565b1515611dc457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515611f1657fe5b60325a03f11515611f2357fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515611fdb57fe5b60325a03f41515611fe857fe5b5050506040518051905090505b919050565b6120026136f9565b151561200d57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156120f157fe5b60325a03f115156120fe57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c876000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156121e557fe5b60325a03f115156121f257fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141590505b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6122706136f9565b151561227b57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6122e06136f9565b15156122eb57610000565b8160048160001916905550806005908051906020019061230c929190613927565b508260069080519060200190612323929190613927565b507f963aa8cc97c90686d2e91dc5fcb4b4bafe269796db43183bf713be9d926193e360045460405180826000191660001916815260200191505060405180910390a15b5b505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561243257fe5b60325a03f1151561243f57fe5b50505060405180519050151561245457610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156124f257fe5b60325a03f115156124ff57fe5b505050604051805190509150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561254557610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561260757fe5b60325a03f1151561261457fe5b5050506040518051905090506000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415156126ae57610000565b600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c89091600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156129e957fe5b60325a03f415156129f657fe5b5050506040518051905050600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c89091600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515612c9857fe5b60325a03f41515612ca557fe5b50505060405180519050508173ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663582604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b612d396136f9565b1515612d4457610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000612d946139a7565b612d9c6139a7565b60045460066005818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612e385780601f10612e0d57610100808354040283529160200191612e38565b820191906000526020600020905b815481529060010190602001808311612e1b57829003601f168201915b50505050509150808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612ed45780601f10612ea957610100808354040283529160200191612ed4565b820191906000526020600020905b815481529060010190602001808311612eb757829003601f168201915b505050505090509250925092505b909192565b6000612ef284610dbf565b90505b9392505050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515612fa057fe5b60325a03f11515612fad57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561306557fe5b60325a03f4151561307257fe5b5050506040518051905090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561314e57fe5b60325a03f1151561315b57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561321357fe5b60325a03f4151561322057fe5b5050506040518051905090505b919050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156132d657fe5b60325a03f115156132e357fe5b505050604051805190509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561338d57fe5b60325a03f1151561339a57fe5b5050506040518051905090506000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141592505b505092915050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156134d957fe5b60325a03f115156134e657fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156135a657fe5b60325a03f415156135b357fe5b5050506040518051905090505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561366a57fe5b60325a03f1151561367757fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561375a5760019050613924565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156137a45760009050613924565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561390457fe5b60325a03f1151561391157fe5b505050604051805190509050613924565b5b5b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061396857805160ff1916838001178555613996565b82800160010185558215613996579182015b8281111561399557825182559160200191906001019061397a565b5b5090506139a391906139bb565b5090565b602060405190810160405280600081525090565b6139dd91905b808211156139d95760008160009055506001016139c1565b5090565b905600a165627a7a72305820b5c6afe83f164b4a41bb6b483fa397a719dc5a93e5dede6a2d1d8c592aa90d020029'
      },
      'Subs': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'subsLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'subscribe',
            'outputs': [
              {
                'name': 'subscribed',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'tag',
                'type': 'uint256'
              }
            ],
            'name': 'subsPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'isSubscribed',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'unSubscribe',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tags',
                'type': 'address'
              }
            ],
            'name': 'setTagSource',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'tag',
                'type': 'uint256'
              }
            ],
            'name': 'subsNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'subsCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'subsFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'tag',
                'type': 'uint256'
              },
              {
                'indexed': true,
                'name': 'subscriber',
                'type': 'address'
              }
            ],
            'name': 'Subscribe',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000beb176401000000009004565b5b62000356565b620000f5620001216401000000000262001b0d176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000184576001905062000353565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d0576000905062000353565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033157fe5b60325a03f115156200033f57fe5b50505060405180519050905062000353565b5b5b90565b611d6780620003666000396000f30060606040523615610110576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a7ed48a1461011257806313af40351461014a5780632faf44f614610180578063328d8f72146101bc5780633af32abf146101de5780636aa633b61461022c5780637329d4b0146102565780637a9e5e4b1461029757806383197ef0146102cd5780638da5cb5b146102df5780639281aa0b14610331578063a91ee0dc14610372578063b7009613146103a8578063b776ff6b1461043d578063baba90cf14610486578063bd95db11146104c2578063bf7e214f146104f8578063cb5356ec1461054a578063ea7ca08f1461058b578063fdb5c2d8146105c3575bfe5b341561011a57fe5b6101346004808035600019169060200190919050506105fb565b6040518082815260200191505060405180910390f35b341561015257fe5b61017e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610783565b005b341561018857fe5b6101a2600480803560001916906020019091905050610844565b604051808215151515815260200191505060405180910390f35b34156101c457fe5b6101dc60048080351515906020019091905050610beb565b005b34156101e657fe5b610212600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c1d565b604051808215151515815260200191505060405180910390f35b341561023457fe5b61023c610c84565b604051808215151515815260200191505060405180910390f35b341561025e57fe5b610281600480803560001916906020019091908035906020019091905050610c9c565b6040518082815260200191505060405180910390f35b341561029f57fe5b6102cb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e2d565b005b34156102d557fe5b6102dd610eee565b005b34156102e757fe5b6102ef610f3f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561033957fe5b610370600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610f65565b005b341561037a57fe5b6103a6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610fd5565b005b34156103b057fe5b610423600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190505061102e565b604051808215151515815260200191505060405180910390f35b341561044557fe5b61046c60048080356000191690602001909190803560001916906020019091905050611043565b604051808215151515815260200191505060405180910390f35b341561048e57fe5b6104a8600480803560001916906020019091905050611294565b604051808215151515815260200191505060405180910390f35b34156104ca57fe5b6104f6600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506115ed565b005b341561050057fe5b610508611646565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561055257fe5b61057560048080356000191690602001909190803590602001909190505061166c565b6040518082815260200191505060405180910390f35b341561059357fe5b6105ad6004808035600019169060200190919050506117fd565b6040518082815260200191505060405180910390f35b34156105cb57fe5b6105e5600480803560001916906020019091905050611985565b6040518082815260200191505060405180910390f35b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561069f57fe5b60325a03f115156106ac57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561076457fe5b60325a03f4151561077157fe5b5050506040518051905090505b919050565b61078b611b0d565b151561079657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561090c57fe5b60325a03f1151561091957fe5b50505060405180519050151561092e57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156109f057fe5b60325a03f115156109fd57fe5b505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515610aa757fe5b60325a03f11515610ab457fe5b505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c89091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515610b7b57fe5b60325a03f41515610b8857fe5b5050506040518051905092508215610be2578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b610bf3611b0d565b1515610bfe57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610c27610c84565b8015610c7c5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515610d4057fe5b60325a03f11515610d4d57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515610e0d57fe5b60325a03f41515610e1a57fe5b5050506040518051905090505b92915050565b610e35611b0d565b1515610e4057610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610ef6611b0d565b1515610f0157610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610f6d611b0d565b1515610f7857610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b610fdd611b0d565b1515610fe857610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600061103984610c1d565b90505b9392505050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156110e757fe5b60325a03f115156110f457fe5b505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561119e57fe5b60325a03f115156111ab57fe5b505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__639f58851f9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561127257fe5b60325a03f4151561127f57fe5b5050506040518051905092505b505092915050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561135c57fe5b60325a03f1151561136957fe5b50505060405180519050151561137e57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561144057fe5b60325a03f1151561144d57fe5b505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156114f757fe5b60325a03f1151561150457fe5b505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156115cb57fe5b60325a03f415156115d857fe5b5050506040518051905092505b5b5050919050565b6115f5611b0d565b151561160057610000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561171057fe5b60325a03f1151561171d57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156117dd57fe5b60325a03f415156117ea57fe5b5050506040518051905090505b92915050565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156118a157fe5b60325a03f115156118ae57fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561196657fe5b60325a03f4151561197357fe5b5050506040518051905090505b919050565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515611a2957fe5b60325a03f11515611a3657fe5b5050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515611aee57fe5b60325a03f41515611afb57fe5b5050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611b6e5760019050611d38565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611bb85760009050611d38565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515611d1857fe5b60325a03f11515611d2557fe5b505050604051805190509050611d38565b5b5b905600a165627a7a723058208f4a5c0298aea064a9997f6aeedf9f97991be067567337c0a3d07757a316afeb0029'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '60606040523415600b57fe5b5b60338060196000396000f30060606040525bfe00a165627a7a723058202bd8733d74712d6e6d2aee0407a231babd19a2f90b484f897f7b08e94783e5ae0029'
      },
      'DLinked': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'remove',
            'outputs': [
              {
                'name': 'removed',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'getNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'getPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'getFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'getSize',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'exists',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'insert',
            'outputs': [
              {
                'name': 'inserted',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'self',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'getLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b6105148061001c6000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e8478db1461008e5780633e552821146100c757806348eb81eb146100fc57806370da6fe61461013157806391c0ab631461015d5780639f58851f14610189578063b3dad4c8146101c2578063d6867e87146101fb575bfe5b6100ad6004808035906020019091908035906020019091905050610227565b604051808215151515815260200191505060405180910390f35b6100e66004808035906020019091908035906020019091905050610316565b6040518082815260200191505060405180910390f35b61011b6004808035906020019091908035906020019091905050610337565b6040518082815260200191505060405180910390f35b6101476004808035906020019091905050610358565b6040518082815260200191505060405180910390f35b6101736004808035906020019091905050610379565b6040518082815260200191505060405180910390f35b6101a86004808035906020019091908035906020019091905050610388565b604051808215151515815260200191505060405180910390f35b6101e160048080359060200190919080359060200190919050506103fc565b604051808215151515815260200191505060405180910390f35b61021160048080359060200190919050506104c7565b6040518082815260200191505060405180910390f35b60006102338383610388565b1561030c57600190508260010160008381526020019081526020016000205483600101600085600201600086815260200190815260200160002054815260200190815260200160002081905550826002016000838152602001908152602001600020548360020160008560010160008681526020019081526020016000205481526020019081526020016000208190555082600201600083815260200190815260200160002060009055826001016000838152602001908152602001600020600090558260000160008154809291906001900391905055505b8090505b92915050565b60008260010160008381526020019081526020016000205490505b92915050565b60008260020160008381526020019081526020016000205490505b92915050565b6000816001016000600081526020019081526020016000205490505b919050565b6000816000015490505b919050565b6000600082141561039857610000565b6000836002016000848152602001908152602001600020541415806103d3575060008360010160008481526020019081526020016000205414155b806103f35750818360010160006000815260200190815260200160002054145b90505b92915050565b60006104088383610388565b15156104bd576001905081836002016000856001016000600081526020019081526020016000205481526020019081526020016000208190555082600101600060008152602001908152602001600020548360010160008481526020019081526020016000208190555060008360020160008481526020019081526020016000208190555081836001016000600081526020019081526020016000208190555082600001600081548092919060010191905055505b8090505b92915050565b6000816002016000600081526020019081526020016000205490505b9190505600a165627a7a723058203c3e05d6cafc6d22ea1eb9a905bc7e95f38c25153d6b0a80d59a7ad9fba3ed6a0029'
      },
      'Funds': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'consumer',
                'type': 'address'
              },
              {
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'withdraw',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'payable': true,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'to',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Spend',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d364010000000002610489176401000000009004565b5b610346565b6100ee61011864010000000002610862176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101795760019050610343565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c35760009050610343565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561032357fe5b60325a03f1151561033057fe5b505050604051805190509050610343565b5b5b90565b610abc806103556000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100c1578063328d8f72146100f75780633af32abf146101195780636aa633b6146101675780637a9e5e4b1461019157806383197ef0146101c75780638da5cb5b146101d95780639281aa0b1461022b578063a91ee0dc1461026c578063b7009613146102a2578063bf7e214f14610337578063f3fef3a314610389575b6100bf5b5b565b005b34156100c957fe5b6100f5600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103c8565b005b34156100ff57fe5b61011760048080351515906020019091905050610489565b005b341561012157fe5b61014d600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104bb565b604051808215151515815260200191505060405180910390f35b341561016f57fe5b610177610522565b604051808215151515815260200191505060405180910390f35b341561019957fe5b6101c5600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061053a565b005b34156101cf57fe5b6101d76105fb565b005b34156101e157fe5b6101e961064c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561023357fe5b61026a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610672565b005b341561027457fe5b6102a0600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106e2565b005b34156102aa57fe5b61031d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190505061073b565b604051808215151515815260200191505060405180910390f35b341561033f57fe5b610347610750565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561039157fe5b6103c6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610776565b005b6103d0610862565b15156103db57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610491610862565b151561049c57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104c5610522565b801561051a5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b610542610862565b151561054d57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610603610862565b151561060e57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61067a610862565b151561068557610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6106ea610862565b15156106f557610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000610746846104bb565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000610780610862565b151561078b57610000565b3073ffffffffffffffffffffffffffffffffffffffff163182106107c6573073ffffffffffffffffffffffffffffffffffffffff16316107c8565b815b90508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050151561080d57610000565b8273ffffffffffffffffffffffffffffffffffffffff167faeba90871f7da8a443096c396877004da901c92fcab3ec900a99cecddb19ec4d836040518082815260200191505060405180910390a25b5b505050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156108c35760019050610a8d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561090d5760009050610a8d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515610a6d57fe5b60325a03f11515610a7a57fe5b505050604051805190509050610a8d565b5b5b905600a165627a7a72305820ef7bb093d249287d814d6f93ec0a28ccaea15c4d94be956e0da04425f47c428f0029'
      },
      'BaseStore': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d3640100000000026103f7176401000000009004565b5b610346565b6100ee6101186401000000000261068b176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101795760019050610343565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c35760009050610343565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561032357fe5b60325a03f1151561033057fe5b505050604051805190509050610343565b5b5b90565b6108e5806103556000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100a4578063328d8f72146100da5780633af32abf146100fc5780636aa633b61461014a5780637a9e5e4b1461017457806383197ef0146101aa5780638da5cb5b146101bc5780639281aa0b1461020e578063b70096131461024f578063bf7e214f146102e4575bfe5b34156100ac57fe5b6100d8600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610336565b005b34156100e257fe5b6100fa600480803515159060200190919050506103f7565b005b341561010457fe5b610130600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610429565b604051808215151515815260200191505060405180910390f35b341561015257fe5b61015a610490565b604051808215151515815260200191505060405180910390f35b341561017c57fe5b6101a8600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a8565b005b34156101b257fe5b6101ba610569565b005b34156101c457fe5b6101cc6105ba565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561021657fe5b61024d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506105e0565b005b341561025757fe5b6102ca600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610650565b604051808215151515815260200191505060405180910390f35b34156102ec57fe5b6102f4610665565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61033e61068b565b151561034957610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6103ff61068b565b151561040a57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610433610490565b80156104885750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b6104b061068b565b15156104bb57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b61057161068b565b151561057c57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6105e861068b565b15156105f357610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b600061065b84610429565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156106ec57600190506108b6565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561073657600090506108b6565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561089657fe5b60325a03f115156108a357fe5b5050506040518051905090506108b6565b5b5b905600a165627a7a723058207579b33618bbf6c0a28050468ee59919a5484a80457a392bf192c61e3c9a7b5f0029'
      },
      'Entry': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getProfileEntryLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getProfileEntriesCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              },
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getTagEntryPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              }
            ],
            'name': 'getProfileEntryFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'getTagEntriesCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              },
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getTagEntryNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tags',
                'type': 'address'
              }
            ],
            'name': 'setTagsSource',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'entryExists',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'claimDeposit',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'hash',
                'type': 'bytes32[2]'
              },
              {
                'name': 'tags',
                'type': 'bytes32[]'
              }
            ],
            'name': 'publish',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'getTagEntryLast',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'hash',
                'type': 'bytes32[2]'
              },
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'updateEntryContent',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getLastVoteBlock',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'profileId',
                'type': 'uint256'
              }
            ],
            'name': 'getProfileEntryNext',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'blockNr',
                'type': 'uint256'
              }
            ],
            'name': 'setEntryTTL',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getEntryFund',
            'outputs': [
              {
                'name': 'funds',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getEntry',
            'outputs': [
              {
                'name': 'blockNr',
                'type': 'uint256'
              },
              {
                'name': 'publisher',
                'type': 'address'
              },
              {
                'name': 'ipfsHash',
                'type': 'bytes32[2]'
              },
              {
                'name': 'timeStamp',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'id',
                'type': 'bytes32'
              },
              {
                'name': 'profileId',
                'type': 'uint256'
              }
            ],
            'name': 'getProfileEntryPrev',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'isEditable',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'getTagEntryFirst',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'author',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'tag',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'Publish',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'author',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'Update',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'author',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Claim',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040526001600955617530600a555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000db6001620000e26401000000000262000f73176401000000009004565b5b62000361565b620001006200012c6401000000000262002dc7176401000000009004565b15156200010d5762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018f57600190506200035e565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001db57600090506200035e565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033c57fe5b60325a03f115156200034a57fe5b5050506040518051905090506200035e565b5b5b90565b613dd580620003716000396000f30060606040523615620001a9576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630147966a14620001ab57806305748bb814620001e657806313af403514620002215780631a1f2a91146200025a578063328d8f72146200029e5780633af32abf14620002c35780633b00381614620003145780633d89b812146200034f578063507d9c2b146200038a578063515c44a514620003ce5780635280692914620004075780635f8534ae14620004425780636aa633b614620004655780637a9e5e4b14620004925780637abd595814620004cb5780637b965fa114620005515780637d026a1c146200058c57806383197ef014620005db578063868e5b2814620005f057806389efbd0914620006275780638c73a3fe146200066b5780638da5cb5b146200068e5780639281aa0b14620006e3578063a57189931462000727578063a91ee0dc146200078a578063b700961314620007c3578063bae78d7b146200085b578063bf7e214f146200090c578063de2ddc3e1462000961578063e051908114620009a5578063e24dd4c414620009e0575bfe5b3415620001b457fe5b620001d060048080356000191690602001909190505062000a1b565b6040518082815260200191505060405180910390f35b3415620001ef57fe5b6200020b60048080356000191690602001909190505062000bad565b6040518082815260200191505060405180910390f35b34156200022a57fe5b62000258600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000d3f565b005b34156200026357fe5b6200028860048080356000191690602001909190803590602001909190505062000e04565b6040518082815260200191505060405180910390f35b3415620002a757fe5b620002c16004808035151590602001909190505062000f73565b005b3415620002cc57fe5b620002fa600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000fa9565b604051808215151515815260200191505060405180910390f35b34156200031d57fe5b6200033960048080356000191690602001909190505062001013565b6040518082815260200191505060405180910390f35b34156200035857fe5b62000374600480803560001916906020019091905050620011a5565b6040518082815260200191505060405180910390f35b34156200039357fe5b620003b86004808035600019169060200190919080359060200190919050506200130b565b6040518082815260200191505060405180910390f35b3415620003d757fe5b62000405600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506200147a565b005b34156200041057fe5b620004286004808035906020019091905050620014d7565b604051808215151515815260200191505060405180910390f35b34156200044b57fe5b620004636004808035906020019091905050620014fc565b005b34156200046e57fe5b62000478620019e1565b604051808215151515815260200191505060405180910390f35b34156200049b57fe5b620004c9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620019f9565b005b3415620004d457fe5b6200054f600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505062001abe565b005b34156200055a57fe5b62000576600480803560001916906020019091905050620021c1565b6040518082815260200191505060405180910390f35b34156200059557fe5b620005d96004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509190803590602001909190505062002327565b005b3415620005e457fe5b620005ee62002612565b005b3415620005f957fe5b62000611600480803590602001909190505062002667565b6040518082815260200191505060405180910390f35b34156200063057fe5b620006556004808035600019169060200190919080359060200190919050506200268c565b6040518082815260200191505060405180910390f35b34156200067457fe5b6200068c600480803590602001909190505062002827565b005b34156200069757fe5b620006a16200284a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415620006ec57fe5b62000725600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505062002870565b005b34156200073057fe5b620007486004808035906020019091905050620028e4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156200079357fe5b620007c1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062002922565b005b3415620007cc57fe5b62000841600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506200297f565b604051808215151515815260200191505060405180910390f35b34156200086457fe5b6200087c600480803590602001909190505062002996565b604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183600260200280838360008314620008f1575b805182526020831115620008f157602082019150602081019050602083039250620008cb565b50505090500182815260200194505050505060405180910390f35b34156200091557fe5b6200091f62002a73565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156200096a57fe5b6200098f60048080356000191690602001909190803590602001909190505062002a99565b6040518082815260200191505060405180910390f35b3415620009ae57fe5b620009c6600480803590602001909190505062002c34565b604051808215151515815260200191505060405180910390f35b3415620009e957fe5b62000a0560048080356000191690602001909190505062002c61565b6040518082815260200191505060405180910390f35b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562000abe57fe5b60325a03f1151562000acc57fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151562000b8c57fe5b60325a03f4151562000b9a57fe5b5050506040518051905091505b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562000c5057fe5b60325a03f1151562000c5e57fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151562000d1e57fe5b60325a03f4151562000d2c57fe5b5050506040518051905091505b50919050565b62000d4962002dc7565b151562000d565762000000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562000ea757fe5b60325a03f1151562000eb557fe5b5050506040518051905090506007600082815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151562000f5157fe5b60325a03f4151562000f5f57fe5b5050506040518051905091505b5092915050565b62000f7d62002dc7565b151562000f8a5762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600062000fb5620019e1565b80156200100b5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515620010b657fe5b60325a03f11515620010c457fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15156200118457fe5b60325a03f415156200119257fe5b5050506040518051905091505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156200124857fe5b60325a03f115156200125657fe5b5050506040518051905090506007600082815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515620012ea57fe5b60325a03f41515620012f857fe5b5050506040518051905091505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b1515620013ae57fe5b60325a03f11515620013bc57fe5b5050506040518051905090506007600082815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156200145857fe5b60325a03f415156200146657fe5b5050506040518051905091505b5092915050565b6200148462002dc7565b1515620014915762000000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006005600084815260200190815260200160002060020154141590505b919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515620015c157fe5b60325a03f11515620015cf57fe5b505050604051805190501515620015e65762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515620016a957fe5b60325a03f11515620016b757fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__639f58851f9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156200177f57fe5b60325a03f415156200178d57fe5b505050604051805190501515620017a45762000000565b620017af8262002c34565b15620017bb5762000000565b600073ffffffffffffffffffffffffffffffffffffffff166006600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156200182a5762000000565b8073ffffffffffffffffffffffffffffffffffffffff167f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf7836006600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631604051808381526020018281526020019250505060405180910390a26006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662f55d9d336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15156200199457fe5b60325a03f11515620019a257fe5b5050506006600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b6000600160149054906101000a900460ff1690505b90565b62001a0362002dc7565b151562001a105762000000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151562001b8757fe5b60325a03f1151562001b9557fe5b50505060405180519050151562001bac5762000000565b60008451148062001bbe5750600a8451115b1562001bca5762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151562001c8d57fe5b60325a03f1151562001c9b57fe5b50505060405180519050925062001cb162002ffc565b809050604051809103906000f080151562001cc857fe5b91506080604051908101604052808681526020014381526020014281526020018473ffffffffffffffffffffffffffffffffffffffff1681525060056000600954815260200190815260200160002060008201518160000190600262001d309291906200300d565b50602082015181600201556040820151816003015560608201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508160066000600954815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600090505b83518160ff161015620020cf57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff1681518110151562001e4557fe5b906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562001eaf57fe5b60325a03f1151562001ebd57fe5b50505060405180519050151562001ed45762000000565b60076000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab878560ff1681518110151562001f2857fe5b906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562001f9257fe5b60325a03f1151562001fa057fe5b50505060405180519050815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c890916009546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156200203757fe5b60325a03f415156200204557fe5b5050506040518051905050838160ff168151811015156200206257fe5b90602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6009546040518082815260200191505060405180910390a35b808060010191505062001de8565b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c890916009546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156200218d57fe5b60325a03f415156200219b57fe5b50505060405180519050506009600081548092919060010191905055505b5b5050505050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156200226457fe5b60325a03f115156200227257fe5b5050506040518051905090506007600082815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15156200230657fe5b60325a03f415156200231457fe5b5050506040518051905091505b50919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515620023ec57fe5b60325a03f11515620023fa57fe5b505050604051805190501515620024115762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515620024d457fe5b60325a03f11515620024e257fe5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff166005600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515620025605762000000565b6200256b8262002c34565b1515620025785762000000565b82600560008481526020019081526020016000206000019060026200259f92919062003058565b507f5f66d2a93b609bc6596b75c6dbb0e4f3f7cafd4b3b617157ff304d1076e583758183604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b505050565b6200261c62002dc7565b1515620026295762000000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600a5460056000848152602001908152602001600020600201540190505b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156200272f57fe5b60325a03f115156200273d57fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156200280557fe5b60325a03f415156200281357fe5b5050506040518051905091505b5092915050565b6200283162002dc7565b15156200283e5762000000565b80600a819055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6200287a62002dc7565b1515620028875762000000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6200292c62002dc7565b1515620029395762000000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006200298c8462000fa9565b90505b9392505050565b60006000620029a4620030a3565b6000600560008681526020019081526020016000206002015493506005600086815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506005600086815260200190815260200160002060000160028060200260405190810160405280929190826002801562002a4b576020028201915b8154600019168152602001906001019080831162002a32575b50505050509150600560008681526020019081526020016000206003015490505b9193509193565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562002b3c57fe5b60325a03f1151562002b4a57fe5b505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151562002c1257fe5b60325a03f4151562002c2057fe5b5050506040518051905091505b5092915050565b60006000600a54600560008581526020019081526020016000206002015401905043811191505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151562002d0457fe5b60325a03f1151562002d1257fe5b5050506040518051905090506007600082815260200190815260200160002060000173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151562002da657fe5b60325a03f4151562002db457fe5b5050506040518051905091505b50919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562002e2a576001905062002ff9565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141562002e76576000905062002ff9565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151562002fd757fe5b60325a03f1151562002fe557fe5b50505060405180519050905062002ff9565b5b5b90565b604051610cb180620030f983390190565b826002810192821562003045579160200282015b828111156200304457825182906000191690559160200191906001019062003021565b5b509050620030549190620030d0565b5090565b826002810192821562003090579160200282015b828111156200308f5782518290600019169055916020019190600101906200306c565b5b5090506200309f9190620030d0565b5090565b6040604051908101604052806002905b600060001916815260200190600190039081620030b35790505090565b620030f591905b80821115620030f1576000816000905550600101620030d7565b5090565b90560060606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d36401000000000261046e176401000000009004565b5b610346565b6100ee61011864010000000002610702176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101795760019050610343565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c35760009050610343565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561032357fe5b60325a03f1151561033057fe5b505050604051805190509050610343565b5b5b90565b61095c806103556000396000f300606060405236156100ac576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d146100b557806313af4035146100eb578063328d8f72146101215780633af32abf146101435780636aa633b6146101915780637a9e5e4b146101bb57806383197ef0146101f15780638da5cb5b146102035780639281aa0b14610255578063b700961314610296578063bf7e214f1461032b575b6100b35b5b565b005b34156100bd57fe5b6100e9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061037d565b005b34156100f357fe5b61011f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103ad565b005b341561012957fe5b6101416004808035151590602001909190505061046e565b005b341561014b57fe5b610177600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a0565b604051808215151515815260200191505060405180910390f35b341561019957fe5b6101a1610507565b604051808215151515815260200191505060405180910390f35b34156101c357fe5b6101ef600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061051f565b005b34156101f957fe5b6102016105e0565b005b341561020b57fe5b610213610631565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025d57fe5b610294600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610657565b005b341561029e57fe5b610311600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106c7565b604051808215151515815260200191505060405180910390f35b341561033357fe5b61033b6106dc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610385610702565b151561039057610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6103b5610702565b15156103c057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610476610702565b151561048157610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104aa610507565b80156104ff5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b610527610702565b151561053257610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105e8610702565b15156105f357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61065f610702565b151561066a57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006106d2846104a0565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610763576001905061092d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107ad576000905061092d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561090d57fe5b60325a03f1151561091a57fe5b50505060405180519050905061092d565b5b5b905600a165627a7a723058207e8b904ccdf3c91b1f2422e3e861e31fcd6d565cea73eecbcfe262434422f8190029a165627a7a72305820a386771b9ce16b8ec6ee8eaada39a1026afee2324116b7b382da51000c8e5fa10029'
      },
      'BaseModule': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d364010000000002610438176401000000009004565b5b610346565b6100ee61011864010000000002610725176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101795760019050610343565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c35760009050610343565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561032357fe5b60325a03f1151561033057fe5b505050604051805190509050610343565b5b5b90565b61097f806103556000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100af578063328d8f72146100e55780633af32abf146101075780636aa633b6146101555780637a9e5e4b1461017f57806383197ef0146101b55780638da5cb5b146101c75780639281aa0b14610219578063a91ee0dc1461025a578063b700961314610290578063bf7e214f14610325575bfe5b34156100b757fe5b6100e3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610377565b005b34156100ed57fe5b61010560048080351515906020019091905050610438565b005b341561010f57fe5b61013b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061046a565b604051808215151515815260200191505060405180910390f35b341561015d57fe5b6101656104d1565b604051808215151515815260200191505060405180910390f35b341561018757fe5b6101b3600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104e9565b005b34156101bd57fe5b6101c56105aa565b005b34156101cf57fe5b6101d76105fb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561022157fe5b610258600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610621565b005b341561026257fe5b61028e600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610691565b005b341561029857fe5b61030b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106ea565b604051808215151515815260200191505060405180910390f35b341561032d57fe5b6103356106ff565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61037f610725565b151561038a57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610440610725565b151561044b57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104746104d1565b80156104c95750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b6104f1610725565b15156104fc57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105b2610725565b15156105bd57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610629610725565b151561063457610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b610699610725565b15156106a457610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006106f58461046a565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107865760019050610950565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107d05760009050610950565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561093057fe5b60325a03f1151561093d57fe5b505050604051805190509050610950565b5b5b905600a165627a7a723058201cd8bae3db433d6f06d4cab362feca3f30b764f3eb5b15bcbac403abbb10385f0029'
      },
      'DappleEnv': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040523415600b57fe5b5b5b5b603380601b6000396000f30060606040525bfe00a165627a7a723058207eadbe68e3c6cc7ae01839075dfc825d80c30eea9c25301dc09fa825235315300029'
      },
      'Votes': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entries',
                'type': 'address'
              }
            ],
            'name': 'setEntriesAddress',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getScore',
            'outputs': [
              {
                'name': '',
                'type': 'int256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getVotesCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'voteId',
                'type': 'uint256'
              }
            ],
            'name': 'getNextVoteId',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'weight',
                'type': 'uint8'
              }
            ],
            'name': 'getVoteCost',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getLastVoteId',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getFirstVoteId',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'funds',
                'type': 'address'
              }
            ],
            'name': 'setFundsAddress',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'voteId',
                'type': 'uint256'
              }
            ],
            'name': 'getPrevVoteId',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'weight',
                'type': 'uint8'
              },
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'upvote',
            'outputs': [],
            'payable': true,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'voteId',
                'type': 'uint256'
              }
            ],
            'name': 'getVoteOf',
            'outputs': [
              {
                'name': 'profile',
                'type': 'address'
              },
              {
                'name': 'score',
                'type': 'int8'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'weight',
                'type': 'uint8'
              },
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'downvote',
            'outputs': [],
            'payable': true,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'profileAddress',
                'type': 'address'
              }
            ],
            'name': 'getVoteOfProfile',
            'outputs': [
              {
                'name': 'weight',
                'type': 'int8'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'faucet',
                'type': 'address'
              }
            ],
            'name': 'setFaucetAddress',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'profile',
                'type': 'address'
              },
              {
                'indexed': true,
                'name': 'entry',
                'type': 'uint256'
              },
              {
                'indexed': true,
                'name': 'voteCount',
                'type': 'uint256'
              },
              {
                'indexed': false,
                'name': 'weight',
                'type': 'int8'
              }
            ],
            'name': 'Vote',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052655af3107a400060045566038d7ea4c680006005555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000e56001620000ec64010000000002620009df176401000000009004565b5b6200036b565b6200010a620001366401000000000262002096176401000000009004565b1515620001175762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000199576001905062000368565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001e5576000905062000368565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200034657fe5b60325a03f115156200035457fe5b50505060405180519050905062000368565b5b5b90565b6122f0806200037b6000396000f30060606040523615610147576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630737007e146101495780630e1af57b1461017f57806313af4035146101b35780631937c261146101e95780633129aa0d1461021d578063328d8f721461025a57806336d8c30a1461027c5780633af32abf146102b3578063551b5dcc146103015780635f6b9f7d146103355780636aa633b6146103695780637a9e5e4b146103935780637f19abe0146103c957806383197ef0146103ff5780638da5cb5b146104115780639281aa0b14610463578063a1769ae2146104a4578063a85ebabe146104e1578063a91ee0dc14610505578063ad3bc6061461053b578063b42775b5146105b1578063b7009613146105d5578063bf7e214f1461066a578063ddf04310146106bc578063f1e0510e14610715575bfe5b341561015157fe5b61017d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061074b565b005b341561018757fe5b61019d60048080359060200190919050506107a4565b6040518082815260200191505060405180910390f35b34156101bb57fe5b6101e7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506107c5565b005b34156101f157fe5b6102076004808035906020019091905050610886565b6040518082815260200191505060405180910390f35b341561022557fe5b610244600480803590602001909190803590602001909190505061092e565b6040518082815260200191505060405180910390f35b341561026257fe5b61027a600480803515159060200190919050506109df565b005b341561028457fe5b61029d600480803560ff16906020019091905050610a11565b6040518082815260200191505060405180910390f35b34156102bb57fe5b6102e7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a2a565b604051808215151515815260200191505060405180910390f35b341561030957fe5b61031f6004808035906020019091905050610a91565b6040518082815260200191505060405180910390f35b341561033d57fe5b6103536004808035906020019091905050610b39565b6040518082815260200191505060405180910390f35b341561037157fe5b610379610be1565b604051808215151515815260200191505060405180910390f35b341561039b57fe5b6103c7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bf9565b005b34156103d157fe5b6103fd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610cba565b005b341561040757fe5b61040f610d13565b005b341561041957fe5b610421610d64565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561046b57fe5b6104a2600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610d8a565b005b34156104ac57fe5b6104cb6004808035906020019091908035906020019091905050610dfa565b6040518082815260200191505060405180910390f35b610503600480803560ff16906020019091908035906020019091905050610eab565b005b341561050d57fe5b610539600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506116de565b005b341561054357fe5b6105626004808035906020019091908035906020019091905050611737565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260000b60000b81526020019250505060405180910390f35b6105d3600480803560ff169060200190919080359060200190919050506117f0565b005b34156105dd57fe5b610650600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050611f96565b604051808215151515815260200191505060405180910390f35b341561067257fe5b61067a611fab565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156106c457fe5b6106f9600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611fd1565b604051808260000b60000b815260200191505060405180910390f35b341561071d57fe5b610749600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061203d565b005b610753612096565b151561075e57610000565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600960008381526020019081526020016000206000015490505b919050565b6107cd612096565b15156107d857610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006009600083815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561090f57fe5b60325a03f4151561091c57fe5b5050506040518051905090505b919050565b60006009600084815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156109bf57fe5b60325a03f415156109cc57fe5b5050506040518051905090505b92915050565b6109e7612096565b15156109f257610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006004546002830a60ff16600554020190505b919050565b6000610a34610be1565b8015610a895750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006009600083815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610b1a57fe5b60325a03f41515610b2757fe5b5050506040518051905090505b919050565b60006009600083815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610bc257fe5b60325a03f41515610bcf57fe5b5050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b610c01612096565b1515610c0c57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610cc2612096565b1515610ccd57610000565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b610d1b612096565b1515610d2657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610d92612096565b1515610d9d57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006009600084815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515610e8b57fe5b60325a03f41515610e9857fe5b5050506040518051905090505b92915050565b60006000600060008560018160ff161080610ec95750600a8160ff16115b15610ed357610000565b34610edd82610a11565b1115610ee857610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610faa57fe5b60325a03f11515610fb757fe5b505050604051805190501515610fcc57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561108e57fe5b60325a03f1151561109b57fe5b505050604051805190509450600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a5718993876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561113d57fe5b60325a03f1151561114a57fe5b5050506040518051905093506002870a60ff16600554029250600960008781526020019081526020016000206001016000815480929190600101919050555060006009600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b1415806112a7575043600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28886000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b151561128e57fe5b60325a03f1151561129b57fe5b50505060405180519050105b156112b157610000565b866009600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508660ff1660096000888152602001908152602001600020600001600082825401925050819055506009600087815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c89091600960008a8152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156113ec57fe5b60325a03f415156113f957fe5b505050604051805190505084600960008881526020019081526020016000206003016000600960008a815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f1935050505015156114c357610000565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051809050600060405180830381858888f19350505050151561152a57610000565b600454830191503482101561157f573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f19350505050151561157e57610000565b5b6009600087815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561160657fe5b60325a03f4151561161357fe5b50505060405180519050868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600960008b815260200190815260200160002060020160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b50505050505050565b6116e6612096565b15156116f157610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060096000858152602001908152602001600020600301600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506009600085815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b9250929050565b6000600060008460018160ff16108061180c5750600a8160ff16115b1561181657610000565b3461182082610a11565b111561182b57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156118ed57fe5b60325a03f115156118fa57fe5b50505060405180519050151561190f57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15156119d157fe5b60325a03f115156119de57fe5b5050506040518051905093506002860a60ff16600554029250600960008681526020019081526020016000206001016000815480929190600101919050555060006009600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580611b3b575043600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515611b2257fe5b60325a03f11515611b2f57fe5b50505060405180519050105b15611b4557610000565b856000036009600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508560ff1660096000878152602001908152602001600020600001600082825403925050819055506009600086815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c8909160096000898152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515611c8357fe5b60325a03f41515611c9057fe5b5050506040518051905050836009600087815260200190815260200160002060030160006009600089815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f193505050501515611d7c57610000565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051809050600060405180830381858888f193505050501515611de357610000565b6004548301915034821015611e38573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f193505050501515611e3757610000565b5b6009600086815260200190815260200160002060040173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515611ebf57fe5b60325a03f41515611ecc57fe5b50505060405180519050858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600960008a815260200190815260200160002060020160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b505050505050565b6000611fa184610a2a565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006009600084815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b92915050565b612045612096565b151561205057610000565b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156120f757600190506122c1565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561214157600090506122c1565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156122a157fe5b60325a03f115156122ae57fe5b5050506040518051905090506122c1565b5b5b905600a165627a7a72305820199122420d6255066102da82c62b3afa30e97c5c16398a5ce67e2793a71bdd0a0029'
      },
      'Comments': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getFirstComment',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entryAddress',
                'type': 'address'
              }
            ],
            'name': 'setEntryAddress',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'commentId',
                'type': 'uint256'
              }
            ],
            'name': 'getComment',
            'outputs': [
              {
                'name': 'profile',
                'type': 'address'
              },
              {
                'name': 'id',
                'type': 'uint256'
              },
              {
                'name': 'parent',
                'type': 'uint256'
              },
              {
                'name': 'ipfsHash',
                'type': 'bytes32[2]'
              },
              {
                'name': 'removed',
                'type': 'bool'
              },
              {
                'name': 'date',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getCommentsCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'hash',
                'type': 'bytes32[2]'
              },
              {
                'name': 'parent',
                'type': 'uint256'
              }
            ],
            'name': 'comment',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'commentId',
                'type': 'uint256'
              }
            ],
            'name': 'removeComment',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              }
            ],
            'name': 'getLastComment',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'commentId',
                'type': 'uint256'
              }
            ],
            'name': 'getPrevComment',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'name': 'commentId',
                'type': 'uint256'
              }
            ],
            'name': 'getNextComment',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'entryId',
                'type': 'uint256'
              },
              {
                'indexed': true,
                'name': 'profile',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'commentId',
                'type': 'uint256'
              }
            ],
            'name': 'Commented',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d7640100000000026200082c176401000000009004565b5b62000356565b620000f562000121640100000000026200179a176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000184576001905062000353565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d0576000905062000353565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033157fe5b60325a03f115156200033f57fe5b50505060405180519050905062000353565b5b5b90565b611a8b80620003666000396000f30060606040523615610110576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063044b4a2a1461011257806313af403514610146578063279bc3aa1461017c578063328d8f72146101b25780633af32abf146101d457806348892753146102225780634c9b78da146102e85780636aa633b61461031c57806371aa5a66146103465780637a9e5e4b1461039b57806383197ef0146103d15780638da5cb5b146103e35780639281aa0b14610435578063a71eb6a114610476578063a91ee0dc1461049f578063b7009613146104d5578063bf7e214f1461056a578063c407afe7146105bc578063e616d76f146105f0578063f6aaa8671461062d575bfe5b341561011a57fe5b610130600480803590602001909190505061066a565b6040518082815260200191505060405180910390f35b341561014e57fe5b61017a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610712565b005b341561018457fe5b6101b0600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506107d3565b005b34156101ba57fe5b6101d26004808035151590602001909190505061082c565b005b34156101dc57fe5b610208600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061085e565b604051808215151515815260200191505060405180910390f35b341561022a57fe5b61024960048080359060200190919080359060200190919050506108c5565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001846002602002808383600083146102c1575b8051825260208311156102c15760208201915060208101905060208303925061029d565b50505090500183151515158152602001828152602001965050505050505060405180910390f35b34156102f057fe5b6103066004808035906020019091905050610a5c565b6040518082815260200191505060405180910390f35b341561032457fe5b61032c610b04565b604051808215151515815260200191505060405180910390f35b341561034e57fe5b61039960048080359060200190919080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019091905050610b1c565b005b34156103a357fe5b6103cf600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506110c5565b005b34156103d957fe5b6103e1611186565b005b34156103eb57fe5b6103f36111d7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561043d57fe5b610474600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506111fd565b005b341561047e57fe5b61049d600480803590602001909190803590602001909190505061126d565b005b34156104a757fe5b6104d3600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506114fc565b005b34156104dd57fe5b610550600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050611555565b604051808215151515815260200191505060405180910390f35b341561057257fe5b61057a61156a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156105c457fe5b6105da6004808035906020019091905050611590565b6040518082815260200191505060405180910390f35b34156105f857fe5b6106176004808035906020019091908035906020019091905050611638565b6040518082815260200191505060405180910390f35b341561063557fe5b61065460048080359060200190919080359060200190919050506116e9565b6040518082815260200191505060405180910390f35b60006005600083815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15156106f357fe5b60325a03f4151561070057fe5b5050506040518051905090505b919050565b61071a61179a565b151561072557610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6107db61179a565b15156107e657610000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b61083461179a565b151561083f57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610868610b04565b80156108bd5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060006108d36119c8565b6000600060056000898152602001908152602001600020600401600088815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1695506005600089815260200190815260200160002060040160008881526020019081526020016000206001015494506005600089815260200190815260200160002060040160008881526020019081526020016000206000015493506005600089815260200190815260200160002060040160008881526020019081526020016000206002016002806020026040519081016040528092919082600280156109e3576020028201915b815460001916815260200190600101908083116109cb575b5050505050925060056000898152602001908152602001600020600401600088815260200190815260200160002060040160149054906101000a900460ff1691506005600089815260200190815260200160002060040160008881526020019081526020016000206005015490505b9295509295509295565b60006005600083815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610ae557fe5b60325a03f41515610af257fe5b5050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610be057fe5b60325a03f11515610bed57fe5b505050604051805190501515610c0257610000565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352806929856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b1515610c9857fe5b60325a03f11515610ca557fe5b505050604051805190501515610cba57610000565b6005600085815260200190815260200160002060000160008154809291906001019190505550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1515610da257fe5b60325a03f11515610daf57fe5b505050604051805190509050806005600086815260200190815260200160002060040160006005600088815260200190815260200160002060000154815260200190815260200160002060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508260056000868152602001908152602001600020600401600060056000888152602001908152602001600020600001548152602001908152602001600020600201906002610e899291906119f4565b506005600085815260200190815260200160002060000154600560008681526020019081526020016000206004016000600560008881526020019081526020016000206000015481526020019081526020016000206001018190555042600560008681526020019081526020016000206004016000600560008881526020019081526020016000206000015481526020019081526020016000206005018190555060008214158015610f505750600560008581526020019081526020016000206000015482105b15610f9b578160056000868152602001908152602001600020600401600060056000888152602001908152602001600020600001548152602001908152602001600020600001819055505b6005600085815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c8909160056000888152602001908152602001600020600001546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561104057fe5b60325a03f4151561104d57fe5b50505060405180519050508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960056000888152602001908152602001600020600001546040518082815260200191505060405180910390a35b5b50505050565b6110cd61179a565b15156110d857610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b61118e61179a565b151561119957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61120561179a565b151561121057610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561133157fe5b60325a03f1151561133e57fe5b50505060405180519050151561135357610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561141557fe5b60325a03f1151561142257fe5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff1660056000858152602001908152602001600020600401600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156114b257610000565b600160056000858152602001908152602001600020600401600084815260200190815260200160002060040160146101000a81548160ff0219169083151502179055505b5b505050565b61150461179a565b151561150f57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006115608461085e565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005600083815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561161957fe5b60325a03f4151561162657fe5b5050506040518051905090505b919050565b60006005600084815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15156116c957fe5b60325a03f415156116d657fe5b5050506040518051905090505b92915050565b60006005600084815260200190815260200160002060010173___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561177a57fe5b60325a03f4151561178757fe5b5050506040518051905090505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156117fb57600190506119c5565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561184557600090506119c5565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156119a557fe5b60325a03f115156119b257fe5b5050506040518051905090506119c5565b5b5b90565b6040604051908101604052806002905b6000600019168152602001906001900390816119d85790505090565b8260028101928215611a29579160200282015b82811115611a28578251829060001916905591602001919060010190611a07565b5b509050611a369190611a3a565b5090565b611a5c91905b80821115611a58576000816000905550600101611a40565b5090565b905600a165627a7a72305820d94bbd1134883ac2382fbeab72a7c52c0d744a87146b7811b4dd45172303adb00029'
      },
      'Faucet': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'interval',
                'type': 'uint256'
              }
            ],
            'name': 'setTimeoutBlock',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAmount',
                'type': 'uint256'
              }
            ],
            'name': 'setAmount',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'claim',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'limit',
                'type': 'uint8'
              }
            ],
            'name': 'setMaxClaims',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
              }
            ],
            'name': 'getLastClaim',
            'outputs': [
              {
                'name': 'blockNr',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
              }
            ],
            'name': 'canClaim',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'payable': true,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'profile',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'amount',
                'type': 'uint256'
              }
            ],
            'name': 'Receive',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '606060405267016345785d8a0000600455600a600560006101000a81548160ff021916908360ff1602179055506175306006555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000fe60016200010564010000000002620005cc176401000000009004565b5b62000384565b620001236200014f6401000000000262000d2d176401000000009004565b1515620001305762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620001b2576001905062000381565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001fe576000905062000381565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200035f57fe5b60325a03f115156200036d57fe5b50505060405180519050905062000381565b5b5b90565b610f8780620003946000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100f857806319aaf1f01461012e578063271f88b41461014e578063328d8f721461016e5780633af32abf146101905780634e71d92d146101de57806367895db2146101f05780636aa633b6146102135780637a9e5e4b1461023d57806383197ef0146102735780638778f415146102855780638da5cb5b146102cf5780639281aa0b14610321578063a91ee0dc14610362578063b700961314610398578063bf3506c11461042d578063bf7e214f1461047b575b6100f65b5b565b005b341561010057fe5b61012c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104cd565b005b341561013657fe5b61014c600480803590602001909190505061058e565b005b341561015657fe5b61016c60048080359060200190919050506105ad565b005b341561017657fe5b61018e600480803515159060200190919050506105cc565b005b341561019857fe5b6101c4600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105fe565b604051808215151515815260200191505060405180910390f35b34156101e657fe5b6101ee610665565b005b34156101f857fe5b610211600480803560ff16906020019091905050610a00565b005b341561021b57fe5b610223610a33565b604051808215151515815260200191505060405180910390f35b341561024557fe5b610271600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a4b565b005b341561027b57fe5b610283610b0c565b005b341561028d57fe5b6102b9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b5d565b6040518082815260200191505060405180910390f35b34156102d757fe5b6102df610baa565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561032957fe5b610360600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610bd0565b005b341561036a57fe5b610396600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c40565b005b34156103a057fe5b610413600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610c99565b604051808215151515815260200191505060405180910390f35b341561043557fe5b610461600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610cae565b604051808215151515815260200191505060405180910390f35b341561048357fe5b61048b610d07565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104d5610d2d565b15156104e057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610596610d2d565b15156105a157610000565b806006819055505b5b50565b6105b5610d2d565b15156105c057610000565b806004819055505b5b50565b6105d4610d2d565b15156105df57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610608610a33565b801561065d5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561072d57fe5b60325a03f1151561073a57fe5b50505060405180519050151561074f57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561081157fe5b60325a03f1151561081e57fe5b505050604051805190509250600654600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154019150829050600560009054906101000a900460ff1660ff16600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660ff1611806108e757504382115b156108f157610000565b6004543073ffffffffffffffffffffffffffffffffffffffff1631101561091757610000565b8073ffffffffffffffffffffffffffffffffffffffff1663502c40656004546000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303818588803b151561098557fe5b61235a5a03f1151561099357fe5b505050506040518051905015156109a957610000565b8273ffffffffffffffffffffffffffffffffffffffff167fd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def36004546040518082815260200191505060405180910390a25b5b505050565b610a08610d2d565b1515610a1357610000565b80600560006101000a81548160ff021916908360ff1602179055505b5b50565b6000600160149054906101000a900460ff1690505b90565b610a53610d2d565b1515610a5e57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610b14610d2d565b1515610b1f57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490505b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610bd8610d2d565b1515610be357610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b610c48610d2d565b1515610c5357610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000610ca4846105fe565b90505b9392505050565b60006000600654600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401905080431191505b50919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d8e5760019050610f58565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610dd85760009050610f58565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b1515610f3857fe5b60325a03f11515610f4557fe5b505050604051805190509050610f58565b5b5b905600a165627a7a723058202b32edbc2bf2f76531afd3d110e7dca2424702cc74276ddab67c6977ddff592e0029'
      },
      'DeployAeth': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'export',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txoff',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'txon',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          },
          {
            'payable': false,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'number',
                'type': 'uint256'
              }
            ],
            'name': 'exportNumber',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'name',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              }
            ],
            'name': 'exportObject',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'flag',
                'type': 'bool'
              }
            ],
            'name': 'setCalls',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'origin',
                'type': 'address'
              }
            ],
            'name': 'setOrigin',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'chaintype',
                'type': 'bytes32'
              }
            ],
            'name': 'assertChain',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'pushEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'env',
                'type': 'bytes32'
              }
            ],
            'name': 'popEnv',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'addr',
                'type': 'address'
              },
              {
                'indexed': false,
                'name': 'eventName',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'functioncall',
                'type': 'string'
              }
            ],
            'name': 'on',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'input',
                'type': 'bytes'
              },
              {
                'indexed': false,
                'name': 'result',
                'type': 'uint256'
              }
            ],
            'name': 'shUint',
            'type': 'event'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b60005b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b6100c4610171565b809050604051809103906000f08015156100da57fe5b90507fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c38160405180807f63630000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b50610181565b60405161026d8061037f83390190565b6101ef806101906000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100665780639fc288d1146100a9578063d900596c146100bb575b341561005d57fe5b6100645b5b565b005b341561006e57fe5b6100a760048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100cd565b005b34156100b157fe5b6100b9610145565b005b34156100c357fe5b6100cb610184565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a72305820f4355a48fbef7c6a22832ad68dacbd3e0ecc426cb2d40a500ba832b9c9e445d400296060604052341561000c57fe5b5b6102518061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e33b870714610046578063e81cf24c14610066575bfe5b341561004e57fe5b610064600480803590602001909190505061008f565b005b341561006e57fe5b61008d60048080359060200190919080359060200190919050506100bd565b005b600080548060010182816100a391906101d4565b916000526020600020900160005b83909190915055505b50565b6000600073___0xf25427b57ed5aa8ef2c81dc82a81dc4de__6324fef5c89091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561013a57fe5b60325a03f4151561014757fe5b5050506040518051905090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114156101aa576000805480600101828161018f91906101d4565b916000526020600020900160005b84909190915055506101ce565b816000828154811015156101ba57fe5b906000526020600020900160005b50819055505b5b505050565b8154818355818115116101fb578183600052602060002091820191016101fa9190610200565b5b505050565b61022291905b8082111561021e576000816000905550600101610206565b5090565b905600a165627a7a72305820e60067a18e557916f0525e0187e6981e72bb4452e95bdcea51989595546f5f5c0029'
      },
      'Tags': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'exists',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'add',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getLastTag',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'tagId',
                'type': 'uint256'
              }
            ],
            'name': 'remove',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'check_format',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'getTagId',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getFirstTag',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'getTagCount',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tagId',
                'type': 'uint256'
              }
            ],
            'name': 'getTagName',
            'outputs': [
              {
                'name': '',
                'type': 'bytes32'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tagId',
                'type': 'uint256'
              }
            ],
            'name': 'prevTag',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'tagId',
                'type': 'uint256'
              }
            ],
            'name': 'nextTag',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'tag',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'id',
                'type': 'uint256'
              }
            ],
            'name': 'Create',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'tag',
                'type': 'bytes32'
              }
            ],
            'name': 'Remove',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '606060405260016007555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d56001620000dc64010000000002620006bb176401000000009004565b5b6200035b565b620000fa620001266401000000000262001437176401000000009004565b1515620001075762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000189576001905062000358565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d5576000905062000358565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15156200033657fe5b60325a03f115156200034457fe5b50505060405180519050905062000358565b5b5b90565b611691806200036b6000396000f30060606040523615610126576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af403514610128578063328d8f721461015e57806338a699a4146101805780633af32abf146101bc578063446bffba1461020a5780634bbff4a71461022e5780634cc82215146102545780636aa633b6146102745780636b4316db1461029e5780636d74e7ab146102da5780637a9e5e4b1461031257806383197ef0146103485780638da5cb5b1461035a5780639281aa0b146103ac57806392aaa797146103ed578063986f191c14610413578063a1b1daee14610439578063a91ee0dc14610475578063b7009613146104ab578063bf7e214f14610540578063ee564eb914610592578063ee84fbce146105c6575bfe5b341561013057fe5b61015c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105fa565b005b341561016657fe5b61017e600480803515159060200190919050506106bb565b005b341561018857fe5b6101a26004808035600019169060200190919050506106ed565b604051808215151515815260200191505060405180910390f35b34156101c457fe5b6101f0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610717565b604051808215151515815260200191505060405180910390f35b341561021257fe5b61022c60048080356000191690602001909190505061077e565b005b341561023657fe5b61023e6109b0565b6040518082815260200191505060405180910390f35b341561025c57fe5b6102726004808035906020019091905050610a42565b005b341561027c57fe5b610284610b70565b604051808215151515815260200191505060405180910390f35b34156102a657fe5b6102c0600480803560001916906020019091905050610b88565b604051808215151515815260200191505060405180910390f35b34156102e257fe5b6102fc600480803560001916906020019091905050610f5b565b6040518082815260200191505060405180910390f35b341561031a57fe5b610346600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f81565b005b341561035057fe5b610358611042565b005b341561036257fe5b61036a611093565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103b457fe5b6103eb600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506110b9565b005b34156103f557fe5b6103fd611129565b6040518082815260200191505060405180910390f35b341561041b57fe5b6104236111bb565b6040518082815260200191505060405180910390f35b341561044157fe5b610457600480803590602001909190505061124d565b60405180826000191660001916815260200191505060405180910390f35b341561047d57fe5b6104a9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061126b565b005b34156104b357fe5b610526600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506112c4565b604051808215151515815260200191505060405180910390f35b341561054857fe5b6105506112d9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561059a57fe5b6105b060048080359060200190919050506112ff565b6040518082815260200191505060405180910390f35b34156105ce57fe5b6105e4600480803590602001909190505061139b565b6040518082815260200191505060405180910390f35b610602611437565b151561060d57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6106c3611437565b15156106ce57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060086000846000191660001916815260200190815260200160002054141590505b919050565b6000610721610b70565b80156107765750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b151561084057fe5b60325a03f1151561084d57fe5b50505060405180519050151561086257610000565b61086b81610b88565b158061087c575061087b816106ed565b5b1561088657610000565b60075460086000836000191660001916815260200190815260200160002081905550600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63b3dad4c890916007546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561092557fe5b60325a03f4151561093257fe5b505050604051805190505080600960006007548152602001908152602001600020816000191690555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196007546040518082815260200191505060405180910390a26007600081548092919060010191905055505b5b50565b6000600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b1515610a2557fe5b60325a03f41515610a3257fe5b5050506040518051905090505b90565b6000610a4c611437565b1515610a5757610000565b60096000838152602001908152602001600020549050600860008260001916600019168152602001908152602001600020600090556009600083815260200190815260200160002060009055600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b1515610b1e57fe5b60325a03f41515610b2b57fe5b505050604051805190505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b6000600160149054906101000a900460ff1690505b90565b60006000600090505b602060ff168160ff161015610f4b5760007f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610bd557fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415610c2557610f4b565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610c5a57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610e29575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610cdb57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610da4575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610d5d57fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610e285750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610de057fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610f2f575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610e6457fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610f2e5750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101515610ee657fe5b1a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610f3d5760009150610f55565b5b8080600101915050610b91565b60018160ff161191505b50919050565b60006008600083600019166000191681526020019081526020016000205490505b919050565b610f89611437565b1515610f9457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b61104a611437565b151561105557610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6110c1611437565b15156110cc57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561119e57fe5b60325a03f415156111ab57fe5b5050506040518051905090505b90565b6000600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b151561123057fe5b60325a03f4151561123d57fe5b5050506040518051905090505b90565b6000600960008381526020019081526020016000205490505b919050565b611273611437565b151561127e57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006112cf84610717565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561137c57fe5b60325a03f4151561138957fe5b5050506040518051905090505b919050565b6000600473___0x85fe44d97de12b1d5ce1da9fe1a2928cd__633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561141857fe5b60325a03f4151561142557fe5b5050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156114985760019050611662565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156114e25760009050611662565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561164257fe5b60325a03f1151561164f57fe5b505050604051805190509050611662565b5b5b905600a165627a7a72305820b9ba7fd9c1039d41183fef7c91271cff7571a1e97c22ed52809c8e0bcfe1bcba0029'
      },
      'C': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'append',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_old',
                'type': 'uint256'
              },
              {
                'name': '_new',
                'type': 'uint256'
              }
            ],
            'name': 'replace',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b6102518061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e33b870714610046578063e81cf24c14610066575bfe5b341561004e57fe5b610064600480803590602001909190505061008f565b005b341561006e57fe5b61008d60048080359060200190919080359060200190919050506100bd565b005b600080548060010182816100a391906101d4565b916000526020600020900160005b83909190915055505b50565b6000600073___0xf25427b57ed5aa8ef2c81dc82a81dc4de__6324fef5c89091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b151561013a57fe5b60325a03f4151561014757fe5b5050506040518051905090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114156101aa576000805480600101828161018f91906101d4565b916000526020600020900160005b84909190915055506101ce565b816000828154811015156101ba57fe5b906000526020600020900160005b50819055505b5b505050565b8154818355818115116101fb578183600052602060002091820191016101fa9190610200565b5b505050565b61022291905b8082111561021e576000816000905550600101610206565b5090565b905600a165627a7a72305820e60067a18e557916f0525e0187e6981e72bb4452e95bdcea51989595546f5f5c0029'
      },
      'Search': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'self',
                'type': 'uint256[] storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'indexOf',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '6060604052341561000c57fe5b5b61010f8061001c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806324fef5c814603a575bfe5b60576004808035906020019091908035906020019091905050606d565b6040518082815260200191505060405180910390f35b60006000600090505b838054905081101560b857828482815481101515608f57fe5b906000526020600020900160005b5054141560ab5780915060dc565b5b80806001019150506076565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91505b50929150505600a165627a7a723058200d57d69c49f92921cfc86c014ca0be62f284857ba4f2ab9595f5885d6443b68c0029'
      },
      'EntryDeposit': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'receiver',
                'type': 'address'
              }
            ],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newOwner',
                'type': 'address'
              }
            ],
            'name': 'setOwner',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setEnabled',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              }
            ],
            'name': 'isWhitelisted',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'isEnabled',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'newAuthority',
                'type': 'address'
              }
            ],
            'name': 'setAuthority',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'owner',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': 'who',
                'type': 'address'
              },
              {
                'name': 'what',
                'type': 'bool'
              }
            ],
            'name': 'setWhitelisted',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': 'caller',
                'type': 'address'
              },
              {
                'name': 'code',
                'type': 'address'
              },
              {
                'name': 'sig',
                'type': 'bytes4'
              }
            ],
            'name': 'canCall',
            'outputs': [
              {
                'name': '',
                'type': 'bool'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'authority',
            'outputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'payable': false,
            'type': 'function'
          },
          {
            'payable': true,
            'type': 'fallback'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'owner',
                'type': 'address'
              }
            ],
            'name': 'DSOwnerUpdate',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': true,
                'name': 'authority',
                'type': 'address'
              }
            ],
            'name': 'DSAuthorityUpdate',
            'type': 'event'
          }
        ],
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d36401000000000261046e176401000000009004565b5b610346565b6100ee61011864010000000002610702176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156101795760019050610343565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c35760009050610343565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561032357fe5b60325a03f1151561033057fe5b505050604051805190509050610343565b5b5b90565b61095c806103556000396000f300606060405236156100ac576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d146100b557806313af4035146100eb578063328d8f72146101215780633af32abf146101435780636aa633b6146101915780637a9e5e4b146101bb57806383197ef0146101f15780638da5cb5b146102035780639281aa0b14610255578063b700961314610296578063bf7e214f1461032b575b6100b35b5b565b005b34156100bd57fe5b6100e9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061037d565b005b34156100f357fe5b61011f600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103ad565b005b341561012957fe5b6101416004808035151590602001909190505061046e565b005b341561014b57fe5b610177600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a0565b604051808215151515815260200191505060405180910390f35b341561019957fe5b6101a1610507565b604051808215151515815260200191505060405180910390f35b34156101c357fe5b6101ef600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061051f565b005b34156101f957fe5b6102016105e0565b005b341561020b57fe5b610213610631565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561025d57fe5b610294600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610657565b005b341561029e57fe5b610311600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106c7565b604051808215151515815260200191505060405180910390f35b341561033357fe5b61033b6106dc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610385610702565b151561039057610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6103b5610702565b15156103c057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610476610702565b151561048157610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104aa610507565b80156104ff5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b610527610702565b151561053257610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105e8610702565b15156105f357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61065f610702565b151561066a57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006106d2846104a0565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610763576001905061092d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107ad576000905061092d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b151561090d57fe5b60325a03f1151561091a57fe5b50505060405180519050905061092d565b5b5b905600a165627a7a723058207e8b904ccdf3c91b1f2422e3e861e31fcd6d565cea73eecbcfe262434422f8190029'
      }
    };

    this.classes = {};
    for (var key in this.headers) {
      this.classes[key] = new ContractWrapper(this.headers[key], _web3);
    }

    this.objects = {};
    for (var i in env.objects) {
      var obj = env.objects[i];
      if(!(obj['type'].split('[')[0] in this.classes)) continue;
      this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
    }
  }

  return {
    class: constructor,
    environments: environments
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = dapple['AKASHA'];
}
