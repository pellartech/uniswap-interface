import { FeatureFlags, getFeatureFlag, useFeatureFlag } from '@universe/gating'
import { useMemo } from 'react'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { filterChainIdsByFeatureFlag } from 'uniswap/src/features/chains/utils'

export const getFeatureFlaggedChainIds = createGetFeatureFlaggedChainIds({
  getMonadStatus: () => getFeatureFlag(FeatureFlags.Monad),
  getSoneiumStatus: () => getFeatureFlag(FeatureFlags.Soneium),
  getSolanaStatus: () => getFeatureFlag(FeatureFlags.Solana),
})

// Used to feature flag chains. If a chain is not included in the object, it is considered enabled by default.
export function useFeatureFlaggedChainIds(): UniverseChainId[] {
  const monadStatus = useFeatureFlag(FeatureFlags.Monad)
  const soneiumStatus = useFeatureFlag(FeatureFlags.Soneium)
  const solanaStatus = useFeatureFlag(FeatureFlags.Solana)
  return useMemo(
    () =>
      createGetFeatureFlaggedChainIds({
        getMonadStatus: () => monadStatus,
        getSoneiumStatus: () => soneiumStatus,
        getSolanaStatus: () => solanaStatus,
      })(),
    [monadStatus, soneiumStatus, solanaStatus],
  )
}

export function createGetFeatureFlaggedChainIds(ctx: {
  getMonadStatus: () => boolean
  getSoneiumStatus: () => boolean
  getSolanaStatus: () => boolean
}): () => UniverseChainId[] {
  return () =>
    // Single-chain deployment: only LightLink is enabled
    // All other chains are disabled via feature flags
    filterChainIdsByFeatureFlag({
      [UniverseChainId.LightLink]: true,
      [UniverseChainId.Mainnet]: false,
      [UniverseChainId.Unichain]: false,
      [UniverseChainId.Polygon]: false,
      [UniverseChainId.ArbitrumOne]: false,
      [UniverseChainId.Optimism]: false,
      [UniverseChainId.Base]: false,
      [UniverseChainId.Bnb]: false,
      [UniverseChainId.Blast]: false,
      [UniverseChainId.Avalanche]: false,
      [UniverseChainId.Celo]: false,
      [UniverseChainId.WorldChain]: false,
      [UniverseChainId.Soneium]: false,
      [UniverseChainId.Zora]: false,
      [UniverseChainId.Zksync]: false,
      [UniverseChainId.Monad]: false,
      [UniverseChainId.Sepolia]: false,
      [UniverseChainId.UnichainSepolia]: false,
      [UniverseChainId.Solana]: false,
    })
}
