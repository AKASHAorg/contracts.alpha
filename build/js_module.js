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
        'bytecode': '606060405261024f806100126000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063e33b870714610047578063e81cf24c1461006457610042565b610002565b3461000257610062600480803590602001909190505061008a565b005b346100025761008860048080359060200190919080359060200190919050506100fb565b005b600060005080548060010182818154818355818115116100dc578183600052602060002091820191016100db91906100bd565b808211156100d757600081815060009055506001016100bd565b5090565b5b5050509190906000526020600020900160005b83909190915055505b50565b6000600060005073__Search________________________________6324fef5c8909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561022557600060005080548060010182818154818355818115116102055781836000526020600020918201910161020491906101e6565b8082111561020057600081815060009055506001016101e6565b5090565b5b5050509190906000526020600020900160005b8490919091505550610249565b81600060005082815481101561000257906000526020600020900160005b50819055505b5b50505056'
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
        'bytecode': '606060405260e78060106000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480636985e724146039576035565b6002565b3460025760df6004808035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505060e1565b005b5b50505056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611651806100b96000396000f3606060405236156100d7576000357c010000000000000000000000000000000000000000000000000000000090048063044b4a2a146100dc57806313af40351461010d578063279bc3aa1461012a57806348892753146101475780634c9b78da146101d057806371aa5a66146102015780637a9e5e4b1461025557806383197ef0146102725780638da5cb5b14610286578063a71eb6a1146102c4578063a91ee0dc146102ea578063bf7e214f14610307578063c407afe714610345578063e616d76f14610376578063f6aaa867146103b0576100d7565b610002565b34610002576100f760048080359060200190919050506103ea565b6040518082815260200191505060405180910390f35b34610002576101286004808035906020019091905050610496565b005b34610002576101456004808035906020019091905050610553565b005b346100025761016b60048080359060200190919080359060200190919050506105a8565b604051808673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001836002602002808383829060006004602084601f0104600302600f01f15090500182151581526020019550505050505060405180910390f35b34610002576101eb600480803590602001909190505061077b565b6040518082815260200191505060405180910390f35b3461000257610253600480803590602001909190806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019091905050610827565b005b34610002576102706004808035906020019091905050610e1e565b005b34610002576102846004805050610edb565b005b34610002576102986004805050610f2c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102e86004808035906020019091908035906020019091905050610f52565b005b346100025761030560048080359060200190919050506111de565b005b34610002576103196004805050611233565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103606004808035906020019091905050611259565b6040518082815260200191505060405180910390f35b346100025761039a6004808035906020019091908035906020019091905050611305565b6040518082815260200191505060405180910390f35b34610002576103d460048080359060200190919080359060200190919050506113ba565b6040518082815260200191505060405180910390f35b60006004600050600083815260200190815260200160002060005060010160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610491565b919050565b61049e61146f565b15156104a957610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b61055b61146f565b151561056657610002565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060006040604051908101604052806002905b60008152602001906001900390816105be57905050600060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16945084506004600050600088815260200190815260200160002060005060040160005060008781526020019081526020016000206000506001016000505493508350600460005060008881526020019081526020016000206000506004016000506000878152602001908152602001600020600050600001600050549250825060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060020160005060028060200260405190810160405280929190826002801561071f576020028201915b816000505481526020019060010190808311610708575b50505050509150815060046000506000888152602001908152602001600020600050600401600050600087815260200190815260200160002060005060040160149054906101000a900460ff16905080505b9295509295909350565b60006004600050600083815260200190815260200160002060005060010160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610822565b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156108ee57610002565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16635280692985600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561099d57610002565b60046000506000858152602001908152602001600020600050600001600081815054809291906001019190505550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050806004600050600086815260200190815260200160002060005060040160005060006004600050600088815260200190815260200160002060005060000160005054815260200190815260200160002060005060040160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550826004600050600086815260200190815260200160002060005060040160005060006004600050600088815260200190815260200160002060005060000160005054815260200190815260200160002060005060020160005090600282600290908101928215610ba7579160200282015b82811115610ba6578251826000505591602001919060010190610b88565b5b509050610bd29190610bb4565b80821115610bce5760008181506000905550600101610bb4565b5090565b50506004600050600085815260200190815260200160002060005060000160005054600460005060008681526020019081526020016000206000506004016000506000600460005060008881526020019081526020016000206000506000016000505481526020019081526020016000206000506001016000508190555060008214158015610c7f5750600460005060008581526020019081526020016000206000506000016000505482105b15610ce2578160046000506000868152602001908152602001600020600050600401600050600060046000506000888152602001908152602001600020600050600001600050548152602001908152602001600020600050600001600050819055505b6004600050600085815260200190815260200160002060005060010160005073__DLinked_______________________________63b3dad4c890916004600050600088815260200190815260200160002060005060000160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508073ffffffffffffffffffffffffffffffffffffffff16847f6d9b1121ffae306e11d410fed962958e1c4d4cb5a349bbb3fe2fe1e62a6e49d960046000506000888152602001908152602001600020600050600001600050546040518082815260200191505060405180910390a35b5b50505050565b610e2661146f565b1515610e3157610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610ee361146f565b1515610eee57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561101957610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff1660046000506000858152602001908152602001600020600050600401600050600084815260200190815260200160002060005060040160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561116557610002565b600160046000506000858152602001908152602001600020600050600401600050600084815260200190815260200160002060005060040160146101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055505b5b505050565b6111e661146f565b15156111f157610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006004600050600083815260200190815260200160002060005060010160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611300565b919050565b60006004600050600084815260200190815260200160002060005060010160005073__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506113b4565b92915050565b60006004600050600084815260200190815260200160002060005060010160005073__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611469565b92915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156114d4576001905061164e5661164d565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611522576000905061164e5661164c565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150905061164e565b5b5b9056'
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
        'bytecode': '6060604052610594806100126000396000f36504044633f3de5060606040523615610092576000357c0100000000000000000000000000000000000000000000000000000000900480630e8478db146100975780633e552821146100ce57806348eb81eb1461010357806370da6fe61461013857806391c0ab63146101645780639f58851f14610190578063b3dad4c8146101c7578063d6867e87146101fe57610092565b610007565b6100b6600480803590602001909190803590602001909190505061022a565b60405180821515815260200191505060405180910390f35b6100ed6004808035906020019091908035906020019091905050610351565b6040518082815260200191505060405180910390f35b610122600480803590602001909190803590602001909190505061037c565b6040518082815260200191505060405180910390f35b61014e60048080359060200190919050506103a7565b6040518082815260200191505060405180910390f35b61017a60048080359060200190919050506103d2565b6040518082815260200191505060405180910390f35b6101af60048080359060200190919080359060200190919050506103e8565b60405180821515815260200191505060405180910390f35b6101e66004808035906020019091908035906020019091905050610472565b60405180821515815260200191505060405180910390f35b6102146004808035906020019091905050610569565b6040518082815260200191505060405180910390f35b600061023683836103e8565b156103435760019050805082600101600050600083815260200190815260200160002060005054836001016000506000856002016000506000868152602001908152602001600020600050548152602001908152602001600020600050819055508260020160005060008381526020019081526020016000206000505483600201600050600085600101600050600086815260200190815260200160002060005054815260200190815260200160002060005081905550826002016000506000838152602001908152602001600020600050600090558260010160005060008381526020019081526020016000206000506000905582600001600081815054809291906001900391905055505b80905061034b565b92915050565b6000826001016000506000838152602001908152602001600020600050549050610376565b92915050565b60008260020160005060008381526020019081526020016000206000505490506103a1565b92915050565b6000816001016000506000600081526020019081526020016000206000505490506103cd565b919050565b6000816000016000505490506103e3565b919050565b600060008214156103f857610007565b60008360020160005060008481526020019081526020016000206000505414158061043f575060008360010160005060008481526020019081526020016000206000505414155b806104655750818360010160005060006000815260200190815260200160002060005054145b905061046c565b92915050565b600061047e83836103e8565b151561055b57600190508050818360020160005060008560010160005060006000815260200190815260200160002060005054815260200190815260200160002060005081905550826001016000506000600081526020019081526020016000206000505483600101600050600084815260200190815260200160002060005081905550600083600201600050600084815260200190815260200160002060005081905550818360010160005060006000815260200190815260200160002060005081905550826000016000818150548092919060010191905055505b809050610563565b92915050565b60008160020160005060006000815260200190815260200160002060005054905061058f565b91905056'
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
        'bytecode': '60606040525b60005b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b60405161026180610156833901809050604051809103906000f080156100025790507fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c38160405180807f63630000000000000000000000000000000000000000000000000000000000008152602001506020018273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b50610187806103b76000396000f3606060405261024f806100126000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063e33b870714610047578063e81cf24c1461006457610042565b610002565b3461000257610062600480803590602001909190505061008a565b005b346100025761008860048080359060200190919080359060200190919050506100fb565b005b600060005080548060010182818154818355818115116100dc578183600052602060002091820191016100db91906100bd565b808211156100d757600081815060009055506001016100bd565b5090565b5b5050509190906000526020600020900160005b83909190915055505b50565b6000600060005073__Search________________________________6324fef5c8909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81141561022557600060005080548060010182818154818355818115116102055781836000526020600020918201910161020491906101e6565b8082111561020057600081815060009055506001016101e6565b5090565b5b5050509190906000526020600020900160005b8490919091505550610249565b81600060005082815481101561000257906000526020600020900160005b50819055505b5b5050505660606040523615610053576000357c0100000000000000000000000000000000000000000000000000000000900480635067a4bd146100615780639fc288d114610087578063d900596c1461009b57610053565b346100025761005f5b5b565b005b346100025761008560048080359060200190919080359060200190919050506100af565b005b3461000257610099600480505061010d565b005b34610002576100ad600480505061014a565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c3828260405180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600160405180821515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600060405180821515815260200191505060405180910390a15b56'
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
        'bytecode': '606060405260016008600050556107d06009600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b612df0806100ca6000396000f36060604052361561013a576000357c0100000000000000000000000000000000000000000000000000000000900480630147966a1461013f57806305748bb81461017057806313af4035146101a15780631a1f2a91146101be5780633b003816146101f85780633d89b81214610229578063507d9c2b1461025a578063515c44a51461029457806352806929146102b15780635f8534ae146102e45780637a9e5e4b146103015780637abd59581461031e5780637b965fa1146103a45780637d026a1c146103d557806383197ef01461042057806389efbd09146104345780638da5cb5b1461046e578063a5718993146104ac578063a91ee0dc146104f3578063bae78d7b14610510578063bf7e214f14610580578063de2ddc3e146105be578063e0519081146105f8578063e24dd4c41461062b5761013a565b610002565b346100025761015a600480803590602001909190505061065c565b6040518082815260200191505060405180910390f35b346100025761018b60048080359060200190919050506107cb565b6040518082815260200191505060405180910390f35b34610002576101bc600480803590602001909190505061093a565b005b34610002576101e260048080359060200190919080359060200190919050506109f7565b6040518082815260200191505060405180910390f35b34610002576102136004808035906020019091905050610b59565b6040518082815260200191505060405180910390f35b34610002576102446004808035906020019091905050610cc8565b6040518082815260200191505060405180910390f35b346100025761027e6004808035906020019091908035906020019091905050610e21565b6040518082815260200191505060405180910390f35b34610002576102af6004808035906020019091905050610f83565b005b34610002576102cc6004808035906020019091905050610fd8565b60405180821515815260200191505060405180910390f35b34610002576102ff600480803590602001909190505061100a565b005b346100025761031c60048080359060200190919050506113b3565b005b34610002576103a26004808060400190600280602002604051908101604052809291908260026020028082843782019150505050509090919080359060200190820180359060200191919080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050909091905050611470565b005b34610002576103bf6004808035906020019091905050611b2b565b6040518082815260200191505060405180910390f35b346100025761041e600480806040019060028060200260405190810160405280929190826002602002808284378201915050505050909091908035906020019091905050611c84565b005b34610002576104326004805050611f1c565b005b34610002576104586004808035906020019091908035906020019091905050611f6d565b6040518082815260200191505060405180910390f35b346100025761048060048050506120e5565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576104c7600480803590602001909190505061210b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761050e600480803590602001909190505061214e565b005b346100025761052b60048080359060200190919050506121a3565b604051808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001826002602002808383829060006004602084601f0104600302600f01f150905001935050505060405180910390f35b3461000257610592600480505061229b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576105e260048080359060200190919080359060200190919050506122c1565b6040518082815260200191505060405180910390f35b34610002576106136004808035906020019091905050612439565b60405180821515815260200191505060405180910390f35b34610002576106466004808035906020019091905050612470565b6040518082815260200191505060405180910390f35b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015091506107c5565b50919050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610934565b50919050565b6109426125c9565b151561094d57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506006600050600082815260200190815260200160002060005060000160005073__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610b52565b5092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610cc2565b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506006600050600082815260200190815260200160002060005060000160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610e1b565b50919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506006600050600082815260200190815260200160002060005060000160005073__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610f7c565b5092915050565b610f8b6125c9565b1515610f9657610002565b80600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b60006000600460005060008481526020019081526020016000206000506002016000505414159050611005565b919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156110d157610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________639f58851f909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150151561125457610002565b61125d82612439565b1561126757610002565b600073ffffffffffffffffffffffffffffffffffffffff166005600050600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156112d757610002565b6005600050600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166383197ef0604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050600060405180830381600087803b156100025760325a03f115610002575050506005600050600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b5050565b6113bb6125c9565b15156113c657610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561153b57610002565b60008451148061154c5750600a8451115b1561155657610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250604051610645806127ab833901809050604051809103906000f0801561000257915060606040519081016040528086815260200143815260200184815260200150600460005060006008600050548152602001908152602001600020600050600082015181600001600050906002826002909081019282156116b4579160200282015b828111156116b3578251826000505591602001919060010190611695565b5b5090506116df91906116c1565b808211156116db57600081815060009055506001016116c1565b5090565b50506020820151816002016000505560408201518160030160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055509050508160056000506000600860005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600090505b83518160ff161015611a4c57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166338a699a4858360ff1681518110156100025790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561186557610002565b60066000506000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab878560ff1681518110156100025790602001906020020151600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150815260200190815260200160002060005060000160005073__DLinked_______________________________63b3dad4c89091600860005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050838160ff1681518110156100025790602001906020020151600019168373ffffffffffffffffffffffffffffffffffffffff167f7fcaa0f51070c8ef93d2e2f27824f416710b1e0c7924b462b11b44dd3275d83b6008600050546040518082815260200191505060405180910390a35b808060010191505061178f565b600760005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________63b3dad4c89091600860005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505060086000818150548092919060010191905055505b5b5050505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506006600050600082815260200190815260200160002060005060000160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150611c7e565b50919050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515611d4b57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090508073ffffffffffffffffffffffffffffffffffffffff166004600050600084815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515611e7d57610002565b611e8682612439565b1515611e9157610002565b826004600050600084815260200190815260200160002060005060000160005090600282600290908101928215611ee8579160200282015b82811115611ee7578251826000505591602001919060010190611ec9565b5b509050611f139190611ef5565b80821115611f0f5760008181506000905550600101611ef5565b5090565b50505b5b505050565b611f246125c9565b1515611f2f57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015091506120de565b5092915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005600050600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080505b919050565b6121566125c9565b151561216157610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060006040604051908101604052806002905b60008152602001906001900390816121b7579050506004600050600085815260200190815260200160002060005060020160005054925082506004600050600085815260200190815260200160002060005060030160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915081506004600050600085815260200190815260200160002060005060000160005060028060200260405190810160405280929190826002801561228a576020028201915b816000505481526020019060010190808311612273575b5050505050905080505b9193909250565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600760005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150612432565b5092915050565b60004360096000505460046000506000858152602001908152602001600020600050600201600050540110905061246b565b919050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506006600050600082815260200190815260200160002060005060000160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015091506125c3565b50919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561262e57600190506127a8566127a7565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561267c57600090506127a8566127a6565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015090506127a8565b5b5b905660606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b61058c806100b96000396000f360606040523615610073576000357c010000000000000000000000000000000000000000000000000000000090048062f55d9d1461007c57806313af4035146100995780637a9e5e4b146100b657806383197ef0146100d35780638da5cb5b146100e7578063bf7e214f1461012557610073565b61007a5b5b565b005b34610002576100976004808035906020019091905050610163565b005b34610002576100b46004808035906020019091905050610193565b005b34610002576100d16004808035906020019091905050610250565b005b34610002576100e5600480505061030d565b005b34610002576100f9600480505061035e565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576101376004805050610384565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61016b6103aa565b151561017657610002565b8073ffffffffffffffffffffffffffffffffffffffff16ff5b5b50565b61019b6103aa565b15156101a657610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b6102586103aa565b151561026357610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b6103156103aa565b151561032057610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561040f576001905061058956610588565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561045d576000905061058956610587565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050610589565b5b5b9056'
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
        'bytecode': '60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b613c2c806100b96000396000f360606040523615610187576000357c0100000000000000000000000000000000000000000000000000000000900480630a7ed48a1461018c57806313af4035146101bd578063140eccef146101da5780631c9be5f41461022a5780632faf44f61461025b578063624d47fc1461028e5780636b40adb2146102bf5780636e1d7eab146102f95780637329d4b014610333578063739453e31461036d5780637775ec3a1461038a5780637a1fa187146103bb5780637a9e5e4b146103f55780637c32db101461041257806383197ef0146104435780638a3ace18146104575780638da5cb5b14610493578063a66b7748146104d1578063a91ee0dc146104ee578063b776ff6b1461050b578063baba90cf14610547578063bd10e57c1461057a578063bd95db11146105ab578063bf7e214f146105c8578063cb5356ec14610606578063d83bc5c514610640578063da72f92b14610671578063ea7ca08f146106ad578063f91427f4146106de578063fdb5c2d814610718578063ffe466c91461074957610187565b610002565b34610002576101a76004808035906020019091905050610799565b6040518082815260200191505060405180910390f35b34610002576101d86004808035906020019091905050610908565b005b34610002576101fe60048080359060200190919080359060200190919050506109c5565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102456004808035906020019091905050610aee565b6040518082815260200191505060405180910390f35b34610002576102766004808035906020019091905050610c63565b60405180821515815260200191505060405180910390f35b34610002576102a96004808035906020019091905050610fab565b6040518082815260200191505060405180910390f35b34610002576102e36004808035906020019091908035906020019091905050611120565b6040518082815260200191505060405180910390f35b346100025761031d600480803590602001909190803590602001909190505061129e565b6040518082815260200191505060405180910390f35b3461000257610357600480803590602001909190803590602001909190505061141c565b6040518082815260200191505060405180910390f35b34610002576103886004808035906020019091905050611594565b005b34610002576103a56004808035906020019091905050611a9e565b6040518082815260200191505060405180910390f35b34610002576103df6004808035906020019091908035906020019091905050611c13565b6040518082815260200191505060405180910390f35b34610002576104106004808035906020019091905050611d91565b005b346100025761042d6004808035906020019091905050611e4e565b6040518082815260200191505060405180910390f35b34610002576104556004805050611fc3565b005b346100025761047b6004808035906020019091908035906020019091905050612014565b60405180821515815260200191505060405180910390f35b34610002576104a560048050506121e7565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576104ec600480803590602001909190505061220d565b005b3461000257610509600480803590602001909190505061289f565b005b346100025761052f60048080359060200190919080359060200190919050506128f4565b60405180821515815260200191505060405180910390f35b34610002576105626004808035906020019091905050612b19565b60405180821515815260200191505060405180910390f35b34610002576105956004808035906020019091905050612e15565b6040518082815260200191505060405180910390f35b34610002576105c66004808035906020019091905050612f8a565b005b34610002576105da6004805050612fdf565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761062a6004808035906020019091908035906020019091905050613005565b6040518082815260200191505060405180910390f35b346100025761065b600480803590602001909190505061317d565b6040518082815260200191505060405180910390f35b346100025761069560048080359060200190919080359060200190919050506132f2565b60405180821515815260200191505060405180910390f35b34610002576106c860048080359060200190919050506134c5565b6040518082815260200191505060405180910390f35b34610002576107026004808035906020019091908035906020019091905050613634565b6040518082815260200191505060405180910390f35b346100025761073360048080359060200190919050506137b2565b6040518082815260200191505060405180910390f35b346100025761076d6004808035906020019091908035906020019091905050613921565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150610902565b50919050565b610910613a4a565b151561091b57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905080600101600050600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250610ae6565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250610c5c565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515610d2e57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________63b3dad4c8909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150925082508215610fa2578173ffffffffffffffffffffffffffffffffffffffff16817f1dd3c6bbd98f0e8289d22fc98f1c6c67a8f85ca3be88f5cd947bd79cdc4695c160405180905060405180910390a35b5b5b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611119565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________633e552821909186600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611296565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6348eb81eb909186600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611414565b505092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6348eb81eb909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150915061158d565b5092915050565b600060006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561166557610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c88600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600360005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005093508360000160005060008773ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505492508360020160005073__DLinked_______________________________630e8478db909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508360000160005060008773ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000905583600101600050600084815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600460005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005091508160000160005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000505490508160020160005073__DLinked_______________________________630e8478db909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508160000160005060008673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506000905581600101600050600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690555b5b50505050505050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611c0c565b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________633e552821909186600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611d89565b505092915050565b611d99613a4a565b1515611da457610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250611fbc565b5050919050565b611fcb613a4a565b1515611fd657610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c87600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905060008160000160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141593506121de565b50505092915050565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060006000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015015156122de57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c88600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509550600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff16141561247e57610002565b600360005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005093508360020160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092508280600101935050828460000160005060008873ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508584600101600050600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508360020160005073__DLinked_______________________________63b3dad4c8909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150508573ffffffffffffffffffffffffffffffffffffffff167fbccc71dc7842b86291138666aa18e133ee6d41aa71e6d7c650debad1a057663586604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a2600460005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005091508160020160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090508080600101915050808260000160005060008773ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055508482600101600050600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508160020160005073__DLinked_______________________________63b3dad4c8909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150505b5b50505050505050565b6128a7613a4a565b15156128b257610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________639f58851f909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250612b11565b505092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515612be457610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d74e7ab85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________630e8478db909183600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250612e0d565b5b5050919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509250612f83565b5050919050565b612f92613a4a565b1515612f9d57610002565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________633e552821909185600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509150613176565b5092915050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c85600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092506132eb565b5050919050565b6000600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509250600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c87600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905060008160000160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054141593506134bc565b50505092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150915061362e565b50919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600460005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005090508060020160005073__DLinked_______________________________6348eb81eb909186600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015092506137aa565b505092915050565b60006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c84600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050600560005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150915061391b565b50919050565b600060006000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663bb34534c86600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082600019168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509150600360005060008373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050905080600101600050600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169250613a42565b505092915050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415613aaf5760019050613c2956613c28565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415613afd5760009050613c2956613c27565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050613c29565b5b5b9056'
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
        'bytecode': '606060405260dd8060106000396000f360606040526000357c010000000000000000000000000000000000000000000000000000000090048063bd6de11c146039576035565b6002565b3460025760d66004808035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091908035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505060d8565b005b5b505056'
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
        'bytecode': '60606040525b5b5b727202eeaad2c871c74c094231d1a4d28028321b600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c0100000000000000000000000090810204021790555073127202eeaad2c871c74c094231d1a4d28028321b600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b610187806100b76000396000f360606040523615610053576000357c0100000000000000000000000000000000000000000000000000000000900480635067a4bd146100615780639fc288d114610087578063d900596c1461009b57610053565b346100025761005f5b5b565b005b346100025761008560048080359060200190919080359060200190919050506100af565b005b3461000257610099600480505061010d565b005b34610002576100ad600480505061014a565b005b7fdeb8643b9b3399f6925a9b6f1f780d90946f75267aaab1d59685d28dd846b9c3828260405180836000191681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600160405180821515815260200191505060405180910390a15b565b7fe68392b8656cb7ab571c539efc7ce5a43464478a591f773a55db9984c089f4d1600060405180821515815260200191505060405180910390a15b56'
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
        'bytecode': '606060405260ea8060106000396000f36504044633f3de5060606040526000357c01000000000000000000000000000000000000000000000000000000009004806324fef5c814604157603d565b6007565b605e60048080359060200190919080359060200190919050506074565b6040518082815260200191505060405180910390f35b60006000600090505b838054905081101560bc578284828154811015600757906000526020600020900160005b5054141560af5780915060e3565b5b8080600101915050607d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff915060e3565b509291505056'
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
        'bytecode': '606060405260b48060106000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360cfa963146039576035565b6002565b34600257608f6004808035906020019082018035906020019191908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505090909190505060a5565b6040518082815260200191505060405180910390f35b6000600b905060af565b91905056'
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
        'bytecode': '606060405260016006600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611288806100c16000396000f3606060405236156100ed576000357c01000000000000000000000000000000000000000000000000000000009004806313af4035146100f257806338a699a41461010f578063446bffba146101425780634bbff4a71461015f5780634cc82215146101875780636b4316db146101a45780636d74e7ab146101d75780637a9e5e4b1461020857806383197ef0146102255780638da5cb5b1461023957806392aaa79714610277578063986f191c1461029f578063a1b1daee146102c7578063a91ee0dc146102fc578063bf7e214f14610319578063ee564eb914610357578063ee84fbce14610388576100ed565b610002565b346100025761010d60048080359060200190919050506103b9565b005b346100025761012a6004808035906020019091905050610476565b60405180821515815260200191505060405180910390f35b346100025761015d60048080359060200190919050506104a6565b005b346100025761017160048050506106c5565b6040518082815260200191505060405180910390f35b34610002576101a26004808035906020019091905050610755565b005b34610002576101bf600480803590602001909190505061088b565b60405180821515815260200191505060405180910390f35b34610002576101f26004808035906020019091905050610c4f565b6040518082815260200191505060405180910390f35b34610002576102236004808035906020019091905050610c7b565b005b34610002576102376004805050610d38565b005b346100025761024b6004805050610d89565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576102896004805050610daf565b6040518082815260200191505060405180910390f35b34610002576102b16004805050610e3f565b6040518082815260200191505060405180910390f35b34610002576102e26004808035906020019091905050610ecf565b604051808260001916815260200191505060405180910390f35b34610002576103176004808035906020019091905050610ef7565b005b346100025761032b6004805050610f4c565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576103726004808035906020019091905050610f72565b6040518082815260200191505060405180910390f35b34610002576103a3600480803590602001909190505061100c565b6040518082815260200191505060405180910390f35b6103c16110a6565b15156103cc57610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006000600760005060008460001916815260200190815260200160002060005054141590506104a1565b919050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561056b57610002565b6105748161088b565b1580610585575061058481610476565b5b1561058f57610002565b600660005054600760005060008360001916815260200190815260200160002060005081905550600360005073__DLinked_______________________________63b3dad4c89091600660005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050806008600050600060066000505481526020019081526020016000206000508190555080600019167f3a584392826157d54b95aec346c6aee7ce99a189482cebf94332a6f92eaf56196006600050546040518082815260200191505060405180910390a260066000818150548092919060010191905055505b5b50565b6000600360005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610752565b90565b600061075f6110a6565b151561076a57610002565b600860005060008381526020019081526020016000206000505490506007600050600082600019168152602001908152602001600020600050600090556008600050600083815260200190815260200160002060005060009055600360005073__DLinked_______________________________630e8478db909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505080600019167fa56fb2a6d4126f324526f0668c53927c0cd8e08f41ba0fe0f2d6090a84bc75c860405180905060405180910390a25b5b5050565b60006000600090505b8250602060ff168160ff161015610c3b5760007f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141561092757610c3b565b607a7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161180610b1f575060617f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610a9d575060397f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916115b8015610b1e5750605f7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b80610c1f575060307f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916108015610c1e5750602d7f010000000000000000000000000000000000000000000000000000000000000002838260ff166020811015610002571a7f0100000000000000000000000000000000000000000000000000000000000000027effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b5b15610c2d5760009150610c49565b5b8080600101915050610894565b60038160ff16119150610c49565b50919050565b60006007600050600083600019168152602001908152602001600020600050549050610c76565b919050565b610c836110a6565b1515610c8e57610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610d406110a6565b1515610d4b57610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610e3c565b90565b6000600360005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610ecc565b90565b600060086000506000838152602001908152602001600020600050549050610ef2565b919050565b610eff6110a6565b1515610f0a57610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360005073__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050611007565b919050565b6000600360005073__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506110a1565b919050565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561110b576001905061128556611284565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611159576000905061128556611283565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050611285565b5b5b9056'
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
        'bytecode': '6060604052655af3107a400060036000505566038d7ea4c680006004600050555b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b611e7c806100d46000396000f36060604052361561010e576000357c0100000000000000000000000000000000000000000000000000000000900480630737007e146101135780630e1af57b1461013057806313af4035146101615780631937c2611461017e5780633129aa0d146101af57806336d8c30a146101e9578063551b5dcc1461021a5780635f6b9f7d1461024b5780637a9e5e4b1461027c5780637f19abe01461029957806383197ef0146102b65780638da5cb5b146102ca578063a1769ae214610308578063a85ebabe14610342578063a91ee0dc14610363578063ad3bc60614610380578063b42775b5146103da578063bf7e214f146103fb578063ddf0431014610439578063f1e0510e146104765761010e565b610002565b346100025761012e6004808035906020019091905050610493565b005b346100025761014b60048080359060200190919050506104e8565b6040518082815260200191505060405180910390f35b346100025761017c6004808035906020019091905050610516565b005b346100025761019960048080359060200190919050506105d3565b6040518082815260200191505060405180910390f35b34610002576101d3600480803590602001909190803590602001909190505061067f565b6040518082815260200191505060405180910390f35b34610002576102046004808035906020019091905050610734565b6040518082815260200191505060405180910390f35b34610002576102356004808035906020019091905050610757565b6040518082815260200191505060405180910390f35b34610002576102666004808035906020019091905050610803565b6040518082815260200191505060405180910390f35b346100025761029760048080359060200190919050506108af565b005b34610002576102b4600480803590602001909190505061096c565b005b34610002576102c860048050506109c1565b005b34610002576102dc6004805050610a12565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761032c6004808035906020019091908035906020019091905050610a38565b6040518082815260200191505060405180910390f35b6103616004808035906020019091908035906020019091905050610aed565b005b346100025761037e600480803590602001909190505061132b565b005b34610002576103a46004808035906020019091908035906020019091905050611380565b604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018260000b81526020019250505060405180910390f35b6103f96004808035906020019091908035906020019091905050611439565b005b346100025761040d6004805050611bbc565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b346100025761045d6004808035906020019091908035906020019091905050611be2565b604051808260000b815260200191505060405180910390f35b34610002576104916004808035906020019091905050611c45565b005b61049b611c9a565b15156104a657610002565b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b600060086000506000838152602001908152602001600020600050600001600050549050610511565b919050565b61051e611c9a565b151561052957610002565b80600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f4adb0d054d6e87bfe1386b27cc28f79f9f9df98b2bccd56891acda56b342f92960405180905060405180910390a25b5b50565b60006008600050600083815260200190815260200160002060005060040160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061067a565b919050565b60006008600050600084815260200190815260200160002060005060040160005073__DLinked_______________________________633e552821909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150905061072e565b92915050565b60006003600050546002830a60ff1660046000505402019050610752565b919050565b60006008600050600083815260200190815260200160002060005060040160005073__DLinked_______________________________63d6867e879091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506107fe565b919050565b60006008600050600083815260200190815260200160002060005060040160005073__DLinked_______________________________6370da6fe69091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015090506108aa565b919050565b6108b7611c9a565b15156108c257610002565b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f35cedca97da6b22f40f8f660aab44c185bb73a3df4c5bd4d909bf83da04d19a560405180905060405180910390a25b5b50565b610974611c9a565b151561097f57610002565b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6109c9611c9a565b15156109d457610002565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006008600050600084815260200190815260200160002060005060040160005073__DLinked_______________________________6348eb81eb909184600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001509050610ae7565b92915050565b60006000600060008560018160ff161080610b0b5750600a8160ff16115b15610b1557610002565b34610b1f82610734565b1115610b2a57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001501515610bef57610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509450600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a571899387600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015093506002870a60ff166004600050540292506008600050600087815260200190815260200160002060005060010160008181505480929190600101919050555060006008600050600088815260200190815260200160002060005060020160005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b141580610e215750600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16145b80610ecd5750600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e051908187600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150155b15610ed757610002565b866008600050600088815260200190815260200160002060005060020160005060008773ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508660ff16600860005060008881526020019081526020016000206000506000016000828282505401925050819055506008600050600087815260200190815260200160002060005060040160005073__DLinked_______________________________63b3dad4c89091600860005060008a815260200190815260200160002060005060010160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f41561000257505050604051805190602001505084600860005060008881526020019081526020016000206000506003016000506000600860005060008a815260200190815260200160002060005060010160005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055508373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050151561111a57610002565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003600050549081150290604051809050600060405180830381858888f19350505050151561118457610002565b60036000505483019150348210156111dc573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f1935050505015156111db57610002565b5b6008600050600087815260200190815260200160002060005060040160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150868673ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860005060008b815260200190815260200160002060005060020160005060008a73ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b50505050505050565b611333611c9a565b151561133e57610002565b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060086000506000858152602001908152602001600020600050600301600050600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915081506008600050600085815260200190815260200160002060005060020160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b905080505b9250929050565b6000600060008460018160ff1610806114555750600a8160ff16115b1561145f57610002565b3461146982610734565b111561147457610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c3c5a54733600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150151561153957610002565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d5a760f533600060405160200152604051827c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015093506002860a60ff166004600050540292506008600050600086815260200190815260200160002060005060010160008181505480929190600101919050555060006008600050600087815260200190815260200160002060005060020160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b60000b14158061173a5750600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e051908186600060405160200152604051827c010000000000000000000000000000000000000000000000000000000002815260040180828152602001915050602060405180830381600087803b156100025760325a03f1156100025750505060405180519060200150155b1561174457610002565b856000036008600050600087815260200190815260200160002060005060020160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690837f01000000000000000000000000000000000000000000000000000000000000009081020402179055508560ff16600860005060008781526020019081526020016000206000506000016000828282505403925050819055506008600050600086815260200190815260200160002060005060040160005073__DLinked_______________________________63b3dad4c890916008600050600089815260200190815260200160002060005060010160005054600060405160200152604051837c0100000000000000000000000000000000000000000000000000000000028152600401808381526020018281526020019250505060206040518083038186803b156100025760325a03f415610002575050506040518051906020015050836008600050600087815260200190815260200160002060005060030160005060006008600050600089815260200190815260200160002060005060010160005054815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c01000000000000000000000000908102040217905550600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f1935050505015156119ac57610002565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003600050549081150290604051809050600060405180830381858888f193505050501515611a1657610002565b6003600050548301915034821015611a6e573373ffffffffffffffffffffffffffffffffffffffff166108fc8334039081150290604051809050600060405180830381858888f193505050501515611a6d57610002565b5b6008600050600086815260200190815260200160002060005060040160005073__DLinked_______________________________6391c0ab639091600060405160200152604051827c01000000000000000000000000000000000000000000000000000000000281526004018082815260200191505060206040518083038186803b156100025760325a03f4156100025750505060405180519060200150858573ffffffffffffffffffffffffffffffffffffffff167f04579d916b257f63e93e68e21f925e7babd0e289d1079067da689d3eefc91833600860005060008a815260200190815260200160002060005060020160005060008973ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b604051808260000b815260200191505060405180910390a45b5b5b505050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006008600050600084815260200190815260200160002060005060020160005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460000b9050611c3f565b92915050565b611c4d611c9a565b1515611c5857610002565b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690836c010000000000000000000000009081020402179055505b5b50565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611cff5760019050611e7956611e78565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611d4d5760009050611e7956611e77565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b700961333306000357fffffffff0000000000000000000000000000000000000000000000000000000016600060405160200152604051847c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff168152602001827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681526020019350505050602060405180830381600087803b156100025760325a03f11561000257505050604051805190602001509050611e79565b5b5b9056'
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
