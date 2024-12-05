import { ChainId } from "@pancakeswap/chains";
import { useHttpLocations } from "@pancakeswap/hooks";
import { Currency } from "@pancakeswap/sdk";
import { BinanceIcon, TokenLogo } from "@pancakeswap/uikit";
import { useMemo } from "react";
import { styled } from "styled-components";
import { space, SpaceProps } from "styled-system";

import fight from "./fight.png";
import ftp from "./ftp.png";
import hb from "./hb.png";
import { getCurrencyLogoUrls } from "./utils";

const StyledLogo = styled(TokenLogo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;

  ${space}
`;

export function CurrencyLogo({
  currency,
  size = "24px",
  style,
  useTrustWalletUrl,
  ...props
}: {
  currency?: Currency & {
    logoURI?: string | undefined;
  };
  size?: string;
  style?: React.CSSProperties;
  useTrustWalletUrl?: boolean;
} & SpaceProps) {
  const uriLocations = useHttpLocations(currency?.logoURI);

  const srcs: string[] = useMemo(() => {
    if (currency?.logoURI === "fight" || currency?.symbol === "FIGHT") return [fight.src];
    if (currency?.logoURI === "ftp" || currency?.symbol === "FTP") return [ftp.src];
    if (currency?.logoURI === "hb" || currency?.symbol === "HB") return [hb.src];
    if (currency?.isNative) return [];

    if (currency?.isToken) {
      const logoUrls = getCurrencyLogoUrls(currency, { useTrustWallet: useTrustWalletUrl });

      if (currency?.logoURI) {
        return [...uriLocations, ...logoUrls];
      }
      return [...logoUrls];
    }
    return [];
  }, [currency, uriLocations, useTrustWalletUrl]);
  // console.log("currency?.logoURI=='fight'",currency?.logoURI=='fight',fight);
  // if(currency?.logoURI=='fight'){
  //   return (
  //     <StyledLogo
  //       size={size}
  //       srcs={[fight.src]}
  //       width={size}
  //       style={style}
  //       {...props}
  //     />
  //   );
  // }
  if (currency?.isNative) {
    if (currency.chainId === ChainId.BSC) {
      return <BinanceIcon width={size} style={style} {...props} />;
    }
    return (
      <StyledLogo
        size={size}
        srcs={[`https://assets.pancakeswap.finance/web/native/${currency.chainId}.png`]}
        width={size}
        style={style}
        {...props}
      />
    );
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? "token"} logo`} style={style} {...props} />;
}
