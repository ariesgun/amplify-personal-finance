/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Record } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function RecordCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const { tokens } = useTheme();
  const initialValues = {
    name: "",
    transactionDate: "",
    category: "",
    currency: "",
    amount: "",
    description: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [transactionDate, setTransactionDate] = React.useState(
    initialValues.transactionDate
  );
  const [category, setCategory] = React.useState(initialValues.category);
  const [currency, setCurrency] = React.useState(initialValues.currency);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setTransactionDate(initialValues.transactionDate);
    setCategory(initialValues.category);
    setCurrency(initialValues.currency);
    setAmount(initialValues.amount);
    setDescription(initialValues.description);
    setErrors({});
  };
  const validations = {
    name: [],
    transactionDate: [],
    category: [],
    currency: [],
    amount: [],
    description: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap={tokens.space.medium.value}
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          transactionDate,
          category,
          currency,
          amount,
          description,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new Record(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "RecordCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              transactionDate,
              category,
              currency,
              amount,
              description,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Transaction date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={transactionDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              transactionDate: value,
              category,
              currency,
              amount,
              description,
            };
            const result = onChange(modelFields);
            value = result?.transactionDate ?? value;
          }
          if (errors.transactionDate?.hasError) {
            runValidationTasks("transactionDate", value);
          }
          setTransactionDate(value);
        }}
        onBlur={() => runValidationTasks("transactionDate", transactionDate)}
        errorMessage={errors.transactionDate?.errorMessage}
        hasError={errors.transactionDate?.hasError}
        {...getOverrideProps(overrides, "transactionDate")}
      ></TextField>
      <TextField
        label="Category"
        isRequired={false}
        isReadOnly={false}
        value={category}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              transactionDate,
              category: value,
              currency,
              amount,
              description,
            };
            const result = onChange(modelFields);
            value = result?.category ?? value;
          }
          if (errors.category?.hasError) {
            runValidationTasks("category", value);
          }
          setCategory(value);
        }}
        onBlur={() => runValidationTasks("category", category)}
        errorMessage={errors.category?.errorMessage}
        hasError={errors.category?.hasError}
        {...getOverrideProps(overrides, "category")}
      ></TextField>
      <Grid
        columnGap="inherit"
        rowGap="inherit"
        templateColumns="repeat(2, auto)"
        {...getOverrideProps(overrides, "RowGrid3")}
      >
        <TextField
          label="Currency"
          isRequired={false}
          isReadOnly={false}
          value={currency}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                name,
                transactionDate,
                category,
                currency: value,
                amount,
                description,
              };
              const result = onChange(modelFields);
              value = result?.currency ?? value;
            }
            if (errors.currency?.hasError) {
              runValidationTasks("currency", value);
            }
            setCurrency(value);
          }}
          onBlur={() => runValidationTasks("currency", currency)}
          errorMessage={errors.currency?.errorMessage}
          hasError={errors.currency?.hasError}
          {...getOverrideProps(overrides, "currency")}
        ></TextField>
        <TextField
          label="Amount"
          isRequired={false}
          isReadOnly={false}
          type="number"
          step="any"
          value={amount}
          onChange={(e) => {
            let value = isNaN(parseFloat(e.target.value))
              ? e.target.value
              : parseFloat(e.target.value);
            if (onChange) {
              const modelFields = {
                name,
                transactionDate,
                category,
                currency,
                amount: value,
                description,
              };
              const result = onChange(modelFields);
              value = result?.amount ?? value;
            }
            if (errors.amount?.hasError) {
              runValidationTasks("amount", value);
            }
            setAmount(value);
          }}
          onBlur={() => runValidationTasks("amount", amount)}
          errorMessage={errors.amount?.errorMessage}
          hasError={errors.amount?.hasError}
          {...getOverrideProps(overrides, "amount")}
        ></TextField>
      </Grid>
      <TextAreaField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              transactionDate,
              category,
              currency,
              amount,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap={tokens.space.medium.value}
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
