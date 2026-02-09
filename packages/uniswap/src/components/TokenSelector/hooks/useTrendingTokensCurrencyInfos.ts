import { ALL_NETWORKS_ARG, CustomRankingType } from '@universe/api'
import { useMemo } from 'react'
import { tokenRankingsStatToCurrencyInfo, useTokenRankingsQuery } from 'uniswap/src/data/rest/tokenRankings'
import { UniverseChainId } from 'uniswap/src/features/chains/types'
import { CurrencyInfo } from 'uniswap/src/features/dataApi/types'

// Chains not supported by Uniswap's explore backend — skip trending tokens query
const UNSUPPORTED_TRENDING_CHAINS = new Set<UniverseChainId>([UniverseChainId.LightLink])

const EMPTY_REFETCH = (): void => {}

export function useTrendingTokensCurrencyInfos(
  chainFilter: Maybe<UniverseChainId>,
  skip?: boolean,
): {
  data: CurrencyInfo[] | undefined
  error: Error | undefined
  refetch: () => void
  loading: boolean
} {
  const shouldSkip = skip || (chainFilter != null && UNSUPPORTED_TRENDING_CHAINS.has(chainFilter))

  const { data, isLoading, error, refetch, isFetching } = useTokenRankingsQuery(
    {
      chainId: chainFilter?.toString() ?? ALL_NETWORKS_ARG,
    },
    !shouldSkip,
  )

  const trendingTokens = data?.tokenRankings[CustomRankingType.Trending]?.tokens
  const formattedTokens = useMemo(
    () => trendingTokens?.map(tokenRankingsStatToCurrencyInfo).filter((t): t is CurrencyInfo => Boolean(t)),
    [trendingTokens],
  )

  if (shouldSkip) {
    return { data: [], loading: false, error: undefined, refetch: EMPTY_REFETCH }
  }

  return { data: formattedTokens, loading: isLoading || isFetching, error: error ?? undefined, refetch }
}
