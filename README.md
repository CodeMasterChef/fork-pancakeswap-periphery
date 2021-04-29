# fork-pancakeswap-periphery:
This is PancakeSwap Router which forked from https://github.com/pancakeswap/pancake-swap-periphery
# Local Development:
- Node>=10.
- Truffle Suite (https://www.trufflesuite.com/)
## Install Dependencies:
```
npm install
```
## Compile Contracts:

```
npm run compile
```

## Migrate Contracts:

🔥 Important: https://ethereum.stackexchange.com/questions/88075/uniswap-addliquidity-function-transaction-revert

You need to create the init_code_hash using your newly deployed Factory contract.

This address hard-coded in Uniswap's Github repo is specifically for their deployment in Ethereum networks.

In your UniswapV2Factory.sol code, add the following piece of code.
```
bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(UniswapV2Pair).creationCode));
```
Once it's deployed, use remix or truffle console to call this to get the value. Then substitute this value into your `UniswapV2Library` **before deploying the router**.

The value INIT_CODE_PAIR_HASH likes: 0x3317fc4f634fd3a2ddcc979f426e5573c3dfa83fa830e01194903e5ee55bb566

Change on the PancakeLibrary.sol without 0x:

```
 // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'3317fc4f634fd3a2ddcc979f426e5573c3dfa83fa830e01194903e5ee55bb566' // init code hash
            ))));
    }
```

Migrate on localhost:
```
npm run migrate:development
```
Migrate on BSC Testnet:
```
npm run migrate:bsctestnet
```