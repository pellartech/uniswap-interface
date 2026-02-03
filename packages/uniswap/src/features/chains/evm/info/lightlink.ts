import { GraphQLApi } from '@universe/api'
import { ETH_LOGO } from 'ui/src/assets'
// TODO: Add LIGHTLINK_LOGO to ui/src/assets and import here
// import { ETH_LOGO, LIGHTLINK_LOGO } from 'ui/src/assets'
import { DEFAULT_NATIVE_ADDRESS_LEGACY } from 'uniswap/src/features/chains/evm/rpc'
import { buildChainTokens } from 'uniswap/src/features/chains/evm/tokens'
import { GENERIC_L2_GAS_CONFIG } from 'uniswap/src/features/chains/gasDefaults'
import {
  GqlChainId,
  NetworkLayer,
  RPCType,
  UniverseChainId,
  UniverseChainInfo,
} from 'uniswap/src/features/chains/types'
import { Platform } from 'uniswap/src/features/platforms/types/Platform'
import { ElementName } from 'uniswap/src/features/telemetry/constants'
// TODO: Add stablecoin addresses when deployed on LightLink
// import { buildUSDC } from 'uniswap/src/features/tokens/stablecoin'

// LightLink Mainnet base chain definition (not in wagmi/chains)
const lightlinkChain = {
  id: 1891,
  name: 'LightLink Phoenix Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1'] },
    public: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'LightLink Explorer', url: 'https://phoenix.lightlink.io' },
  },
  testnet: false,
}

// TODO: Add stablecoin tokens when deployed
const tokens = buildChainTokens({
  stables: {
    // USDC: buildUSDC('0x...', UniverseChainId.LightLink),
  },
})

export const LIGHTLINK_CHAIN_INFO = {
  ...lightlinkChain,
  id: UniverseChainId.LightLink,
  platform: Platform.EVM,
  assetRepoNetworkName: undefined, // LightLink not in Uniswap assets repo
  backendChain: {
    // LightLink not supported by Uniswap's GraphQL backend - use custom subgraph
    chain: GraphQLApi.Chain.UnknownChain as GqlChainId,
    backendSupported: false,
    nativeTokenBackendAddress: undefined,
  },
  blockPerMainnetEpochForChainId: 1,
  blockWaitMsBeforeWarning: 600000,
  bridge: 'https://lightlink.io/bridge', // TODO: Update with actual bridge URL
  docs: 'https://docs.lightlink.io/',
  elementName: ElementName.ChainEthereum, // TODO: Add ElementName.ChainLightLink to telemetry constants
  explorer: {
    name: 'LightLink Explorer',
    url: 'https://phoenix.lightlink.io/',
  },
  openseaName: undefined, // LightLink not on OpenSea
  interfaceName: 'lightlink',
  label: 'LightLink',
  logo: ETH_LOGO, // TODO: Replace with LIGHTLINK_LOGO
  networkLayer: NetworkLayer.L2,
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    address: DEFAULT_NATIVE_ADDRESS_LEGACY,
    logo: ETH_LOGO,
  },
  pendingTransactionsRetryOptions: undefined,
  rpcUrls: {
    [RPCType.Public]: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1'] },
    [RPCType.Default]: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1'] },
    [RPCType.Interface]: { http: ['https://replicator.phoenix.lightlink.io/rpc/v1'] },
  },
  tokens,
  statusPage: undefined,
  supportsV4: false, // V3 only for now
  supportsNFTs: false, // TODO: Enable if LightLink supports NFTs
  urlParam: 'lightlink',
  wrappedNativeCurrency: {
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0x7ebef2a4b1b09381ec5b9df8c5c6f2dbeca59c73',
  },
  gasConfig: GENERIC_L2_GAS_CONFIG,
  tradingApiPollingIntervalMs: 250,
  acrossProtocolAddress: undefined, // Across not on LightLink
} as const satisfies UniverseChainInfo
