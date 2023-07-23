/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { DataRowProps } from "./DataRow";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DataRowCollectionOverridesProps = {
    DataRowCollection?: PrimitiveOverrideProps<CollectionProps>;
    DataRow?: DataRowProps;
} & EscapeHatchProps;
export declare type DataRowCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => DataRowProps;
} & {
    overrides?: DataRowCollectionOverridesProps | undefined | null;
}>;
export default function DataRowCollection(props: DataRowCollectionProps): React.ReactElement;
