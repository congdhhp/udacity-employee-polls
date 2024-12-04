import {render} from '@testing-library/react'
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom'
import MainLayout from '../views/layouts/MainLayout';
describe('App', () => {
    test('will match snapshot',  () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var component = render(
          <MemoryRouter>
            <Provider store={store}>
                <MainLayout/>
            </Provider>
          </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    })
})