export type NetworkProtocolType = 'MAINNET' | 'HANGZHOUNET' | 'ITHACANET'
export type Status = 'ONLINE' | 'NOT SYNCED' | 'NOT BOOTSTRAPED' | 'ERROR' | 'WAITING'

export type TezosNode = {
  networkProtocol: NetworkProtocolType;
  status: Status;
  url: string;
}
