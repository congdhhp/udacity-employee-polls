import { formatDate } from "../utils/utils";
import { formatQuestion } from "../_DATA";

describe('formatDate', () => {
    test('Format the date', () => {
        var result = formatDate(1467166872634);
        expect(result).toEqual('9:21:AM | 6/29/2016');
    });
})

describe('formatQuestion', () => {
    test('Success save data', () => {
        var result =  formatQuestion({ optionOneText: 'a', optionTwoText: 'b', author: 'c' });
        expect(result.author).toEqual('c');
        expect(result.optionOne.text).toEqual('a');
        expect(result.optionTwo.text).toEqual('b');
    });
})