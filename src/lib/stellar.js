import {
  isConnected,
  setAllowed,
  getAddress,
  signTransaction,
} from '@stellar/freighter-api'
import {
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  BASE_FEE,
} from '@stellar/stellar-sdk'

export const HORIZON_TESTNET_URL = 'https://horizon-testnet.stellar.org'
export const FRIENDBOT_URL = 'https://friendbot.stellar.org'

const server = new Horizon.Server(HORIZON_TESTNET_URL)

export async function checkFreighterInstalled() {
  const result = await isConnected()
  return !result.error && result.isConnected !== undefined
}

export async function connectWallet() {
  const installed = await checkFreighterInstalled()
  if (!installed) {
    throw new Error(
      'FREIGHTER WALLET NOT FOUND.\n\nInstall the Freighter browser extension\nand refresh the page.'
    )
  }

  const access = await setAllowed()
  if (access.error) throw new Error(access.error)
  if (!access.isAllowed) {
    throw new Error('CONNECTION DENIED.\n\nPermission was denied in Freighter.')
  }

  const addressResult = await getAddress()
  if (addressResult.error) throw new Error(addressResult.error)

  return addressResult.address
}

export function disconnectWallet() {
  return true
}

export async function fetchXlmBalance(publicKey) {
  try {
    const account = await server.loadAccount(publicKey)
    const native = account.balances.find((b) => b.asset_type === 'native')
    return native ? native.balance : '0'
  } catch (err) {
    if (err?.response?.status === 404) {
      return '0'
    }
    throw err
  }
}

export async function fundWithFriendbot(publicKey) {
  const res = await fetch(`${FRIENDBOT_URL}?addr=${encodeURIComponent(publicKey)}`)
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`FRIENDBOT FAILED: ${body || res.statusText}`)
  }
  return res.json()
}

export async function sendPayment(senderPublicKey, destination, amount) {
  if (!destination || !amount) throw new Error('INVALID INPUT: destination and amount required.')
  const numAmount = parseFloat(amount)
  if (isNaN(numAmount) || numAmount <= 0) throw new Error('INVALID AMOUNT.')

  const sourceAccount = await server.loadAccount(senderPublicKey)

  const transaction = new TransactionBuilder(sourceAccount, {
    fee: String(BASE_FEE),
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(
      Operation.payment({
        destination: destination.trim(),
        asset: Asset.native(),
        amount: String(numAmount),
      })
    )
    .setTimeout(60)
    .build()

  const xdr = transaction.toXDR()

  const signResult = await signTransaction(xdr, {
    networkPassphrase: Networks.TESTNET,
  })
  if (signResult.error) throw new Error(signResult.error)

  const signedTx = TransactionBuilder.fromXDR(signResult.signedTxXdr, Networks.TESTNET)
  const submitResult = await server.submitTransaction(signedTx)

  return { hash: submitResult.hash, ledger: submitResult.ledger }
}

export function isValidStellarAddress(address) {
  return typeof address === 'string' && /^G[A-Z0-9]{55}$/.test(address.trim())
}
