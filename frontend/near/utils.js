import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'

const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName, 
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["view_deposits"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: [
        "deposit",
        "add_hospital",
        "add_item",
        "add_supplier",
        "new_supply",
        "add_supplies",
        "add_miscs ",
        "request_funds",
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
}

export async function deposit(amount) {
  let response = await window.contract.deposit(
    "300000000000000",
    (amount * 10000 + "00000000000000000000").toString()
  );
  return response;
}

export async function add_hospital(name, level, county) {
  let response = await window.contract.add_hospital({
    name: name,
    level: level,
    county: county,
  });
  return response; 
}

export async function add_item(name, cost, manufacturer, type) {
  let response = await window.contract.add_item({
    name: name,
    cost: cost,
    manufacturer: manufacturer,
    types: type,
    date: date.now(),
  });
  return response;
}

export async function add_supplier(name, type) {
  let response = await window.contract.add_supplier({
    name:name,
    types: type
  });
  return response;
}

export async function new_supply(sponsor, id) {
  let response = await window.contract.new_supply({
    sponsor: sponsor,
    hospital_id: id,
  });
  return response;
}

export async function add_supplies(id, supplies, cost) {
  let response = await window.contract.add_supplies({
    id: id,
    supplies: supplies,
    costs: cost,
  });
  return response;
}

export async function view_deposits() {
  let response = await window.contract.view_deposits();
  return response;
}

export async function add_miscs(id, misc, cost) {
  let response = await window.contract.add_miscs({
    id: id,
    misc: misc,
    costs: cost,
  });
  return response;
}

export async function request_funds(id) {
  let response = await window.contract.request_funds({
    id:id
  });
  return response;
}