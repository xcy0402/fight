import { useContractReads } from 'wagmi'
import { Abi, WalletClient } from 'viem'
import { useEffect, useMemo } from 'react';
import FTPWhBh from '../abi/FTPWhBh.json';
import NFT from '../abi/NFT.json';
import PlusBHDividenTracker from '../abi/PlusBHDividenTracker.json';
import { getContract } from 'utils/contractHelpers'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useContractRead } from 'wagmi'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { getRefAddress } from 'utils/getQueryString'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
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

export const FTPContract = { abi: FTPWhBh as Abi, address: '0xE4833E0c59C98e77A4140Db2332de471C020D1Fa' as `0x${string}` }
export const NFTContract = { abi: NFT as Abi, address: '0xB1Bb7abE61F2E367fA7e95CCf20aA43050D8690e' as `0x${string}` }
export const PlusContract = { abi: PlusBHDividenTracker as Abi, address: '0x105cB4e4629d506Dc7aa7919C7aefA9ED99A61Db' as `0x${string}` }
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
    if (!account) return {};
    const { data: results } = useContractReads({
        watch: true,
        enabled: true,
        contracts: [
            {
                chainId,
                ...FTPContract,
                functionName: 'accountOf',
                args: [account],
            },
            {
                chainId,
                ...FTPContract,
                functionName: 'getAccount',
                args: [account],
            },
            {
                chainId,
                ...PlusContract,
                functionName: 'getUserPrincipal',
                args: [account],
            },
            {
                chainId,
                ...PlusContract,
                functionName: 'getAccount',
                args: [account],
            },
        ],
    })
    console.log(results);
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
        tradeReceive: results ? (results[3].result ? results[3].result[3] : 0) : 0,
    }
}


export const useGetNftId = () => {
    const { account, chainId } = useAccountActiveChain()
    const FTPWhBhContract = getFTPWhBhContract()
    const { data, refetch } = useContractRead({
        chainId,
        ...FTPWhBhContract,
        functionName: 'accountOf',
        args: [account],
    })
    const ref = getRefAddress();
    if (!ref) return {
        refreshNftId: refetch,
        nftId: data ? data[0] : 0,
        teamId: 0,
    }
    const { data: data2, refetch: refetch2 } = useContractRead({
        chainId,
        ...FTPWhBhContract,
        functionName: 'accountOf',
        args: [ref],
    });
    useEffect(() => {

    }, [account])
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
        amountToStr: getBalanceAmount(useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data])).toString()
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
        amountToStr: getBalanceAmount(useMemo(() => (typeof data !== 'undefined' ? new BigNumber(data!.toString()) : BIG_ZERO), [data])).toString()
    }
}

export const useGetIsShareholder = () => {
    const { account, chainId } = useAccountActiveChain()
    const NFTContract = getNFTContract()
    const { data, refetch } = useContractRead({
        chainId,
        ...NFTContract,
        functionName: 'tokensOfOwnerIn',
        enabled: !!account,
        args: [account, 0, 200],
    })
    console.log(data);
    return {
        isShareholder: data ? !!data!.length : false
    }
}