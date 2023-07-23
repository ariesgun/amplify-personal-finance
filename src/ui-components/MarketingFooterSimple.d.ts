/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { DividerProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
import { LogoWithTextProps } from "./LogoWithText";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarketingFooterSimpleOverridesProps = {
    MarketingFooterSimple?: PrimitiveOverrideProps<FlexProps>;
    Divider?: PrimitiveOverrideProps<DividerProps>;
    "Frame 433"?: PrimitiveOverrideProps<FlexProps>;
    LogoWithText?: LogoWithTextProps;
    "\u00A9 2023 AWS Amplify UI. All rights reserved."?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type MarketingFooterSimpleProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: MarketingFooterSimpleOverridesProps | undefined | null;
}>;
export default function MarketingFooterSimple(props: MarketingFooterSimpleProps): React.ReactElement;
