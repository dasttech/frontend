import Users from "artifacts/contracts/Users/Users.sol/Users.json";
import Auth from "artifacts/contracts/Auth/Auth.sol/Auth.json";
import Assets from "artifacts/contracts/Assets/Assets.sol/Assets.json";
import Recovery from "artifacts/contracts/Recovery/Recovery.sol/Recovery.json";
import { AbiItem } from 'web3-utils';
export const environment = {
  production: true,
  infura_id:"01cee0da686f45b284603965699bac60",
  authAddr:"0x467E91A158ccf9E2970481227280CA135574b323",
  AuthAbi : Auth.abi as AbiItem[],
  usersAddr:"0xd8198befc49fA70f0144D96dD9cE21De3d26A1A2",
  usersAbi: Users.abi as AbiItem[],
  assetsAddr:"0xb226B6631abf28A14dC5304F97E2220698534338",
  assetsAbi: Assets.abi as AbiItem[],
  recoveryAddr:"0xC9FF9a41619dc6F3E19c8223216272b14c334091",
  recoveryAbi: Recovery.abi as AbiItem[],
  chainId:3,
  apiUrl:"https://app.dast.tech/api",
  // apiUrl:"http://localhost:8000/api",
};
