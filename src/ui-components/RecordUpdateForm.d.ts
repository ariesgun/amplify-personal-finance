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
    transactionDate?: string;
    category?: string;
    currency?: string;
    amount?: number;
    description?: string;
};
export declare type RecordUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    transactionDate?: ValidationFunction<string>;
    category?: ValidationFunction<string>;
    currency?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type RecordUpdateFormOverridesProps = {
    RecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    transactionDate?: PrimitiveOverrideProps<TextFieldProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
    RowGrid3?: PrimitiveOverrideProps<GridProps>;
    currency?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
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
    onCancel?: () => void;
    onChange?: (fields: RecordUpdateFormInputValues) => RecordUpdateFormInputValues;
    onValidate?: RecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function RecordUpdateForm(props: RecordUpdateFormProps): React.ReactElement;
