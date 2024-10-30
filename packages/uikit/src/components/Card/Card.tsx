import React from "react";
import { StyledCard, StyledCardInner } from "./StyledCard";
import { CardProps } from "./types";

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  ribbon,
  children,
  background = "linear-gradient(150deg,#3b265e,#533b7f)",
  innerCardProps,
  ...props
}) => {
  return (
    <StyledCard {...props}>
      <StyledCardInner {...innerCardProps} background={background} hasCustomBorder={!!props.borderBackground}>
        {ribbon}
        {children}
      </StyledCardInner>
    </StyledCard>
  );
};
export default Card;
