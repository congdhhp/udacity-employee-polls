import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import LoginPage from '../views/pages/Login';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom';

describe('LoginPage component', () => {
    // Helper function to render the component with necessary context
    const renderLoginPage = () =>
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </MemoryRouter>
        );

    test('should match the snapshot', () => {
        const { container } = renderLoginPage();
        expect(container).toMatchSnapshot();
    });

    test('should update input values on change', () => {
        renderLoginPage();

        const usernameInput = screen.getByTestId('username');
        const passwordInput = screen.getByTestId('password');

        fireEvent.change(usernameInput, { target: { value: 'test1' } });
        fireEvent.change(passwordInput, { target: { value: 'pass1' } });

        expect(usernameInput.value).toBe('test1');
        expect(passwordInput.value).toBe('pass1');
    });

    test('should render username and password fields', () => {
        renderLoginPage();

        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
    });
});
