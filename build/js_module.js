'use strict';

// For geth
if (typeof dapple === 'undefined') {
  var dapple = {};
}

if (typeof web3 === 'undefined' && typeof Web3 === 'undefined') {
  var Web3 = require('web3');
}

dapple['akasha.sol'] = (function builder () {
  var environments = {
      'develop': {}
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
    if(!("objects" in env) && typeof env === "object") {
      env = {objects: env};
    }
    while (typeof env !== 'object') {
      if (!(env in environments)) {
        throw new Error('Cannot resolve environment name: ' + env);
      }
      env = environments[env];
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6105ae806100b96000396000f360606040523615610074576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100795780637a9e5e4b1461009657806383197ef0146100b35780638da5cb5b146100c7578063a91ee0dc14610105578063bf7e214f1461012257610074565b610002565b34610002576100946004808035906020019091905050610160565b005b34610002576100b1600480803590602001909190505061021d565b005b34610002576100c560048050506102da565b005b34610002576100d9600480505061032b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101206004808035906020019091905050610351565b005b346100025761013460048050506103a6565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101686103cc565b151561017357610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102256103cc565b151561023057610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6102e26103cc565b15156102ed57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6103596103cc565b151561036457610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561043157600190506105ab566105aa565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561047f57600090506105ab566105a9565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506105ab565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b61052b806100b96000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100685780637a9e5e4b1461008557806383197ef0146100a25780638da5cb5b146100b6578063bf7e214f146100f457610063565b610002565b34610002576100836004808035906020019091905050610132565b005b34610002576100a060048080359060200190919050506101ef565b005b34610002576100b460048050506102ac565b005b34610002576100c860048050506102fd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101066004805050610323565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61013a610349565b151561014557610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6101f7610349565b151561020257610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6102b4610349565b15156102bf57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103ae576001905061052856610527565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156103fc576000905061052856610526565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610528565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611645806100b96000396000f3606060405236156100d7576000357c010000000000000000000000000000000000000000000000000000000090048063044b4a2a146100dc57806313af40351461010d578063279bc3aa1461012a57806348892753146101475780634c9b78da146101d057806371aa5a66146102015780637a9e5e4b1461025557806383197ef0146102725780638da5cb5b14610286578063a71eb6a1146102c4578063a91ee0dc146102ea578063bf7e214f14610307578063c407afe714610345578063e616d76f14610376578063f6aaa867146103b0576100d7565b610002565b34610002576100f760048080359060200190919050506103ea565b6040518082815260200191505060405180910390f35b34610002576101286004808035906020019091905050610494565b005b34610002576101456004808035906020019091905050610551565b005b346100025761016b60048080359060200190919080359060200190919050506105a6565b604051808673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001836002602002808383829060006004602084601f0104600302600f01f15090500182151581526020019550505050505060405180910390f35b34610002576101eb6004808035906020019091905050610779565b6040518082815260200191505060405180910390f35b3461000257610253600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019091905050610823565b005b34610002576102706004808035906020019091905050610e18565b005b34610002576102846004805050610ed5565b005b34610002576102986004805050610f26565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102e86004808035906020019091908035906020019091905050610f4c565b005b346100025761030560048080359060200190919050506111d8565b005b3461000257610319600480505061122d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103606004808035906020019091905050611253565b6040518082815260200191505060405180910390f35b346100025761039a60048080359060200190919080359060200190919050506112fd565b6040518082815260200191505060405180910390f35b34610002576103d460048080359060200190919080359060200190919050506113b0565b6040518082815260200191505060405180910390f35b600073__DLinked_______________________________638430e4da60046000506000858152602001908152602001600020600050600101600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061048f565b919050565b61049c611463565b15156104a757610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610559611463565b151561056457610002565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060006040604051908101604052806002905b60008152602001906001900390816105bc57905050600060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16945084506004600050600088815260200190815260200160002060005060040160005060008781526020019081526020016000206000506001016000505493508350600460005060008881526020019081526020016000206000506004016000506000878152602001908152602001600020600050600001600050549250825060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060020160005060028060200260405190810160405280929190826002801561071d576020028201915b816000505481526020019060010190808311610706575b50505050509150815060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060040160149054906101000a900460ff16905080505b9295509295909350565b600073__DLinked_______________________________633b05448860046000506000858152602001908152602001600020600050600101600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061081e565b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156108ea57610002565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635280692985600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561099957610002565b60046000506000858152602001908152602001600020600050600001600081815054809291906001019190505550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050806004600050600086815260200190815260200160002060005060040160005060006004600050600088815260200190815260200160002060005060000160005054815260200190815260200160002060005060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550826004600050600086815260200190815260200160002060005060040160005060006004600050600088815260200190815260200160002060005060000160005054815260200190815260200160002060005060020160005090600282600290908101928215610ba3579160200282015b82811115610ba2578251826000505591602001919060010190610b84565b5b509050610bce9190610bb0565b80821115610bca5760008181506000905550600101610bb0565b5090565b50506004600050600085815260200190815260200160002060005060000160005054600460005060008681526020019081526020016000206000506004016000506000600460005060008881526020019081526020016000206000506000016000505481526020019081526020016000206000506001016000508190555060008214158015610c7b5750600460005060008581526020019081526020016000206000506000016000505482105b15610cde578160046000506000868152602001908152602001600020600050600401600050600060046000506000888152602001908152602001600020600050600001600050548152602001908152602001600020600050600001600050819055505b73__DLinked_______________________________63b3dad4c8600460005060008781526020019081526020016000206000506001016000506004600050600088815260200190815260200160002060005060000160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960046000506000888152602001908152602001600020600050600001600050546040518082815260200191505060405180910390a35b5b50505050565b610e20611463565b1515610e2b57610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610edd611463565b1515610ee857610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561101357610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff1660046000506000858152602001908152602001600020600050600401600050600084815260200190815260200160002060005060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561115f57610002565b600160046000506000858152602001908152602001600020600050600401600050600084815260200190815260200160002060005060040160146101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b505050565b6111e0611463565b15156111eb57610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________63ceeaa51160046000506000858152602001908152602001600020600050600101600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506112f8565b919050565b600073__DLinked_______________________________63169d68a16004600050600086815260200190815260200160002060005060010160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506113aa565b92915050565b600073__DLinked_______________________________631378a6696004600050600086815260200190815260200160002060005060010160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061145d565b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156114c8576001905061164256611641565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611516576000905061164256611640565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050611642565b5b5b9056'
      },
      'DLinked': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'list',
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
                'name': 'list',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'next',
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
                'name': 'list',
                'type': 'DLinked.List storage'
              },
              {
                'name': 'value',
                'type': 'uint256'
              }
            ],
            'name': 'prev',
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
                'name': 'list',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'size',
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
                'name': 'list',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'first',
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
                'name': 'list',
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
                'name': 'list',
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
                'name': 'list',
                'type': 'DLinked.List storage'
              }
            ],
            'name': 'last',
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
        'bytecode': '6060604052610594806100126000396000f36504044633f3de5060606040523615610092576000357c0100000000000000000000000000000000000000000000000000000000900480630e8478db146100975780631378a669146100ce578063169d68a1146101035780633b054488146101385780638430e4da146101645780639f58851f14610190578063b3dad4c8146101c7578063ceeaa511146101fe57610092565b610007565b6100b6600480803590602001909190803590602001909190505061022a565b60405180821515815260200191505060405180910390f35b6100ed6004808035906020019091908035906020019091905050610351565b6040518082815260200191505060405180910390f35b610122600480803590602001909190803590602001909190505061037c565b6040518082815260200191505060405180910390f35b61014e60048080359060200190919050506103a7565b6040518082815260200191505060405180910390f35b61017a60048080359060200190919050506103bd565b6040518082815260200191505060405180910390f35b6101af60048080359060200190919080359060200190919050506103e8565b60405180821515815260200191505060405180910390f35b6101e66004808035906020019091908035906020019091905050610472565b60405180821515815260200191505060405180910390f35b6102146004808035906020019091905050610569565b6040518082815260200191505060405180910390f35b600061023683836103e8565b156103435760019050805082600101600050600083815260200190815260200160002060005054836001016000506000856002016000506000868152602001908152602001600020600050548152602001908152602001600020600050819055508260020160005060008381526020019081526020016000206000505483600201600050600085600101600050600086815260200190815260200160002060005054815260200190815260200160002060005081905550826002016000506000838152602001908152602001600020600050600090558260010160005060008381526020019081526020016000206000506000905582600001600081815054809291906001900391905055505b80905061034b565b92915050565b6000826001016000506000838152602001908152602001600020600050549050610376565b92915050565b60008260020160005060008381526020019081526020016000206000505490506103a1565b92915050565b6000816000016000505490506103b8565b919050565b6000816001016000506000600081526020019081526020016000206000505490506103e3565b919050565b600060008214156103f857610007565b60008360020160005060008481526020019081526020016000206000505414158061043f575060008360010160005060008481526020019081526020016000206000505414155b806104655750818360010160005060006000815260200190815260200160002060005054145b905061046c565b92915050565b600061047e83836103e8565b151561055b57600190508050818360020160005060008560010160005060006000815260200190815260200160002060005054815260200190815260200160002060005081905550826001016000506000600081526020019081526020016000206000505483600101600050600084815260200190815260200160002060005081905550600083600201600050600084815260200190815260200160002060005081905550818360010160005060006000815260200190815260200160002060005081905550826000016000818150548092919060010191905055505b809050610563565b92915050565b60008160020160005060006000815260200190815260200160002060005054905061058f565b91905056'
      },
      'DappleEnvironment': {
        'interface': [
          {
            'inputs': [],
            'type': 'constructor'
          }
        ],
        'bytecode': '60606040525b5b600c8060126000396000f360606040526008565b600256'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052600c8060106000396000f360606040526008565b600256'
      },
      'Entry': {
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
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
                'name': 'profile',
                'type': 'address'
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
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
        'bytecode': '606060405260016008600050556107d06009600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b612a75806100ca6000396000f36060604052361561013a576000357c01000000000000000000000000000000000000000000000000000000009004806313af40351461013f5780631a1f2a911461015c5780633d89b81214610196578063507d9c2b146101c7578063515c44a514610201578063528069291461021e5780635f8534ae146102515780637a9e5e4b1461026e5780637abd59581461028b5780637b965fa1146103115780637d026a1c1461034257806383197ef01461038d5780638da5cb5b146103a15780639f68a58a146103df578063a571899314610410578063a91ee0dc14610457578063bae78d7b14610474578063bf7e214f146104e4578063d2a7e71114610522578063de876a9e14610553578063e05190811461058d578063e24dd4c4146105c0578063e6fb0ab3146105f1578063eef0f4841461062b5761013a565b610002565b346100025761015a600480803590602001909190505061065c565b005b34610002576101806004808035906020019091908035906020019091905050610719565b6040518082815260200191505060405180910390f35b34610002576101b16004808035906020019091905050610879565b6040518082815260200191505060405180910390f35b34610002576101eb60048080359060200190919080359060200190919050506109d0565b6040518082815260200191505060405180910390f35b346100025761021c6004808035906020019091905050610b30565b005b34610002576102396004808035906020019091905050610b85565b60405180821515815260200191505060405180910390f35b346100025761026c6004808035906020019091905050610bb7565b005b34610002576102896004808035906020019091905050610f5e565b005b346100025761030f600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019082018035906020019191908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505090909190505061101b565b005b346100025761032c60048080359060200190919050506116d2565b6040518082815260200191505060405180910390f35b346100025761038b600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019091905050611829565b005b346100025761039f6004805050611ac1565b005b34610002576103b36004805050611b12565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103fa6004808035906020019091905050611b38565b6040518082815260200191505060405180910390f35b346100025761042b6004808035906020019091905050611bf8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576104726004808035906020019091905050611c3b565b005b346100025761048f6004808035906020019091905050611c90565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001826002602002808383829060006004602084601f0104600302600f01f150905001935050505060405180910390f35b34610002576104f66004805050611d88565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761053d6004808035906020019091905050611dae565b6040518082815260200191505060405180910390f35b34610002576105776004808035906020019091908035906020019091905050611e6e565b6040518082815260200191505060405180910390f35b34610002576105a86004808035906020019091905050611f37565b60405180821515815260200191505060405180910390f35b34610002576105db6004808035906020019091905050611f6e565b6040518082815260200191505060405180910390f35b346100025761061560048080359060200190919080359060200190919050506120c5565b6040518082815260200191505060405180910390f35b3461000257610646600480803590602001909190505061218e565b6040518082815260200191505060405180910390f35b61066461224e565b151561066f57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________63169d68a16006600050600084815260200190815260200160002060005060000160005085600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610872565b5092915050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________633b05448860066000506000848152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015091506109ca565b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________631378a6696006600050600084815260200190815260200160002060005060000160005085600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610b29565b5092915050565b610b3861224e565b1515610b4357610002565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60006000600460005060008481526020019081526020016000206000506002016000505414159050610bb2565b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515610c7e57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________639f58851f600760005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001501515610dff57610002565b610e0882611f37565b15610e1257610002565b600073ffffffffffffffffffffffffffffffffffffffff166005600050600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610e8257610002565b6005600050600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166383197ef0604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b156100025760325a03f115610002575050506005600050600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b610f6661224e565b1515610f7157610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156110e657610002565b6000845114806110f75750600a8451115b1561110157610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150925060405161064580612430833901809050604051809103906000f08015610002579150606060405190810160405280868152602001438152602001848152602001506004600050600060086000505481526020019081526020016000206000506000820151816000016000509060028260029090810192821561125f579160200282015b8281111561125e578251826000505591602001919060010190611240565b5b50905061128a919061126c565b80821115611286576000818150600090555060010161126c565b5090565b50506020820151816002016000505560408201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055509050508160056000506000600860005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600090505b83518160ff1610156115f557600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff1681518110156100025790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561141057610002565b73__DLinked_______________________________63b3dad4c860066000506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab898760ff1681518110156100025790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001508152602001908152602001600020600050600001600050600860005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050838160ff1681518110156100025790602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6008600050546040518082815260200191505060405180910390a35b808060010191505061133a565b73__DLinked_______________________________63b3dad4c8600760005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600860005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505060086000818150548092919060010191905055505b5b5050505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________63ceeaa51160066000506000848152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150611823565b50919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156118f057610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff166004600050600084815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611a2257610002565b611a2b82611f37565b1515611a3657610002565b826004600050600084815260200190815260200160002060005060000160005090600282600290908101928215611a8d579160200282015b82811115611a8c578251826000505591602001919060010190611a6e565b5b509050611ab89190611a9a565b80821115611ab45760008181506000905550600101611a9a565b5090565b50505b5b505050565b611ac961224e565b1515611ad457610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________638430e4da600760005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611bf3565b919050565b60006005600050600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080505b919050565b611c4361224e565b1515611c4e57610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060006040604051908101604052806002905b6000815260200190600190039081611ca4579050506004600050600085815260200190815260200160002060005060020160005054925082506004600050600085815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169150815060046000506000858152602001908152602001600020600050600001600050600280602002604051908101604052809291908260028015611d77576020028201915b816000505481526020019060010190808311611d60575b5050505050905080505b9193909250565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________633b054488600760005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611e69565b919050565b600073__DLinked_______________________________63169d68a1600760005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611f31565b92915050565b600043600960005054600460005060008581526020019081526020016000206000506002016000505401109050611f69565b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________638430e4da60066000506000848152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015091506120bf565b50919050565b600073__DLinked_______________________________631378a669600760005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050612188565b92915050565b600073__DLinked_______________________________63ceeaa511600760005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050612249565b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156122b3576001905061242d5661242c565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415612301576000905061242d5661242b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905061242d565b5b5b905660606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b61058c806100b96000396000f360606040523615610073576000357c010000000000000000000000000000000000000000000000000000000090048062f55d9d1461007c57806313af4035146100995780637a9e5e4b146100b657806383197ef0146100d35780638da5cb5b146100e7578063bf7e214f1461012557610073565b61007a5b5b565b005b34610002576100976004808035906020019091905050610163565b005b34610002576100b46004808035906020019091905050610193565b005b34610002576100d16004808035906020019091905050610250565b005b34610002576100e5600480505061030d565b005b34610002576100f9600480505061035e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101376004805050610384565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016b6103aa565b151561017657610002565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b61019b6103aa565b15156101a657610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102586103aa565b151561026357610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6103156103aa565b151561032057610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561040f576001905061058956610588565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561045d576000905061058956610587565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610589565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b61058c806100b96000396000f360606040523615610073576000357c010000000000000000000000000000000000000000000000000000000090048062f55d9d1461007c57806313af4035146100995780637a9e5e4b146100b657806383197ef0146100d35780638da5cb5b146100e7578063bf7e214f1461012557610073565b61007a5b5b565b005b34610002576100976004808035906020019091905050610163565b005b34610002576100b46004808035906020019091905050610193565b005b34610002576100d16004808035906020019091905050610250565b005b34610002576100e5600480505061030d565b005b34610002576100f9600480505061035e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101376004805050610384565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016b6103aa565b151561017657610002565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b61019b6103aa565b15156101a657610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102586103aa565b151561026357610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6103156103aa565b151561032057610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561040f576001905061058956610588565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561045d576000905061058956610587565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610589565b5b5b9056'
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
        'bytecode': '606060405267016345785d8a0000600360005055600a600460006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055506175306005600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b610b368061010f6000396000f3606060405236156100b6576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100bf57806319aaf1f0146100dc578063271f88b4146100f95780634e71d92d1461011657806367895db21461012a5780637a9e5e4b1461014757806383197ef0146101645780638778f415146101785780638da5cb5b146101a9578063a91ee0dc146101e7578063bf3506c114610204578063bf7e214f14610237576100b6565b6100bd5b5b565b005b34610002576100da6004808035906020019091905050610275565b005b34610002576100f76004808035906020019091905050610332565b005b34610002576101146004808035906020019091905050610354565b005b34610002576101286004805050610376565b005b346100025761014560048080359060200190919050506106b9565b005b3461000257610162600480803590602001909190505061070e565b005b346100025761017660048050506107cb565b005b3461000257610193600480803590602001909190505061081c565b6040518082815260200191505060405180910390f35b34610002576101bb6004805050610860565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102026004808035906020019091905050610886565b005b346100025761021f60048080359060200190919050506108db565b60405180821515815260200191505060405180910390f35b3461000257610249600480505061092e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61027d610954565b151561028857610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61033a610954565b151561034557610002565b806005600050819055505b5b50565b61035c610954565b151561036757610002565b806003600050819055505b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561044157610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250600560005054600660005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005054019150829050600460009054906101000a900460ff1660ff16600660005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160009054906101000a900460ff1660ff1611806105a057504382115b156105aa57610002565b6003600050543073ffffffffffffffffffffffffffffffffffffffff163110156105d357610002565b8073ffffffffffffffffffffffffffffffffffffffff1663502c4065600360005054600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303818588803b156100025761235a5a03f115610002575050505060405180519060200150151561065f57610002565b8273ffffffffffffffffffffffffffffffffffffffff167fd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def36003600050546040518082815260200191505060405180910390a25b5b505050565b6106c1610954565b15156106cc57610002565b80600460006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b50565b610716610954565b151561072157610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6107d3610954565b15156107de57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600660005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005054905061085b565b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61088e610954565b151561089957610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60006000600560005054600660005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050540190508043119150610928565b50919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109b95760019050610b3356610b32565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610a075760009050610b3356610b31565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610b33565b5b5b9056'
      },
      'Feed': {
        'interface': [
          {
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
                'name': 'profile',
                'type': 'address'
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
            'constant': true,
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
            'constant': true,
            'inputs': [
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
                'name': 'id',
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
            'inputs': [
              {
                'name': 'profile',
                'type': 'address'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b613641806100b96000396000f36060604052361561017c576000357c01000000000000000000000000000000000000000000000000000000009004806311ada4441461018157806313af4035146101b2578063140eccef146101cf5780631c9be5f41461021f5780632faf44f61461025057806333ef3dc714610283578063624d47fc146102b45780636b40adb2146102e55780636e1d7eab1461031f578063739453e3146103595780637775ec3a146103765780637a1fa187146103a75780637a9e5e4b146103e15780637c32db10146103fe57806383197ef01461042f5780638da5cb5b146104435780639543bb7f14610481578063a66b7748146104b2578063a91ee0dc146104cf578063a9f45e4d146104ec578063baba90cf14610526578063bb7dd06b14610559578063bd10e57c1461058c578063bd95db11146105bd578063bf7e214f146105da578063d83bc5c514610618578063ec96b6ed14610649578063ed1490671461067c578063f91427f4146106b6578063ffe466c9146106f05761017c565b610002565b346100025761019c6004808035906020019091905050610740565b6040518082815260200191505060405180910390f35b34610002576101cd6004808035906020019091905050610800565b005b34610002576101f360048080359060200190919080359060200190919050506108bd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761023a60048080359060200190919050506109e6565b6040518082815260200191505060405180910390f35b346100025761026b6004808035906020019091905050610b59565b60405180821515815260200191505060405180910390f35b346100025761029e6004808035906020019091905050610e9f565b6040518082815260200191505060405180910390f35b34610002576102cf6004808035906020019091905050610f5f565b6040518082815260200191505060405180910390f35b346100025761030960048080359060200190919080359060200190919050506110d2565b6040518082815260200191505060405180910390f35b3461000257610343600480803590602001909190803590602001909190505061124e565b6040518082815260200191505060405180910390f35b346100025761037460048080359060200190919050506113ca565b005b346100025761039160048080359060200190919050506118d0565b6040518082815260200191505060405180910390f35b34610002576103cb6004808035906020019091908035906020019091905050611a43565b6040518082815260200191505060405180910390f35b34610002576103fc6004808035906020019091905050611bbf565b005b34610002576104196004808035906020019091905050611c7c565b6040518082815260200191505060405180910390f35b34610002576104416004805050611def565b005b34610002576104556004805050611e40565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761049c6004808035906020019091905050611e66565b6040518082815260200191505060405180910390f35b34610002576104cd6004808035906020019091905050611f26565b005b34610002576104ea60048080359060200190919050506125b0565b005b34610002576105106004808035906020019091908035906020019091905050612605565b6040518082815260200191505060405180910390f35b346100025761054160048080359060200190919050506126ce565b60405180821515815260200191505060405180910390f35b346100025761057460048080359060200190919050506129c8565b60405180821515815260200191505060405180910390f35b34610002576105a76004808035906020019091905050612bac565b6040518082815260200191505060405180910390f35b34610002576105d86004808035906020019091905050612d1f565b005b34610002576105ec6004805050612d74565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576106336004808035906020019091905050612d9a565b6040518082815260200191505060405180910390f35b34610002576106646004808035906020019091905050612f0d565b60405180821515815260200191505060405180910390f35b34610002576106a060048080359060200190919080359060200190919050506130f1565b6040518082815260200191505060405180910390f35b34610002576106da60048080359060200190919080359060200190919050506131ba565b6040518082815260200191505060405180910390f35b34610002576107146004808035906020019091908035906020019091905050613336565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600073__DLinked_______________________________633b054488600560005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506107fb565b919050565b61080861345f565b151561081357610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905080600101600050600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692506109de565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________638430e4da82600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250610b52565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515610c2457610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________63b3dad4c8600560005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005083600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150925082508215610e96578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b600073__DLinked_______________________________63ceeaa511600560005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610f5a565b919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________638430e4da82600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092506110cb565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________631378a6698260020160005086600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611246565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________63169d68a18260020160005086600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092506113c2565b505092915050565b600060006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561149b57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c88600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600360005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005093508360000160005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054925073__DLinked_______________________________630e8478db8560020160005085600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508360000160005060008773ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000905583600101600050600084815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600460005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005091508160000160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054905073__DLinked_______________________________630e8478db8360020160005083600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508160000160005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000905581600101600050600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b50505050505050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________633b05448882600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611a3c565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________631378a6698260020160005086600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611bb7565b505092915050565b611bc761345f565b1515611bd257610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________63ceeaa51182600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611de8565b5050919050565b611df761345f565b1515611e0257610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________638430e4da600560005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600001600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611f21565b919050565b600060006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515611ff757610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c88600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141561219757610002565b600360005060008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050935073__DLinked_______________________________633b05448885600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092508280600101935050828460000160005060008873ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508584600101600050600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073__DLinked_______________________________63b3dad4c88560020160005085600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508573ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663586604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600460005060008773ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050915073__DLinked_______________________________633b05448883600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090508080600101915050808260000160005060008773ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508482600101600050600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073__DLinked_______________________________63b3dad4c88360020160005083600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150505b5b50505050505050565b6125b861345f565b15156125c357610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600073__DLinked_______________________________631378a669600560005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506126c8565b92915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561279957610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905073__DLinked_______________________________630e8478db600560005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005083600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092506129c0565b5b5050919050565b6000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905060008160000160005060008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505414159350612ba4565b505050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________63ceeaa51182600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250612d18565b5050919050565b612d2761345f565b1515612d3257610002565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________633b05448882600201600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250612f06565b5050919050565b6000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905060008160000160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141593506130e9565b505050919050565b600073__DLinked_______________________________63169d68a1600560005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506131b4565b92915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905073__DLinked_______________________________63169d68a18260020160005086600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150925061332e565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905080600101600050600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250613457565b505092915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156134c4576001905061363e5661363d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415613512576000905061363e5661363c565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905061363e565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b6106cf806100b96000396000f36060604052361561007f576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100885780637a9e5e4b146100a557806383197ef0146100c25780638da5cb5b146100d6578063a91ee0dc14610114578063bf7e214f14610131578063f3fef3a31461016f5761007f565b6100865b5b565b005b34610002576100a36004808035906020019091905050610195565b005b34610002576100c06004808035906020019091905050610252565b005b34610002576100d4600480505061030f565b005b34610002576100e86004805050610360565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761012f6004808035906020019091905050610386565b005b346100025761014360048050506103db565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101936004808035906020019091908035906020019091905050610401565b005b61019d6104ed565b15156101a857610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61025a6104ed565b151561026557610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6103176104ed565b151561032257610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61038e6104ed565b151561039957610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600061040b6104ed565b151561041657610002565b3073ffffffffffffffffffffffffffffffffffffffff16318210610451573073ffffffffffffffffffffffffffffffffffffffff1631610453565b815b90508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050151561049857610002565b8273ffffffffffffffffffffffffffffffffffffffff167faeba90871f7da8a443096c396877004da901c92fcab3ec900a99cecddb19ec4d836040518082815260200191505060405180910390a25b5b505050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561055257600190506106cc566106cb565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156105a057600090506106cc566106ca565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506106cc565b5b5b9056'
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
            'type': 'constructor'
          },
          {
            'anonymous': false,
            'inputs': [],
            'name': 'UpdateInfo',
            'type': 'event'
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
        'bytecode': '606060405260405160a0806109ec8339810160405280805190602001909190908160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b8260026000509060028260029090810192821561011c579160200282015b8281111561011b5782518260005055916020019190600101906100fd565b5b5090506101479190610129565b808211156101435760008181506000905550600101610129565b5090565b505083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550816004600050819055505b5050505061080c806101e06000396000f360606040523615610095576000357c010000000000000000000000000000000000000000000000000000000090048063051802371461009a57806313af4035146100c6578063502c4065146100e35780637a9e5e4b1461010857806383197ef0146101255780638da5cb5b14610139578063a568544614610177578063b32ae69d146101b9578063bf7e214f146101ee57610095565b610002565b34610002576100ac600480505061022c565b604051808260001916815260200191505060405180910390f35b34610002576100e16004808035906020019091905050610235565b005b6100f060048050506102f2565b60405180821515815260200191505060405180910390f35b346100025761012360048080359060200190919050506103b9565b005b34610002576101376004805050610476565b005b346100025761014b6004805050610510565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101b7600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091905050610536565b005b34610002576101d460048080359060200190919050506105e7565b604051808260001916815260200191505060405180910390f35b34610002576102006004805050610604565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60046000505481565b61023d61062a565b151561024857610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f19350505050156103b1577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190506103b6565b610002565b90565b6103c161062a565b15156103cc57610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d257610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61053e61062a565b151561054957610002565b80600260005090600282600290908101928215610586579160200282015b82811115610585578251826000505591602001919060010190610567565b5b5090506105b19190610593565b808211156105ad5760008181506000905550600101610593565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b5b50565b60026000508160028110156100025790900160005b915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561068f576001905061080956610808565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156106dd576000905061080956610807565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610809565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611c29806100b96000396000f3606060405236156100c1576000357c010000000000000000000000000000000000000000000000000000000090048063087cbd40146100c657806313af4035146100e35780631a0919dc1461010057806330d00012146101335780636b4316db146101a85780637a9e5e4b146101db57806383197ef0146101f85780638da5cb5b1461020c578063bb34534c1461024a578063bf7e214f14610291578063c3c5a547146102cf578063ce5494bb14610302578063d5a760f51461031f576100c1565b610002565b34610002576100e16004808035906020019091905050610366565b005b34610002576100fe60048080359060200190919050506103bb565b005b346100025761011b6004808035906020019091905050610478565b60405180821515815260200191505060405180910390f35b346100025761017c6004808035906020019091908060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919050506105d7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101c360048080359060200190919050506107d2565b60405180821515815260200191505060405180910390f35b34610002576101f66004808035906020019091905050610b96565b005b346100025761020a6004805050610c53565b005b346100025761021e6004805050610ca4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102656004808035906020019091905050610cca565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102a36004805050610d7e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102ea6004808035906020019091905050610da4565b60405180821515815260200191505060405180910390f35b346100025761031d6004808035906020019091905050610e9c565b005b346100025761033a6004808035906020019091905050610f95565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61036e61105b565b151561037957610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6103c361105b565b15156103ce57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600061048733610f95565b9150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632874528e8533600060405160200152604051837c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905080156105c7578173ffffffffffffffffffffffffffffffffffffffff166383197ef0604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b156100025760325a03f11561000257505050600192506105d0565b600092506105d0565b5050919050565b6000600060006105e6856107d2565b15156105f157610002565b308486336040516109ec8061123d833901808573ffffffffffffffffffffffffffffffffffffffff168152602001846002602002808383829060006004602084601f0104600302600f01f150905001836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f08015610002579150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ebd9a83863385600060405160200152604051847c010000000000000000000000000000000000000000000000000000000002815260040180846000191681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905080151561077057610002565b84600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca683604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28192506107ca565b505092915050565b60006000600090505b8250602060ff168160ff161015610b825760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561086e57610b82565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610a66575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161080156109e4575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610a655750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610b66575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610b655750602e7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610b745760009150610b90565b5b80806001019150506107db565b60038160ff16119150610b90565b50919050565b610b9e61105b565b1515610ba957610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610c5b61105b565b1515610c6657610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f83600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905080505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f84600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff1614159050610e97565b919050565b610ea461105b565b1515610eaf57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166313af403582604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b156100025760325a03f11561000257505050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f83600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905080505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156110c0576001905061123a56611239565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561110e576000905061123a56611238565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905061123a565b5b5b9056606060405260405160a0806109ec8339810160405280805190602001909190908160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b8260026000509060028260029090810192821561011c579160200282015b8281111561011b5782518260005055916020019190600101906100fd565b5b5090506101479190610129565b808211156101435760008181506000905550600101610129565b5090565b505083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550816004600050819055505b5050505061080c806101e06000396000f360606040523615610095576000357c010000000000000000000000000000000000000000000000000000000090048063051802371461009a57806313af4035146100c6578063502c4065146100e35780637a9e5e4b1461010857806383197ef0146101255780638da5cb5b14610139578063a568544614610177578063b32ae69d146101b9578063bf7e214f146101ee57610095565b610002565b34610002576100ac600480505061022c565b604051808260001916815260200191505060405180910390f35b34610002576100e16004808035906020019091905050610235565b005b6100f060048050506102f2565b60405180821515815260200191505060405180910390f35b346100025761012360048080359060200190919050506103b9565b005b34610002576101376004805050610476565b005b346100025761014b6004805050610510565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101b7600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091905050610536565b005b34610002576101d460048080359060200190919050506105e7565b604051808260001916815260200191505060405180910390f35b34610002576102006004805050610604565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60046000505481565b61023d61062a565b151561024857610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f19350505050156103b1577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1600190506103b6565b610002565b90565b6103c161062a565b15156103cc57610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104d257610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61053e61062a565b151561054957610002565b80600260005090600282600290908101928215610586579160200282015b82811115610585578251826000505591602001919060010190610567565b5b5090506105b19190610593565b808211156105ad5760008181506000905550600101610593565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b5b50565b60026000508160028110156100025790900160005b915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561068f576001905061080956610808565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156106dd576000905061080956610807565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610809565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b610aac806100b96000396000f3606060405236156100ab576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100b05780632874528e146100cd5780632a1887bc146101095780635ebd9a83146101455780637a9e5e4b1461018a57806383197ef0146101a75780638d34cbb7146101bb5780638da5cb5b146101f7578063b96b099f14610235578063bf7e214f1461027c578063d1a7c77f146102ba576100ab565b610002565b34610002576100cb6004808035906020019091905050610301565b005b34610002576100f160048080359060200190919080359060200190919050506103be565b60405180821515815260200191505060405180910390f35b346100025761012d6004808035906020019091908035906020019091905050610487565b60405180821515815260200191505060405180910390f35b3461000257610172600480803590602001909190803590602001909190803590602001909190505061054b565b60405180821515815260200191505060405180910390f35b34610002576101a56004808035906020019091905050610645565b005b34610002576101b96004805050610702565b005b34610002576101df6004808035906020019091908035906020019091905050610753565b60405180821515815260200191505060405180910390f35b346100025761020960048050506107da565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102506004808035906020019091905050610800565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761028e600480505061085b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102d56004808035906020019091905050610881565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103096108ca565b151561031457610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006103c86108ca565b15156103d357610002565b6103dd8383610487565b1561047757600360005060008460001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600260005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560019050610480565b60009050610480565b5b92915050565b6000600260005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600360005060008560001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16149050610545565b92915050565b60006105556108ca565b151561056057610002565b61056a8484610753565b156106345781600260005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555081600360005060008660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506001905061063d565b6000905061063d565b5b9392505050565b61064d6108ca565b151561065857610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b61070a6108ca565b151561071557610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600073ffffffffffffffffffffffffffffffffffffffff1661077684610881565b73ffffffffffffffffffffffffffffffffffffffff161480156107cd5750600073ffffffffffffffffffffffffffffffffffffffff166107b583610800565b73ffffffffffffffffffffffffffffffffffffffff16145b90506107d4565b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610856565b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360005060008360001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506108c5565b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561092f5760019050610aa956610aa8565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561097d5760009050610aa956610aa7565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610aa9565b5b5b9056'
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
        'bytecode': '606060405260016008600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b61127a806100c16000396000f3606060405236156100ed576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100f257806338a699a41461010f578063446bffba146101425780634bbff4a71461015f5780634cc82215146101875780636b4316db146101a45780636d74e7ab146101d75780637a9e5e4b1461020857806383197ef0146102255780638da5cb5b1461023957806392aaa79714610277578063986f191c1461029f578063a1b1daee146102c7578063a91ee0dc146102fc578063bf7e214f14610319578063ee564eb914610357578063ee84fbce14610388576100ed565b610002565b346100025761010d60048080359060200190919050506103b9565b005b346100025761012a6004808035906020019091905050610476565b60405180821515815260200191505060405180910390f35b346100025761015d60048080359060200190919050506104a6565b005b346100025761017160048050506106c3565b6040518082815260200191505060405180910390f35b34610002576101a26004808035906020019091905050610751565b005b34610002576101bf6004808035906020019091905050610885565b60405180821515815260200191505060405180910390f35b34610002576101f26004808035906020019091905050610c49565b6040518082815260200191505060405180910390f35b34610002576102236004808035906020019091905050610c75565b005b34610002576102376004805050610d32565b005b346100025761024b6004805050610d83565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102896004805050610da9565b6040518082815260200191505060405180910390f35b34610002576102b16004805050610e37565b6040518082815260200191505060405180910390f35b34610002576102e26004808035906020019091905050610ec5565b604051808260001916815260200191505060405180910390f35b34610002576103176004808035906020019091905050610eed565b005b346100025761032b6004805050610f42565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103726004808035906020019091905050610f68565b6040518082815260200191505060405180910390f35b34610002576103a36004808035906020019091905050611000565b6040518082815260200191505060405180910390f35b6103c1611098565b15156103cc57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600660005060008460001916815260200190815260200160002060005054141590506104a1565b919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561056b57610002565b61057481610885565b1580610585575061058481610476565b5b1561058f57610002565b60086000505460066000506000836000191681526020019081526020016000206000508190555073__DLinked_______________________________63b3dad4c86003600050600860005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050806007600050600060086000505481526020019081526020016000206000508190555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196008600050546040518082815260200191505060405180910390a260086000818150548092919060010191905055505b5b50565b600073__DLinked_______________________________63ceeaa5116003600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061074e565b90565b600061075b611098565b151561076657610002565b60076000506000838152602001908152602001600020600050549050600660005060008260001916815260200190815260200160002060005060009055600760005060008381526020019081526020016000206000506000905573__DLinked_______________________________630e8478db600360005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b60006000600090505b8250602060ff168160ff161015610c355760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561092157610c35565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610b19575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610a97575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610b185750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610c19575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610c185750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610c275760009150610c43565b5b808060010191505061088e565b60038160ff16119150610c43565b50919050565b60006006600050600083600019168152602001908152602001600020600050549050610c70565b919050565b610c7d611098565b1515610c8857610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610d3a611098565b1515610d4557610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________638430e4da6003600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610e34565b90565b600073__DLinked_______________________________633b0544886003600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610ec2565b90565b600060076000506000838152602001908152602001600020600050549050610ee8565b919050565b610ef5611098565b1515610f0057610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________63169d68a1600360005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610ffb565b919050565b600073__DLinked_______________________________631378a669600360005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611093565b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156110fd576001905061127756611276565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561114b576000905061127756611275565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050611277565b5b5b9056'
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
        'bytecode': '6060604052655af3107a400060036000505566038d7ea4c680006004600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611c37806100d46000396000f3606060405236156100ed576000357c0100000000000000000000000000000000000000000000000000000000900480630737007e146100f257806313af40351461010f5780631937c2611461012c5780633129aa0d1461015d57806336d8c30a14610197578063551b5dcc146101c85780635f6b9f7d146101f95780637a9e5e4b1461022a5780637f19abe01461024757806383197ef0146102645780638da5cb5b14610278578063a1769ae2146102b6578063a85ebabe146102f0578063a91ee0dc14610311578063b42775b51461032e578063bf7e214f1461034f578063f1e0510e1461038d576100ed565b610002565b346100025761010d60048080359060200190919050506103aa565b005b346100025761012a60048080359060200190919050506103ff565b005b346100025761014760048080359060200190919050506104bc565b6040518082815260200191505060405180910390f35b34610002576101816004808035906020019091908035906020019091905050610566565b6040518082815260200191505060405180910390f35b34610002576101b26004808035906020019091905050610619565b6040518082815260200191505060405180910390f35b34610002576101e3600480803590602001909190505061063c565b6040518082815260200191505060405180910390f35b346100025761021460048080359060200190919050506106e6565b6040518082815260200191505060405180910390f35b34610002576102456004808035906020019091905050610790565b005b3461000257610262600480803590602001909190505061084d565b005b346100025761027660048050506108a2565b005b346100025761028a60048050506108f3565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102da6004808035906020019091908035906020019091905050610919565b6040518082815260200191505060405180910390f35b61030f60048080359060200190919080359060200190919050506109cc565b005b346100025761032c6004808035906020019091905050611206565b005b61034d600480803590602001909190803590602001909190505061125b565b005b346100025761036160048050506119da565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103a86004808035906020019091905050611a00565b005b6103b2611a55565b15156103bd57610002565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b610407611a55565b151561041257610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600073__DLinked_______________________________633b05448860086000506000858152602001908152602001600020600050600401600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610561565b919050565b600073__DLinked_______________________________631378a6696008600050600086815260200190815260200160002060005060040160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610613565b92915050565b60006003600050546002830a60ff1660046000505402019050610637565b919050565b600073__DLinked_______________________________63ceeaa51160086000506000858152602001908152602001600020600050600401600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506106e1565b919050565b600073__DLinked_______________________________638430e4da60086000506000858152602001908152602001600020600050600401600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061078b565b919050565b610798611a55565b15156107a357610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610855611a55565b151561086057610002565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6108aa611a55565b15156108b557610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073__DLinked_______________________________63169d68a16008600050600086815260200190815260200160002060005060040160005084600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506109c6565b92915050565b60006000600060008560018160ff1610806109ea5750600a8160ff16115b156109f457610002565b346109fe82610619565b1115610a0957610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515610ace57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a571899387600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015093506002870a60ff166004600050540292506008600050600087815260200190815260200160002060005060010160008181505480929190600101919050555060006008600050600088815260200190815260200160002060005060020160005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580610d005750600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b80610dac5750600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e051908187600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150155b15610db657610002565b866008600050600088815260200190815260200160002060005060020160005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508660ff166008600050600088815260200190815260200160002060005060000160008282825054019250508190555073__DLinked_______________________________63b3dad4c860086000506000898152602001908152602001600020600050600401600050600860005060008a815260200190815260200160002060005060010160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505084600860005060008881526020019081526020016000206000506003016000506000600860005060008a815260200190815260200160002060005060010160005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f193505050501515610ff757610002565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003600050549081150290604051809050600060405180830381858888f19350505050151561106157610002565b60036000505483019150348210156110b9573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f1935050505015156110b857610002565b5b73__DLinked_______________________________633b05448860086000506000898152602001908152602001600020600050600401600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860005060008b815260200190815260200160002060005060020160005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b50505050505050565b61120e611a55565b151561121957610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060008460018160ff1610806112775750600a8160ff16115b1561128157610002565b3461128b82610619565b111561129657610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561135b57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015093506002860a60ff166004600050540292506008600050600086815260200190815260200160002060005060010160008181505480929190600101919050555060006008600050600087815260200190815260200160002060005060020160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b14158061155c5750600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e051908186600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150155b1561156657610002565b856000036008600050600087815260200190815260200160002060005060020160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508560ff166008600050600087815260200190815260200160002060005060000160008282825054039250508190555073__DLinked_______________________________63b3dad4c8600860005060008881526020019081526020016000206000506004016000506008600050600089815260200190815260200160002060005060010160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050836008600050600087815260200190815260200160002060005060030160005060006008600050600089815260200190815260200160002060005060010160005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f1935050505015156117cc57610002565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003600050549081150290604051809050600060405180830381858888f19350505050151561183657610002565b600360005054830191503482101561188e573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f19350505050151561188d57610002565b5b73__DLinked_______________________________633b05448860086000506000888152602001908152602001600020600050600401600050600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860005060008a815260200190815260200160002060005060020160005060008973ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b505050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611a08611a55565b1515611a1357610002565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611aba5760019050611c3456611c33565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611b085760009050611c3456611c32565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050611c34565b5b5b9056'
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
  module.exports = dapple['akasha.sol'];
}
