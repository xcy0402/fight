import { useMemo } from 'react'

import BigNumber from 'bignumber.js'

import { getContract } from 'utils/contractHelpers'

import { useContractReads, useContractRead, erc20ABI } from 'wagmi'
import { Abi, WalletClient } from 'viem'

import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { getRefAddress } from 'utils/getQueryString'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import FTPWhBh from '../abi/FTPWhBh.json'
import NFT from '../abi/NFT.json'
import PlusBHDividenTracker from '../abi/PlusBHDividenTracker.json'

// export const FTPContract = () => {
//     const { chainId } = useAccountActiveChain()
//     if (chainId == 56) return { abi: FTPWhBh as Abi, address: '0xE4833E0c59C98e77A4140Db2332de471C020D1Fa' as `0x${string}` }
//     else return { abi: FTPWhBh as Abi, address: '0x1dc12d8f74384F9AD00aaC35f618B0C142E2E6F5' as `0x${string}` }
// }
// export const NFTContract = () => {
//     const { chainId } = useAccountActiveChain()
//     if (chainId == 56) return { abi: NFT as Abi, address: '0xB1Bb7abE61F2E367fA7e95CCf20aA43050D8690e' as `0x${string}` }
//     else return { abi: NFT as Abi, address: '0xF8D0a69481820817da32988772dc25105fc4F432' as `0x${string}` }
// }
// export const PlusContract = () => {
//     const { chainId } = useAccountActiveChain()
//     if (chainId == 56) return { abi: PlusBHDividenTracker as Abi, address: '0x105cB4e4629d506Dc7aa7919C7aefA9ED99A61Db' as `0x${string}` }
//     else return { abi: PlusBHDividenTracker as Abi, address: '0x85C9AcF3952B6F0940d1582f982d923Cc3824184' as `0x${string}` }
// }
// export const FTPContract = { abi: FTPWhBh as Abi, address: '0x1dc12d8f74384F9AD00aaC35f618B0C142E2E6F5' as `0x${string}` }
// export const NFTContract = { abi: NFT as Abi, address: '0xF8D0a69481820817da32988772dc25105fc4F432' as `0x${string}` }
// export const PlusContract = { abi: PlusBHDividenTracker as Abi, address: '0x85C9AcF3952B6F0940d1582f982d923Cc3824184' as `0x${string}` }

export const FTPContract = {
  abi: FTPWhBh as Abi,
  address: '0xE4833E0c59C98e77A4140Db2332de471C020D1Fa' as `0x${string}`,
}
export const NFTContract = { abi: NFT as Abi, address: '0xB1Bb7abE61F2E367fA7e95CCf20aA43050D8690e' as `0x${string}` }
export const PlusContract = {
  abi: PlusBHDividenTracker as Abi,
  address: '0x105cB4e4629d506Dc7aa7919C7aefA9ED99A61Db' as `0x${string}`,
}
export const getFTPWhBhContract = (signer?: WalletClient) => {
  return getContract({ ...FTPContract, signer })
}
export const getNFTContract = (signer?: WalletClient) => {
  return getContract({ ...NFTContract, signer })
}
export const getPlusBHDividenTrackerContract = (signer?: WalletClient) => {
  return getContract({ ...PlusContract, signer })
}

export const useGetIncome = () => {
  const { account, chainId } = useAccountActiveChain()
  const { data: results } = useContractReads({
    watch: true,
    enabled: true,
    contracts: [
      {
        chainId,
        ...FTPContract,
        functionName: 'accountOf',
        args: [account || '0x'],
      },
      {
        chainId,
        ...FTPContract,
        functionName: 'getAccount',
        args: [account || '0x'],
      },
      {
        chainId,
        ...PlusContract,
        functionName: 'getUserPrincipal',
        args: [account || '0x'],
      },
      {
        chainId,
        ...PlusContract,
        functionName: 'getAccount',
        args: [account || '0x'],
      },
      {
        chainId,
        ...PlusContract,
        functionName: 'canClaims',
        args: [account || '0x'],
      },
    ],
  })
  return {
    investmentAmount: results ? (results[2].result ? results[2].result : 0) : 0,
    performanceAmount: results ? (results[0].result ? results[0].result[2] : 0) : 0,
    shareholdersReceived: results ? (results[0].result ? results[0].result[5] : 0) : 0,
    shareholdersReceive: results ? (results[0].result ? results[0].result[4] : 0) : 0,
    teamReceived: results ? (results[0].result ? results[0].result[7] : 0) : 0,
    teamReceive: results ? (results[0].result ? results[0].result[6] : 0) : 0,
    dividendsReceived: results ? (results[1].result ? results[1].result[4] : 0) : 0,
    dividendsReceive: results ? (results[1].result ? results[1].result[3] : 0) : 0,
    dividendsTime: results ? (results[1].result ? results[1].result[7] : 0) : 0,
    tradeReceived: results ? (results[3].result ? results[3].result[4] : 0) : 0,
    tradeReceive: results ? (results[4].result ? results[4].result : 0) : 0,
  }
}

export const useGetNftId = () => {
  const { account, chainId } = useAccountActiveChain()
  const { data, refetch } = useContractRead({
    chainId,
    ...FTPContract,
    functionName: 'accountOf',
    args: [account],
  })
  const ref = getRefAddress()
  const { data: data2, refetch: refetch2 } = useContractRead({
    chainId,
    ...FTPContract,
    functionName: 'accountOf',
    args: [ref],
  })
  return {
    refreshNftId: refetch,
    refreshTeamId: refetch2,
    nftId: data ? data[0] : 0,
    teamId: data2 ? data2[0] : 0,
  }
}

export const useGetInvestment = () => {
  const { account, chainId } = useAccountActiveChain()
  const PlusBHDividenTrackerContract = getPlusBHDividenTrackerContract()
  const { data, refetch } = useContractRead({
    chainId,
    ...PlusBHDividenTrackerContract,
    functionName: 'getUserPrincipal',
    enabled: !!account,
    args: [account],
  })
  return {
    refreshAmount: refetch,
    amount: useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data]),
    amountToStr: getBalanceAmount(
      useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data]),
    ).toString(),
  }
}

export const useGetTeamPerformance = () => {
  const { account, chainId } = useAccountActiveChain()
  const FTPWhBhContract = getFTPWhBhContract()
  const { data, refetch } = useContractRead({
    chainId,
    ...FTPWhBhContract,
    functionName: 'getUserPrincipal',
    enabled: !!account,
    args: [account],
  })
  return {
    refreshAmount: refetch,
    amount: useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data]),
    amountToStr: getBalanceAmount(
      useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data]),
    ).toString(),
  }
}

export const useGetIsShareholder = () => {
  const { account, chainId } = useAccountActiveChain()
  const { data } = useContractRead({
    chainId,
    ...NFTContract,
    functionName: 'tokensOfOwnerIn',
    enabled: !!account,
    args: [account, 0, 200],
  })
  console.log(data instanceof Array && data.length > 0)
  return {
    isShareholder: data ? data instanceof Array && data.length > 0 : false,
  }
}

export function useDividendRatio() {
  const { account, chainId } = useAccountActiveChain()
  const { nftId, teamId } = useGetNftId()
  const id = Number(nftId) === 0 ? (Number(teamId) === 0 ? 0 : Number(teamId)) : Number(nftId)
  const { data: address } = useContractRead({
    chainId,
    ...FTPContract,
    functionName: 'teamAutoDividendTrackerMap',
    enabled: !!account,
    args: [id],
  })
  console.log('1111111111', address)
  const { data: banlace } = useContractRead({
    chainId,
    abi: erc20ABI,
    address: (address || '0x') as `0x${string}`,
    functionName: 'balanceOf',
    args: [account || '0x'],
  })
  console.log('banlacebanlace', banlace)
  const { data: totalSupply } = useContractRead({
    chainId,
    abi: erc20ABI,
    address: (address || '0x') as `0x${string}`,
    functionName: 'totalSupply',
  })
  console.log('totalSupplytotalSupply', totalSupply)
  const num = new BigNumber((banlace || 0).toString())
    .dividedBy(new BigNumber((totalSupply || 0).toString()))
    .toString()
  return {
    dividendRatio: num,
  }
}

export function formatNumber(number, decimalPlaces = 6) {
  if (!number || Number.isNaN(number)) return 0
  if (Number.isInteger(Number(number))) {
    // 如果是整数，返回整数部分
    return number.toString()
  }
  // 如果是小数，保留指定位数的小数但不做四舍五入
  const str = number.toString()
  const decimalIndex = str.indexOf('.')
  if (decimalIndex !== -1) {
    return parseFloat(str.slice(0, decimalIndex + decimalPlaces + 1))
  }
  return number
}
