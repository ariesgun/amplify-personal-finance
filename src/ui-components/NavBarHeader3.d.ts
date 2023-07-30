/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NavBarHeader3OverridesProps = {
    NavBarHeader3?: PrimitiveOverrideProps<FlexProps>;
    "Frame 5"?: PrimitiveOverrideProps<FlexProps>;
    "Amplify Mark"?: PrimitiveOverrideProps<ViewProps>;
    Union?: PrimitiveOverrideProps<IconProps>;
    Dashboard?: PrimitiveOverrideProps<TextProps>;
    Records?: PrimitiveOverrideProps<TextProps>;
    BankSync?: PrimitiveOverrideProps<TextProps>;
    Profile?: PrimitiveOverrideProps<TextProps>;
    "Frame 321"?: PrimitiveOverrideProps<FlexProps>;
    SignOut?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type NavBarHeader3Props = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: NavBarHeader3OverridesProps | undefined | null;
}>;
export default function NavBarHeader3(props: NavBarHeader3Props): React.ReactElement;
