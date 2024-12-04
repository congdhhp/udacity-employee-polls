import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom';
import MainLayout from '../views/layouts/MainLayout';

describe('MainLayout component', () => {
    // Helper function to render the component with necessary context
    const renderMainLayout = () =>
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <MainLayout />
                </Provider>
            </MemoryRouter>
        );

    test('should match the snapshot', () => {
        const { container } = renderMainLayout();
        expect(container).toMatchSnapshot();
    });
});
