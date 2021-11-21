export const balanceOf = `[
    {
        "constant": true,
        "inputs": [{ "name": "", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "", "type": "uint256" }],
        "payable":false,
        "stateMutability":"view",
        "type": "function"
    }
]`

export const symbolString = `[
    {
        "constant":true,
        "inputs":[],
        "name":"symbol",
        "outputs":[{"name":"","type":"string"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    }
]`

export const symbolBytes32 = `[
    {
        "constant":true,
        "inputs":[],
        "name":"symbol",
        "outputs":[{"name":"","type":"bytes32"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    }
]`

export const decimals = `[
    {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
    }
]`