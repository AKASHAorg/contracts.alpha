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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b61059b806100ba6000396000f360606040523615610070576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100755780637a9e5e4b1461009257806383197ef0146100af5780638da5cb5b146100be578063a91ee0dc146100f7578063bf7e214f14610114575b610000565b3461000057610090600480803590602001909190505061014d565b005b34610000576100ad600480803590602001909190505061020a565b005b34610000576100bc6102c7565b005b34610000576100cb610318565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610112600480803590602001909190505061033e565b005b3461000057610121610393565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101556103b9565b151561016057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102126103b9565b151561021d57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6102cf6103b9565b15156102da57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6103466103b9565b151561035157610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561041e576001905061059856610597565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561046c576000905061059856610596565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610598565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b610518806100ba6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100645780637a9e5e4b1461008157806383197ef01461009e5780638da5cb5b146100ad578063bf7e214f146100e6575b610000565b346100005761007f600480803590602001909190505061011f565b005b346100005761009c60048080359060200190919050506101dc565b005b34610000576100ab610299565b005b34610000576100ba6102ea565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576100f3610310565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610127610336565b151561013257610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6101e4610336565b15156101ef57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6102a1610336565b15156102ac57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561039b576001905061051556610514565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156103e9576000905061051556610513565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610515565b5b5b9056'
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
        'bytecode': '606060405234610000575b61022f806100186000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063e33b870714610043578063e81cf24c14610060575b610000565b346100005761005e6004808035906020019091905050610086565b005b346100005761008460048080359060200190919080359060200190919050506100ec565b005b600080548060010182818154818355818115116100cf578183600052602060002091820191016100ce91905b808211156100ca5760008160009055506001016100b2565b5090565b5b505050916000526020600020900160005b83909190915055505b50565b6000600073__Search________________________________6324fef5c8909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561020857600080548060010182818154818355818115116101ea578183600052602060002091820191016101e991905b808211156101e55760008160009055506001016101cd565b5090565b5b505050916000526020600020900160005b8490919091505550610229565b81600082815481101561000057906000526020600020900160005b50819055505b5b50505056'
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
        'bytecode': '606060405234610000575b60dc806100176000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480636985e724146036575b6000565b3460005760d4600480803590602001909190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060d6565b005b5b50505056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b61156f806100ba6000396000f3606060405236156100d3576000357c010000000000000000000000000000000000000000000000000000000090048063044b4a2a146100d857806313af403514610109578063279bc3aa1461012657806348892753146101435780634c9b78da146101d357806371aa5a66146102045780637a9e5e4b1461025657806383197ef0146102735780638da5cb5b14610282578063a71eb6a1146102bb578063a91ee0dc146102e1578063bf7e214f146102fe578063c407afe714610337578063e616d76f14610368578063f6aaa867146103a2575b610000565b34610000576100f360048080359060200190919050506103dc565b6040518082815260200191505060405180910390f35b3461000057610124600480803590602001909190505061047b565b005b34610000576101416004808035906020019091905050610538565b005b3461000057610167600480803590602001909190803590602001909190505061058d565b604051808773ffffffffffffffffffffffffffffffffffffffff168152602001868152602001858152602001846002602002808383829060006004602084601f0104600302600f01f1509050018315158152602001828152602001965050505050505060405180910390f35b34610000576101ee600480803590602001909190505061073d565b6040518082815260200191505060405180910390f35b3461000057610254600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050919080359060200190919050506107dc565b005b34610000576102716004808035906020019091905050610d7b565b005b3461000057610280610e38565b005b346100005761028f610e89565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102df6004808035906020019091908035906020019091905050610eaf565b005b34610000576102fc6004808035906020019091905050611123565b005b346100005761030b611178565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610352600480803590602001909190505061119e565b6040518082815260200191505060405180910390f35b346100005761038c600480803590602001909190803590602001909190505061123d565b6040518082815260200191505060405180910390f35b34610000576103c660048080359060200190919080359060200190919050506112e5565b6040518082815260200191505060405180910390f35b60006004600083815260200190815260200160002060010173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b61048361138d565b151561048e57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61054061138d565b151561054b57610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060006040604051908101604052806002905b60008152602001906001900390816105a3579050506000600060046000898152602001908152602001600020600401600088815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1695506004600089815260200190815260200160002060040160008881526020019081526020016000206001015494506004600089815260200190815260200160002060040160008881526020019081526020016000206000015493506004600089815260200190815260200160002060040160008881526020019081526020016000206002016002806020026040519081016040528092919082600280156106c4576020028201915b8154815260200190600101908083116106b0575b5050505050925060046000898152602001908152602001600020600401600088815260200190815260200160002060040160149054906101000a900460ff1691506004600089815260200190815260200160002060040160008881526020019081526020016000206005015490505b9295509295509295565b60006004600083815260200190815260200160002060010173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015015156108a357610000565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635280692985600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561095257610000565b6004600085815260200190815260200160002060000160008154809291906001019190505550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050806004600086815260200190815260200160002060040160006004600088815260200190815260200160002060000154815260200190815260200160002060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555082600460008681526020019081526020016000206004016000600460008881526020019081526020016000206000015481526020019081526020016000206002019060028260028101928215610b22579160200282015b82811115610b21578251825591602001919060010190610b06565b5b509050610b4791905b80821115610b43576000816000905550600101610b2b565b5090565b50506004600085815260200190815260200160002060000154600460008681526020019081526020016000206004016000600460008881526020019081526020016000206000015481526020019081526020016000206001018190555042600460008681526020019081526020016000206004016000600460008881526020019081526020016000206000015481526020019081526020016000206005018190555060008214158015610c0f5750600460008581526020019081526020016000206000015482105b15610c5a578160046000868152602001908152602001600020600401600060046000888152602001908152602001600020600001548152602001908152602001600020600001819055505b6004600085815260200190815260200160002060010173__DLinked_______________________________63b3dad4c890916004600088815260200190815260200160002060000154600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960046000888152602001908152602001600020600001546040518082815260200191505060405180910390a35b5b50505050565b610d8361138d565b1515610d8e57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610e4061138d565b1515610e4b57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001501515610f7657610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff1660046000858152602001908152602001600020600401600084815260200190815260200160002060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156110b657610000565b600160046000858152602001908152602001600020600401600084815260200190815260200160002060040160146101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b505050565b61112b61138d565b151561113657610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006004600083815260200190815260200160002060010173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b60006004600084815260200190815260200160002060010173__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b92915050565b60006004600084815260200190815260200160002060010173__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156113f2576001905061156c5661156b565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611440576000905061156c5661156a565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905061156c565b5b5b9056'
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
        'bytecode': '606060405234610000575b6104e7806100186000396000f36504062dabbdf0506060604052361561008e576000357c0100000000000000000000000000000000000000000000000000000000900480630e8478db146100935780633e552821146100ca57806348eb81eb146100ff57806370da6fe61461013457806391c0ab63146101605780639f58851f1461018c578063b3dad4c8146101c3578063d6867e87146101fa575b610000565b6100b26004808035906020019091908035906020019091905050610226565b60405180821515815260200191505060405180910390f35b6100e96004808035906020019091908035906020019091905050610315565b6040518082815260200191505060405180910390f35b61011e6004808035906020019091908035906020019091905050610336565b6040518082815260200191505060405180910390f35b61014a6004808035906020019091905050610357565b6040518082815260200191505060405180910390f35b6101766004808035906020019091905050610378565b6040518082815260200191505060405180910390f35b6101ab6004808035906020019091908035906020019091905050610387565b60405180821515815260200191505060405180910390f35b6101e260048080359060200190919080359060200190919050506103fb565b60405180821515815260200191505060405180910390f35b61021060048080359060200190919050506104c6565b6040518082815260200191505060405180910390f35b60006102328383610387565b1561030b57600190508260010160008381526020019081526020016000205483600101600085600201600086815260200190815260200160002054815260200190815260200160002081905550826002016000838152602001908152602001600020548360020160008560010160008681526020019081526020016000205481526020019081526020016000208190555082600201600083815260200190815260200160002060009055826001016000838152602001908152602001600020600090558260000160008154809291906001900391905055505b8090505b92915050565b60008260010160008381526020019081526020016000205490505b92915050565b60008260020160008381526020019081526020016000205490505b92915050565b6000816001016000600081526020019081526020016000205490505b919050565b6000816000015490505b919050565b6000600082141561039757610000565b6000836002016000848152602001908152602001600020541415806103d2575060008360010160008481526020019081526020016000205414155b806103f25750818360010160006000815260200190815260200160002054145b90505b92915050565b60006104078383610387565b15156104bc576001905081836002016000856001016000600081526020019081526020016000205481526020019081526020016000208190555082600101600060008152602001908152602001600020548360010160008481526020019081526020016000208190555060008360020160008481526020019081526020016000208190555081836001016000600081526020019081526020016000208190555082600001600081548092919060010191905055505b8090505b92915050565b6000816002016000600081526020019081526020016000205490505b91905056'
      },
      'DappleEnvironment': {
        'interface': [
          {
            'inputs': [],
            'payable': false,
            'type': 'constructor'
          }
        ],
        'bytecode': '6060604052346000575b5b5b60098060176000396000f360606040525b600056'
      },
      'DappleLogger': {
        'interface': [],
        'bytecode': '6060604052346000575b60098060156000396000f360606040525b600056'
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
        'bytecode': '606060405234610000575b60005b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b604051610247806102d5833901809050604051809103906000f080156100005790507fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c38160405180807f63630000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b505b6101798061015c6000396000f36060604052361561004f576000357c0100000000000000000000000000000000000000000000000000000000900480635067a4bd1461005d5780639fc288d114610083578063d900596c14610092575b346100005761005b5b5b565b005b346100005761008160048080359060200190919080359060200190919050506100a1565b005b34610000576100906100ff565b005b346100005761009f61013c565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c3828260405180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600160405180821515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600060405180821515815260200191505060405180910390a15b56606060405234610000575b61022f806100186000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063e33b870714610043578063e81cf24c14610060575b610000565b346100005761005e6004808035906020019091905050610086565b005b346100005761008460048080359060200190919080359060200190919050506100ec565b005b600080548060010182818154818355818115116100cf578183600052602060002091820191016100ce91905b808211156100ca5760008160009055506001016100b2565b5090565b5b505050916000526020600020900160005b83909190915055505b50565b6000600073__Search________________________________6324fef5c8909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561020857600080548060010182818154818355818115116101ea578183600052602060002091820191016101e991905b808211156101e55760008160009055506001016101cd565b5090565b5b505050916000526020600020900160005b8490919091505550610229565b81600082815481101561000057906000526020600020900160005b50819055505b5b50505056'
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
        'bytecode': '606060405260016008556175306009555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b612d60806100c56000396000f36060604052361561014c576000357c0100000000000000000000000000000000000000000000000000000000900480630147966a1461015157806305748bb81461018257806313af4035146101b35780631a1f2a91146101d05780633b0038161461020a5780633d89b8121461023b578063507d9c2b1461026c578063515c44a5146102a657806352806929146102c35780635f8534ae146102f65780637a9e5e4b146103135780637abd5958146103305780637b965fa1146103b05780637d026a1c146103e157806383197ef01461042a578063868e5b281461043957806389efbd091461046a5780638c73a3fe146104a45780638da5cb5b146104c1578063a5718993146104fa578063a91ee0dc14610541578063bae78d7b1461055e578063bf7e214f146105ce578063de2ddc3e14610607578063e051908114610641578063e24dd4c414610674575b610000565b346100005761016c60048080359060200190919050506106a5565b6040518082815260200191505060405180910390f35b346100005761019d6004808035906020019091905050610807565b6040518082815260200191505060405180910390f35b34610000576101ce6004808035906020019091905050610969565b005b34610000576101f46004808035906020019091908035906020019091905050610a26565b6040518082815260200191505060405180910390f35b34610000576102256004808035906020019091905050610b7b565b6040518082815260200191505060405180910390f35b34610000576102566004808035906020019091905050610cdd565b6040518082815260200191505060405180910390f35b34610000576102906004808035906020019091908035906020019091905050610e29565b6040518082815260200191505060405180910390f35b34610000576102c16004808035906020019091905050610f7e565b005b34610000576102de6004808035906020019091905050610fd3565b60405180821515815260200191505060405180910390f35b34610000576103116004808035906020019091905050610ff8565b005b346100005761032e60048080359060200190919050506113ac565b005b34610000576103ae6004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509190803590602001908201803590602001908080602002602001604051908101604052809392919081815260200183836020028082843782019150505050505091905050611469565b005b34610000576103cb6004808035906020019091905050611ae7565b6040518082815260200191505060405180910390f35b346100005761042860048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091908035906020019091905050611c33565b005b3461000057610437611eb1565b005b34610000576104546004808035906020019091905050611f02565b6040518082815260200191505060405180910390f35b346100005761048e6004808035906020019091908035906020019091905050611f27565b6040518082815260200191505060405180910390f35b34610000576104bf6004808035906020019091905050612092565b005b34610000576104ce6120b1565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761051560048080359060200190919050506120d7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761055c6004808035906020019091905050612115565b005b3461000057610579600480803590602001909190505061216a565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001826002602002808383829060006004602084601f0104600302600f01f150905001935050505060405180910390f35b34610000576105db612241565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761062b6004808035906020019091908035906020019091905050612267565b6040518082815260200191505060405180910390f35b346100005761065c60048080359060200190919050506123d2565b60405180821515815260200191505060405180910390f35b346100005761068f60048080359060200190919050506123ff565b6040518082815260200191505060405180910390f35b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b61097161254b565b151561097c57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506006600082815260200190815260200160002060000173__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506006600082815260200190815260200160002060000173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506006600082815260200190815260200160002060000173__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b610f8661254b565b1515610f9157610000565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060006004600084815260200190815260200160002060020154141590505b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015015156110bf57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150151561123957610000565b611242826123d2565b1561124c57610000565b600073ffffffffffffffffffffffffffffffffffffffff166005600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156112b957610000565b6005600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1662f55d9d33604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b156100005760325a03f115610000575050506005600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b6113b461254b565b15156113bf57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561153457610000565b6000845114806115455750600a8451115b1561154f57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015092506040516106338061272d833901809050604051809103906000f0801561000057915060606040519081016040528086815260200143815260200184815260200150600460006008548152602001908152602001600020600082015181600001906002826002810192821561169c579160200282015b8281111561169b578251825591602001919060010190611680565b5b5090506116c191905b808211156116bd5760008160009055506001016116a5565b5090565b50506020820151816002015560408201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055509050508160056000600854815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600090505b83518160ff161015611a1657600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff1681518110156100005790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561183e57610000565b60066000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab878560ff1681518110156100005790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150815260200190815260200160002060000173__DLinked_______________________________63b3dad4c89091600854600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050838160ff1681518110156100005790602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6008546040518082815260200191505060405180910390a35b8080600101915050611768565b600760008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c89091600854600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150506008600081548092919060010191905055505b5b5050505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506006600082815260200190815260200160002060000173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001501515611cfa57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff166004600084815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611e2657610000565b611e2f826123d2565b1515611e3a57610000565b82600460008481526020019081526020016000206000019060028260028101928215611e83579160200282015b82811115611e82578251825591602001919060010190611e67565b5b509050611ea891905b80821115611ea4576000816000905550600101611e8c565b5090565b50505b5b505050565b611eb961254b565b1515611ec457610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060095460046000848152602001908152602001600020600201540190505b919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b61209a61254b565b15156120a557610000565b806009819055505b5b50565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b61211d61254b565b151561212857610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060006040604051908101604052806002905b600081526020019060019003908161217e57905050600460008581526020019081526020016000206002015492506004600085815260200190815260200160002060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915060046000858152602001908152602001600020600001600280602002604051908101604052809291908260028015612232576020028201915b81548152602001906001019080831161221e575b505050505090505b9193909250565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600954600460008581526020019081526020016000206002015401905043811191505b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506006600082815260200190815260200160002060000173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156125b0576001905061272a56612729565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156125fe576000905061272a56612728565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905061272a565b5b5b905660606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b610579806100ba6000396000f36060604052361561006f576000357c010000000000000000000000000000000000000000000000000000000090048062f55d9d1461007857806313af4035146100955780637a9e5e4b146100b257806383197ef0146100cf5780638da5cb5b146100de578063bf7e214f14610117575b6100765b5b565b005b34610000576100936004808035906020019091905050610150565b005b34610000576100b06004808035906020019091905050610180565b005b34610000576100cd600480803590602001909190505061023d565b005b34610000576100dc6102fa565b005b34610000576100eb61034b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610124610371565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610158610397565b151561016357610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b610188610397565b151561019357610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610245610397565b151561025057610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610302610397565b151561030d57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103fc576001905061057656610575565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561044a576000905061057656610574565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610576565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b610579806100ba6000396000f36060604052361561006f576000357c010000000000000000000000000000000000000000000000000000000090048062f55d9d1461007857806313af4035146100955780637a9e5e4b146100b257806383197ef0146100cf5780638da5cb5b146100de578063bf7e214f14610117575b6100765b5b565b005b34610000576100936004808035906020019091905050610150565b005b34610000576100b06004808035906020019091905050610180565b005b34610000576100cd600480803590602001909190505061023d565b005b34610000576100dc6102fa565b005b34610000576100eb61034b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610124610371565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610158610397565b151561016357610000565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b610188610397565b151561019357610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b610245610397565b151561025057610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610302610397565b151561030d57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156103fc576001905061057656610575565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561044a576000905061057656610574565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610576565b5b5b9056'
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
        'bytecode': '606060405267016345785d8a0000600355600a600460006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055506175306005555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b610ae08061010a6000396000f3606060405236156100b2576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100bb57806319aaf1f0146100d8578063271f88b4146100f55780634e71d92d1461011257806367895db2146101215780637a9e5e4b1461013e57806383197ef01461015b5780638778f4151461016a5780638da5cb5b1461019b578063a91ee0dc146101d4578063bf3506c1146101f1578063bf7e214f14610224575b6100b95b5b565b005b34610000576100d6600480803590602001909190505061025d565b005b34610000576100f3600480803590602001909190505061031a565b005b34610000576101106004808035906020019091905050610339565b005b346100005761011f610358565b005b346100005761013c6004808035906020019091905050610680565b005b346100005761015960048080359060200190919050506106d5565b005b3461000057610168610792565b005b346100005761018560048080359060200190919050506107e3565b6040518082815260200191505060405180910390f35b34610000576101a861081a565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101ef6004808035906020019091905050610840565b005b346100005761020c6004808035906020019091905050610895565b60405180821515815260200191505060405180910390f35b34610000576102316108d8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102656108fe565b151561027057610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6103226108fe565b151561032d57610000565b806005819055505b5b50565b6103416108fe565b151561034c57610000565b806003819055505b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561042357610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509250600554600660008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154019150829050600460009054906101000a900460ff1660ff16600660008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff1660ff16118061057057504382115b1561057a57610000565b6003543073ffffffffffffffffffffffffffffffffffffffff163110156105a057610000565b8073ffffffffffffffffffffffffffffffffffffffff1663502c4065600354600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018090506020604051808303818588803b156100005761235a5a03f115610000575050505060405180519060200150151561062957610000565b8273ffffffffffffffffffffffffffffffffffffffff167fd6717f327e0cb88b4a97a7f67a453e9258252c34937ccbdd86de7cb840e7def36003546040518082815260200191505060405180910390a25b5b505050565b6106886108fe565b151561069357610000565b80600460006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b50565b6106dd6108fe565b15156106e857610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b61079a6108fe565b15156107a557610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600660008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015490505b919050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108486108fe565b151561085357610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60006000600554600660008573ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000015401905080431191505b50919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156109635760019050610add56610adc565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156109b15760009050610add56610adb565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610add565b5b5b9056'
      },
      'Feed': {
        'interface': [
          {
            'constant': false,
            'inputs': [
              {
                'name': 'repository',
                'type': 'string'
              }
            ],
            'name': 'setRepository',
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
                'indexed': false,
                'name': 'newVersion',
                'type': 'bytes32'
              },
              {
                'indexed': false,
                'name': 'releaseNotes',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'blockNumber',
                'type': 'uint256'
              }
            ],
            'name': 'UpdateVersion',
            'type': 'event'
          },
          {
            'anonymous': false,
            'inputs': [
              {
                'indexed': false,
                'name': 'repository',
                'type': 'string'
              },
              {
                'indexed': false,
                'name': 'blockNumber',
                'type': 'uint256'
              }
            ],
            'name': 'UpdateRepository',
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b614322806100ba6000396000f3606060405236156101a4576000357c010000000000000000000000000000000000000000000000000000000090048063075363ad146101a95780630a7ed48a1461020057806313af403514610231578063140eccef1461024e5780631c9be5f41461029e5780632faf44f6146102cf578063624d47fc146103025780636b40adb2146103335780636e1d7eab1461036d5780637329d4b0146103a7578063739453e3146103e15780637775ec3a146103fe5780637a1fa1871461042f5780637a9e5e4b146104695780637c32db101461048657806383197ef0146104b75780638a3ace18146104c65780638da5cb5b14610502578063a1d206531461053b578063a66b77481461059b578063a91ee0dc146105b8578063b5d78d8c146105d5578063b776ff6b146106ba578063baba90cf146106f6578063bd10e57c14610729578063bd95db111461075a578063bf7e214f14610777578063cb5356ec146107b0578063d83bc5c5146107ea578063da72f92b1461081b578063ea7ca08f14610857578063f91427f414610888578063fdb5c2d8146108c2578063ffe466c9146108f3575b610000565b34610000576101fe600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050610943565b005b346100005761021b6004808035906020019091905050610abe565b6040518082815260200191505060405180910390f35b346100005761024c6004808035906020019091905050610c20565b005b34610000576102726004808035906020019091908035906020019091905050610cdd565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102b96004808035906020019091905050610df3565b6040518082815260200191505060405180910390f35b34610000576102ea6004808035906020019091905050610f55565b60405180821515815260200191505060405180910390f35b346100005761031d6004808035906020019091905050611292565b6040518082815260200191505060405180910390f35b346100005761035760048080359060200190919080359060200190919050506113f4565b6040518082815260200191505060405180910390f35b3461000057610391600480803590602001909190803590602001909190505061155f565b6040518082815260200191505060405180910390f35b34610000576103cb60048080359060200190919080359060200190919050506116ca565b6040518082815260200191505060405180910390f35b34610000576103fc6004808035906020019091905050611835565b005b34610000576104196004808035906020019091905050611e54565b6040518082815260200191505060405180910390f35b34610000576104536004808035906020019091908035906020019091905050611fb6565b6040518082815260200191505060405180910390f35b34610000576104846004808035906020019091905050612121565b005b34610000576104a160048080359060200190919050506121de565b6040518082815260200191505060405180910390f35b34610000576104c4612340565b005b34610000576104ea6004808035906020019091908035906020019091905050612391565b60405180821515815260200191505060405180910390f35b346100005761050f61254e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610599600480803590602001909190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050612574565b005b34610000576105b66004808035906020019091905050612705565b005b34610000576105d36004808035906020019091905050612ec3565b005b34610000576105e2612f18565b604051808460001916815260200180602001806020018381038352858181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156106505780820380516001836020036101000a031916815260200191505b508381038252848181518152602001915080519060200190808383829060006004602084601f0104600302600f01f150905090810190601f1680156106a95780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b34610000576106de600480803590602001909190803590602001909190505061308d565b60405180821515815260200191505060405180910390f35b346100005761071160048080359060200190919050506132a5565b60405180821515815260200191505060405180910390f35b34610000576107446004808035906020019091905050613594565b6040518082815260200191505060405180910390f35b346100005761077560048080359060200190919050506136f6565b005b346100005761078461374b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576107d46004808035906020019091908035906020019091905050613771565b6040518082815260200191505060405180910390f35b346100005761080560048080359060200190919050506138dc565b6040518082815260200191505060405180910390f35b346100005761083f6004808035906020019091908035906020019091905050613a3e565b60405180821515815260200191505060405180910390f35b34610000576108726004808035906020019091905050613bfb565b6040518082815260200191505060405180910390f35b34610000576108ac6004808035906020019091908035906020019091905050613d5d565b6040518082815260200191505060405180910390f35b34610000576108dd6004808035906020019091905050613ec8565b6040518082815260200191505060405180910390f35b3461000057610917600480803590602001909190803590602001909190505061402a565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61094b614140565b151561095657610000565b8060059080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109a257805160ff19168380011785556109d0565b828001600101855582156109d0579182015b828111156109cf5782518255916020019190600101906109b4565b5b5090506109f591905b808211156109f15760008160009055506001016109d9565b5090565b50507fdaad9ce13a31164730a37ec55c76b4f329a57bb241368e121d137041baf4bc5f6005436040518080602001838152602001828103825284818154600181600116156101000203166002900481526020019150805460018160011615610100020316600290048015610aaa5780601f10610a7f57610100808354040283529160200191610aaa565b820191906000526020600020905b815481529060010190602001808311610a8d57829003601f168201915b5050935050505060405180910390a15b5b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b610c28614140565b1515610c3357610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561102057610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________63b3dad4c8909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015092508215611289578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b6000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561190257610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509350600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509250600660008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549150600760008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600660008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415611b7557610000565b600660008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050600660008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600660008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600760008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________630e8478db909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050600760008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009055600760008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050505050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b612129614140565b151561213457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b612348614140565b151561235357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506000600760008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141592505b505092915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61257c614140565b151561258757610000565b816003819055508060049080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106125da57805160ff1916838001178555612608565b82800160010185558215612608579182015b828111156126075782518255916020019190600101906125ec565b5b50905061262d91905b80821115612629576000816000905550600101612611565b5090565b50507faf33b1ad6d590c6273091db9acca774af89110c5810a60b2c2de171e40d215636003546004436040518084600019168152602001806020018381526020018281038252848181546001816001161561010002031660029004815260200191508054600181600116156101000203166002900480156126ef5780601f106126c4576101008083540402835291602001916126ef565b820191906000526020600020905b8154815290600101906020018083116126d257829003601f168201915b505094505050505060405180910390a15b5b5050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015015156127ce57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156128b257610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506000600660008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415156129d057610000565b600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600760008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160008154809291906001019190505550600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600660008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600660008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600660008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600660008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050600760008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600760008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080600760008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001016000600760008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600760008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63b3dad4c89091600760008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020154600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150508173ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663582604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a25b5b505050565b612ecb614140565b1515612ed657610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60006020604051908101604052806000815260200150602060405190810160405280600081526020015060035460056004818054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015612fde5780601f10612fb357610100808354040283529160200191612fde565b820191906000526020600020905b815481529060010190602001808311612fc157829003601f168201915b50505050509150808054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561307a5780601f1061304f5761010080835404028352916020019161307a565b820191906000526020600020905b81548152906001019060200180831161305d57829003601f168201915b505050505090509250925092505b909192565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________639f58851f909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015092505b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561337057610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________630e8478db909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015092505b5b5050919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b6136fe614140565b151561370957610000565b80600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506000600660008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054141592505b505092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600760008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030173__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600860008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015091505b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050600660008273ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505b5092915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156141a5576001905061431f5661431e565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156141f3576000905061431f5661431d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905061431f565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b6106bc806100ba6000396000f36060604052361561007b576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100845780637a9e5e4b146100a157806383197ef0146100be5780638da5cb5b146100cd578063a91ee0dc14610106578063bf7e214f14610123578063f3fef3a31461015c575b6100825b5b565b005b346100005761009f6004808035906020019091905050610182565b005b34610000576100bc600480803590602001909190505061023f565b005b34610000576100cb6102fc565b005b34610000576100da61034d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101216004808035906020019091905050610373565b005b34610000576101306103c8565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761018060048080359060200190919080359060200190919050506103ee565b005b61018a6104da565b151561019557610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102476104da565b151561025257610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6103046104da565b151561030f57610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61037b6104da565b151561038657610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006103f86104da565b151561040357610000565b3073ffffffffffffffffffffffffffffffffffffffff1631821061043e573073ffffffffffffffffffffffffffffffffffffffff1631610440565b815b90508273ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051809050600060405180830381858888f19350505050151561048557610000565b8273ffffffffffffffffffffffffffffffffffffffff167faeba90871f7da8a443096c396877004da901c92fcab3ec900a99cecddb19ec4d836040518082815260200191505060405180910390a25b5b505050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561053f57600190506106b9566106b8565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561058d57600090506106b9566106b7565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506106b9565b5b5b9056'
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
            'payable': false,
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
        'bytecode': '6060604052346100005760405160a0806109aa833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b8260029060028260028101928215610117579160200282015b828111156101165782518255916020019190600101906100fb565b5b50905061013c91905b80821115610138576000816000905550600101610120565b5090565b505083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550816004819055505b505050505b6107d7806101d36000396000f360606040523615610091576000357c010000000000000000000000000000000000000000000000000000000090048063051802371461009657806313af4035146100bd578063502c4065146100da5780637a9e5e4b146100fa57806383197ef0146101175780638da5cb5b14610126578063a56854461461015f578063b32ae69d1461019f578063bf7e214f146101d4575b610000565b34610000576100a361020d565b604051808260001916815260200191505060405180910390f35b34610000576100d86004808035906020019091905050610213565b005b6100e26102d0565b60405180821515815260200191505060405180910390f35b34610000576101156004808035906020019091905050610397565b005b3461000057610124610454565b005b34610000576101336104ee565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761019d60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610514565b005b34610000576101ba60048080359060200190919050506105b7565b604051808260001916815260200191505060405180910390f35b34610000576101e16105cf565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60045481565b61021b6105f5565b151561022657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f193505050501561038f577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019050610394565b610000565b90565b61039f6105f5565b15156103aa57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104b057610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61051c6105f5565b151561052757610000565b806002906002826002810192821561055c579160200282015b8281111561055b578251825591602001919060010190610540565b5b50905061058191905b8082111561057d576000816000905550600101610565565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b5b50565b6002816002811015610000570160005b915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561065a57600190506107d4566107d3565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156106a857600090506107d4566107d2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506107d4565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b611bbc806100ba6000396000f3606060405236156100bd576000357c010000000000000000000000000000000000000000000000000000000090048063087cbd40146100c257806313af4035146100df5780631a0919dc146100fc57806330d000121461012f5780636b4316db146101a25780637a9e5e4b146101d557806383197ef0146101f25780638da5cb5b14610201578063bb34534c1461023a578063bf7e214f14610281578063c3c5a547146102ba578063ce5494bb146102ed578063d5a760f51461030a575b610000565b34610000576100dd6004808035906020019091905050610351565b005b34610000576100fa60048080359060200190919050506103a6565b005b34610000576101176004808035906020019091905050610463565b60405180821515815260200191505060405180910390f35b3461000057610176600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050919050506105be565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576101bd60048080359060200190919050506107b5565b60405180821515815260200191505060405180910390f35b34610000576101f06004808035906020019091905050610b73565b005b34610000576101ff610c30565b005b346100005761020e610c81565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102556004808035906020019091905050610ca7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761028e610d59565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102d56004808035906020019091905050610d7f565b60405180821515815260200191505060405180910390f35b34610000576103086004808035906020019091905050610e73565b005b34610000576103256004808035906020019091905050610f6c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610359611030565b151561036457610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6103ae611030565b15156103b957610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600061047233610f6c565b9150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632874528e8533600060405160200152604051837c010000000000000000000000000000000000000000000000000000000002815260040180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905080156105b2578173ffffffffffffffffffffffffffffffffffffffff166383197ef0604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b156100005760325a03f11561000057505050600192506105b7565b600092505b5050919050565b6000600060006105cd856107b5565b15156105d857610000565b308486336040516109aa80611212833901808573ffffffffffffffffffffffffffffffffffffffff168152602001846002602002808383829060006004602084601f0104600302600f01f150905001836000191681526020018273ffffffffffffffffffffffffffffffffffffffff168152602001945050505050604051809103906000f08015610000579150600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635ebd9a83863385600060405160200152604051847c010000000000000000000000000000000000000000000000000000000002815260040180846000191681526020018373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905080151561075757610000565b84600019167f1082cda15f9606da555bb7e9bf4eeee2f8e34abe85d3924bf9bacb716f8feca683604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a28192505b505092915050565b60006000600090505b602060ff168160ff161015610b635760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561084f57610b63565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610a47575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161080156109c5575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610a465750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610b47575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610b465750602e7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610b555760009150610b6d565b5b80806001019150506107be565b60038160ff161191505b50919050565b610b7b611030565b1515610b8657610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610c38611030565b1515610c4357610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d1a7c77f83600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600073ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f84600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015073ffffffffffffffffffffffffffffffffffffffff16141590505b919050565b610e7b611030565b1515610e8657610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166313af403582604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050600060405180830381600087803b156100005760325a03f11561000057505050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b96b099f83600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611095576001905061120f5661120e565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110e3576000905061120f5661120d565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150905061120f565b5b5b90566060604052346100005760405160a0806109aa833981016040528080519060200190918160400180519060200190919080519060200190919050505b5b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b8260029060028260028101928215610117579160200282015b828111156101165782518255916020019190600101906100fb565b5b50905061013c91905b80821115610138576000816000905550600101610120565b5090565b505083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555080600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550816004819055505b505050505b6107d7806101d36000396000f360606040523615610091576000357c010000000000000000000000000000000000000000000000000000000090048063051802371461009657806313af4035146100bd578063502c4065146100da5780637a9e5e4b146100fa57806383197ef0146101175780638da5cb5b14610126578063a56854461461015f578063b32ae69d1461019f578063bf7e214f146101d4575b610000565b34610000576100a361020d565b604051808260001916815260200191505060405180910390f35b34610000576100d86004808035906020019091905050610213565b005b6100e26102d0565b60405180821515815260200191505060405180910390f35b34610000576101156004808035906020019091905050610397565b005b3461000057610124610454565b005b34610000576101336104ee565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761019d60048080604001906002806020026040519081016040528092919082600260200280828437820191505050505091905050610514565b005b34610000576101ba60048080359060200190919050506105b7565b604051808260001916815260200191505060405180910390f35b34610000576101e16105cf565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60045481565b61021b6105f5565b151561022657610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051809050600060405180830381858888f193505050501561038f577f1af16f7c72ca21f49bc9d9aa30cca41db8727f5d70816fe8914d9ac828a102663334604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a160019050610394565b610000565b90565b61039f6105f5565b15156103aa57610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104b057610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61051c6105f5565b151561052757610000565b806002906002826002810192821561055c579160200282015b8281111561055b578251825591602001919060010190610540565b5b50905061058191905b8082111561057d576000816000905550600101610565565b5090565b50507f0427fd93f6c08e97e259405a615c46287516c798e04e361edde42cbb14ccd2a260405180905060405180910390a15b5b50565b6002816002811015610000570160005b915090505481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561065a57600190506107d4566107d3565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156106a857600090506107d4566107d2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506107d4565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b610a69806100ba6000396000f3606060405236156100a7576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100ac5780632874528e146100c95780632a1887bc146101055780635ebd9a83146101415780637a9e5e4b1461018657806383197ef0146101a35780638d34cbb7146101b25780638da5cb5b146101ee578063b96b099f14610227578063bf7e214f1461026e578063d1a7c77f146102a7575b610000565b34610000576100c760048080359060200190919050506102ee565b005b34610000576100ed60048080359060200190919080359060200190919050506103ab565b60405180821515815260200191505060405180910390f35b3461000057610129600480803590602001909190803590602001909190505061046a565b60405180821515815260200191505060405180910390f35b346100005761016e6004808035906020019091908035906020019091908035906020019091905050610524565b60405180821515815260200191505060405180910390f35b34610000576101a16004808035906020019091905050610614565b005b34610000576101b06106d1565b005b34610000576101d66004808035906020019091908035906020019091905050610722565b60405180821515815260200191505060405180910390f35b34610000576101fb6107a5565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761024260048080359060200190919050506107cb565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761027b61081f565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102c26004808035906020019091905050610845565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102f6610887565b151561030157610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006103b5610887565b15156103c057610000565b6103ca838361046a565b1561045e57600360008460001916815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560019050610463565b600090505b5b92915050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600360008560001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161490505b92915050565b600061052e610887565b151561053957610000565b6105438484610722565b156106075781600260008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555081600360008660001916815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055506001905061060c565b600090505b5b9392505050565b61061c610887565b151561062757610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6106d9610887565b15156106e457610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600073ffffffffffffffffffffffffffffffffffffffff1661074584610845565b73ffffffffffffffffffffffffffffffffffffffff1614801561079c5750600073ffffffffffffffffffffffffffffffffffffffff16610784836107cb565b73ffffffffffffffffffffffffffffffffffffffff16145b90505b92915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360008360001916815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156108ec5760019050610a6656610a65565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561093a5760009050610a6656610a64565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050610a66565b5b5b9056'
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
        'bytecode': '606060405234610000575b60d2806100176000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063bd6de11c146036575b6000565b3460005760cb600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505060cd565b005b5b505056'
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
        'bytecode': '606060405234610000575b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b610179806100bd6000396000f36060604052361561004f576000357c0100000000000000000000000000000000000000000000000000000000900480635067a4bd1461005d5780639fc288d114610083578063d900596c14610092575b346100005761005b5b5b565b005b346100005761008160048080359060200190919080359060200190919050506100a1565b005b34610000576100906100ff565b005b346100005761009f61013c565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c3828260405180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600160405180821515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600060405180821515815260200191505060405180910390a15b56'
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
        'bytecode': '606060405234610000575b60e4806100176000396000f36504062dabbdf05060606040526000357c01000000000000000000000000000000000000000000000000000000009004806324fef5c814603e575b6000565b605b60048080359060200190919080359060200190919050506071565b6040518082815260200191505060405180910390f35b60006000600090505b838054905081101560b9578284828154811015600057906000526020600020900160005b5054141560ac5780915060dd565b5b8080600101915050607a565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff91505b509291505056'
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
        'bytecode': '606060405234610000575b60aa806100176000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360cfa963146036575b6000565b346000576088600480803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091905050609e565b6040518082815260200191505060405180910390f35b6000600b90505b91905056'
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
        'bytecode': '606060405260016006555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b6111ed806100bf6000396000f3606060405236156100e9576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100ee57806338a699a41461010b578063446bffba1461013e5780634bbff4a71461015b5780634cc822151461017e5780636b4316db1461019b5780636d74e7ab146101ce5780637a9e5e4b146101ff57806383197ef01461021c5780638da5cb5b1461022b57806392aaa79714610264578063986f191c14610287578063a1b1daee146102aa578063a91ee0dc146102df578063bf7e214f146102fc578063ee564eb914610335578063ee84fbce14610366575b610000565b34610000576101096004808035906020019091905050610397565b005b34610000576101266004808035906020019091905050610454565b60405180821515815260200191505060405180910390f35b3461000057610159600480803590602001909190505061047a565b005b346100005761016861067c565b6040518082815260200191505060405180910390f35b34610000576101996004808035906020019091905050610705565b005b34610000576101b66004808035906020019091905050610826565b60405180821515815260200191505060405180910390f35b34610000576101e96004808035906020019091905050610be4565b6040518082815260200191505060405180910390f35b346100005761021a6004808035906020019091905050610c06565b005b3461000057610229610cc3565b005b3461000057610238610d14565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610271610d3a565b6040518082815260200191505060405180910390f35b3461000057610294610dc3565b6040518082815260200191505060405180910390f35b34610000576102c56004808035906020019091905050610e4c565b604051808260001916815260200191505060405180910390f35b34610000576102fa6004808035906020019091905050610e6a565b005b3461000057610309610ebf565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576103506004808035906020019091905050610ee5565b6040518082815260200191505060405180910390f35b34610000576103816004808035906020019091905050610f78565b6040518082815260200191505060405180910390f35b61039f61100b565b15156103aa57610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600760008460001916815260200190815260200160002054141590505b919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561053f57610000565b61054881610826565b1580610559575061055881610454565b5b1561056357610000565b600654600760008360001916815260200190815260200160002081905550600373__DLinked_______________________________63b3dad4c89091600654600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050806008600060065481526020019081526020016000208190555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196006546040518082815260200191505060405180910390a26006600081548092919060010191905055505b5b50565b6000600373__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b90565b600061070f61100b565b151561071a57610000565b600860008381526020019081526020016000205490506007600082600019168152602001908152602001600020600090556008600083815260200190815260200160002060009055600373__DLinked_______________________________630e8478db909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190602001505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b60006000600090505b602060ff168160ff161015610bd45760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614156108c057610bd4565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610ab8575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610a36575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610ab75750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610bb8575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610bb75750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610000571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610bc65760009150610bde565b5b808060010191505061082f565b60038160ff161191505b50919050565b600060076000836000191681526020019081526020016000205490505b919050565b610c0e61100b565b1515610c1957610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610ccb61100b565b1515610cd657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600373__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b90565b6000600373__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b90565b6000600860008381526020019081526020016000205490505b919050565b610e7261100b565b1515610e7d57610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600373__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b6000600373__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561107057600190506111ea566111e9565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156110be57600090506111ea566111e8565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015090506111ea565b5b5b9056'
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
        'bytecode': '6060604052655af3107a400060035566038d7ea4c680006004555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b611cf7806100cf6000396000f36060604052361561010a576000357c0100000000000000000000000000000000000000000000000000000000900480630737007e1461010f5780630e1af57b1461012c57806313af40351461015d5780631937c2611461017a5780633129aa0d146101ab57806336d8c30a146101e5578063551b5dcc146102165780635f6b9f7d146102475780637a9e5e4b146102785780637f19abe01461029557806383197ef0146102b25780638da5cb5b146102c1578063a1769ae2146102fa578063a85ebabe14610334578063a91ee0dc14610355578063ad3bc60614610372578063b42775b5146103cc578063bf7e214f146103ed578063ddf0431014610426578063f1e0510e14610463575b610000565b346100005761012a6004808035906020019091905050610480565b005b346100005761014760048080359060200190919050506104d5565b6040518082815260200191505060405180910390f35b346100005761017860048080359060200190919050506104f6565b005b346100005761019560048080359060200190919050506105b3565b6040518082815260200191505060405180910390f35b34610000576101cf6004808035906020019091908035906020019091905050610652565b6040518082815260200191505060405180910390f35b346100005761020060048080359060200190919050506106fa565b6040518082815260200191505060405180910390f35b34610000576102316004808035906020019091905050610713565b6040518082815260200191505060405180910390f35b346100005761026260048080359060200190919050506107b2565b6040518082815260200191505060405180910390f35b34610000576102936004808035906020019091905050610851565b005b34610000576102b0600480803590602001909190505061090e565b005b34610000576102bf610963565b005b34610000576102ce6109b4565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761031e60048080359060200190919080359060200190919050506109da565b6040518082815260200191505060405180910390f35b6103536004808035906020019091908035906020019091905050610a82565b005b34610000576103706004808035906020019091905050611229565b005b3461000057610396600480803590602001909190803590602001909190505061127e565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018260000b81526020019250505060405180910390f35b6103eb6004808035906020019091908035906020019091905050611321565b005b34610000576103fa611a44565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100005761044a6004808035906020019091908035906020019091905050611a6a565b604051808260000b815260200191505060405180910390f35b346100005761047e6004808035906020019091905050611ac0565b005b610488611b15565b151561049357610000565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600860008381526020019081526020016000206000015490505b919050565b6104fe611b15565b151561050957610000565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006008600083815260200190815260200160002060040173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b60006008600084815260200190815260200160002060040173__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b92915050565b60006003546002830a60ff16600454020190505b919050565b60006008600083815260200190815260200160002060040173__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b60006008600083815260200190815260200160002060040173__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b919050565b610859611b15565b151561086457610000565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610916611b15565b151561092157610000565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b61096b611b15565b151561097657610000565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006008600084815260200190815260200160002060040173__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015090505b92915050565b60006000600060008560018160ff161080610aa05750600a8160ff16115b15610aaa57610000565b34610ab4826106fa565b1115610abf57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001501515610b8457610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509450600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a571899387600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015093506002870a60ff16600454029250600860008781526020019081526020016000206001016000815480929190600101919050555060006008600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580610e18575043600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b2888600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150105b15610e2257610000565b866008600088815260200190815260200160002060020160008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508660ff1660086000888152602001908152602001600020600001600082825401925050819055506008600087815260200190815260200160002060040173__DLinked_______________________________63b3dad4c89091600860008a815260200190815260200160002060010154600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f41561000057505050604051805190602001505084600860008881526020019081526020016000206003016000600860008a815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050151561103057610000565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051809050600060405180830381858888f19350505050151561109757610000565b60035483019150348210156110ec573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f1935050505015156110eb57610000565b5b6008600087815260200190815260200160002060040173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860008b815260200190815260200160002060020160008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b50505050505050565b611231611b15565b151561123c57610000565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060086000858152602001908152602001600020600301600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506008600085815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b9250929050565b6000600060008460018160ff16108061133d5750600a8160ff16115b1561134757610000565b34611351826106fa565b111561135c57610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150151561142157610000565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100005760325a03f115610000575050506040518051906020015093506002860a60ff16600454029250600860008681526020019081526020016000206001016000815480929190600101919050555060006008600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b14158061160f575043600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663868e5b2887600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100005760325a03f1156100005750505060405180519060200150105b1561161957610000565b856000036008600087815260200190815260200160002060020160008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508560ff1660086000878152602001908152602001600020600001600082825403925050819055506008600086815260200190815260200160002060040173__DLinked_______________________________63b3dad4c890916008600089815260200190815260200160002060010154600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100005760325a03f415610000575050506040518051906020015050836008600087815260200190815260200160002060030160006008600089815260200190815260200160002060010154815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050151561184c57610000565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051809050600060405180830381858888f1935050505015156118b357610000565b6003548301915034821015611908573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f19350505050151561190757610000565b5b6008600086815260200190815260200160002060040173__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100005760325a03f4156100005750505060405180519060200150858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860008a815260200190815260200160002060020160008973ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b505050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006008600084815260200190815260200160002060020160008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b90505b92915050565b611ac8611b15565b1515611ad357610000565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611b7a5760019050611cf456611cf3565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611bc85760009050611cf456611cf2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100005760325a03f11561000057505050604051805190602001509050611cf4565b5b5b9056'
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
