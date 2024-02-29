export const bendABI = [
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'supply',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getUserAccountData',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'totalCollateralBase',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'totalDebtBase',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'availableBorrowsBase',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'currentLiquidationThreshold',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'ltv',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'healthFactor',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'interestRateMode',
                    type: 'uint256',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
            ],
            name: 'borrow',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'caller',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'assets',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin',
                    name: 'shares',
                    type: 'tuple',
                },
            ],
            name: 'InitializeDeposit',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
            ],
            name: 'SetDepositorWithdrawAddress',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'withdrawer',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'rewardAmount',
                    type: 'tuple[]',
                },
            ],
            name: 'WithdrawDepositRewards',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'getCurrentRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'depositor',
                    type: 'address',
                },
            ],
            name: 'getDepositorWithdrawAddress',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'getOutstandingRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'withdrawAddress',
                    type: 'address',
                },
            ],
            name: 'setDepositorWithdrawAddress',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
            ],
            name: 'withdrawAllDepositorRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'withdrawDepositorRewards',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'withdrawDepositorRewardsTo',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    P = [
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'delegator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
                {
                    indexed: !1,
                    internalType: 'int64',
                    name: 'creationHeight',
                    type: 'int64',
                },
            ],
            name: 'CancelUnbondingDelegation',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CreateValidator',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Delegate',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'sourceValidator',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'destinationValidator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Redelegate',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'validator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Unbond',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'srcValidator',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'dstValidator',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'beginRedelegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'int64',
                    name: 'creationHeight',
                    type: 'int64',
                },
            ],
            name: 'cancelUnbondingDelegation',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'delegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getBondedValidators',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getBondedValidatorsByPower',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getDelegation',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getDelegatorUnbondingDelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'delegatorAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'validatorAddress',
                            type: 'address',
                        },
                        {
                            components: [
                                {
                                    internalType: 'int64',
                                    name: 'creationHeight',
                                    type: 'int64',
                                },
                                {
                                    internalType: 'string',
                                    name: 'completionTime',
                                    type: 'string',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'initialBalance',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint256',
                                    name: 'balance',
                                    type: 'uint256',
                                },
                                {
                                    internalType: 'uint64',
                                    name: 'unbondingId',
                                    type: 'uint64',
                                },
                            ],
                            internalType: 'struct IStakingModule.UnbondingDelegationEntry[]',
                            name: 'entries',
                            type: 'tuple[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.UnbondingDelegation[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getDelegatorValidators',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'srcValidator',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'dstValidator',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getRedelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'int64',
                            name: 'creationHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'completionTime',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialBalance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sharesDst',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint64',
                            name: 'unbondingId',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct IStakingModule.RedelegationEntry[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getUnbondingDelegation',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'int64',
                            name: 'creationHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'completionTime',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialBalance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'balance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint64',
                            name: 'unbondingId',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct IStakingModule.UnbondingDelegationEntry[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
            ],
            name: 'getValidator',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getValidatorDelegations',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'delegator',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'balance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'shares',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IStakingModule.Delegation[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'key',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'offset',
                            type: 'uint64',
                        },
                        {
                            internalType: 'uint64',
                            name: 'limit',
                            type: 'uint64',
                        },
                        {
                            internalType: 'bool',
                            name: 'countTotal',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'reverse',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct Cosmos.PageRequest',
                    name: 'pagination',
                    type: 'tuple',
                },
            ],
            name: 'getValidators',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'operatorAddr',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'consAddr',
                            type: 'bytes',
                        },
                        {
                            internalType: 'bool',
                            name: 'jailed',
                            type: 'bool',
                        },
                        {
                            internalType: 'string',
                            name: 'status',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokens',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'delegatorShares',
                            type: 'uint256',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'moniker',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'identity',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'website',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'securityContact',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string',
                                    name: 'details',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Description',
                            name: 'description',
                            type: 'tuple',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingHeight',
                            type: 'int64',
                        },
                        {
                            internalType: 'string',
                            name: 'unbondingTime',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    components: [
                                        {
                                            internalType: 'uint256',
                                            name: 'rate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxRate',
                                            type: 'uint256',
                                        },
                                        {
                                            internalType: 'uint256',
                                            name: 'maxChangeRate',
                                            type: 'uint256',
                                        },
                                    ],
                                    internalType: 'struct IStakingModule.CommissionRates',
                                    name: 'commissionRates',
                                    type: 'tuple',
                                },
                                {
                                    internalType: 'string',
                                    name: 'updateTime',
                                    type: 'string',
                                },
                            ],
                            internalType: 'struct IStakingModule.Commission',
                            name: 'commission',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minSelfDelegation',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int64',
                            name: 'unbondingOnHoldRefCount',
                            type: 'int64',
                        },
                        {
                            internalType: 'uint64[]',
                            name: 'unbondingIds',
                            type: 'uint64[]',
                        },
                    ],
                    internalType: 'struct IStakingModule.Validator[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'nextKey',
                            type: 'string',
                        },
                        {
                            internalType: 'uint64',
                            name: 'total',
                            type: 'uint64',
                        },
                    ],
                    internalType: 'struct Cosmos.PageResponse',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'validatorAddress',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'undelegate',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes',
                    name: 'consAddr',
                    type: 'bytes',
                },
            ],
            name: 'valAddressFromConsAddress',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
    ],
    D = [
        {
            inputs: [
                {
                    internalType: 'contract StorageInterfaceV5',
                    name: '_storageT',
                    type: 'address',
                },
                {
                    internalType: 'contract GNSPairInfosInterfaceV6',
                    name: '_pairInfos',
                    type: 'address',
                },
                {
                    internalType: 'contract GNSBorrowingFeesInterfaceV6_3_2',
                    name: '_borrowingFees',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '_maxPosDai',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '_marketOrdersTimeout',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'CouldNotCloseTrade',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'done',
                    type: 'bool',
                },
            ],
            name: 'Done',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'delegate',
                    type: 'address',
                },
            ],
            name: 'NewDelegation',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'string',
                    name: 'name',
                    type: 'string',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'NumberUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'OpenLimitCanceled',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSize',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'spreadReductionP',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'block',
                            type: 'uint256',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct StorageInterfaceV5.OpenLimitOrder',
                    name: 'order',
                    type: 'tuple',
                },
            ],
            name: 'OpenLimitPlaced',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newPrice',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSize',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'spreadReductionP',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'minPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'maxPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'block',
                            type: 'uint256',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct StorageInterfaceV5.OpenLimitOrder',
                    name: 'order',
                    type: 'tuple',
                },
            ],
            name: 'OpenLimitUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'paused',
                    type: 'bool',
                },
            ],
            name: 'Paused',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
            ],
            name: 'SlUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
            ],
            name: 'TpUpdated',
            type: 'event',
        },
        {
            inputs: [],
            name: '_msgSender',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'borrowingFees',
            outputs: [
                {
                    internalType: 'contract GNSBorrowingFeesInterfaceV6_3_2',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'cancelOpenLimitOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct GNSTradingV6_3_2.TradeOrOrder[]',
                    name: 'orders',
                    type: 'tuple[]',
                },
            ],
            name: 'cancelOpenLimitOrders',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'closeTradeMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct GNSTradingV6_3_2.TradeOrOrder[]',
                    name: 'trades',
                    type: 'tuple[]',
                },
            ],
            name: 'closeTradesMarket',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    internalType: 'bytes',
                    name: 'call_data',
                    type: 'bytes',
                },
            ],
            name: 'delegatedAction',
            outputs: [
                {
                    internalType: 'bytes',
                    name: '',
                    type: 'bytes',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            name: 'delegations',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'done',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'enum StorageInterfaceV5.LimitOrder',
                    name: 'orderType',
                    type: 'uint8',
                },
                {
                    internalType: 'address',
                    name: 'trader',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
            ],
            name: 'executeNftOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'isDone',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'isPaused',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'marketOrdersTimeout',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'maxPosDai',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            name: 'openLimitOrderTypes',
            outputs: [
                {
                    internalType: 'enum GNSTradingV6_3_2.OpenLimitOrderType',
                    name: '',
                    type: 'uint8',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'trader',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'pairIndex',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'index',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'initialPosToken',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'positionSizeDai',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'openPrice',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'buy',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'leverage',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'sl',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct StorageInterfaceV5.Trade',
                    name: 't',
                    type: 'tuple',
                },
                {
                    internalType: 'enum GNSTradingV6_3_2.OpenLimitOrderType',
                    name: 'orderType',
                    type: 'uint8',
                },
                {
                    internalType: 'uint256',
                    name: 'slippageP',
                    type: 'uint256',
                },
            ],
            name: 'openTrade',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'pairInfos',
            outputs: [
                {
                    internalType: 'contract GNSPairInfosInterfaceV6',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'pause',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'removeDelegate',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'delegate',
                    type: 'address',
                },
            ],
            name: 'setDelegate',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setMarketOrdersTimeout',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'value',
                    type: 'uint256',
                },
            ],
            name: 'setMaxPosDai',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'storageT',
            outputs: [
                {
                    internalType: 'contract StorageInterfaceV5',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'price',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'tp',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'sl',
                    type: 'uint256',
                },
            ],
            name: 'updateOpenLimitOrder',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'newSl',
                    type: 'uint256',
                },
            ],
            name: 'updateSl',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'pairIndex',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'index',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'newTp',
                    type: 'uint256',
                },
            ],
            name: 'updateTp',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    O = [
        {
            inputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: 'provider',
                    type: 'address',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'backer',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'fee',
                    type: 'uint256',
                },
            ],
            name: 'BackUnbacked',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'enum DataTypes.InterestRateMode',
                    name: 'interestRateMode',
                    type: 'uint8',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'borrowRate',
                    type: 'uint256',
                },
                {
                    indexed: !0,
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'Borrow',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'target',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'initiator',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'enum DataTypes.InterestRateMode',
                    name: 'interestRateMode',
                    type: 'uint8',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'premium',
                    type: 'uint256',
                },
                {
                    indexed: !0,
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'FlashLoan',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'totalDebt',
                    type: 'uint256',
                },
            ],
            name: 'IsolationModeTotalDebtUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'collateralAsset',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'debtAsset',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'debtToCover',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'liquidatedCollateralAmount',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'liquidator',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'receiveAToken',
                    type: 'bool',
                },
            ],
            name: 'LiquidationCall',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !0,
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'MintUnbacked',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amountMinted',
                    type: 'uint256',
                },
            ],
            name: 'MintedToTreasury',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'RebalanceStableBorrowRate',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'repayer',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'bool',
                    name: 'useATokens',
                    type: 'bool',
                },
            ],
            name: 'Repay',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'liquidityRate',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'stableBorrowRate',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'variableBorrowRate',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'liquidityIndex',
                    type: 'uint256',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'variableBorrowIndex',
                    type: 'uint256',
                },
            ],
            name: 'ReserveDataUpdated',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'ReserveUsedAsCollateralDisabled',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'ReserveUsedAsCollateralEnabled',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    indexed: !0,
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'Supply',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'enum DataTypes.InterestRateMode',
                    name: 'interestRateMode',
                    type: 'uint8',
                },
            ],
            name: 'SwapBorrowRateMode',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint8',
                    name: 'categoryId',
                    type: 'uint8',
                },
            ],
            name: 'UserEModeSet',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'reserve',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    indexed: !1,
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'Withdraw',
            type: 'event',
        },
        {
            inputs: [],
            name: 'ADDRESSES_PROVIDER',
            outputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'BRIDGE_PROTOCOL_FEE',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'FLASHLOAN_PREMIUM_TOTAL',
            outputs: [
                {
                    internalType: 'uint128',
                    name: '',
                    type: 'uint128',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'FLASHLOAN_PREMIUM_TO_PROTOCOL',
            outputs: [
                {
                    internalType: 'uint128',
                    name: '',
                    type: 'uint128',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_NUMBER_RESERVES',
            outputs: [
                {
                    internalType: 'uint16',
                    name: '',
                    type: 'uint16',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MAX_STABLE_RATE_BORROW_SIZE_PERCENT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'POOL_REVISION',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'fee',
                    type: 'uint256',
                },
            ],
            name: 'backUnbacked',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint8',
                    name: 'id',
                    type: 'uint8',
                },
                {
                    components: [
                        {
                            internalType: 'uint16',
                            name: 'ltv',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'liquidationThreshold',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'liquidationBonus',
                            type: 'uint16',
                        },
                        {
                            internalType: 'address',
                            name: 'priceSource',
                            type: 'address',
                        },
                        {
                            internalType: 'string',
                            name: 'label',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct DataTypes.EModeCategory',
                    name: 'category',
                    type: 'tuple',
                },
            ],
            name: 'configureEModeCategory',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'deposit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'dropReserve',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'from',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'balanceFromBefore',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'balanceToBefore',
                    type: 'uint256',
                },
            ],
            name: 'finalizeTransfer',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiverAddress',
                    type: 'address',
                },
                {
                    internalType: 'address[]',
                    name: 'assets',
                    type: 'address[]',
                },
                {
                    internalType: 'uint256[]',
                    name: 'amounts',
                    type: 'uint256[]',
                },
                {
                    internalType: 'uint256[]',
                    name: 'interestRateModes',
                    type: 'uint256[]',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'bytes',
                    name: 'params',
                    type: 'bytes',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'flashLoan',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'receiverAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes',
                    name: 'params',
                    type: 'bytes',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'flashLoanSimple',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'getConfiguration',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'data',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct DataTypes.ReserveConfigurationMap',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint8',
                    name: 'id',
                    type: 'uint8',
                },
            ],
            name: 'getEModeCategoryData',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint16',
                            name: 'ltv',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'liquidationThreshold',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'liquidationBonus',
                            type: 'uint16',
                        },
                        {
                            internalType: 'address',
                            name: 'priceSource',
                            type: 'address',
                        },
                        {
                            internalType: 'string',
                            name: 'label',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct DataTypes.EModeCategory',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint16',
                    name: 'id',
                    type: 'uint16',
                },
            ],
            name: 'getReserveAddressById',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'getReserveData',
            outputs: [
                {
                    components: [
                        {
                            components: [
                                {
                                    internalType: 'uint256',
                                    name: 'data',
                                    type: 'uint256',
                                },
                            ],
                            internalType: 'struct DataTypes.ReserveConfigurationMap',
                            name: 'configuration',
                            type: 'tuple',
                        },
                        {
                            internalType: 'uint128',
                            name: 'liquidityIndex',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'currentLiquidityRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'variableBorrowIndex',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'currentVariableBorrowRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'currentStableBorrowRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint40',
                            name: 'lastUpdateTimestamp',
                            type: 'uint40',
                        },
                        {
                            internalType: 'uint16',
                            name: 'id',
                            type: 'uint16',
                        },
                        {
                            internalType: 'address',
                            name: 'aTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'stableDebtTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'variableDebtTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'interestRateStrategyAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'uint128',
                            name: 'accruedToTreasury',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'unbacked',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'isolationModeTotalDebt',
                            type: 'uint128',
                        },
                    ],
                    internalType: 'struct DataTypes.ReserveData',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'getReserveNormalizedIncome',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'getReserveNormalizedVariableDebt',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getReservesList',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getUserConfiguration',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'data',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct DataTypes.UserConfigurationMap',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getUserEMode',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'aTokenAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'stableDebtAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'variableDebtAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'interestRateStrategyAddress',
                    type: 'address',
                },
            ],
            name: 'initReserve',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: 'provider',
                    type: 'address',
                },
            ],
            name: 'initialize',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'collateralAsset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'debtAsset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'debtToCover',
                    type: 'uint256',
                },
                {
                    internalType: 'bool',
                    name: 'receiveAToken',
                    type: 'bool',
                },
            ],
            name: 'liquidationCall',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: 'assets',
                    type: 'address[]',
                },
            ],
            name: 'mintToTreasury',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
            ],
            name: 'mintUnbacked',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'rebalanceStableBorrowRate',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'interestRateMode',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
            ],
            name: 'repay',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'interestRateMode',
                    type: 'uint256',
                },
            ],
            name: 'repayWithATokens',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'uint256',
                    name: 'interestRateMode',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'deadline',
                    type: 'uint256',
                },
                {
                    internalType: 'uint8',
                    name: 'permitV',
                    type: 'uint8',
                },
                {
                    internalType: 'bytes32',
                    name: 'permitR',
                    type: 'bytes32',
                },
                {
                    internalType: 'bytes32',
                    name: 'permitS',
                    type: 'bytes32',
                },
            ],
            name: 'repayWithPermit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'token',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
            ],
            name: 'rescueTokens',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
            ],
            name: 'resetIsolationModeTotalDebt',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'data',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct DataTypes.ReserveConfigurationMap',
                    name: 'configuration',
                    type: 'tuple',
                },
            ],
            name: 'setConfiguration',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'rateStrategyAddress',
                    type: 'address',
                },
            ],
            name: 'setReserveInterestRateStrategyAddress',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint8',
                    name: 'categoryId',
                    type: 'uint8',
                },
            ],
            name: 'setUserEMode',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'bool',
                    name: 'useAsCollateral',
                    type: 'bool',
                },
            ],
            name: 'setUserUseReserveAsCollateral',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'onBehalfOf',
                    type: 'address',
                },
                {
                    internalType: 'uint16',
                    name: 'referralCode',
                    type: 'uint16',
                },
                {
                    internalType: 'uint256',
                    name: 'deadline',
                    type: 'uint256',
                },
                {
                    internalType: 'uint8',
                    name: 'permitV',
                    type: 'uint8',
                },
                {
                    internalType: 'bytes32',
                    name: 'permitR',
                    type: 'bytes32',
                },
                {
                    internalType: 'bytes32',
                    name: 'permitS',
                    type: 'bytes32',
                },
            ],
            name: 'supplyWithPermit',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'interestRateMode',
                    type: 'uint256',
                },
            ],
            name: 'swapBorrowRateMode',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'protocolFee',
                    type: 'uint256',
                },
            ],
            name: 'updateBridgeProtocolFee',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint128',
                    name: 'flashLoanPremiumTotal',
                    type: 'uint128',
                },
                {
                    internalType: 'uint128',
                    name: 'flashLoanPremiumToProtocol',
                    type: 'uint128',
                },
            ],
            name: 'updateFlashloanPremiums',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'asset',
                    type: 'address',
                },
                {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256',
                },
                {
                    internalType: 'address',
                    name: 'to',
                    type: 'address',
                },
            ],
            name: 'withdraw',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    Z = [
        {
            inputs: [
                {
                    internalType: 'address[]',
                    name: '_tokens',
                    type: 'address[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_token',
                    type: 'address',
                },
            ],
            name: 'addToken',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_receiver',
                    type: 'address',
                },
            ],
            name: 'claimAllRewards',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_owner',
                    type: 'address',
                },
            ],
            name: 'getAllRewards',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_token',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: '_owner',
                    type: 'address',
                },
            ],
            name: 'getReward',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getTokens',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: '_token',
                    type: 'address',
                },
            ],
            name: 'removeToken',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
    ],
    B = [
        {
            inputs: [
                {
                    internalType: 'contract IEACAggregatorProxy',
                    name: '_networkBaseTokenPriceInUsdProxyAggregator',
                    type: 'address',
                },
                {
                    internalType: 'contract IEACAggregatorProxy',
                    name: '_marketReferenceCurrencyPriceInUsdProxyAggregator',
                    type: 'address',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'constructor',
        },
        {
            inputs: [],
            name: 'ETH_CURRENCY_UNIT',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'MKR_ADDRESS',
            outputs: [
                {
                    internalType: 'address',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bytes32',
                    name: '_bytes32',
                    type: 'bytes32',
                },
            ],
            name: 'bytes32ToString',
            outputs: [
                {
                    internalType: 'string',
                    name: '',
                    type: 'string',
                },
            ],
            stateMutability: 'pure',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: 'provider',
                    type: 'address',
                },
            ],
            name: 'getReservesData',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'underlyingAsset',
                            type: 'address',
                        },
                        {
                            internalType: 'string',
                            name: 'name',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'symbol',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'decimals',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'baseLTVasCollateral',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'reserveLiquidationThreshold',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'reserveLiquidationBonus',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'reserveFactor',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'usageAsCollateralEnabled',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'borrowingEnabled',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'stableBorrowRateEnabled',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'isActive',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'isFrozen',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint128',
                            name: 'liquidityIndex',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'variableBorrowIndex',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'liquidityRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'variableBorrowRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'stableBorrowRate',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint40',
                            name: 'lastUpdateTimestamp',
                            type: 'uint40',
                        },
                        {
                            internalType: 'address',
                            name: 'aTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'stableDebtTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'variableDebtTokenAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'interestRateStrategyAddress',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'availableLiquidity',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'totalPrincipalStableDebt',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'averageStableRate',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stableDebtLastUpdateTimestamp',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'totalScaledVariableDebt',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'priceInMarketReferenceCurrency',
                            type: 'uint256',
                        },
                        {
                            internalType: 'address',
                            name: 'priceOracle',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'variableRateSlope1',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'variableRateSlope2',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stableRateSlope1',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stableRateSlope2',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'baseStableBorrowRate',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'baseVariableBorrowRate',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'optimalUsageRatio',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'isPaused',
                            type: 'bool',
                        },
                        {
                            internalType: 'bool',
                            name: 'isSiloedBorrowing',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint128',
                            name: 'accruedToTreasury',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'unbacked',
                            type: 'uint128',
                        },
                        {
                            internalType: 'uint128',
                            name: 'isolationModeTotalDebt',
                            type: 'uint128',
                        },
                        {
                            internalType: 'bool',
                            name: 'flashLoanEnabled',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'debtCeiling',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'debtCeilingDecimals',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint8',
                            name: 'eModeCategoryId',
                            type: 'uint8',
                        },
                        {
                            internalType: 'uint256',
                            name: 'borrowCap',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'supplyCap',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint16',
                            name: 'eModeLtv',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'eModeLiquidationThreshold',
                            type: 'uint16',
                        },
                        {
                            internalType: 'uint16',
                            name: 'eModeLiquidationBonus',
                            type: 'uint16',
                        },
                        {
                            internalType: 'address',
                            name: 'eModePriceSource',
                            type: 'address',
                        },
                        {
                            internalType: 'string',
                            name: 'eModeLabel',
                            type: 'string',
                        },
                        {
                            internalType: 'bool',
                            name: 'borrowableInIsolation',
                            type: 'bool',
                        },
                    ],
                    internalType: 'struct IUiPoolDataProviderV3.AggregatedReserveData[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'marketReferenceCurrencyUnit',
                            type: 'uint256',
                        },
                        {
                            internalType: 'int256',
                            name: 'marketReferenceCurrencyPriceInUsd',
                            type: 'int256',
                        },
                        {
                            internalType: 'int256',
                            name: 'networkBaseTokenPriceInUsd',
                            type: 'int256',
                        },
                        {
                            internalType: 'uint8',
                            name: 'networkBaseTokenPriceDecimals',
                            type: 'uint8',
                        },
                    ],
                    internalType: 'struct IUiPoolDataProviderV3.BaseCurrencyInfo',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: 'provider',
                    type: 'address',
                },
            ],
            name: 'getReservesList',
            outputs: [
                {
                    internalType: 'address[]',
                    name: '',
                    type: 'address[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'contract IPoolAddressesProvider',
                    name: 'provider',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'user',
                    type: 'address',
                },
            ],
            name: 'getUserReservesData',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'underlyingAsset',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'scaledATokenBalance',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bool',
                            name: 'usageAsCollateralEnabledOnUser',
                            type: 'bool',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stableBorrowRate',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'scaledVariableDebt',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'principalStableDebt',
                            type: 'uint256',
                        },
                        {
                            internalType: 'uint256',
                            name: 'stableBorrowLastUpdateTimestamp',
                            type: 'uint256',
                        },
                    ],
                    internalType: 'struct IUiPoolDataProviderV3.UserReserveData[]',
                    name: '',
                    type: 'tuple[]',
                },
                {
                    internalType: 'uint8',
                    name: '',
                    type: 'uint8',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
            outputs: [
                {
                    internalType: 'contract IEACAggregatorProxy',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'networkBaseTokenPriceInUsdProxyAggregator',
            outputs: [
                {
                    internalType: 'contract IEACAggregatorProxy',
                    name: '',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    _ = [
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'aggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes[]',
                    name: 'returnData',
                    type: 'bytes[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'aggregateWrite',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes[]',
                    name: 'returnData',
                    type: 'bytes[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'blockAndAggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
            ],
            name: 'getBlockHash',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getBlockNumber',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockCoinbase',
            outputs: [
                {
                    internalType: 'address',
                    name: 'coinbase',
                    type: 'address',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockDifficulty',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'difficulty',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockGasLimit',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'gaslimit',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getCurrentBlockTimestamp',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'timestamp',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'addr',
                    type: 'address',
                },
            ],
            name: 'getEthBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'balance',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getLastBlockHash',
            outputs: [
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'data',
                    type: 'tuple[]',
                },
            ],
            name: 'multiwrite',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bool',
                    name: 'requireSuccess',
                    type: 'bool',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'tryAggregate',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'bool',
                    name: 'requireSuccess',
                    type: 'bool',
                },
                {
                    components: [
                        {
                            internalType: 'address',
                            name: 'target',
                            type: 'address',
                        },
                        {
                            internalType: 'bytes',
                            name: 'callData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct Call[]',
                    name: 'calls',
                    type: 'tuple[]',
                },
            ],
            name: 'tryBlockAndAggregate',
            outputs: [
                {
                    internalType: 'uint256',
                    name: 'blockNumber',
                    type: 'uint256',
                },
                {
                    internalType: 'bytes32',
                    name: 'blockHash',
                    type: 'bytes32',
                },
                {
                    components: [
                        {
                            internalType: 'bool',
                            name: 'success',
                            type: 'bool',
                        },
                        {
                            internalType: 'bytes',
                            name: 'returnData',
                            type: 'bytes',
                        },
                    ],
                    internalType: 'struct MyMultiCall.Result[]',
                    name: 'returnData',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
    ],
    V = [
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'burner',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Burn',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'receiver',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CoinReceived',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'spender',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'CoinSpent',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'minter',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Coinbase',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'sender',
                    type: 'address',
                },
            ],
            name: 'Message',
            type: 'event',
        },
        {
            anonymous: !1,
            inputs: [
                {
                    indexed: !0,
                    internalType: 'address',
                    name: 'recipient',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    indexed: !1,
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'Transfer',
            type: 'event',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
            ],
            name: 'getAllBalances',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
            ],
            name: 'getAllSpendableBalances',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'getAllSupply',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: '',
                    type: 'tuple[]',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getDenomMetadata',
            outputs: [
                {
                    components: [
                        {
                            internalType: 'string',
                            name: 'description',
                            type: 'string',
                        },
                        {
                            components: [
                                {
                                    internalType: 'string',
                                    name: 'denom',
                                    type: 'string',
                                },
                                {
                                    internalType: 'string[]',
                                    name: 'aliases',
                                    type: 'string[]',
                                },
                                {
                                    internalType: 'uint32',
                                    name: 'exponent',
                                    type: 'uint32',
                                },
                            ],
                            internalType: 'struct IBankModule.DenomUnit[]',
                            name: 'denomUnits',
                            type: 'tuple[]',
                        },
                        {
                            internalType: 'string',
                            name: 'base',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'display',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'name',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'symbol',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct IBankModule.DenomMetadata',
                    name: '',
                    type: 'tuple',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSendEnabled',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'accountAddress',
                    type: 'address',
                },
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSpendableBalance',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'string',
                    name: 'denom',
                    type: 'string',
                },
            ],
            name: 'getSupply',
            outputs: [
                {
                    internalType: 'uint256',
                    name: '',
                    type: 'uint256',
                },
            ],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [
                {
                    internalType: 'address',
                    name: 'fromAddress',
                    type: 'address',
                },
                {
                    internalType: 'address',
                    name: 'toAddress',
                    type: 'address',
                },
                {
                    components: [
                        {
                            internalType: 'uint256',
                            name: 'amount',
                            type: 'uint256',
                        },
                        {
                            internalType: 'string',
                            name: 'denom',
                            type: 'string',
                        },
                    ],
                    internalType: 'struct Cosmos.Coin[]',
                    name: 'amount',
                    type: 'tuple[]',
                },
            ],
            name: 'send',
            outputs: [
                {
                    internalType: 'bool',
                    name: '',
                    type: 'bool',
                },
            ],
            stateMutability: 'payable',
            type: 'function',
        },
    ],
    U = [
        {
            type: 'constructor',
            inputs: [
                {
                    name: '_bgtRewarder',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: '_lendRewardsAggregator',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: '_perpsRewarder',
                    type: 'address',
                    internalType: 'address',
                },
            ],
            stateMutability: 'nonpayable',
        },
        {
            type: 'function',
            name: 'IS_SCRIPT',
            inputs: [],
            outputs: [
                {
                    name: '',
                    type: 'bool',
                    internalType: 'bool',
                },
            ],
            stateMutability: 'view',
        },
        {
            type: 'function',
            name: 'claimAllRewards',
            inputs: [
                {
                    name: '_receiver',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'dexPoolAddresses',
                    type: 'address[]',
                    internalType: 'address[]',
                },
            ],
            outputs: [],
            stateMutability: 'payable',
        },
        {
            type: 'function',
            name: 'getAllRewards',
            inputs: [
                {
                    name: '_owner',
                    type: 'address',
                    internalType: 'address',
                },
                {
                    name: 'dexPoolAddresses',
                    type: 'address[]',
                    internalType: 'address[]',
                },
            ],
            outputs: [
                {
                    name: 'dexPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'lendPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
                {
                    name: 'perpsPendingRewards',
                    type: 'uint256',
                    internalType: 'uint256',
                },
            ],
            stateMutability: 'nonpayable',
        },
    ];
