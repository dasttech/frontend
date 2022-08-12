import Users from "artifacts/contracts/Users/Users.sol/Users.json";
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json";
import Assets from "artifacts/contracts/Assets/Assets.sol/Assets.json";
import Recovery from "artifacts/contracts/Recovery/Recovery.sol/Recovery.json";
import { AbiItem } from 'web3-utils';
export const environment = {
  production: true,
  infura_id:"01cee0da686f45b284603965699bac60",
    authAddr:"0x2845a324D5Cc697b994947471eC1d574A5cAD948",
    AuthAbi : Auth.abi as AbiItem[],
    usersAddr:"0x067C9d318B1213f5AACB2F4E27506e7791251E03",
    usersAbi: Users.abi as AbiItem[],
    assetsAddr:"0x5c903CBA2D12637594F26d27cAC2eF302308cA87",
    assetsAbi: Assets.abi as AbiItem[],
    recoveryAddr:"0xdb404c7EA99DF007d1FA3375F6121fE854018392",
    recoveryAbi: Recovery.abi as AbiItem[],
    chainId:3,
    // apiUrl:"https://app.dast.tech/api",
    apiUrl:"http://localhost:8000/api",
};
