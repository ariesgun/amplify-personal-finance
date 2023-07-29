/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SessionNordigen } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SessionNordigenUpdateFormInputValues = {
    createdAt?: string;
    institutionId?: string;
    agreement?: string;
    reference?: string;
    link?: string;
    status?: string;
};
export declare type SessionNordigenUpdateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
    institutionId?: ValidationFunction<string>;
    agreement?: ValidationFunction<string>;
    reference?: ValidationFunction<string>;
    link?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SessionNordigenUpdateFormOverridesProps = {
    SessionNordigenUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    institutionId?: PrimitiveOverrideProps<TextFieldProps>;
    agreement?: PrimitiveOverrideProps<TextFieldProps>;
    reference?: PrimitiveOverrideProps<TextFieldProps>;
    link?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SessionNordigenUpdateFormProps = React.PropsWithChildren<{
    overrides?: SessionNordigenUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    sessionNordigen?: SessionNordigen;
    onSubmit?: (fields: SessionNordigenUpdateFormInputValues) => SessionNordigenUpdateFormInputValues;
    onSuccess?: (fields: SessionNordigenUpdateFormInputValues) => void;
    onError?: (fields: SessionNordigenUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SessionNordigenUpdateFormInputValues) => SessionNordigenUpdateFormInputValues;
    onValidate?: SessionNordigenUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SessionNordigenUpdateForm(props: SessionNordigenUpdateFormProps): React.ReactElement;
