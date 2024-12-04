import {render, screen} from '@testing-library/react'
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../reducers/store';
import '@testing-library/jest-dom'
import QuestionCategory from '../views/components/QuestionCategory';
describe('HomePage', () => {
    test('will match snapshot',  () => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        var component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <QuestionCategory title="New Questions" questions={[]}/>
                    <QuestionCategory title="Done" questions={[]}/>
                </Provider>
            </MemoryRouter>
        );
        expect(component).toMatchSnapshot();
    })


    test('Categories has showed',() => {
        // eslint-disable-next-line testing-library/render-result-naming-convention
        render(
            <MemoryRouter>
                <Provider store={store}>
                <QuestionCategory title="New Questions" questions={[]}/>
                <QuestionCategory title="Done" questions={[]}/>
                </Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('New Questions')).toBeInTheDocument();
        expect(screen.getByText('Done')).toBeInTheDocument();
    })
})