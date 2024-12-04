import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { store } from '../reducers/store';
import '@testing-library/jest-dom';
import App from '../views/components/App';

describe('App component', () => {
    // Helper function to wrap the App component in a Provider
    const renderApp = () => 
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );

    test('should match the snapshot', () => {
        const { container } = renderApp();
        expect(container).toMatchSnapshot();
    });
});
