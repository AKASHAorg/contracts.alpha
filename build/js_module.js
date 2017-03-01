'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  const Web3 = require('web3');
}

dapple['AKASHA'] = (function builder () {
  const environments = {
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
    const args = Array.from(arguments);
    args[0].data = this.headers.bytecode;
    return this._class.new.apply(this._class, args);
  };

  const passthroughs = ['at', 'new'];
  for (let i = 0; i < passthroughs.length; i += 1) {
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
      if (!environments.hasOwnProperty(env)) {
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
                'name': 'newRegistry',
                'type': 'address'
              }
            ],
            'name': 'setRegistry',
            'outputs': [],
            'payable': false,
            'type': 'function'
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610261806100576000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461005457806383197ef014610087578063a91ee0dc14610096575b610000565b3461000057610085600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100c9565b005b3461000057610094610122565b005b34610000576100c7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610173565b005b6100d16101cc565b15156100dc57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b61012a6101cc565b151561013557610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b61017b6101cc565b151561018657610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561022d5760019050610232565b600090505b905600a165627a7a7230582023c3f5aafc0524df08bfe3823e532f045974a9cb73acccedf004c634a76fbcc10029'
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
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '606060405234610000575b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6101ca8061005c6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461004957806383197ef01461007c575b610000565b346100005761007a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061008b565b005b34610000576100896100e4565b005b610093610135565b151561009e57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6100ec610135565b15156100f757610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610196576001905061019b565b600090505b905600a165627a7a72305820c587839c2c39a6a36966a7e39d2e1a80894fa21d8abb37742d997d60f0e9171a0029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6112f0806100576000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063044b4a2a146100bd57806313af4035146100ee578063279bc3aa1461012157806348892753146101545780634c9b78da1461021757806371aa5a661461024857806383197ef01461029a578063a71eb6a1146102a9578063a91ee0dc146102cf578063c407afe714610302578063e616d76f14610333578063f6aaa8671461036d575b610000565b34610000576100d860048080359060200190919050506103a7565b6040518082815260200191505060405180910390f35b346100005761011f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610449565b005b3461000057610152600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104a2565b005b346100005761017860048080359060200190919080359060200190919050506104fb565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001846002602002808383600083146101f0575b8051825260208311156101f0576020820191506020810190506020830392506101cc565b50505090500183151515158152602001828152602001965050505050505060405180910390f35b346100005761023260048080359060200190919050506106b3565b6040518082815260200191505060405180910390f35b346100005761029860048080359060200190919080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019091905050610755565b005b34610000576102a7610d36565b005b34610000576102cd6004808035906020019091908035906020019091905050610d87565b005b3461000057610300600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061100a565b005b346100005761031d6004808035906020019091905050611063565b6040518082815260200191505060405180910390f35b34610000576103576004808035906020019091908035906020019091905050611105565b6040518082815260200191505060405180910390f35b346100005761039160048080359060200190919080359060200190919050506111b0565b6040518082815260200191505060405180910390f35b60006003600083815260200190815260200160002060010173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b61045161125b565b151561045c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6104aa61125b565b15156104b557610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060006040604051908101604052806002905b600060001916815260200190600190039081610511579050506000600060036000898152602001908152602001600020600401600088815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16955060036000898152602001908152602001600020600401600088815260200190815260200160002060010154945060036000898152602001908152602001600020600401600088815260200190815260200160002060000154935060036000898152602001908152602001600020600401600088815260200190815260200160002060020160028060200260405190810160405280929190826002801561063a576020028201915b81546000191681526020019060010190808311610622575b5050505050925060036000898152602001908152602001600020600401600088815260200190815260200160002060040160149054906101000a900460ff1691506003600089815260200190815260200160002060040160008881526020019081526020016000206005015490505b9295509295509295565b60006003600083815260200190815260200160002060010173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561083557610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166352806929856000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905015156108e757610000565b6003600085815260200190815260200160002060000160008154809291906001019190505550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050806003600086815260200190815260200160002060040160006003600088815260200190815260200160002060000154815260200190815260200160002060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600360008681526020019081526020016000206004016000600360008881526020019081526020016000206000015481526020019081526020016000206002019060028260028101928215610ada579160200282015b82811115610ad9578251829060001916905591602001919060010190610ab8565b5b509050610aff91905b80821115610afb576000816000905550600101610ae3565b5090565b50506003600085815260200190815260200160002060000154600360008681526020019081526020016000206004016000600360008881526020019081526020016000206000015481526020019081526020016000206001018190555042600360008681526020019081526020016000206004016000600360008881526020019081526020016000206000015481526020019081526020016000206005018190555060008214158015610bc75750600360008581526020019081526020016000206000015482105b15610c12578160036000868152602001908152602001600020600401600060036000888152602001908152602001600020600001548152602001908152602001600020600001819055505b6003600085815260200190815260200160002060010173__DLinked_______________________________63b3dad4c8909160036000888152602001908152602001600020600001546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519050508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960036000888152602001908152602001600020600001546040518082815260200191505060405180910390a35b5b50505050565b610d3e61125b565b1515610d4957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610e6757610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff1660036000858152602001908152602001600020600401600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610fc057610000565b600160036000858152602001908152602001600020600401600084815260200190815260200160002060040160146101000a81548160ff0219169083151502179055505b5b505050565b61101261125b565b151561101d57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006003600083815260200190815260200160002060010173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006003600084815260200190815260200160002060010173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60006003600084815260200190815260200160002060010173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156112bc57600190506112c1565b600090505b905600a165627a7a72305820b77fc2f965aac59b1aa783045827557ed74d82952c20aff67999fe586bd239410029'
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
        'bytecode': '606060405234610000575b610517806100196000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630e8478db146100915780633e552821146100ca57806348eb81eb146100ff57806370da6fe61461013457806391c0ab63146101605780639f58851f1461018c578063b3dad4c8146101c5578063d6867e87146101fe575b610000565b6100b0600480803590602001909190803590602001909190505061022a565b604051808215151515815260200191505060405180910390f35b6100e96004808035906020019091908035906020019091905050610319565b6040518082815260200191505060405180910390f35b61011e600480803590602001909190803590602001909190505061033a565b6040518082815260200191505060405180910390f35b61014a600480803590602001909190505061035b565b6040518082815260200191505060405180910390f35b610176600480803590602001909190505061037c565b6040518082815260200191505060405180910390f35b6101ab600480803590602001909190803590602001909190505061038b565b604051808215151515815260200191505060405180910390f35b6101e460048080359060200190919080359060200190919050506103ff565b604051808215151515815260200191505060405180910390f35b61021460048080359060200190919050506104ca565b6040518082815260200191505060405180910390f35b6000610236838361038b565b1561030f57600190508260010160008381526020019081526020016000205483600101600085600201600086815260200190815260200160002054815260200190815260200160002081905550826002016000838152602001908152602001600020548360020160008560010160008681526020019081526020016000205481526020019081526020016000208190555082600201600083815260200190815260200160002060009055826001016000838152602001908152602001600020600090558260000160008154809291906001900391905055505b8090505b92915050565b60008260010160008381526020019081526020016000205490505b92915050565b60008260020160008381526020019081526020016000205490505b92915050565b6000816001016000600081526020019081526020016000205490505b919050565b6000816000015490505b919050565b6000600082141561039b57610000565b6000836002016000848152602001908152602001600020541415806103d6575060008360010160008481526020019081526020016000205414155b806103f65750818360010160006000815260200190815260200160002054145b90505b92915050565b600061040b838361038b565b15156104c0576001905081836002016000856001016000600081526020019081526020016000205481526020019081526020016000208190555082600101600060008152602001908152602001600020548360010160008481526020019081526020016000208190555060008360020160008481526020019081526020016000208190555081836001016000600081526020019081526020016000208190555082600001600081548092919060010191905055505b8090505b92915050565b6000816002016000600081526020019081526020016000205490505b9190505600a165627a7a7230582085ea4c1371260866aa69f9b052a1672711d65232fb44af28e1000bee1cf2c4f30029'
      },
      'DappleEnv': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '6060604052346000575b5b5b60358060186000396000f30060606040525b60005600a165627a7a723058207942c63025d0a4e2513fb6ebeff8b7d5ef3db6af153ace3e24da15f45dfb3ff00029'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052346000575b60358060166000396000f30060606040525b60005600a165627a7a723058207cf3d034f21afaeb7a8f892493cda36a4827b9577ff2d62f15ea30df884b8ecf0029'
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
          }
        ],
        'bytecode': '606060405260016007556175306008555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b612a51806100626000396000f30060606040523615610131576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630147966a1461013657806305748bb81461016b57806313af4035146101a05780631a1f2a91146101d35780633b003816146102115780633d89b81214610246578063507d9c2b1461027b578063515c44a5146102b957806352806929146102ec5780635f8534ae146103215780637abd59581461033e5780637b965fa1146103be5780637d026a1c146103f357806383197ef01461043c578063868e5b281461044b57806389efbd091461047c5780638c73a3fe146104ba578063a5718993146104d7578063a91ee0dc14610534578063bae78d7b14610567578063de2ddc3e1461060f578063e05190811461064d578063e24dd4c414610682575b610000565b34610000576101556004808035600019169060200190919050506106b7565b6040518082815260200191505060405180910390f35b346100005761018a600480803560001916906020019091905050610839565b6040518082815260200191505060405180910390f35b34610000576101d1600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506109bb565b005b34610000576101fb600480803560001916906020019091908035906020019091905050610a14565b6040518082815260200191505060405180910390f35b3461000057610230600480803560001916906020019091905050610b73565b6040518082815260200191505060405180910390f35b3461000057610265600480803560001916906020019091905050610cf5565b6040518082815260200191505060405180910390f35b34610000576102a3600480803560001916906020019091908035906020019091905050610e4b565b6040518082815260200191505060405180910390f35b34610000576102ea600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610faa565b005b34610000576103076004808035906020019091905050611003565b604051808215151515815260200191505060405180910390f35b346100005761033c6004808035906020019091905050611028565b005b34610000576103bc60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919050506114e3565b005b34610000576103dd600480803560001916906020019091905050611bee565b6040518082815260200191505060405180910390f35b346100005761043a60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019091905050611d44565b005b3461000057610449612065565b005b346100005761046660048080359060200190919050506120b6565b6040518082815260200191505060405180910390f35b34610000576104a46004808035600019169060200190919080359060200190919050506120db565b6040518082815260200191505060405180910390f35b34610000576104d56004808035906020019091905050612266565b005b34610000576104f26004808035906020019091905050612285565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610565600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506122c3565b005b3461000057610582600480803590602001909190505061231c565b604051808581526020018473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001836002602002808383600083146105f4575b8051825260208311156105f4576020820191506020810190506020830392506105d0565b50505090500182815260200194505050505060405180910390f35b3461000057610637600480803560001916906020019091908035906020019091905050612416565b6040518082815260200191505060405180910390f35b346100005761066860048080359060200190919050506125a1565b604051808215151515815260200191505060405180910390f35b34610000576106a16004808035600019169060200190919050506125ce565b6040518082815260200191505060405180910390f35b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b6109c3612724565b15156109ce57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506005600082815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b5092915050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506005600082815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506005600082815260200190815260200160002060000173__DLinked_______________________________633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b5092915050565b610fb2612724565b1515610fbd57610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006003600084815260200190815260200160002060020154141590505b919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561110857610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905015156112b457610000565b6112bd826125a1565b156112c757610000565b600073ffffffffffffffffffffffffffffffffffffffff166004600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561133457610000565b8073ffffffffffffffffffffffffffffffffffffffff167f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf7836004600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631604051808381526020018281526020019250505060405180910390a26004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662f55d9d336040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b156100005760325a03f115610000575050506004600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905015156115c757610000565b6000845114806115d85750600a8451115b156115e257610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905092506040516102988061278e833901809050604051809103906000f080156100005791506080604051908101604052808681526020014381526020014281526020018473ffffffffffffffffffffffffffffffffffffffff168152506003600060075481526020019081526020016000206000820151816000019060028260028101928215611767579160200282015b82811115611766578251829060001916905591602001919060010190611745565b5b50905061178c91905b80821115611788576000816000905550600101611770565b5090565b5050602082015181600201556040820151816003015560608201518160040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055509050508160046000600754815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600090505b83518160ff161015611b0457600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff16815181101561000057906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561192257610000565b60056000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab878560ff16815181101561000057906020019060200201516000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050815260200190815260200160002060000173__DLinked_______________________________63b3dad4c890916007546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050838160ff1681518110156100005790602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6007546040518082815260200191505060405180910390a35b8080600101915050611845565b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c890916007546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519050506007600081548092919060010191905055505b5b5050505050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506005600082815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515611e2457610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff166003600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611f6957610000565b611f72826125a1565b1515611f7d57610000565b82600360008481526020019081526020016000206000019060028260028101928215611fcc579160200282015b82811115611fcb578251829060001916905591602001919060010190611faa565b5b509050611ff191905b80821115611fed576000816000905550600101611fd5565b5090565b50507f5f66d2a93b609bc6596b75c6dbb0e4f3f7cafd4b3b617157ff304d1076e583758183604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b5b505050565b61206d612724565b151561207857610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060085460036000848152602001908152602001600020600201540190505b919050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e5528219091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b5092915050565b61226e612724565b151561227957610000565b806008819055505b5b50565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6122cb612724565b15156122d657610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006040604051908101604052806002905b600060001916815260200190600190039081612330579050506000600360008681526020019081526020016000206002015493506003600086815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250600360008681526020019081526020016000206000016002806020026040519081016040528092919082600280156123ee576020028201915b815460001916815260200190600101908083116123d6575b50505050509150600360008681526020019081526020016000206003015490505b9193509193565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600660008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091856000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b5092915050565b60006000600854600360008581526020019081526020016000206002015401905043811191505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506005600082815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905091505b50919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612785576001905061278a565b600090505b90560060606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610241806100576000396000f30060606040523615610054576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d1461005d57806313af40351461009057806383197ef0146100c3575b61005b5b5b565b005b346100005761008e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100d2565b005b34610000576100c1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610102565b005b34610000576100d061015b565b005b6100da6101ac565b15156100e557610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b61010a6101ac565b151561011557610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6101636101ac565b151561016e57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561020d5760019050610212565b600090505b905600a165627a7a72305820308cbbe1ac989faa7ad42d4641af7fe4529d3ecf1a464d11195030885472f0c50029a165627a7a723058208678b9681a5b278631e6170a2e8a0b5aea65efe60dd328af9de5aacc0987c7520029'
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
            'inputs': [],
            'name': 'destroy',
            'outputs': [],
            'payable': false,
            'type': 'function'
          },
          {
            'payable': true,
            'type': 'fallback'
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610241806100576000396000f30060606040523615610054576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168062f55d9d1461005d57806313af40351461009057806383197ef0146100c3575b61005b5b5b565b005b346100005761008e600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506100d2565b005b34610000576100c1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610102565b005b34610000576100d061015b565b005b6100da6101ac565b15156100e557610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b61010a6101ac565b151561011557610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6101636101ac565b151561016e57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561020d5760019050610212565b600090505b905600a165627a7a72305820308cbbe1ac989faa7ad42d4641af7fe4529d3ecf1a464d11195030885472f0c50029'
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
          }
        ],
        'bytecode': '606060405267016345785d8a0000600255600a600360006101000a81548160ff021916908360ff1602179055506175306004555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610848806100856000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100a057806319aaf1f0146100d3578063271f88b4146100f05780634e71d92d1461010d57806367895db21461011c57806383197ef01461013c5780638778f4151461014b578063a91ee0dc14610192578063bf3506c1146101c5575b61009e5b5b565b005b34610000576100d1600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610210565b005b34610000576100ee6004808035906020019091905050610269565b005b346100005761010b6004808035906020019091905050610288565b005b346100005761011a6102a7565b005b346100005761013a600480803560ff16906020019091905050610630565b005b3461000057610149610663565b005b346100005761017c600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506106b4565b6040518082815260200191505060405180910390f35b34610000576101c3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610701565b005b34610000576101f6600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061075a565b604051808215151515815260200191505060405180910390f35b6102186107b3565b151561022357610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6102716107b3565b151561027c57610000565b806004819055505b5b50565b6102906107b3565b151561029b57610000565b806002819055505b5b50565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561038b57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509250600454600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154019150829050600360009054906101000a900460ff1660ff16600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660ff16118061051d57504382115b1561052757610000565b6002543073ffffffffffffffffffffffffffffffffffffffff1631101561054d57610000565b8073ffffffffffffffffffffffffffffffffffffffff1663502c40656002546000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303818588803b156100005761235a5a03f11561000057505050506040518051905015156105d957610000565b8273ffffffffffffffffffffffffffffffffffffffff167fd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def36002546040518082815260200191505060405180910390a25b5b505050565b6106386107b3565b151561064357610000565b80600360006101000a81548160ff021916908360ff1602179055505b5b50565b61066b6107b3565b151561067657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490505b919050565b6107096107b3565b151561071457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006000600454600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401905080431191505b50919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108145760019050610819565b600090505b905600a165627a7a723058205d9ea291e5bb6b4b7befdbb2a26a0168af882a70f4ce1890820689ee5fa269440029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b613253806100576000396000f3006060604052361561011b576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af403514610120578063140eccef146101535780631c9be5f4146101bd578063624d47fc146101f25780636b40adb2146102275780636e1d7eab14610265578063739453e3146102a35780637775ec3a146102c45780637a1fa187146102f95780637c32db101461033757806383197ef01461036c5780638a3ace181461037b578063a1e85c0f146103c1578063a66b774814610468578063a91ee0dc14610489578063b5d78d8c146104bc578063bd10e57c146105db578063d83bc5c514610610578063da72f92b14610645578063f91427f41461068b578063ffe466c9146106c9575b610000565b3461000057610151600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610733565b005b346100005761017b60048080356000191690602001909190803590602001909190505061078c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101dc6004808035600019169060200190919050506108b9565b6040518082815260200191505060405180910390f35b3461000057610211600480803560001916906020019091905050610a35565b6040518082815260200191505060405180910390f35b346100005761024f600480803560001916906020019091908035906020019091905050610bb1565b6040518082815260200191505060405180910390f35b346100005761028d600480803560001916906020019091908035906020019091905050610d36565b6040518082815260200191505060405180910390f35b34610000576102c2600480803560001916906020019091905050610ebb565b005b34610000576102e360048080356000191690602001909190505061164d565b6040518082815260200191505060405180910390f35b34610000576103216004808035600019169060200190919080359060200190919050506117c9565b6040518082815260200191505060405180910390f35b346100005761035660048080356000191690602001909190505061194e565b6040518082815260200191505060405180910390f35b3461000057610379611aca565b005b34610000576103a760048080356000191690602001909190803560001916906020019091905050611b1b565b604051808215151515815260200191505060405180910390f35b3461000057610466600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919080356000191690602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050611d06565b005b3461000057610487600480803560001916906020019091905050611eae565b005b34610000576104ba600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612855565b005b34610000576104c96128ae565b604051808460001916600019168152602001806020018060200183810383528581815181526020019150805190602001908083836000831461052a575b80518252602083111561052a57602082019150602081019050602083039250610506565b505050905090810190601f1680156105565780820380516001836020036101000a031916815260200191505b5083810382528481815181526020019150805190602001908083836000831461059e575b80518252602083111561059e5760208201915060208101905060208303925061057a565b505050905090810190601f1680156105ca5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34610000576105fa600480803560001916906020019091905050612a1d565b6040518082815260200191505060405180910390f35b346100005761062f600480803560001916906020019091905050612b99565b6040518082815260200191505060405180910390f35b346100005761067160048080356000191690602001909190803560001916906020019091905050612d15565b604051808215151515815260200191505060405180910390f35b34610000576106b3600480803560001916906020019091908035906020019091905050612f0c565b6040518082815260200191505060405180910390f35b34610000576106f1600480803560001916906020019091908035906020019091905050613091565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61073b6131be565b151561074657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b6000600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610fa157610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509350600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509250600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414156112b857610000565b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050505050565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b611ad26131be565b1515611add57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000016000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c876000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141590505b92915050565b611d0e6131be565b1515611d1957610000565b81600281600019169055508060039080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611d7057805160ff1916838001178555611d9e565b82800160010185558215611d9e579182015b82811115611d9d578251825591602001919060010190611d82565b5b509050611dc391905b80821115611dbf576000816000905550600101611da7565b5090565b50508260049080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611e1157805160ff1916838001178555611e3f565b82800160010185558215611e3f579182015b82811115611e3e578251825591602001919060010190611e23565b5b509050611e6491905b80821115611e60576000816000905550600101611e48565b5090565b50507f963aa8cc97c90686d2e91dc5fcb4b4bafe269796db43183bf713be9d926193e360025460405180826000191660001916815260200191505060405180910390a15b5b505050565b60006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515611f9057610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561207b57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415156121de57610000565b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519050508173ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663582604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b61285d6131be565b151561286857610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006020604051908101604052806000815250602060405190810160405280600081525060025460046003818054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561296e5780601f106129435761010080835404028352916020019161296e565b820191906000526020600020905b81548152906001019060200180831161295157829003601f168201915b50505050509150808054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612a0a5780601f106129df57610100808354040283529160200191612a0a565b820191906000526020600020905b8154815290600101906020018083116129ed57829003601f168201915b505050505090509250925092505b909192565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090506000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141592505b505092915050565b600060066000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060056000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b92915050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561321f5760019050613224565b600090505b905600a165627a7a723058206d1e0c73406214e29dba2d07f2cc1779da1fd3c75cc6ec874c09aab4beed37ae0029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b61039e806100576000396000f30060606040523615610060576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461006957806383197ef01461009c578063a91ee0dc146100ab578063f3fef3a3146100de575b6100675b5b565b005b346100005761009a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061011a565b005b34610000576100a9610173565b005b34610000576100dc600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101c4565b005b3461000057610118600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061021d565b005b610122610309565b151561012d57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b61017b610309565b151561018657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6101cc610309565b15156101d757610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000610227610309565b151561023257610000565b3073ffffffffffffffffffffffffffffffffffffffff1631821061026d573073ffffffffffffffffffffffffffffffffffffffff163161026f565b815b90508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f1935050505015156102b457610000565b8273ffffffffffffffffffffffffffffffffffffffff167faeba90871f7da8a443096c396877004da901c92fcab3ec900a99cecddb19ec4d836040518082815260200191505060405180910390a25b5b505050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561036a576001905061036f565b600090505b905600a165627a7a72305820780719bb1bdcd065294ca3ffe9d46794f760731d4577eb8fb3a388d0143b88100029'
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
          }
        ],
        'bytecode': '6060604052346100005760405160a0806106a3833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b82600190600282600281019282156100b9579160200282015b828111156100b8578251829060001916905591602001919060010190610097565b5b5090506100de91905b808211156100da5760008160009055506001016100c2565b5090565b505083600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600381600019169055505b505050505b610521806101826000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063051802371461007b57806313af4035146100a6578063502c4065146100d957806383197ef0146100fb578063a56854461461010a578063b32ae69d1461014a575b610000565b3461000057610088610183565b60405180826000191660001916815260200191505060405180910390f35b34610000576100d7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610189565b005b6100e16101e2565b604051808215151515815260200191505060405180910390f35b34610000576101086102bf565b005b346100005761014860048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610359565b005b34610000576101656004808035906020019091905050610474565b60405180826000191660001916815260200191505060405180910390f35b60035481565b61019161048c565b151561019c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f19350505050156102b7577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190506102bc565b610000565b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561031b57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b61036161048c565b151561036c57610000565b80600190600282600281019282156103a7579160200282015b828111156103a6578251829060001916905591602001919060010190610385565b5b5090506103cc91905b808211156103c85760008160009055506001016103b0565b5090565b5050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6003546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b156100005760325a03f115610000575050505b5b50565b6001816002811015610000570160005b915090505481565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104ed57600190506104f2565b600090505b905600a165627a7a72305820dad237acb1fa815e1b1dfd2694f8e29333c63d2706c1f6167e34699f927908870029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6118a7806100576000396000f300606060405236156100ad576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063087cbd40146100b257806313af4035146100e55780631a0919dc146101185780631f8db42d1461015157806330d00012146101725780636b4316db146101ff57806383197ef014610238578063bb34534c14610247578063c3c5a547146102a8578063ce5494bb146102f3578063d5a760f514610326575b610000565b34610000576100e3600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610399565b005b3461000057610116600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103f2565b005b346100005761013760048080356000191690602001909190505061044b565b604051808215151515815260200191505060405180910390f35b34610000576101706004808035600019169060200190919050506105c9565b005b34610000576101bd600480803560001916906020019091908060400190600280602002604051908101604052809291908260026020028082843782019150505050509190505061071d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761021e6004808035600019169060200190919050506109a8565b604051808215151515815260200191505060405180910390f35b3461000057610245610d66565b005b3461000057610266600480803560001916906020019091905050610db7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102d9600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610e70565b604051808215151515815260200191505060405180910390f35b3461000057610324600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610f7d565b005b3461000057610357600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611092565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103a161116f565b15156103ac57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6103fa61116f565b151561040557610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006000600061045a33611092565b9150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632874528e85336000604051602001526040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905080156105bd578173ffffffffffffffffffffffffffffffffffffffff166383197ef06040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b156100005760325a03f11561000057505050600192506105c2565b600092505b5050919050565b3373ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff161415156106b157610000565b80600019167fdf5c699569cbe77bd306dae8199f30a79b466d3420dd133672100ae9fa68660433604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b50565b60006000600061072c856109a8565b151561073757610000565b308486336040516106a3806111d9833901808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001846002602002808383600083146107b1575b8051825260208311156107b15760208201915060208101905060208303925061078d565b50505090500183600019166000191681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f08015610000579150600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ebd9a838633856000604051602001526040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018084600019166000191681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050905080151561093457610000565b84600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca683604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28192505b505092915050565b60006000600090505b602060ff168160ff161015610d565760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161415610a4257610d56565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610c3a575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610bb8575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610c395750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610d3a575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610d395750602e7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610d485760009150610d60565b5b80806001019150506109b1565b60038160ff161191505b50919050565b610d6e61116f565b1515610d7957610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b919050565b6000600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f846000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff16141590505b919050565b610f8561116f565b1515610f9057610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166313af4035826040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b156100005760325a03f11561000057505050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905090505b919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156111d057600190506111d5565b600090505b9056006060604052346100005760405160a0806106a3833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b82600190600282600281019282156100b9579160200282015b828111156100b8578251829060001916905591602001919060010190610097565b5b5090506100de91905b808211156100da5760008160009055506001016100c2565b5090565b505083600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600381600019169055505b505050505b610521806101826000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063051802371461007b57806313af4035146100a6578063502c4065146100d957806383197ef0146100fb578063a56854461461010a578063b32ae69d1461014a575b610000565b3461000057610088610183565b60405180826000191660001916815260200191505060405180910390f35b34610000576100d7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610189565b005b6100e16101e2565b604051808215151515815260200191505060405180910390f35b34610000576101086102bf565b005b346100005761014860048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610359565b005b34610000576101656004808035906020019091905050610474565b60405180826000191660001916815260200191505060405180910390f35b60035481565b61019161048c565b151561019c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f19350505050156102b7577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190506102bc565b610000565b90565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561031b57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b61036161048c565b151561036c57610000565b80600190600282600281019282156103a7579160200282015b828111156103a6578251829060001916905591602001919060010190610385565b5b5090506103cc91905b808211156103c85760008160009055506001016103b0565b5090565b5050600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16631f8db42d6003546040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050600060405180830381600087803b156100005760325a03f115610000575050505b5b50565b6001816002811015610000570160005b915090505481565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104ed57600190506104f2565b600090505b905600a165627a7a72305820dad237acb1fa815e1b1dfd2694f8e29333c63d2706c1f6167e34699f927908870029a165627a7a72305820c2a35bf0ecf76097313bbd29d6785eb8456d3734e6d169b47de055df5d1370500029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610857806100576000396000f3006060604052361561008c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100915780632874528e146100c45780632a1887bc1461011c5780635ebd9a831461017457806383197ef0146101eb5780638d34cbb7146101fa578063b96b099f14610252578063d1a7c77f146102c5575b610000565b34610000576100c2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610326565b005b346100005761010260048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061037f565b604051808215151515815260200191505060405180910390f35b346100005761015a60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610458565b604051808215151515815260200191505060405180910390f35b34610000576101d160048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061052c565b604051808215151515815260200191505060405180910390f35b34610000576101f861063e565b005b346100005761023860048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061068f565b604051808215151515815260200191505060405180910390f35b3461000057610283600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610712565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102e460048080356000191690602001909190505061077c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61032e6107c2565b151561033957610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006103896107c2565b151561039457610000565b61039e8383610458565b1561044c5760026000846000191660001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560019050610451565b600090505b5b92915050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660026000856000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b92915050565b60006105366107c2565b151561054157610000565b61054b848461068f565b156106315781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160026000866000191660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060019050610636565b600090505b5b9392505050565b6106466107c2565b151561065157610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600073ffffffffffffffffffffffffffffffffffffffff166106b28461077c565b73ffffffffffffffffffffffffffffffffffffffff161480156107095750600073ffffffffffffffffffffffffffffffffffffffff166106f183610712565b73ffffffffffffffffffffffffffffffffffffffff16145b90505b92915050565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600060026000836000191660001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156108235760019050610828565b600090505b905600a165627a7a72305820d357d26896396570aac7a2f0123bc75f279417eea0473586e76da788a051a8480029'
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
          }
        ],
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b6115b6806100576000396000f300606060405236156100b8576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630a7ed48a146100bd57806313af4035146100f25780632faf44f6146101255780637329d4b01461015e57806383197ef01461019c578063a91ee0dc146101ab578063b776ff6b146101de578063baba90cf14610224578063bd95db111461025d578063cb5356ec14610290578063ea7ca08f146102ce578063fdb5c2d814610303575b610000565b34610000576100dc600480803560001916906020019091905050610338565b6040518082815260200191505060405180910390f35b3461000057610123600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104b4565b005b346100005761014460048080356000191690602001909190505061050d565b604051808215151515815260200191505060405180910390f35b346100005761018660048080356000191690602001909190803590602001909190505061089c565b6040518082815260200191505060405180910390f35b34610000576101a9610a21565b005b34610000576101dc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610a72565b005b346100005761020a60048080356000191690602001909190803560001916906020019091905050610acb565b604051808215151515815260200191505060405180910390f35b3461000057610243600480803560001916906020019091905050610d0a565b604051808215151515815260200191505060405180910390f35b346100005761028e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061104b565b005b34610000576102b86004808035600019169060200190919080359060200190919050506110a4565b6040518082815260200191505060405180910390f35b34610000576102ed600480803560001916906020019091905050611229565b6040518082815260200191505060405180910390f35b34610000576103226004808035600019169060200190919050506113a5565b6040518082815260200191505060405180910390f35b600060036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6104bc611521565b15156104c757610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905015156105f157610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c89091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092508215610893578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b600060036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b610a29611521565b1515610a3457610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b610a7a611521565b1515610a8557610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092505b505092915050565b600060006000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610dee57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509050600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________630e8478db9091836000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905092505b5b5050919050565b611053611521565b151561105e57610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b600060036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c866000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b600060036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b600060036000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c856000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905073ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156115825760019050611587565b600090505b905600a165627a7a723058207f951b50480540b7fca8c1da4108d6df84b027b5e6469cf89292d5c6343f6e500029'
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
            'inputs': [],
            'name': 'destroy',
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
          }
        ],
        'bytecode': '606060405260016005555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610f138061005c6000396000f300606060405236156100ce576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af4035146100d357806338a699a414610106578063446bffba1461013f5780634bbff4a7146101605780634cc82215146101835780636b4316db146101a05780636d74e7ab146101d957806383197ef01461020e57806392aaa7971461021d578063986f191c14610240578063a1b1daee14610263578063a91ee0dc1461029c578063ee564eb9146102cf578063ee84fbce14610300575b610000565b3461000057610104600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610331565b005b346100005761012560048080356000191690602001909190505061038a565b604051808215151515815260200191505060405180910390f35b346100005761015e6004808035600019169060200190919050506103b4565b005b346100005761016d6105da565b6040518082815260200191505060405180910390f35b346100005761019e6004808035906020019091905050610666565b005b34610000576101bf60048080356000191690602001909190505061078e565b604051808215151515815260200191505060405180910390f35b34610000576101f8600480803560001916906020019091905050610b4c565b6040518082815260200191505060405180910390f35b346100005761021b610b72565b005b346100005761022a610bc3565b6040518082815260200191505060405180910390f35b346100005761024d610c4f565b6040518082815260200191505060405180910390f35b346100005761027e6004808035906020019091905050610cdb565b60405180826000191660001916815260200191505060405180910390f35b34610000576102cd600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610cf9565b005b34610000576102ea6004808035906020019091905050610d52565b6040518082815260200191505060405180910390f35b346100005761031b6004808035906020019091905050610de8565b6040518082815260200191505060405180910390f35b610339610e7e565b151561034457610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060066000846000191660001916815260200190815260200160002054141590505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561049257610000565b61049b8161078e565b15806104ac57506104ab8161038a565b5b156104b657610000565b60055460066000836000191660001916815260200190815260200160002081905550600273__DLinked_______________________________63b3dad4c890916005546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505080600760006005548152602001908152602001600020816000191690555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196005546040518082815260200191505060405180910390a26005600081548092919060010191905055505b5b50565b6000600273__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b6000610670610e7e565b151561067b57610000565b60076000838152602001908152602001600020549050600660008260001916600019168152602001908152602001600020600090556007600083815260200190815260200160002060009055600273__DLinked_______________________________630e8478db9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b60006000600090505b602060ff168160ff161015610b3c5760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561082857610b3c565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610a20575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191610801561099e575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610a1f5750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610b20575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610b1f5750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610b2e5760009150610b46565b5b8080600101915050610797565b60018160ff161191505b50919050565b60006006600083600019166000191681526020019081526020016000205490505b919050565b610b7a610e7e565b1515610b8557610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600273__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b6000600273__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b90565b6000600760008381526020019081526020016000205490505b919050565b610d01610e7e565b1515610d0c57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600273__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b6000600273__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610edf5760019050610ee4565b600090505b905600a165627a7a72305820fa186022d02b784e8c673c26a7a0e9d71826d20c1a34967d286187248d38df160029'
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
          }
        ],
        'bytecode': '6060604052655af3107a400060025566038d7ea4c680006003555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b611b548061006c6000396000f300606060405236156100ef576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630737007e146100f45780630e1af57b1461012757806313af4035146101585780631937c2611461018b5780633129aa0d146101bc57806336d8c30a146101f6578063551b5dcc1461022a5780635f6b9f7d1461025b5780637f19abe01461028c57806383197ef0146102bf578063a1769ae2146102ce578063a85ebabe14610308578063a91ee0dc1461032c578063ad3bc6061461035f578063b42775b5146103d2578063ddf04310146103f6578063f1e0510e1461044c575b610000565b3461000057610125600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061047f565b005b346100005761014260048080359060200190919050506104d8565b6040518082815260200191505060405180910390f35b3461000057610189600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104f9565b005b34610000576101a66004808035906020019091905050610552565b6040518082815260200191505060405180910390f35b34610000576101e060048080359060200190919080359060200190919050506105f4565b6040518082815260200191505060405180910390f35b3461000057610214600480803560ff1690602001909190505061069f565b6040518082815260200191505060405180910390f35b346100005761024560048080359060200190919050506106b8565b6040518082815260200191505060405180910390f35b3461000057610276600480803590602001909190505061075a565b6040518082815260200191505060405180910390f35b34610000576102bd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506107fc565b005b34610000576102cc610855565b005b34610000576102f260048080359060200190919080359060200190919050506108a6565b6040518082815260200191505060405180910390f35b61032a600480803560ff16906020019091908035906020019091905050610951565b005b346100005761035d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611160565b005b346100005761038360048080359060200190919080359060200190919050506111b9565b604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018260000b60000b81526020019250505060405180910390f35b6103f4600480803560ff16906020019091908035906020019091905050611272565b005b3461000057610430600480803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506119fa565b604051808260000b60000b815260200191505060405180910390f35b346100005761047d600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611a66565b005b610487611abf565b151561049257610000565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600760008381526020019081526020016000206000015490505b919050565b610501611abf565b151561050c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60006007600083815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006007600084815260200190815260200160002060040173__DLinked_______________________________633e5528219091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60006002546002830a60ff16600354020190505b919050565b60006007600083815260200190815260200160002060040173__DLinked_______________________________63d6867e8790916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b60006007600083815260200190815260200160002060040173__DLinked_______________________________6370da6fe690916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b919050565b610804611abf565b151561080f57610000565b80600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b61085d611abf565b151561086857610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60006007600084815260200190815260200160002060040173__DLinked_______________________________6348eb81eb9091846000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905090505b92915050565b60006000600060008560018160ff16108061096f5750600a8160ff16115b1561097957610000565b346109838261069f565b111561098e57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190501515610a6c57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190509450600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a5718993876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905093506002870a60ff16600354029250600760008781526020019081526020016000206001016000815480929190600101919050555060006007600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580610d35575043600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28886000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050105b15610d3f57610000565b866007600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508660ff1660076000888152602001908152602001600020600001600082825401925050819055506007600087815260200190815260200160002060040173__DLinked_______________________________63b3dad4c89091600760008a8152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190505084600760008881526020019081526020016000206003016000600760008a815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f193505050501515610f4b57610000565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051809050600060405180830381858888f193505050501515610fb257610000565b6002548301915034821015611007573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f19350505050151561100657610000565b5b6007600087815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519050868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600760008b815260200190815260200160002060020160008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b50505050505050565b611168611abf565b151561117357610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b6000600060076000858152602001908152602001600020600301600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506007600085815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b9250929050565b6000600060008460018160ff16108061128e5750600a8160ff16115b1561129857610000565b346112a28261069f565b11156112ad57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a547336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050151561138b57610000565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f5336000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051905093506002860a60ff16600354029250600760008681526020019081526020016000206001016000815480929190600101919050555060006007600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b1415806115ab575043600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b28876000604051602001526040518263ffffffff167c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519050105b156115b557610000565b856000036007600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908360000b60ff1602179055508560ff1660076000878152602001908152602001600020600001600082825403925050819055506007600086815260200190815260200160002060040173__DLinked_______________________________63b3dad4c8909160076000898152602001908152602001600020600101546000604051602001526040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051905050836007600087815260200190815260200160002060030160006007600089815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f1935050505015156117e657610000565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051809050600060405180830381858888f19350505050151561184d57610000565b60025483019150348210156118a2573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f1935050505015156118a157610000565b5b6007600086815260200190815260200160002060040173__DLinked_______________________________6391c0ab6390916000604051602001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519050858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600760008a815260200190815260200160002060020160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b60000b815260200191505060405180910390a45b5b5b505050505050565b60006007600084815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b92915050565b611a6e611abf565b1515611a7957610000565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b60003373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611b205760019050611b25565b600090505b905600a165627a7a723058205275628fe523cac1f7cb00aa400827dbdf60f7274b0aba157fcd43f8b00b2ecc0029'
      }
    };

    this.classes = {};
    for (let key of Object.keys(this.headers)) {
      Object.defineProperty(this.classes, key, {
        value: new ContractWrapper(this.headers[key], _web3),
        writable: true,
        configurable: true,
        enumerable: true
      });
    }

    this.objects = {};
    for (let i of Object.keys(env.objects)) {
      if(!this.classes.hasOwnProperty(env.objects[i]['type'].split('[')[0])) continue;
      Object.defineProperty(this.objects, i, {
        value: this.classes[env.objects[i]['type'].split('[')[0]].at(env.objects[i].value),
        writable: true,
        configurable: true,
        enumerable: true
      });
    }
  }

  return {
    Class: constructor,
    environments: environments
  };
})();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dapple['AKASHA'];
