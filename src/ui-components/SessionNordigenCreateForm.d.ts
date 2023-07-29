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
export declare type SessionNordigenCreateFormInputValues = {
    createdAt?: string;
    institutionId?: string;
    agreement?: string;
    reference?: string;
    link?: string;
    status?: string;
};
export declare type SessionNordigenCreateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    institutionId?: ValidationFunction<string>;
    agreement?: ValidationFunction<string>;
    reference?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionNordigenCreateFormOverridesProps = {
    SessionNordigenCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    institutionId?: PrimitiveOverrideProps<TextFieldProps>;
    agreement?: PrimitiveOverrideProps<TextFieldProps>;
    reference?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionNordigenCreateFormProps = React.PropsWithChildren<{
    overrides?: SessionNordigenCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SessionNordigenCreateFormInputValues) => SessionNordigenCreateFormInputValues;
    onSuccess?: (fields: SessionNordigenCreateFormInputValues) => void;
    onError?: (fields: SessionNordigenCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionNordigenCreateFormInputValues) => SessionNordigenCreateFormInputValues;
    onValidate?: SessionNordigenCreateFormValidationValues;
} & React.CSSProperties>;
export default function SessionNordigenCreateForm(props: SessionNordigenCreateFormProps): React.ReactElement;
