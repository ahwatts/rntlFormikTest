import {Formik, type FormikProps} from 'formik';
import React, {useEffect} from 'react';
import {Button, TextInput, View} from 'react-native';

export interface TestFormValues {
  email: string;
}

export interface TestFormProps {
  onChangeEmail?: (text: string) => void;
  onSubmitForm?: (values: TestFormValues) => void;
  onFormStateChange?: (isValidating: boolean) => void;
}

function TestFormInnards({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  isValidating,

  onChangeEmail,
  onFormStateChange,
}: TestFormProps & FormikProps<TestFormValues>) {
  const formikHandleChangeEmail = handleChange('email');
  function handleChangeEmail(text: string) {
    if (onChangeEmail) {
      onChangeEmail(text);
    }
    formikHandleChangeEmail(text);
  }

  useEffect(() => {
    if (onFormStateChange) {
      onFormStateChange(isValidating);
    }
  }, [onFormStateChange, isValidating]);

  return (
    <View>
      <TextInput
        onChangeText={handleChangeEmail}
        onBlur={handleBlur('email')}
        value={values.email}
        placeholder="Email"
      />
      <Button onPress={handleSubmit as any} title="Submit" />
    </View>
  );
}

export default function TestForm(props: TestFormProps) {
  return (
    <Formik
      initialValues={{email: ''}}
      onSubmit={(values, _bag) => {
        if (props.onSubmitForm) {
          props.onSubmitForm(values);
        }
        console.log('Submitted', values);
      }}>
      {formikProps => <TestFormInnards {...props} {...formikProps} />}
    </Formik>
  );
}
