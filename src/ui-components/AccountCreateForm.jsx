/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Account } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function AccountCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    bank: "",
    accountNum: "",
    logo: "",
  };
  const [bank, setBank] = React.useState(initialValues.bank);
  const [accountNum, setAccountNum] = React.useState(initialValues.accountNum);
  const [logo, setLogo] = React.useState(initialValues.logo);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBank(initialValues.bank);
    setAccountNum(initialValues.accountNum);
    setLogo(initialValues.logo);
    setErrors({});
  };
  const validations = {
    bank: [],
    accountNum: [],
    logo: [{ type: "URL" }],
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
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          bank,
          accountNum,
          logo,
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
          await DataStore.save(new Account(modelFields));
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
      {...getOverrideProps(overrides, "AccountCreateForm")}
      {...rest}
    >
      <TextField
        label="Bank"
        isRequired={false}
        isReadOnly={false}
        value={bank}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank: value,
              accountNum,
              logo,
            };
            const result = onChange(modelFields);
            value = result?.bank ?? value;
          }
          if (errors.bank?.hasError) {
            runValidationTasks("bank", value);
          }
          setBank(value);
        }}
        onBlur={() => runValidationTasks("bank", bank)}
        errorMessage={errors.bank?.errorMessage}
        hasError={errors.bank?.hasError}
        {...getOverrideProps(overrides, "bank")}
      ></TextField>
      <TextField
        label="Account num"
        isRequired={false}
        isReadOnly={false}
        value={accountNum}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank,
              accountNum: value,
              logo,
            };
            const result = onChange(modelFields);
            value = result?.accountNum ?? value;
          }
          if (errors.accountNum?.hasError) {
            runValidationTasks("accountNum", value);
          }
          setAccountNum(value);
        }}
        onBlur={() => runValidationTasks("accountNum", accountNum)}
        errorMessage={errors.accountNum?.errorMessage}
        hasError={errors.accountNum?.hasError}
        {...getOverrideProps(overrides, "accountNum")}
      ></TextField>
      <TextField
        label="Logo"
        isRequired={false}
        isReadOnly={false}
        value={logo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bank,
              accountNum,
              logo: value,
            };
            const result = onChange(modelFields);
            value = result?.logo ?? value;
          }
          if (errors.logo?.hasError) {
            runValidationTasks("logo", value);
          }
          setLogo(value);
        }}
        onBlur={() => runValidationTasks("logo", logo)}
        errorMessage={errors.logo?.errorMessage}
        hasError={errors.logo?.hasError}
        {...getOverrideProps(overrides, "logo")}
      ></TextField>
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
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
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
