import { formatDate } from "../utils/utils";
import { formatQuestion } from "../_DATA";

describe('formatDate function', () => {
    test('should correctly format the date', () => {
        const timestamp = 1467166872634;
        const result = formatDate(timestamp);
        expect(result).toEqual('9:21:AM | 6/29/2016');
    });

    test('should handle invalid date input gracefully', () => {
        const result = formatDate(null);
        expect(result).toEqual('Invalid Date');
    });
});

describe('formatQuestion function', () => {
    test('should format question data correctly', () => {
        const questionData = { optionOneText: 'a', optionTwoText: 'b', author: 'c' };
        const result = formatQuestion(questionData);
        expect(result.author).toEqual('c');
        expect(result.optionOne.text).toEqual('a');
        expect(result.optionTwo.text).toEqual('b');
    });

    test('should return undefined if any required fields are missing', () => {
        const incompleteData = { optionOneText: 'a', optionTwoText: 'b' }; // Missing 'author'
        const result = formatQuestion(incompleteData);
        expect(result).toBeUndefined();
    });
});
