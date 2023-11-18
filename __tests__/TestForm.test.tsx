import {expect, test} from '@jest/globals';
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';
import React from 'react';
import TestForm from '../TestForm';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<TestForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('has the email component', async () => {
  render(<TestForm />);
  expect(await screen.findByPlaceholderText('Email')).toBeVisible();
});

test('enter form email 1', async () => {
  let email = '';
  function handleChangeEmail(text: string) {
    email = text;
  }

  render(<TestForm onChangeEmail={handleChangeEmail} />);
  const user = userEvent.setup();
  await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  expect(email).toEqual('test@example.com');
});

test('enter form email 2', async () => {
  let email = '';
  function handleChangeEmail(text: string) {
    email = text;
  }
  let wasValidating = false;
  let resolve = null;
  const promise = new Promise((res, _rej) => {
    resolve = res;
  });
  function handleFormStateChange(isValidating: boolean) {
    if (!wasValidating && isValidating) {
      wasValidating = true;
    } else if (wasValidating && !isValidating) {
      wasValidating = false;
      resolve!();
    }
  }

  render(
    <TestForm
      onChangeEmail={handleChangeEmail}
      onFormStateChange={handleFormStateChange}
    />,
  );
  fireEvent.changeText(
    screen.getByPlaceholderText('Email'),
    'test@example.com',
  );
  await act(async () => {
    await promise;
  }); // .then(() => {});
  expect(email).toEqual('test@example.com');
});
