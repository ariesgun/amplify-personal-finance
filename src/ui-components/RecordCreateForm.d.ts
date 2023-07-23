/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RecordCreateFormInputValues = {
    name?: string;
    category?: string;
    amount?: number;
    transactionDate?: string;
    currency?: string;
    description?: string;
};
export declare type RecordCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    transactionDate?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecordCreateFormOverridesProps = {
    RecordCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    transactionDate?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecordCreateFormProps = React.PropsWithChildren<{
    overrides?: RecordCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: RecordCreateFormInputValues) => RecordCreateFormInputValues;
    onSuccess?: (fields: RecordCreateFormInputValues) => void;
    onError?: (fields: RecordCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecordCreateFormInputValues) => RecordCreateFormInputValues;
    onValidate?: RecordCreateFormValidationValues;
} & React.CSSProperties>;
export default function RecordCreateForm(props: RecordCreateFormProps): React.ReactElement;
