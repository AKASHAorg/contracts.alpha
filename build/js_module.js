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
      'type': 'aeth'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d36401000000000261041a176401000000009004565b5b610340565b6100ee61011864010000000002610707176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610179576001905061033d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c3576000905061033d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061033d565b5b5b90565b61095b8061034f6000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100b2578063328d8f72146100e55780633af32abf146101045780636aa633b61461014f5780637a9e5e4b1461017657806383197ef0146101a95780638da5cb5b146101b85780639281aa0b14610207578063a91ee0dc14610245578063b700961314610278578063bf7e214f1461030a575b610000565b34610000576100e3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610359565b005b34610000576101026004808035151590602001909190505061041a565b005b3461000057610135600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061044c565b604051808215151515815260200191505060405180910390f35b346100005761015c6104b3565b604051808215151515815260200191505060405180910390f35b34610000576101a7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104cb565b005b34610000576101b661058c565b005b34610000576101c56105dd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610243600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610603565b005b3461000057610276600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610673565b005b34610000576102f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106cc565b604051808215151515815260200191505060405180910390f35b34610000576103176106e1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610361610707565b151561036c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610422610707565b151561042d57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104566104b3565b80156104ab5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b6104d3610707565b15156104de57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610594610707565b151561059f57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61060b610707565b151561061657610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b61067b610707565b151561068657610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006106d78461044c565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610768576001905061092c565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156107b2576000905061092c565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061092c565b5b5b905600a165627a7a723058202a27fbd347e2f892b1d11a2cfc46f582e05fccfadb706d40cd7d98f380a3f85e0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d3640100000000026103dc176401000000009004565b5b610340565b6100ee61011864010000000002610670176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610179576001905061033d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c3576000905061033d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061033d565b5b5b90565b6108c48061034f6000396000f300606060405236156100a2576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100a7578063328d8f72146100da5780633af32abf146100f95780636aa633b6146101445780637a9e5e4b1461016b57806383197ef01461019e5780638da5cb5b146101ad5780639281aa0b146101fc578063b70096131461023a578063bf7e214f146102cc575b610000565b34610000576100d8600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061031b565b005b34610000576100f7600480803515159060200190919050506103dc565b005b346100005761012a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061040e565b604051808215151515815260200191505060405180910390f35b3461000057610151610475565b604051808215151515815260200191505060405180910390f35b346100005761019c600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061048d565b005b34610000576101ab61054e565b005b34610000576101ba61059f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610238600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506105c5565b005b34610000576102b2600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610635565b604051808215151515815260200191505060405180910390f35b34610000576102d961064a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610323610670565b151561032e57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6103e4610670565b15156103ef57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610418610475565b801561046d5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b610495610670565b15156104a057610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610556610670565b151561056157610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6105cd610670565b15156105d857610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006106408461040e565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156106d15760019050610895565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561071b5760009050610895565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610895565b5b5b905600a165627a7a72305820cbf3536e93191cd74b5c4e2cced157614398b81fabf807c0c9d4a75d06a6ec3f0029'
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
        'bytecode': '606060405234610000575b610264806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e33b870714610049578063e81cf24c14610066575b610000565b3461000057610064600480803590602001909190505061008c565b005b346100005761008a60048080359060200190919080359060200190919050506100f2565b005b600080548060010182818154818355818115116100d5578183600052602060002091820191016100d491905b808211156100d05760008160009055506001016100b8565b5090565b5b505050916000526020600020900160005b83909190915055505b50565b6000600073__Search________________________________6324fef5c89091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561021157600080548060010182818154818355818115116101f3578183600052602060002091820191016101f291905b808211156101ee5760008160009055506001016101d6565b5090565b5b505050916000526020600020900160005b8490919091505550610232565b81600082815481101561000057906000526020600020900160005b50819055505b5b5050505600a165627a7a723058205bcb18f961f8255a6ebec25611ca60ca85d79bd8af0a1d58aa37c9feac434dbe0029'
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
        'bytecode': '606060405234610000575b610124806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680636985e72414603c575b6000565b3460005760f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060f2565b005b5b5050505600a165627a7a72305820b95da8728224f2c0c01b63931bfc2cfc81df0ddfde766947e967decf4030f00d0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d764010000000002620007ed176401000000009004565b5b62000350565b620000f5620001216401000000000262001790176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018457600190506200034d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d057600090506200034d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200034d565b5b5b90565b6119e480620003606000396000f30060606040523615610110576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063044b4a2a1461011557806313af403514610146578063279bc3aa14610179578063328d8f72146101ac5780633af32abf146101cb57806348892753146102165780634c9b78da146102d95780636aa633b61461030a57806371aa5a66146103315780637a9e5e4b1461038357806383197ef0146103b65780638da5cb5b146103c55780639281aa0b14610414578063a71eb6a114610452578063a91ee0dc14610478578063b7009613146104ab578063bf7e214f1461053d578063c407afe71461058c578063e616d76f146105bd578063f6aaa867146105f7575b610000565b34610000576101306004808035906020019091905050610631565b6040518082815260200191505060405180910390f35b3461000057610177600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106d3565b005b34610000576101aa600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610794565b005b34610000576101c9600480803515159060200190919050506107ed565b005b34610000576101fc600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061081f565b604051808215151515815260200191505060405180910390f35b346100005761023a6004808035906020019091908035906020019091905050610886565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001846002602002808383600083146102b2575b8051825260208311156102b25760208201915060208101905060208303925061028e565b50505090500183151515158152602001828152602001965050505050505060405180910390f35b34610000576102f46004808035906020019091905050610a3e565b6040518082815260200191505060405180910390f35b3461000057610317610ae0565b604051808215151515815260200191505060405180910390f35b346100005761038160048080359060200190919080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019091905050610af8565b005b34610000576103b4600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506110d9565b005b34610000576103c361119a565b005b34610000576103d26111eb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610450600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050611211565b005b34610000576104766004808035906020019091908035906020019091905050611281565b005b34610000576104a9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611504565b005b3461000057610523600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190505061155d565b604051808215151515815260200191505060405180910390f35b346100005761054a611572565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576105a76004808035906020019091905050611598565b6040518082815260200191505060405180910390f35b34610000576105e1600480803590602001909190803590602001909190505061163a565b6040518082815260200191505060405180910390f35b346100005761061b60048080359060200190919080359060200190919050506116e5565b6040518082815260200191505060405180910390f35b60006005600083815260200190815260200160002060010173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6106db611790565b15156106e657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61079c611790565b15156107a757610000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6107f5611790565b151561080057610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610829610ae0565b801561087e5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060006040604051908101604052806002905b60006000191681526020019060019003908161089c579050506000600060056000898152602001908152602001600020600401600088815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1695506005600089815260200190815260200160002060040160008881526020019081526020016000206001015494506005600089815260200190815260200160002060040160008881526020019081526020016000206000015493506005600089815260200190815260200160002060040160008881526020019081526020016000206002016002806020026040519081016040528092919082600280156109c5576020028201915b815460001916815260200190600101908083116109ad575b5050505050925060056000898152602001908152602001600020600401600088815260200190815260200160002060040160149054906101000a900460ff1691506005600089815260200190815260200160002060040160008881526020019081526020016000206005015490505b9295509295509295565b60006005600083815260200190815260200160002060010173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610bd857610000565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352806929856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610c8a57610000565b6005600085815260200190815260200160002060000160008154809291906001019190505550600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050806005600086815260200190815260200160002060040160006005600088815260200190815260200160002060000154815260200190815260200160002060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600560008681526020019081526020016000206004016000600560008881526020019081526020016000206000015481526020019081526020016000206002019060028260028101928215610e7d579160200282015b82811115610e7c578251829060001916905591602001919060010190610e5b565b5b509050610ea291905b80821115610e9e576000816000905550600101610e86565b5090565b50506005600085815260200190815260200160002060000154600560008681526020019081526020016000206004016000600560008881526020019081526020016000206000015481526020019081526020016000206001018190555042600560008681526020019081526020016000206004016000600560008881526020019081526020016000206000015481526020019081526020016000206005018190555060008214158015610f6a5750600560008581526020019081526020016000206000015482105b15610fb5578160056000868152602001908152602001600020600401600060056000888152602001908152602001600020600001548152602001908152602001600020600001819055505b6005600085815260200190815260200160002060010173__DLinked_______________________________63b3dad4c8909160056000888152602001908152602001600020600001546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519050508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960056000888152602001908152602001600020600001546040518082815260200191505060405180910390a35b5b50505050565b6110e1611790565b15156110ec57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6111a2611790565b15156111ad57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611219611790565b151561122457610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561136157610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff1660056000858152602001908152602001600020600401600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156114ba57610000565b600160056000858152602001908152602001600020600401600084815260200190815260200160002060040160146101000a81548160ff0219169083151502179055505b5b505050565b61150c611790565b151561151757610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006115688461081f565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005600083815260200190815260200160002060010173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006005600084815260200190815260200160002060010173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60006005600084815260200190815260200160002060010173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156117f157600190506119b5565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561183b57600090506119b5565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506119b5565b5b5b905600a165627a7a72305820ffc1cb06e22364fe71b905f0e46fc53986a7ec5e1287bb860fddfd31141dc0db0029'
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
        'bytecode': '606060405234610000575b610517806100196000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e8478db146100915780633e552821146100ca57806348eb81eb146100ff57806370da6fe61461013457806391c0ab63146101605780639f58851f1461018c578063b3dad4c8146101c5578063d6867e87146101fe575b610000565b6100b0600480803590602001909190803590602001909190505061022a565b604051808215151515815260200191505060405180910390f35b6100e96004808035906020019091908035906020019091905050610319565b6040518082815260200191505060405180910390f35b61011e600480803590602001909190803590602001909190505061033a565b6040518082815260200191505060405180910390f35b61014a600480803590602001909190505061035b565b6040518082815260200191505060405180910390f35b610176600480803590602001909190505061037c565b6040518082815260200191505060405180910390f35b6101ab600480803590602001909190803590602001909190505061038b565b604051808215151515815260200191505060405180910390f35b6101e460048080359060200190919080359060200190919050506103ff565b604051808215151515815260200191505060405180910390f35b61021460048080359060200190919050506104ca565b6040518082815260200191505060405180910390f35b6000610236838361038b565b1561030f57600190508260010160008381526020019081526020016000205483600101600085600201600086815260200190815260200160002054815260200190815260200160002081905550826002016000838152602001908152602001600020548360020160008560010160008681526020019081526020016000205481526020019081526020016000208190555082600201600083815260200190815260200160002060009055826001016000838152602001908152602001600020600090558260000160008154809291906001900391905055505b8090505b92915050565b60008260010160008381526020019081526020016000205490505b92915050565b60008260020160008381526020019081526020016000205490505b92915050565b6000816001016000600081526020019081526020016000205490505b919050565b6000816000015490505b919050565b6000600082141561039b57610000565b6000836002016000848152602001908152602001600020541415806103d6575060008360010160008481526020019081526020016000205414155b806103f65750818360010160006000815260200190815260200160002054145b90505b92915050565b600061040b838361038b565b15156104c0576001905081836002016000856001016000600081526020019081526020016000205481526020019081526020016000208190555082600101600060008152602001908152602001600020548360010160008481526020019081526020016000208190555060008360020160008481526020019081526020016000208190555081836001016000600081526020019081526020016000208190555082600001600081548092919060010191905055505b8090505b92915050565b6000816002016000600081526020019081526020016000205490505b9190505600a165627a7a7230582020d7141936c5c21e7486b377ff56ed28437400cf929647078f796052dac8ec7f0029'
      },
      'DappleEnv': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '6060604052346000575b5b5b60358060186000396000f30060606040525b60005600a165627a7a72305820c2720ab2c4ea845faafdd7f36fe4cd773f884a5283b408dc0b4ba9446581074f0029'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a72305820246e9c6306adc7e567c2014b81997ba28b24af5c857a3a057453b83d3f27a8900029'
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
        'bytecode': '606060405234610000575b60005b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b60405161027d8061035b833901809050604051809103906000f080156100005790507fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c38160405180807f63630000000000000000000000000000000000000000000000000000000000008152506020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b505b6101e3806101786000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100635780639fc288d1146100a3578063d900596c146100b2575b34610000576100615b5b565b005b34610000576100a160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c1565b005b34610000576100b0610139565b005b34610000576100bf610178565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a72305820d8ee6f6117f7de6c91d67f341efba128e7234602faf832f23e6efa016f380c0a0029606060405234610000575b610264806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e33b870714610049578063e81cf24c14610066575b610000565b3461000057610064600480803590602001909190505061008c565b005b346100005761008a60048080359060200190919080359060200190919050506100f2565b005b600080548060010182818154818355818115116100d5578183600052602060002091820191016100d491905b808211156100d05760008160009055506001016100b8565b5090565b5b505050916000526020600020900160005b83909190915055505b50565b6000600073__Search________________________________6324fef5c89091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561021157600080548060010182818154818355818115116101f3578183600052602060002091820191016101f291905b808211156101ee5760008160009055506001016101d6565b5090565b5b505050916000526020600020900160005b8490919091505550610232565b81600082815481101561000057906000526020600020900160005b50819055505b5b5050505600a165627a7a723058205bcb18f961f8255a6ebec25611ca60ca85d79bd8af0a1d58aa37c9feac434dbe0029'
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
        'bytecode': '60606040526001600955617530600a555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000db6001620000e26401000000000262000ef6176401000000009004565b5b6200035b565b620001006200012c6401000000000262002d6e176401000000009004565b15156200010d5762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018f576001905062000358565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001db576000905062000358565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062000358565b5b5b90565b613c4d806200036b6000396000f30060606040523615620001a9576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630147966a14620001af57806305748bb814620001e757806313af4035146200021f5780631a1f2a911462000255578063328d8f7214620002965780633af32abf14620002b85780633b00381614620003065780633d89b812146200033e578063507d9c2b1462000376578063515c44a514620003b75780635280692914620003ed5780635f8534ae14620004255780636aa633b614620004455780637a9e5e4b146200046f5780637abd595814620004a55780637b965fa114620005285780637d026a1c146200056057806383197ef014620005ac578063868e5b2814620005be57806389efbd0914620005f25780638c73a3fe14620006335780638da5cb5b14620006535780639281aa0b14620006a5578063a571899314620006e6578063a91ee0dc1462000746578063b7009613146200077c578063bae78d7b1462000811578063bf7e214f14620008bf578063de2ddc3e1462000911578063e05190811462000952578063e24dd4c4146200098a575b62000000565b346200000057620001d1600480803560001916906020019091905050620009c2565b6040518082815260200191505060405180910390f35b3462000000576200020960048080356000191690602001909190505062000b48565b6040518082815260200191505060405180910390f35b34620000005762000253600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000cce565b005b3462000000576200028060048080356000191690602001909190803590602001909190505062000d93565b6040518082815260200191505060405180910390f35b346200000057620002b66004808035151590602001909190505062000ef6565b005b346200000057620002ec600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000f2c565b604051808215151515815260200191505060405180910390f35b3462000000576200032860048080356000191690602001909190505062000f96565b6040518082815260200191505060405180910390f35b346200000057620003606004808035600019169060200190919050506200111c565b6040518082815260200191505060405180910390f35b346200000057620003a160048080356000191690602001909190803590602001909190505062001276565b6040518082815260200191505060405180910390f35b346200000057620003eb600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620013d9565b005b3462000000576200040b600480803590602001909190505062001436565b604051808215151515815260200191505060405180910390f35b3462000000576200044360048080359060200190919050506200145b565b005b3462000000576200045562001928565b604051808215151515815260200191505060405180910390f35b346200000057620004a3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062001940565b005b34620000005762000526600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284378201915050505050509190505062001a05565b005b3462000000576200054a60048080356000191690602001909190505062002130565b6040518082815260200191505060405180910390f35b346200000057620005aa600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050919080359060200190919050506200228a565b005b346200000057620005bc620025bd565b005b346200000057620005dc600480803590602001909190505062002612565b6040518082815260200191505060405180910390f35b3462000000576200061d60048080356000191690602001909190803590602001909190505062002637565b6040518082815260200191505060405180910390f35b346200000057620006516004808035906020019091905050620027c6565b005b34620000005762000663620027e9565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346200000057620006e4600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506200280f565b005b34620000005762000704600480803590602001909190505062002883565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3462000000576200077a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620028c1565b005b346200000057620007f7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506200291e565b604051808215151515815260200191505060405180910390f35b3462000000576200082f600480803590602001909190505062002935565b604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183600260200280838360008314620008a4575b805182526020831115620008a4576020820191506020810190506020830392506200087e565b50505090500182815260200194505050505060405180910390f35b346200000057620008cf62002a32565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3462000000576200093c60048080356000191690602001909190803590602001909190505062002a58565b6040518082815260200191505060405180910390f35b34620000005762000970600480803590602001909190505062002be7565b604051808215151515815260200191505060405180910390f35b346200000057620009ac60048080356000191690602001909190505062002c14565b6040518082815260200191505060405180910390f35b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b62000cd862002d6e565b151562000ce55762000000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506007600082815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b5092915050565b62000f0062002d6e565b151562000f0d5762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600062000f3862001928565b801562000f8e5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506007600082815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506007600082815260200190815260200160002060000173__DLinked_______________________________633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b5092915050565b620013e362002d6e565b1515620013f05762000000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006005600084815260200190815260200160002060020154141590505b919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905015156200153f5762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f4156200000057505050604051805190501515620016f15762000000565b620016fc8262002be7565b15620017085762000000565b600073ffffffffffffffffffffffffffffffffffffffff166006600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620017775762000000565b8073ffffffffffffffffffffffffffffffffffffffff167f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf7836006600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631604051808381526020018281526020019250505060405180910390a26006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662f55d9d336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15620000005760325a03f11562000000575050506006600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b6000600160149054906101000a900460ff1690505b90565b6200194a62002d6e565b1515620019575762000000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050151562001aed5762000000565b60008451148062001aff5750600a8451115b1562001b0b5762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509250604051610c848062002f9e833901809050604051809103906000f08015620000005791506080604051908101604052808681526020014381526020014281526020018473ffffffffffffffffffffffffffffffffffffffff16815250600560006009548152602001908152602001600020600082015181600001906002826002810192821562001c97579160200282015b8281111562001c9657825182906000191690559160200191906001019062001c73565b5b50905062001cbf91905b8082111562001cbb57600081600090555060010162001ca1565b5090565b5050602082015181600201556040820151816003015560608201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508160066000600954815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600090505b83518160ff1610156200204457600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff1681518110156200000057906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050151562001e5b5762000000565b60076000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab878560ff1681518110156200000057906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050815260200190815260200160002060000173__DLinked_______________________________63b3dad4c890916009546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905050838160ff168151811015620000005790602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6009546040518082815260200191505060405180910390a35b808060010191505062001d78565b600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c890916009546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f415620000005750505060405180519050506009600081548092919060010191905055505b5b5050505050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506007600082815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905015156200236e5762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff166005600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515620024b75762000000565b620024c28262002be7565b1515620024cf5762000000565b8260056000848152602001908152602001600020600001906002826002810192821562002521579160200282015b8281111562002520578251829060001916905591602001919060010190620024fd565b5b5090506200254991905b80821115620025455760008160009055506001016200252b565b5090565b50507f5f66d2a93b609bc6596b75c6dbb0e4f3f7cafd4b3b617157ff304d1076e583758183604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b505050565b620025c762002d6e565b1515620025d45762000000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600a5460056000848152602001908152602001600020600201540190505b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b5092915050565b620027d062002d6e565b1515620027dd5762000000565b80600a819055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6200281962002d6e565b1515620028265762000000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006006600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b620028cb62002d6e565b1515620028d85762000000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006200292b8462000f2c565b90505b9392505050565b600060006040604051908101604052806002905b60006000191681526020019060019003908162002949579050506000600560008681526020019081526020016000206002015493506005600086815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506005600086815260200190815260200160002060000160028060200260405190810160405280929190826002801562002a0a576020028201915b81546000191681526020019060010190808311620029f1575b50505050509150600560008681526020019081526020016000206003015490505b9193509193565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f1156200000057505050604051805190509050600860008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b5092915050565b60006000600a54600560008581526020019081526020016000206002015401905043811191505b50919050565b60006000600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506007600082815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b15620000005760325a03f41562000000575050506040518051905091505b50919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562002dd1576001905062002f9a565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141562002e1d576000905062002f9a565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062002f9a565b5b5b90560060606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d36401000000000261044d176401000000009004565b5b610340565b6100ee610118640100000000026106e1176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610179576001905061033d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c3576000905061033d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061033d565b5b5b90565b6109358061034f6000396000f300606060405236156100ac576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d146100b557806313af4035146100e8578063328d8f721461011b5780633af32abf1461013a5780636aa633b6146101855780637a9e5e4b146101ac57806383197ef0146101df5780638da5cb5b146101ee5780639281aa0b1461023d578063b70096131461027b578063bf7e214f1461030d575b6100b35b5b565b005b34610000576100e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061035c565b005b3461000057610119600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061038c565b005b34610000576101386004808035151590602001909190505061044d565b005b346100005761016b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061047f565b604051808215151515815260200191505060405180910390f35b34610000576101926104e6565b604051808215151515815260200191505060405180910390f35b34610000576101dd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104fe565b005b34610000576101ec6105bf565b005b34610000576101fb610610565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610279600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610636565b005b34610000576102f3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106a6565b604051808215151515815260200191505060405180910390f35b346100005761031a6106bb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103646106e1565b151561036f57610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6103946106e1565b151561039f57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6104556106e1565b151561046057610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104896104e6565b80156104de5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b6105066106e1565b151561051157610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105c76106e1565b15156105d257610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61063e6106e1565b151561064957610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006106b18461047f565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107425760019050610906565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561078c5760009050610906565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610906565b5b5b905600a165627a7a72305820ee320e40c00930a6041fe38472fc8a3ae36fa3154722cb31aa7e359b3d9aa9400029a165627a7a723058206eb939368b9626ebd6008777c1745ea1ba7ee116b90cd320f89e29e8c17eb4b70029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d36401000000000261044d176401000000009004565b5b610340565b6100ee610118640100000000026106e1176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610179576001905061033d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c3576000905061033d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061033d565b5b5b90565b6109358061034f6000396000f300606060405236156100ac576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d146100b557806313af4035146100e8578063328d8f721461011b5780633af32abf1461013a5780636aa633b6146101855780637a9e5e4b146101ac57806383197ef0146101df5780638da5cb5b146101ee5780639281aa0b1461023d578063b70096131461027b578063bf7e214f1461030d575b6100b35b5b565b005b34610000576100e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061035c565b005b3461000057610119600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061038c565b005b34610000576101386004808035151590602001909190505061044d565b005b346100005761016b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061047f565b604051808215151515815260200191505060405180910390f35b34610000576101926104e6565b604051808215151515815260200191505060405180910390f35b34610000576101dd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104fe565b005b34610000576101ec6105bf565b005b34610000576101fb610610565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610279600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610636565b005b34610000576102f3600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19169060200190919050506106a6565b604051808215151515815260200191505060405180910390f35b346100005761031a6106bb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103646106e1565b151561036f57610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6103946106e1565b151561039f57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6104556106e1565b151561046057610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104896104e6565b80156104de5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b6105066106e1565b151561051157610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105c76106e1565b15156105d257610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61063e6106e1565b151561064957610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006106b18461047f565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156107425760019050610906565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561078c5760009050610906565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610906565b5b5b905600a165627a7a72305820ee320e40c00930a6041fe38472fc8a3ae36fa3154722cb31aa7e359b3d9aa9400029'
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
        'bytecode': '606060405267016345785d8a0000600455600a600560006101000a81548160ff021916908360ff1602179055506175306006555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000fe6001620001056401000000000262000599176401000000009004565b5b6200037e565b620001236200014f6401000000000262000ce8176401000000009004565b1515620001305762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620001b257600190506200037b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001fe57600090506200037b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200037b565b5b5b90565b610f3c806200038e6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100f857806319aaf1f01461012b578063271f88b414610148578063328d8f72146101655780633af32abf146101845780634e71d92d146101cf57806367895db2146101de5780636aa633b6146101fe5780637a9e5e4b1461022557806383197ef0146102585780638778f415146102675780638da5cb5b146102ae5780639281aa0b146102fd578063a91ee0dc1461033b578063b70096131461036e578063bf3506c114610400578063bf7e214f1461044b575b6100f65b5b565b005b3461000057610129600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061049a565b005b3461000057610146600480803590602001909190505061055b565b005b3461000057610163600480803590602001909190505061057a565b005b346100005761018260048080351515906020019091905050610599565b005b34610000576101b5600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105cb565b604051808215151515815260200191505060405180910390f35b34610000576101dc610632565b005b34610000576101fc600480803560ff169060200190919050506109bb565b005b346100005761020b6109ee565b604051808215151515815260200191505060405180910390f35b3461000057610256600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a06565b005b3461000057610265610ac7565b005b3461000057610298600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34610000576102bb610b65565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610339600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610b8b565b005b346100005761036c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bfb565b005b34610000576103e6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610c54565b604051808215151515815260200191505060405180910390f35b3461000057610431600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c69565b604051808215151515815260200191505060405180910390f35b3461000057610458610cc2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104a2610ce8565b15156104ad57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610563610ce8565b151561056e57610000565b806006819055505b5b50565b610582610ce8565b151561058d57610000565b806004819055505b5b50565b6105a1610ce8565b15156105ac57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006105d56109ee565b801561062a5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561071657610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509250600654600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154019150829050600560009054906101000a900460ff1660ff16600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660ff1611806108a857504382115b156108b257610000565b6004543073ffffffffffffffffffffffffffffffffffffffff163110156108d857610000565b8073ffffffffffffffffffffffffffffffffffffffff1663502c40656004546000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303818588803b156100005761235a5a03f115610000575050505060405180519050151561096457610000565b8273ffffffffffffffffffffffffffffffffffffffff167fd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def36004546040518082815260200191505060405180910390a25b5b505050565b6109c3610ce8565b15156109ce57610000565b80600560006101000a81548160ff021916908360ff1602179055505b5b50565b6000600160149054906101000a900460ff1690505b90565b610a0e610ce8565b1515610a1957610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610acf610ce8565b1515610ada57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490505b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610b93610ce8565b1515610b9e57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b610c03610ce8565b1515610c0e57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000610c5f846105cb565b90505b9392505050565b60006000600654600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401905080431191505b50919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d495760019050610f0d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610d935760009050610f0d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610f0d565b5b5b905600a165627a7a72305820ebd9f42fc1de4bfa37d4b682db26ce50ed8a559230c71b260fa73ecde74eb19f0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000d27176401000000009004565b5b62000350565b620000f56200012164010000000002620036f3176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018457600190506200034d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d057600090506200034d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200034d565b5b5b90565b61394780620003606000396000f30060606040523615610173576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af403514610178578063140eccef146101ab5780631c9be5f414610215578063328d8f721461024a5780633af32abf14610269578063624d47fc146102b45780636aa633b6146102e95780636b40adb2146103105780636e1d7eab1461034e578063739453e31461038c5780637775ec3a146103ad5780637a1fa187146103e25780637a9e5e4b146104205780637c32db101461045357806383197ef0146104885780638a3ace18146104975780638da5cb5b146104dd5780639281aa0b1461052c578063a1e85c0f1461056a578063a66b774814610611578063a91ee0dc14610632578063b5d78d8c14610665578063b700961314610784578063bd10e57c14610816578063bf7e214f1461084b578063d83bc5c51461089a578063da72f92b146108cf578063f91427f414610915578063ffe466c914610953575b610000565b34610000576101a9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109bd565b005b34610000576101d3600480803560001916906020019091908035906020019091905050610a7e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610234600480803560001916906020019091905050610bab565b6040518082815260200191505060405180910390f35b346100005761026760048080351515906020019091905050610d27565b005b346100005761029a600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610d59565b604051808215151515815260200191505060405180910390f35b34610000576102d3600480803560001916906020019091905050610dc0565b6040518082815260200191505060405180910390f35b34610000576102f6610f3c565b604051808215151515815260200191505060405180910390f35b3461000057610338600480803560001916906020019091908035906020019091905050610f54565b6040518082815260200191505060405180910390f35b34610000576103766004808035600019169060200190919080359060200190919050506110d9565b6040518082815260200191505060405180910390f35b34610000576103ab60048080356000191690602001909190505061125e565b005b34610000576103cc6004808035600019169060200190919050506119f0565b6040518082815260200191505060405180910390f35b346100005761040a600480803560001916906020019091908035906020019091905050611b6c565b6040518082815260200191505060405180910390f35b3461000057610451600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611cf1565b005b3461000057610472600480803560001916906020019091905050611db2565b6040518082815260200191505060405180910390f35b3461000057610495611f2e565b005b34610000576104c360048080356000191690602001909190803560001916906020019091905050611f7f565b604051808215151515815260200191505060405180910390f35b34610000576104ea61216a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610568600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050612190565b005b346100005761060f600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050612200565b005b34610000576106306004808035600019169060200190919050506123a8565b005b3461000057610663600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612d4f565b005b3461000057610672612da8565b60405180846000191660001916815260200180602001806020018381038352858181518152602001915080519060200190808383600083146106d3575b8051825260208311156106d3576020820191506020810190506020830392506106af565b505050905090810190601f1680156106ff5780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360008314610747575b80518252602083111561074757602082019150602081019050602083039250610723565b505050905090810190601f1680156107735780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34610000576107fc600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050612f17565b604051808215151515815260200191505060405180910390f35b3461000057610835600480803560001916906020019091905050612f2c565b6040518082815260200191505060405180910390f35b34610000576108586130a8565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576108b96004808035600019169060200190919050506130ce565b6040518082815260200191505060405180910390f35b34610000576108fb6004808035600019169060200190919080356000191690602001909190505061324a565b604051808215151515815260200191505060405180910390f35b346100005761093d600480803560001916906020019091908035906020019091905050613441565b6040518082815260200191505060405180910390f35b346100005761097b6004808035600019169060200190919080359060200190919050506135c6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6109c56136f3565b15156109d057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b610d2f6136f3565b1515610d3a57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610d63610f3c565b8015610db85750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b6000600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561134457610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509350600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509250600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141561165b57610000565b600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050505050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b611cf96136f3565b1515611d0457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b611f366136f3565b1515611f4157610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c876000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141590505b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6121986136f3565b15156121a357610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6122086136f3565b151561221357610000565b81600481600019169055508060059080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061226a57805160ff1916838001178555612298565b82800160010185558215612298579182015b8281111561229757825182559160200191906001019061227c565b5b5090506122bd91905b808211156122b95760008160009055506001016122a1565b5090565b50508260069080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061230b57805160ff1916838001178555612339565b82800160010185558215612339579182015b8281111561233857825182559160200191906001019061231d565b5b50905061235e91905b8082111561235a576000816000905550600101612342565b5090565b50507f963aa8cc97c90686d2e91dc5fcb4b4bafe269796db43183bf713be9d926193e360045460405180826000191660001916815260200191505060405180910390a15b5b505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561248a57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561257557610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415156126d857610000565b600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600760008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600760008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600860008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519050508173ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663582604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b612d576136f3565b1515612d6257610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006020604051908101604052806000815250602060405190810160405280600081525060045460066005818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612e685780601f10612e3d57610100808354040283529160200191612e68565b820191906000526020600020905b815481529060010190602001808311612e4b57829003601f168201915b50505050509150808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612f045780601f10612ed957610100808354040283529160200191612f04565b820191906000526020600020905b815481529060010190602001808311612ee757829003601f168201915b505050505090509250925092505b909192565b6000612f2284610d59565b90505b9392505050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141592505b505092915050565b600060086000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060076000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156137545760019050613918565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561379e5760009050613918565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050613918565b5b5b905600a165627a7a723058201a8431cb43be89a28ec234774dea077bc154c71e37122520c3e167eb66da0b420029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6100cd60016100d364010000000002610465176401000000009004565b5b610340565b6100ee6101186401000000000261083e176401000000009004565b15156100f957610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610179576001905061033d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101c3576000905061033d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905061033d565b5b5b90565b610a928061034f6000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100c1578063328d8f72146100f45780633af32abf146101135780636aa633b61461015e5780637a9e5e4b1461018557806383197ef0146101b85780638da5cb5b146101c75780639281aa0b14610216578063a91ee0dc14610254578063b700961314610287578063bf7e214f14610319578063f3fef3a314610368575b6100bf5b5b565b005b34610000576100f2600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103a4565b005b346100005761011160048080351515906020019091905050610465565b005b3461000057610144600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610497565b604051808215151515815260200191505060405180910390f35b346100005761016b6104fe565b604051808215151515815260200191505060405180910390f35b34610000576101b6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610516565b005b34610000576101c56105d7565b005b34610000576101d4610628565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610252600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505061064e565b005b3461000057610285600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106be565b005b34610000576102ff600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610717565b604051808215151515815260200191505060405180910390f35b346100005761032661072c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103a2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610752565b005b6103ac61083e565b15156103b757610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61046d61083e565b151561047857610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006104a16104fe565b80156104f65750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b61051e61083e565b151561052957610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6105df61083e565b15156105ea57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61065661083e565b151561066157610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6106c661083e565b15156106d157610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600061072284610497565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600061075c61083e565b151561076757610000565b3073ffffffffffffffffffffffffffffffffffffffff163182106107a2573073ffffffffffffffffffffffffffffffffffffffff16316107a4565b815b90508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f1935050505015156107e957610000565b8273ffffffffffffffffffffffffffffffffffffffff167faeba90871f7da8a443096c396877004da901c92fcab3ec900a99cecddb19ec4d836040518082815260200191505060405180910390a25b5b505050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561089f5760019050610a63565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108e95760009050610a63565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610a63565b5b5b905600a165627a7a7230582052a053711828de4460dd1a21af11de3f6175b5923369845148014351990227380029'
      },
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
        'bytecode': '606060405234620000005760405160a080620010a8833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6200010960016200020a64010000000002620004d4176401000000009004565b5b826003906002826002810192821562000148579160200282015b828111156200014757825182906000191690559160200191906001019062000124565b5b5090506200017091905b808211156200016c57600081600090555060010162000152565b5090565b505083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600581600019169055505b5050505062000483565b620002286200025464010000000002620009c1176401000000009004565b1515620002355762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620002b7576001905062000480565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141562000303576000905062000480565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062000480565b5b5b90565b610c1580620004936000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305180237146100d357806313af4035146100fe578063328d8f72146101315780633af32abf14610150578063502c40651461019b5780636aa633b6146101bd5780637a9e5e4b146101e457806383197ef0146102175780638da5cb5b146102265780639281aa0b14610275578063a5685446146102b3578063b32ae69d146102f3578063b70096131461032c578063bf7e214f146103be575b610000565b34610000576100e061040d565b60405180826000191660001916815260200191505060405180910390f35b346100005761012f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610413565b005b346100005761014e600480803515159060200190919050506104d4565b005b3461000057610181600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610506565b604051808215151515815260200191505060405180910390f35b6101a361056d565b604051808215151515815260200191505060405180910390f35b34610000576101ca61064a565b604051808215151515815260200191505060405180910390f35b3461000057610215600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610662565b005b3461000057610224610723565b005b34610000576102336107bd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102b1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506107e3565b005b34610000576102f160048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610853565b005b346100005761030e600480803590602001909190505061096e565b60405180826000191660001916815260200191505060405180910390f35b34610000576103a4600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610986565b604051808215151515815260200191505060405180910390f35b34610000576103cb61099b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60055481565b61041b6109c1565b151561042657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6104dc6109c1565b15156104e757610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600061051061064a565b80156105655750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f1935050505015610642577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019050610647565b610000565b90565b6000600160149054906101000a900460ff1690505b90565b61066a6109c1565b151561067557610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561077f57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6107eb6109c1565b15156107f657610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b61085b6109c1565b151561086657610000565b80600390600282600281019282156108a1579160200282015b828111156108a057825182906000191690559160200191906001019061087f565b5b5090506108c691905b808211156108c25760008160009055506001016108aa565b5090565b5050600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6005546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b156100005760325a03f115610000575050505b5b50565b6003816002811015610000570160005b915090505481565b600061099184610506565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610a225760019050610be6565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a6c5760009050610be6565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610be6565b5b5b905600a165627a7a7230582093c8e7729040d53a61394128cd649bc40b363749cfea51901f87fe60b9ecc15a0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000d09176401000000009004565b5b62000350565b620000f5620001216401000000000262001746176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018457600190506200034d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d057600090506200034d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200034d565b5b5b90565b612a4980620003606000396000f3006060604052361562000119576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063087cbd40146200011f57806313af403514620001555780631a0919dc146200018b5780631f8db42d14620001c757806330d0001214620001eb578063328d8f72146200027b5780633af32abf146200029d5780636aa633b614620002eb5780636b4316db14620003155780637a9e5e4b146200035157806383197ef014620003875780638da5cb5b14620003995780639281aa0b14620003eb578063b7009613146200042c578063bb34534c14620004c1578063bf7e214f1462000525578063c3c5a5471462000577578063ce5494bb14620005c5578063d5a760f514620005fb575b62000000565b34620000005762000153600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000671565b005b34620000005762000189600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050620006ce565b005b346200000057620001ad60048080356000191690602001909190505062000793565b604051808215151515815260200191505060405180910390f35b346200000057620001e960048080356000191690602001909190505062000919565b005b34620000005762000239600480803560001916906020019091908060400190600280602002604051908101604052809291908260026020028082843782019150505050509190505062000a71565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3462000000576200029b6004808035151590602001909190505062000d09565b005b346200000057620002d1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062000d3f565b604051808215151515815260200191505060405180910390f35b346200000057620002fb62000da9565b604051808215151515815260200191505060405180910390f35b3462000000576200033760048080356000191690602001909190505062000dc1565b604051808215151515815260200191505060405180910390f35b34620000005762000385600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062001191565b005b3462000000576200039762001256565b005b346200000057620003a9620012ab565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3462000000576200042a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050620012d1565b005b346200000057620004a7600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190505062001345565b604051808215151515815260200191505060405180910390f35b346200000057620004e36004808035600019169060200190919050506200135c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3462000000576200053562001417565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346200000057620005ab600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506200143d565b604051808215151515815260200191505060405180910390f35b346200000057620005f9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506200154c565b005b3462000000576200062f600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505062001667565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6200067b62001746565b1515620006885762000000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b620006d862001746565b1515620006e55762000000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000620007a43362001667565b9150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632874528e85336000604051602001526040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905080156200090d578173ffffffffffffffffffffffffffffffffffffffff166383197ef06040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b15620000005760325a03f11562000000575050506001925062000912565b600092505b5050919050565b3373ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1614151562000a055762000000565b80600019167fdf5c699569cbe77bd306dae8199f30a79b466d3420dd133672100ae9fa68660433604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b50565b60006000600062000a828562000dc1565b151562000a8f5762000000565b308486336040516110a88062001976833901808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018460026020028083836000831462000b0d575b80518252602083111562000b0d5760208201915060208101905060208303925062000ae7565b50505090500183600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f0801562000000579150600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ebd9a838633856000604051602001526040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018084600019166000191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905080151562000c955762000000565b84600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca683604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28192505b505092915050565b62000d1362001746565b151562000d205762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600062000d4b62000da9565b801562000da15750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b60006000600090505b602060ff168160ff161015620011815760007f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000e5f5762001181565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191611806200105e575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191610801562000fda575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b80156200105d5750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b8062001162575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015620011615750602e7f010000000000000000000000000000000000000000000000000000000000000002838260ff16602081101562000000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b156200117257600091506200118b565b5b808060010191505062000dca565b60038160ff161191505b50919050565b6200119b62001746565b1515620011a85762000000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6200126062001746565b15156200126d5762000000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b620012db62001746565b1515620012e85762000000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000620013528462000d3f565b90505b9392505050565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff16600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff16141590505b919050565b6200155662001746565b1515620015635762000000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166313af4035826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b15620000005760325a03f1156200000057505050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620017a9576001905062001972565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620017f5576000905062001972565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062001972565b5b5b905600606060405234620000005760405160a080620010a8833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6200010960016200020a64010000000002620004d4176401000000009004565b5b826003906002826002810192821562000148579160200282015b828111156200014757825182906000191690559160200191906001019062000124565b5b5090506200017091905b808211156200016c57600081600090555060010162000152565b5090565b505083600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600581600019169055505b5050505062000483565b620002286200025464010000000002620009c1176401000000009004565b1515620002355762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620002b7576001905062000480565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141562000303576000905062000480565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062000480565b5b5b90565b610c1580620004936000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806305180237146100d357806313af4035146100fe578063328d8f72146101315780633af32abf14610150578063502c40651461019b5780636aa633b6146101bd5780637a9e5e4b146101e457806383197ef0146102175780638da5cb5b146102265780639281aa0b14610275578063a5685446146102b3578063b32ae69d146102f3578063b70096131461032c578063bf7e214f146103be575b610000565b34610000576100e061040d565b60405180826000191660001916815260200191505060405180910390f35b346100005761012f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610413565b005b346100005761014e600480803515159060200190919050506104d4565b005b3461000057610181600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610506565b604051808215151515815260200191505060405180910390f35b6101a361056d565b604051808215151515815260200191505060405180910390f35b34610000576101ca61064a565b604051808215151515815260200191505060405180910390f35b3461000057610215600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610662565b005b3461000057610224610723565b005b34610000576102336107bd565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102b1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803515159060200190919050506107e3565b005b34610000576102f160048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610853565b005b346100005761030e600480803590602001909190505061096e565b60405180826000191660001916815260200191505060405180910390f35b34610000576103a4600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610986565b604051808215151515815260200191505060405180910390f35b34610000576103cb61099b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60055481565b61041b6109c1565b151561042657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6104dc6109c1565b15156104e757610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600061051061064a565b80156105655750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f1935050505015610642577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019050610647565b610000565b90565b6000600160149054906101000a900460ff1690505b90565b61066a6109c1565b151561067557610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561077f57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6107eb6109c1565b15156107f657610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b61085b6109c1565b151561086657610000565b80600390600282600281019282156108a1579160200282015b828111156108a057825182906000191690559160200191906001019061087f565b5b5090506108c691905b808211156108c25760008160009055506001016108aa565b5090565b5050600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6005546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b156100005760325a03f115610000575050505b5b50565b6003816002811015610000570160005b915090505481565b600061099184610506565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610a225760019050610be6565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a6c5760009050610be6565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610be6565b5b5b905600a165627a7a7230582093c8e7729040d53a61394128cd649bc40b363749cfea51901f87fe60b9ecc15a0029a165627a7a72305820f3dcefd8beeb2b8df03475e2f3062de38291292cec75f2d672463495674ea44e0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d7640100000000026200081e176401000000009004565b5b62000350565b620000f5620001216401000000000262000cf7176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018457600190506200034d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d057600090506200034d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200034d565b5b5b90565b610f4b80620003606000396000f300606060405236156100e4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100e95780632874528e1461011c5780632a1887bc14610174578063328d8f72146101cc5780633af32abf146101eb5780635ebd9a83146102365780636aa633b6146102ad5780637a9e5e4b146102d457806383197ef0146103075780638d34cbb7146103165780638da5cb5b1461036e5780639281aa0b146103bd578063b7009613146103fb578063b96b099f1461048d578063bf7e214f14610500578063d1a7c77f1461054f575b610000565b346100005761011a600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105b0565b005b346100005761015a60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610671565b604051808215151515815260200191505060405180910390f35b34610000576101b260048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061074a565b604051808215151515815260200191505060405180910390f35b34610000576101e96004808035151590602001909190505061081e565b005b346100005761021c600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610850565b604051808215151515815260200191505060405180910390f35b346100005761029360048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506108b7565b604051808215151515815260200191505060405180910390f35b34610000576102ba6109c9565b604051808215151515815260200191505060405180910390f35b3461000057610305600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109e1565b005b3461000057610314610aa2565b005b346100005761035460048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610af3565b604051808215151515815260200191505060405180910390f35b346100005761037b610b76565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103f9600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610b9c565b005b3461000057610473600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610c0c565b604051808215151515815260200191505060405180910390f35b34610000576104be600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c21565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761050d610c8b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761056e600480803560001916906020019091905050610cb1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6105b8610cf7565b15156105c357610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600061067b610cf7565b151561068657610000565b610690838361074a565b1561073e5760046000846000191660001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560019050610743565b600090505b5b92915050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660046000856000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b92915050565b610826610cf7565b151561083157610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b600061085a6109c9565b80156108af5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006108c1610cf7565b15156108cc57610000565b6108d68484610af3565b156109bc5781600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160046000866000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600190506109c1565b600090505b5b9392505050565b6000600160149054906101000a900460ff1690505b90565b6109e9610cf7565b15156109f457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610aaa610cf7565b1515610ab557610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600073ffffffffffffffffffffffffffffffffffffffff16610b1684610cb1565b73ffffffffffffffffffffffffffffffffffffffff16148015610b6d5750600073ffffffffffffffffffffffffffffffffffffffff16610b5583610c21565b73ffffffffffffffffffffffffffffffffffffffff16145b90505b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610ba4610cf7565b1515610baf57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000610c1784610850565b90505b9392505050565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060046000836000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610d585760019050610f1c565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610da25760009050610f1c565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050610f1c565b5b5b905600a165627a7a72305820a667a302d419a44114d2f57307bfe002da936e807d2e752b1426665d7e321fde0029'
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
        'bytecode': '606060405234610000575b610104806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063bd6de11c14603c575b6000565b3460005760d1600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060d3565b005b5b50505600a165627a7a72305820c63942d0530d3cff0a9d8c00f0b11617506e519d20e3f2ead8eea067ac81ee870029'
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
        'bytecode': '606060405234610000575b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101e3806100c66000396000f30060606040523615610055576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635067a4bd146100635780639fc288d1146100a3578063d900596c146100b2575b34610000576100615b5b565b005b34610000576100a160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c1565b005b34610000576100b0610139565b005b34610000576100bf610178565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c382826040518083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16001604051808215151515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d16000604051808215151515815260200191505060405180910390a15b5600a165627a7a72305820ab3a75b790dad698eeea63998381f4065f9317676452785152b3708afa16b2020029'
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
        'bytecode': '606060405234610000575b61010e806100196000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806324fef5c814603c575b6000565b60596004808035906020019091908035906020019091905050606f565b6040518082815260200191505060405180910390f35b60006000600090505b838054905081101560b7578284828154811015600057906000526020600020900160005b5054141560aa5780915060db565b5b80806001019150506078565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91505b50929150505600a165627a7a72305820e90633cfdd2a36e35bf4ad5207e5b4d24ce64d214b0d003df9cc3915a823a61c0029'
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
        'bytecode': '60606040525b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d06001620000d76401000000000262000b8e176401000000009004565b5b62000350565b620000f5620001216401000000000262001a56176401000000009004565b1515620001025762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156200018457600190506200034d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d057600090506200034d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f11562000000575050506040518051905090506200034d565b5b5b90565b611caa80620003606000396000f30060606040523615610110576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a7ed48a1461011557806313af40351461014a5780632faf44f61461017d578063328d8f72146101b65780633af32abf146101d55780636aa633b6146102205780637329d4b0146102475780637a9e5e4b1461028557806383197ef0146102b85780638da5cb5b146102c75780639281aa0b14610316578063a91ee0dc14610354578063b700961314610387578063b776ff6b14610419578063baba90cf1461045f578063bd95db1114610498578063bf7e214f146104cb578063cb5356ec1461051a578063ea7ca08f14610558578063fdb5c2d81461058d575b610000565b34610000576101346004808035600019169060200190919050506105c2565b6040518082815260200191505060405180910390f35b346100005761017b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061073e565b005b346100005761019c6004808035600019169060200190919050506107ff565b604051808215151515815260200191505060405180910390f35b34610000576101d360048080351515906020019091905050610b8e565b005b3461000057610206600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610bc0565b604051808215151515815260200191505060405180910390f35b346100005761022d610c27565b604051808215151515815260200191505060405180910390f35b346100005761026f600480803560001916906020019091908035906020019091905050610c3f565b6040518082815260200191505060405180910390f35b34610000576102b6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610dc4565b005b34610000576102c5610e85565b005b34610000576102d4610ed6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610352600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610efc565b005b3461000057610385600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f6c565b005b34610000576103ff600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050610fc5565b604051808215151515815260200191505060405180910390f35b346100005761044560048080356000191690602001909190803560001916906020019091905050610fda565b604051808215151515815260200191505060405180910390f35b346100005761047e600480803560001916906020019091905050611219565b604051808215151515815260200191505060405180910390f35b34610000576104c9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061155a565b005b34610000576104d86115b3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576105426004808035600019169060200190919080359060200190919050506115d9565b6040518082815260200191505060405180910390f35b346100005761057760048080356000191690602001909190505061175e565b6040518082815260200191505060405180910390f35b34610000576105ac6004808035600019169060200190919050506118da565b6040518082815260200191505060405180910390f35b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b610746611a56565b151561075157610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905015156108e357610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c89091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092508215610b85578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b610b96611a56565b1515610ba157610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000610bca610c27565b8015610c1f5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b6000600160149054906101000a900460ff1690505b90565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b610dcc611a56565b1515610dd757610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610e8d611a56565b1515610e9857610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610f04611a56565b1515610f0f57610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b610f74611a56565b1515610f7f57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000610fd084610bc0565b90505b9392505050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092505b505092915050565b600060006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905015156112fd57610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092505b5b5050919050565b611562611a56565b151561156d57610000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060056000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611ab75760019050611c7b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611b015760009050611c7b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050611c7b565b5b5b905600a165627a7a7230582084b6bf28c827e34dda4f7f1fe425b0b759372be027591397aefef1da2d4addd00029'
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
        'bytecode': '606060405234610000575b60dc806100186000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360cfa96314603c575b6000565b34600057608e600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060a4565b6040518082815260200191505060405180910390f35b6000600b90505b9190505600a165627a7a7230582009f027f101302a574b51351f9ef98c0e78886df02c2589611d1bcfc8ca8c990b0029'
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
        'bytecode': '606060405260016007555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000d56001620000dc640100000000026200067c176401000000009004565b5b62000355565b620000fa6200012664010000000002620013b3176401000000009004565b1515620001075762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000189576001905062000352565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001d5576000905062000352565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062000352565b5b5b90565b61160780620003656000396000f30060606040523615610126576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461012b578063328d8f721461015e57806338a699a41461017d5780633af32abf146101b6578063446bffba146102015780634bbff4a7146102225780634cc82215146102455780636aa633b6146102625780636b4316db146102895780636d74e7ab146102c25780637a9e5e4b146102f757806383197ef01461032a5780638da5cb5b146103395780639281aa0b1461038857806392aaa797146103c6578063986f191c146103e9578063a1b1daee1461040c578063a91ee0dc14610445578063b700961314610478578063bf7e214f1461050a578063ee564eb914610559578063ee84fbce1461058a575b610000565b346100005761015c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506105bb565b005b346100005761017b6004808035151590602001909190505061067c565b005b346100005761019c6004808035600019169060200190919050506106ae565b604051808215151515815260200191505060405180910390f35b34610000576101e7600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106d8565b604051808215151515815260200191505060405180910390f35b346100005761022060048080356000191690602001909190505061073f565b005b346100005761022f610965565b6040518082815260200191505060405180910390f35b346100005761026060048080359060200190919050506109f1565b005b346100005761026f610b19565b604051808215151515815260200191505060405180910390f35b34610000576102a8600480803560001916906020019091905050610b31565b604051808215151515815260200191505060405180910390f35b34610000576102e1600480803560001916906020019091905050610eef565b6040518082815260200191505060405180910390f35b3461000057610328600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f15565b005b3461000057610337610fd6565b005b3461000057610346611027565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103c4600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035151590602001909190505061104d565b005b34610000576103d36110bd565b6040518082815260200191505060405180910390f35b34610000576103f6611149565b6040518082815260200191505060405180910390f35b346100005761042760048080359060200190919050506111d5565b60405180826000191660001916815260200191505060405180910390f35b3461000057610476600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506111f3565b005b34610000576104f0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191690602001909190505061124c565b604051808215151515815260200191505060405180910390f35b3461000057610517611261565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576105746004808035906020019091905050611287565b6040518082815260200191505060405180910390f35b34610000576105a5600480803590602001909190505061131d565b6040518082815260200191505060405180910390f35b6105c36113b3565b15156105ce57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6106846113b3565b151561068f57610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060086000846000191660001916815260200190815260200160002054141590505b919050565b60006106e2610b19565b80156107375750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561081d57610000565b61082681610b31565b15806108375750610836816106ae565b5b1561084157610000565b60075460086000836000191660001916815260200190815260200160002081905550600473__DLinked_______________________________63b3dad4c890916007546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505080600960006007548152602001908152602001600020816000191690555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196007546040518082815260200191505060405180910390a26007600081548092919060010191905055505b5b50565b6000600473__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b60006109fb6113b3565b1515610a0657610000565b60096000838152602001908152602001600020549050600860008260001916600019168152602001908152602001600020600090556009600083815260200190815260200160002060009055600473__DLinked_______________________________630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b6000600160149054906101000a900460ff1690505b90565b60006000600090505b602060ff168160ff161015610edf5760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415610bcb57610edf565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610dc3575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610d41575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610dc25750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610ec3575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610ec25750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610ed15760009150610ee9565b5b8080600101915050610b3a565b60038160ff161191505b50919050565b60006008600083600019166000191681526020019081526020016000205490505b919050565b610f1d6113b3565b1515610f2857610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610fde6113b3565b1515610fe957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6110556113b3565b151561106057610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b6000600473__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b6000600473__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b6000600960008381526020019081526020016000205490505b919050565b6111fb6113b3565b151561120657610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000611257846106d8565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600473__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600473__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561141457600190506115d8565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561145e57600090506115d8565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506115d8565b5b5b905600a165627a7a723058202ff810a112736275f36b6372afed50d05350d2877812d6f25e008d80df8c8cc10029'
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
        'bytecode': '6060604052655af3107a400060045566038d7ea4c680006005555b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b620000e56001620000ec6401000000000262000991176401000000009004565b5b62000365565b6200010a620001366401000000000262001ff4176401000000009004565b1515620001175762000000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141562000199576001905062000362565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415620001e5576000905062000362565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b15620000005760325a03f115620000005750505060405180519050905062000362565b5b5b90565b61224880620003756000396000f30060606040523615610147576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630737007e1461014c5780630e1af57b1461017f57806313af4035146101b05780631937c261146101e35780633129aa0d14610214578063328d8f721461024e57806336d8c30a1461026d5780633af32abf146102a1578063551b5dcc146102ec5780635f6b9f7d1461031d5780636aa633b61461034e5780637a9e5e4b146103755780637f19abe0146103a857806383197ef0146103db5780638da5cb5b146103ea5780639281aa0b14610439578063a1769ae214610477578063a85ebabe146104b1578063a91ee0dc146104d5578063ad3bc60614610508578063b42775b51461057b578063b70096131461059f578063bf7e214f14610631578063ddf0431014610680578063f1e0510e146106d6575b610000565b346100005761017d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610709565b005b346100005761019a6004808035906020019091905050610762565b6040518082815260200191505060405180910390f35b34610000576101e1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610783565b005b34610000576101fe6004808035906020019091905050610844565b6040518082815260200191505060405180910390f35b346100005761023860048080359060200190919080359060200190919050506108e6565b6040518082815260200191505060405180910390f35b346100005761026b60048080351515906020019091905050610991565b005b346100005761028b600480803560ff169060200190919050506109c3565b6040518082815260200191505060405180910390f35b34610000576102d2600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109dc565b604051808215151515815260200191505060405180910390f35b34610000576103076004808035906020019091905050610a43565b6040518082815260200191505060405180910390f35b34610000576103386004808035906020019091905050610ae5565b6040518082815260200191505060405180910390f35b346100005761035b610b87565b604051808215151515815260200191505060405180910390f35b34610000576103a6600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b9f565b005b34610000576103d9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610c60565b005b34610000576103e8610cb9565b005b34610000576103f7610d0a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610475600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080351515906020019091905050610d30565b005b346100005761049b6004808035906020019091908035906020019091905050610da0565b6040518082815260200191505060405180910390f35b6104d3600480803560ff16906020019091908035906020019091905050610e4b565b005b3461000057610506600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061165a565b005b346100005761052c60048080359060200190919080359060200190919050506116b3565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260000b60000b81526020019250505060405180910390f35b61059d600480803560ff1690602001909190803590602001909190505061176c565b005b3461000057610617600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019091905050611ef4565b604051808215151515815260200191505060405180910390f35b346100005761063e611f09565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576106ba600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611f2f565b604051808260000b60000b815260200191505060405180910390f35b3461000057610707600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611f9b565b005b610711611ff4565b151561071c57610000565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600960008381526020019081526020016000206000015490505b919050565b61078b611ff4565b151561079657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006009600083815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006009600084815260200190815260200160002060040173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b610999611ff4565b15156109a457610000565b80600160146101000a81548160ff0219169083151502179055505b5b50565b60006004546002830a60ff16600554020190505b919050565b60006109e6610b87565b8015610a3b5750600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b90505b919050565b60006009600083815260200190815260200160002060040173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006009600083815260200190815260200160002060040173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600160149054906101000a900460ff1690505b90565b610ba7611ff4565b1515610bb257610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610c68611ff4565b1515610c7357610000565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b610cc1611ff4565b1515610ccc57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610d38611ff4565b1515610d4357610000565b80600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b5050565b60006009600084815260200190815260200160002060040173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60006000600060008560018160ff161080610e695750600a8160ff16115b15610e7357610000565b34610e7d826109c3565b1115610e8857610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610f6657610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509450600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a5718993876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905093506002870a60ff16600554029250600960008781526020019081526020016000206001016000815480929190600101919050555060006009600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b14158061122f575043600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28886000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050105b1561123957610000565b866009600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508660ff1660096000888152602001908152602001600020600001600082825401925050819055506009600087815260200190815260200160002060040173__DLinked_______________________________63b3dad4c89091600960008a8152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505084600960008881526020019081526020016000206003016000600960008a815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050151561144557610000565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051809050600060405180830381858888f1935050505015156114ac57610000565b6004548301915034821015611501573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f19350505050151561150057610000565b5b6009600087815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519050868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600960008b815260200190815260200160002060020160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b50505050505050565b611662611ff4565b151561166d57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060096000858152602001908152602001600020600301600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506009600085815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b9250929050565b6000600060008460018160ff1610806117885750600a8160ff16115b1561179257610000565b3461179c826109c3565b11156117a757610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561188557610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905093506002860a60ff16600554029250600960008681526020019081526020016000206001016000815480929190600101919050555060006009600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580611aa5575043600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050105b15611aaf57610000565b856000036009600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508560ff1660096000878152602001908152602001600020600001600082825403925050819055506009600086815260200190815260200160002060040173__DLinked_______________________________63b3dad4c8909160096000898152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050836009600087815260200190815260200160002060030160006009600089815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f193505050501515611ce057610000565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051809050600060405180830381858888f193505050501515611d4757610000565b6004548301915034821015611d9c573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f193505050501515611d9b57610000565b5b6009600086815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519050858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600960008a815260200190815260200160002060020160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b505050505050565b6000611eff846109dc565b90505b9392505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006009600084815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b92915050565b611fa3611ff4565b1515611fae57610000565b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156120555760019050612219565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561209f5760009050612219565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff00000000000000000000000000000000000000000000000000000000166000604051602001526040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050612219565b5b5b905600a165627a7a7230582014107e3883eceeb0dae518576969c9e280345c9ce60697b1d772fbd249e8cef80029'
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
