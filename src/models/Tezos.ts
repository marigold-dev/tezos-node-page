export type NetworkProtocolType = 'MAINNET' | 'HANGZHOUNET' | 'GHOSTNET'
export type Status =
  | 'NOT BOOTSTRAPED'
  | 'UNSYNCED'
  | 'STUCK'
  | 'ONLINE'
  | 'WAITING'
  | 'ERROR'
export type TezosSyncState = 'unsynced' | 'synced' | 'stuck'
// eslint-disable-next-line camelcase
export type IsBootstrapedResponse = {
  bootstrapped: boolean
  sync_state: TezosSyncState
}
export type VersionResponse = { version: { major: number; minor: number } }

export type TezosNode = {
  networkProtocol: NetworkProtocolType
  status: Status
  version: string
  url: string
}

export const HeaderLink = (tezos: TezosNode) => {
  return `${tezos.url}/chains/main/blocks/head/header`
}

export const SnapshotLink = (tezos: TezosNode, type: 'full' | 'rolling') => {
  return `https://snapshot-api.tezos.marigold.dev/${tezos.networkProtocol.toLowerCase()}/${type.toLowerCase()}`
}

export const APILink = (tezos: TezosNode) => {
  return `https://api.marigold.dev/general/${tezos.networkProtocol.toLowerCase()}/`
}

export const StatusBySyncState = (response: IsBootstrapedResponse) => {
  if (!response.bootstrapped) {
    return 'NOT BOOTSTRAPED' as Status
  }

  switch (response.sync_state) {
    case 'unsynced':
      return 'UNSYNCED' as Status
    case 'synced':
      return 'ONLINE' as Status
    case 'stuck':
      return 'STUCK' as Status
    default:
      return 'ERROR' as Status
  }
}
