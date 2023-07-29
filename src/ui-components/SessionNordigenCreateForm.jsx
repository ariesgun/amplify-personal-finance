/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SessionNordigen } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SessionNordigenCreateForm(props) {
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
    createdAt: "",
    institutionId: "",
    agreement: "",
    reference: "",
    link: "",
    status: "",
  };
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [institutionId, setInstitutionId] = React.useState(
    initialValues.institutionId
  );
  const [agreement, setAgreement] = React.useState(initialValues.agreement);
  const [reference, setReference] = React.useState(initialValues.reference);
  const [link, setLink] = React.useState(initialValues.link);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatedAt(initialValues.createdAt);
    setInstitutionId(initialValues.institutionId);
    setAgreement(initialValues.agreement);
    setReference(initialValues.reference);
    setLink(initialValues.link);
    setStatus(initialValues.status);
    setErrors({});
  };
  const validations = {
    createdAt: [],
    institutionId: [],
    agreement: [],
    reference: [],
    link: [],
    status: [],
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
          createdAt,
          institutionId,
          agreement,
          reference,
          link,
          status,
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
          await DataStore.save(new SessionNordigen(modelFields));
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
      {...getOverrideProps(overrides, "SessionNordigenCreateForm")}
      {...rest}
    >
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt: value,
              institutionId,
              agreement,
              reference,
              link,
              status,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Institution id"
        isRequired={false}
        isReadOnly={false}
        value={institutionId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              institutionId: value,
              agreement,
              reference,
              link,
              status,
            };
            const result = onChange(modelFields);
            value = result?.institutionId ?? value;
          }
          if (errors.institutionId?.hasError) {
            runValidationTasks("institutionId", value);
          }
          setInstitutionId(value);
        }}
        onBlur={() => runValidationTasks("institutionId", institutionId)}
        errorMessage={errors.institutionId?.errorMessage}
        hasError={errors.institutionId?.hasError}
        {...getOverrideProps(overrides, "institutionId")}
      ></TextField>
      <TextField
        label="Agreement"
        isRequired={false}
        isReadOnly={false}
        value={agreement}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              institutionId,
              agreement: value,
              reference,
              link,
              status,
            };
            const result = onChange(modelFields);
            value = result?.agreement ?? value;
          }
          if (errors.agreement?.hasError) {
            runValidationTasks("agreement", value);
          }
          setAgreement(value);
        }}
        onBlur={() => runValidationTasks("agreement", agreement)}
        errorMessage={errors.agreement?.errorMessage}
        hasError={errors.agreement?.hasError}
        {...getOverrideProps(overrides, "agreement")}
      ></TextField>
      <TextField
        label="Reference"
        isRequired={false}
        isReadOnly={false}
        value={reference}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              institutionId,
              agreement,
              reference: value,
              link,
              status,
            };
            const result = onChange(modelFields);
            value = result?.reference ?? value;
          }
          if (errors.reference?.hasError) {
            runValidationTasks("reference", value);
          }
          setReference(value);
        }}
        onBlur={() => runValidationTasks("reference", reference)}
        errorMessage={errors.reference?.errorMessage}
        hasError={errors.reference?.hasError}
        {...getOverrideProps(overrides, "reference")}
      ></TextField>
      <TextField
        label="Link"
        isRequired={false}
        isReadOnly={false}
        value={link}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              institutionId,
              agreement,
              reference,
              link: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.link ?? value;
          }
          if (errors.link?.hasError) {
            runValidationTasks("link", value);
          }
          setLink(value);
        }}
        onBlur={() => runValidationTasks("link", link)}
        errorMessage={errors.link?.errorMessage}
        hasError={errors.link?.hasError}
        {...getOverrideProps(overrides, "link")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              createdAt,
              institutionId,
              agreement,
              reference,
              link,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
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
