var { _saveQuestion, _saveQuestionAnswer } = require('../_DATA');

describe('_saveQuestion', () => {
    const validQuestion = {
        author: 'sarahedo',
        optionOneText: 'opt1',
        optionTwoText: 'opt2'
    };

    test('should successfully save a question with valid data', async () => {
        const result = await _saveQuestion(validQuestion);

        expect(result.author).toEqual(validQuestion.author);
        expect(result.optionOne.text).toEqual(validQuestion.optionOneText);
        expect(result.optionTwo.text).toEqual(validQuestion.optionTwoText);
    });

    test('should throw an error when missing required fields', async () => {
        const invalidQuestion = { author: 'sarahedo', optionTwoText: 'opt2' };

        await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });

    test('should throw an error when author is missing', async () => {
        const invalidQuestion = { optionOneText: 'opt1', optionTwoText: 'opt2' };

        await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });

    test('should throw an error when optionOneText is missing', async () => {
        const invalidQuestion = { author: 'sarahedo', optionTwoText: 'opt2' };

        await expect(_saveQuestion(invalidQuestion)).rejects.toEqual(
            'Please provide optionOneText, optionTwoText, and author'
        );
    });
});

describe('_saveQuestionAnswer', () => {
    const validAnswer = {
        authedUser: 'mtsamis',
        qid: 'xj352vofupe1dqz9emx13r',
        answer: 'optionTwo'
    };

    test('should successfully save an answer with valid data', async () => {
        const result = await _saveQuestionAnswer(validAnswer);

        expect(result).toEqual(true);
    });

    test('should throw an error when missing required fields', async () => {
        const invalidAnswer = { authedUser: 'mtsamis', qid: 'xj352vofupe1dqz9emx13r' };

        await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });

    test('should throw an error when authedUser is missing', async () => {
        const invalidAnswer = { qid: 'xj352vofupe1dqz9emx13r', answer: 'optionTwo' };

        await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });

    test('should throw an error when answer is missing', async () => {
        const invalidAnswer = { authedUser: 'mtsamis', qid: 'xj352vofupe1dqz9emx13r' };

        await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual(
            'Please provide authedUser, qid, and answer'
        );
    });
});
