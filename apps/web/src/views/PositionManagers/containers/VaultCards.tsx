import { isThirdPartyVaultConfig } from '@pancakeswap/position-managers'
import { memo, useMemo } from 'react'
import { useFarmsV3WithPositionsAndBooster } from 'state/farmsV3/hooks'

import { CardLayout } from '../components'
import {
  PositionManagerStatus,
  useFetchApr,
  usePositionManagerDetailsData,
  usePositionManagerStatus,
  useSearch,
  useSortBy,
  useStakeOnly,
  useVaultConfigs,
} from '../hooks'
import { ThirdPartyVaultCard } from './PCSVaultCard'

export const VaultCards = memo(function VaultCards() {
  const configs = useVaultConfigs()
  const [search] = useSearch()
  const { status } = usePositionManagerStatus()
  const [sortBy] = useSortBy()
  const [stakeOnly] = useStakeOnly()
  const { data: positionMangerDetailsData, updateData: updatePositionMangerDetailsData } =
    usePositionManagerDetailsData()
  const aprTimeWindows = useMemo(() => {
    const timeWindows = new Set<number>()
    configs.forEach((config) => {
      if (config?.aprTimeWindow) {
        timeWindows.add(config.aprTimeWindow)
      }
    })
    return Array.from(timeWindows)
  }, [configs])
  const aprDataList = useFetchApr(aprTimeWindows)
  const { farmsWithPositions: farmsV3 } = useFarmsV3WithPositionsAndBooster()
  const cards = configs
    .filter((d) => {
      if (stakeOnly) {
        return positionMangerDetailsData?.[d.id]?.isUserStaked
      }
      return true
    })
    .filter((d) => {
      if (search) {
        return `${d.currencyA.symbol}-${d.currencyB.symbol}${d.name}`.toLowerCase().includes(search.toLowerCase())
      }
      return true
    })
    .filter(() => {
      if (status === PositionManagerStatus.FINISHED) {
        return false
        // return d.endTimestamp <= Date.now() / 1000
      }
      return true
      // return d.endTimestamp > Date.now() / 1000
    })
    .sort((a, b) => {
      if (sortBy === 'apr') {
        return (positionMangerDetailsData?.[b.id]?.apr ?? 0) - (positionMangerDetailsData?.[a.id]?.apr ?? 0)
      }
      if (sortBy === 'earned') {
        return (positionMangerDetailsData?.[b.id]?.earned ?? 0) - (positionMangerDetailsData?.[a.id]?.earned ?? 0)
      }
      if (sortBy === 'totalStaked') {
        return (
          (positionMangerDetailsData?.[b.id]?.totalStaked ?? 0) - (positionMangerDetailsData?.[a.id]?.totalStaked ?? 0)
        )
      }
      if (sortBy === 'latest') {
        return b.id - a.id
      }
      return a.id // default sort by sequence of configs
    })
    .map((config) => {
      if (isThirdPartyVaultConfig(config)) {
        return (
          <ThirdPartyVaultCard
            key={config.id}
            config={config}
            farmsV3={farmsV3}
            aprDataList={aprDataList}
            updatePositionMangerDetailsData={updatePositionMangerDetailsData}
          />
        )
      }
      return null
    })

  return <CardLayout>{cards}</CardLayout>
})
