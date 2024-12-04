import {render, screen, fireEvent} from '@testing-library/react'
import * as React from 'react';
import LoginPage from '../views/pages/Login';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom'
describe('LoginPage', () => {
    test('will match snapshot',  () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginPage/>
                </Provider>
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    })

    test('Will fired an event',  () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginPage/>
                </Provider>
            </MemoryRouter>
        );
        var usernameInput = screen.getByTestId('username');
        var passwordInput = screen.getByTestId('password');
        fireEvent.change(usernameInput, { target: { value: 'test1' } })
        fireEvent.change(passwordInput, { target: { value: 'pass1' } })
        expect(screen.getByTestId('username').value).toBe('test1');
        expect(screen.getByTestId('password').value).toBe('pass1');
    })

    test('Check field exist',  () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <LoginPage/>
                </Provider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('username')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();;
    })
})