/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Record } from "../models";
import { SortDirection } from "@aws-amplify/datastore";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import DataRow from "./DataRow";
import { Collection } from "@aws-amplify/ui-react";
export default function DataRowCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsPagination = {
    sort: (s) => s.transactionDate(SortDirection.DESCENDING),
  };
  const [items, setItems] = React.useState(undefined);
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Record,
    pagination: itemsPagination,
  }).items;
  React.useEffect(() => {
    if (itemsProp !== undefined) {
      setItems(itemsProp);
      return;
    }
    setItems(itemsDataStore);
  }, [itemsProp, itemsDataStore]);
  return (
    <Collection
      type="list"
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={10}
      direction="column"
      justifyContent="left"
      items={items || []}
      {...getOverrideProps(overrides, "DataRowCollection")}
      {...rest}
    >
      {(item, index) => (
        <DataRow
          record={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></DataRow>
      )}
    </Collection>
  );
}
