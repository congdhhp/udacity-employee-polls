import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom';
import QuestionCategory from '../views/components/QuestionCategory';

describe('HomePage component', () => {
    // Helper function to render the component with necessary context
    const renderHomePage = () =>
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <QuestionCategory title="New Questions" questions={[]} />
                    <QuestionCategory title="Done" questions={[]} />
                </Provider>
            </MemoryRouter>
        );

    test('should match the snapshot', () => {
        const { container } = renderHomePage();
        expect(container).toMatchSnapshot();
    });

    test('should render categories with correct titles', () => {
        renderHomePage();
        
        expect(screen.getByText('New Questions')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
    });
});
