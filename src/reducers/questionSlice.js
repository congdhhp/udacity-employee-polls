import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../_DATA";

// Thunk actions
export const saveQuestion = createAsyncThunk(
    'question/save',
    async (question, { rejectWithValue }) => {
        try {
            const q = await _saveQuestion(question);
            if (q && q.id) return q;
            return rejectWithValue("Failed to save question");
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchQuestions = createAsyncThunk(
    'question/fetchQuestions',
    async (_, { rejectWithValue }) => {
        try {
            const questions = await _getQuestions();
            return questions;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const saveQuestionAnswer = createAsyncThunk(
    'question/saveAnswer',
    async (answer, { rejectWithValue }) => {
        try {
            const result = await _saveQuestionAnswer(answer);
            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const questionSlice = createSlice({
    name: 'question',
    initialState: {
        questions: {},  // Use object instead of array for easier updates by id
        loading: false,
        error: null
    },
    reducers: {
        getQuestions: (state) => state.questions,
        setQuestions: (state, action) => {
            state.questions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveQuestion.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error on new action
            })
            .addCase(saveQuestion.fulfilled, (state, action) => {
                if (action.payload) {
                    state.questions[action.payload.id] = action.payload;
                }
                state.loading = false;
            })
            .addCase(saveQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error saving question";
            })
            .addCase(fetchQuestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions = { ...action.payload };
                state.loading = false;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching questions";
            })
            .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
                // Assuming action.payload has the updated question or info
                // Handle the answer saving process
            });
    }
});

export const { getQuestions, setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
