import Users from "artifacts/contracts/Users/Users.sol/Users.json";
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json";
import Assets from "artifacts/contracts/Assets/Assets.sol/Assets.json";
import Recovery from "artifacts/contracts/Recovery/Recovery.sol/Recovery.json";
import { AbiItem } from 'web3-utils';
export const environment = {
  production: true,
  infura_id:"01cee0da686f45b284603965699bac60",
  authAddr:"0x8279C35DD3D6C6c5eC8Aa71530A00b026Ac5fdFF",
  AuthAbi : Auth.abi as AbiItem[],
  usersAddr:"0xeafdF265011A5381273FADe9DCE400854Bb2b7e7",
  usersAbi: Users.abi as AbiItem[],
  assetsAddr:"0x07010a04ad5D38c8Da79841f8Cc94253C656345d",
  assetsAbi: Assets.abi as AbiItem[],
  recoveryAddr:"0x072429eCC6F3895099a4eFCC2107526cAEaf3965",
  recoveryAbi: Recovery.abi as AbiItem[],
  chainId:97,
  apiUrl:"https://app.dast.tech/api",
  // apiUrl:"http://localhost:8000/api",
};
