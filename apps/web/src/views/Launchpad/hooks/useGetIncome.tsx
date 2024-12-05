import { getContract } from 'utils/contractHelpers'

import { useContractReads, erc20ABI } from 'wagmi'
import { Abi, WalletClient } from 'viem'

import useAccountActiveChain from 'hooks/useAccountActiveChain'
import PreSaleToken from '../abi/PreSaleToken.json'

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

export const PreSaleTokenContract = {
  abi: PreSaleToken as Abi,
  address: '0x33dB772660719C264C53278ECcfe242b1e6900F2' as `0x${string}`,
}

export const balanceContract = {
  abi: erc20ABI as Abi,
  address: '0x33dB772660719C264C53278ECcfe242b1e6900F2' as `0x${string}`,
}

export const getPreSaleTokenContract = (signer?: WalletClient) => {
  return getContract({ ...PreSaleTokenContract, signer })
}

export const useGetIncome = () => {
  const { account, chainId } = useAccountActiveChain()
  const { data: results } = useContractReads({
    watch: true,
    enabled: true,
    contracts: [
      {
        chainId,
        ...PreSaleTokenContract,
        functionName: 'price',
      },
      {
        chainId,
        ...PreSaleTokenContract,
        functionName: 'minBNB',
      },
      {
        chainId,
        ...PreSaleTokenContract,
        functionName: 'maxBNB',
      },
      {
        chainId,
        ...PreSaleTokenContract,
        functionName: 'getCountOfSons',
        args: [account || '0x'],
      },
      {
        chainId,
        ...PreSaleTokenContract,
        functionName: 'sonContributions',
        args: [account || '0x'],
      },
      {
        chainId,
        ...balanceContract,
        functionName: 'balanceOf',
        args: [account || '0x'],
      },
    ],
  })
  return {
    price: results ? (results[0].result ? results[0].result : 0) : 0,
    minBNB: results ? (results[1].result ? results[1].result : 0) : 0,
    maxBNB: results ? (results[2].result ? results[2].result : 0) : 0,
    people: results ? (results[3].result ? results[3].result : 0) : 0,
    amount: results ? (results[4].result ? results[4].result : 0) : 0,
    balance: results ? (results[5].result ? results[5].result : 0) : 0,
  }
}

export function formatNumber(number, decimalPlaces = 6) {
  if (!number || Number.isNaN(number) || number === 'NaN') return 0
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
