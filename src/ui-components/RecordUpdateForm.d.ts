/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Record } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type RecordUpdateFormInputValues = {
    name?: string;
    category?: string;
    amount?: number;
    transactionDate?: string;
    currency?: string;
    description?: string;
};
export declare type RecordUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    transactionDate?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecordUpdateFormOverridesProps = {
    RecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    transactionDate?: PrimitiveOverrideProps<TextFieldProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type RecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: RecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    record?: Record;
    onSubmit?: (fields: RecordUpdateFormInputValues) => RecordUpdateFormInputValues;
    onSuccess?: (fields: RecordUpdateFormInputValues) => void;
    onError?: (fields: RecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: RecordUpdateFormInputValues) => RecordUpdateFormInputValues;
    onValidate?: RecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RecordUpdateForm(props: RecordUpdateFormProps): React.ReactElement;
