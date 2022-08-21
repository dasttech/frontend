import Users from "artifacts/contracts/Users/Users.sol/Users.json";
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json";
import Assets from "artifacts/contracts/Assets/Assets.sol/Assets.json";
import Recovery from "artifacts/contracts/Recovery/Recovery.sol/Recovery.json";
import { AbiItem } from 'web3-utils';
export const environment = {
  production: true,
  infura_id:"01cee0da686f45b284603965699bac60",
  authAddr:"0xcAC33946CD31dc3f363257964caE4Dd5091F8615",
  AuthAbi : Auth.abi as AbiItem[],
  usersAddr:"0x6659d8613A221F0B89D18Cd7cfD4E59e191f40bd",
  usersAbi: Users.abi as AbiItem[],
  assetsAddr:"0x762D6f9492a3208AABCd9312B5558dB87aD56F9A",
  assetsAbi: Assets.abi as AbiItem[],
  recoveryAddr:"0xB7424e2c209EC466b281DB6402Ab309E01CC27AD",
  recoveryAbi: Recovery.abi as AbiItem[],
  chainId:3,
  apiUrl:"https://app.dast.tech/api",
  // apiUrl:"http://localhost:8000/api",
};
