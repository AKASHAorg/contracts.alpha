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

    var passthroughs = ['at'];
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
                'objects': {
                    'registry': {
                        'class': 'RegistryController',
                        'address': '0xd092e6baf52269121abf625f0a1a5693f65e46c7'
                    },
                    'tags': {
                        'class': 'Tags',
                        'address': '0x1170bed968f0e487932d84bfab38f51408404703'
                    },
                    'registry_store': {
                        'class': 'RegistryStore',
                        'address': '0x077c5983bfebec8fe75d7ef86311c2e9ff38609b'
                    },
                    'feed': {
                        'class': 'Feed',
                        'address': '0x818949e3f21eb2dfab99267581402351b7c5c527'
                    },
                    'faucet': {
                        'class': 'Faucet',
                        'address': '0xa27c237bd671e37b54e72b3264855059d07d5e1a'
                    },
                    'funds': {
                        'class': 'Funds',
                        'address': '0x211ae2d39c4724dc3cc7df216d39bcbf83016895'
                    },
                    'entries': {
                        'class': 'Entry',
                        'address': '0xdad7305a309e67ffb1dd61f0ba46fb99c0ea88be'
                    },
                    'comments': {
                        'class': 'Comments',
                        'address': '0x54b855461d4611362e8ef7a78e8560077e380a44'
                    },
                    'votes': {
                        'class': 'Votes',
                        'address': '0x1d83b31f2cb4cea5b900649824365dda1b81795b'
                    }
                },
                'type': 'aeth'
            };
        }
        if (!("objects" in env) && typeof env === "object") {
            env = { objects: env };
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
            }
        };

        this.classes = {};
        for (var key in this.headers) {
            this.classes[key] = new ContractWrapper(this.headers[key], _web3);
        }

        this.objects = {};
        for (var i in env.objects) {
            var obj = env.objects[i];
            if (!(obj['type'].split('[')[0] in this.classes)) continue;
            this.objects[i] = this.classes[obj['type'].split('[')[0]].at(obj.value);
        }
    }

    return {
        Class: constructor,
        environments: environments
    };
})();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dapple['AKASHA'];
