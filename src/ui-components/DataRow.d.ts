/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DataRowOverridesProps = {
    DataRow?: PrimitiveOverrideProps<FlexProps>;
    "Frame 437"?: PrimitiveOverrideProps<FlexProps>;
    label?: PrimitiveOverrideProps<TextProps>;
    category?: PrimitiveOverrideProps<TextProps>;
    datestamp?: PrimitiveOverrideProps<TextProps>;
    value?: PrimitiveOverrideProps<TextProps>;
    EditButton?: PrimitiveOverrideProps<ButtonProps>;
    RemoveButton?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type DataRowProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: DataRowOverridesProps | undefined | null;
}>;
export default function DataRow(props: DataRowProps): React.ReactElement;
