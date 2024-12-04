import { useState } from "react";
import { saveQuestion } from "../../reducers/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addUserQuestion } from "../../reducers/userSlice";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

const NewPoll = () => {
  const authedId = useSelector(state => state.auth.authedId);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSavePoll = async (e) => {
    e.preventDefault();
    setLoading(true);
    const poll = {
      author: authedId,
      optionOneText: optionOne,
      optionTwoText: optionTwo
    };
    const rs = await dispatch(saveQuestion(poll));
    dispatch(addUserQuestion({userId: authedId, qId: rs.payload.id}))
    setLoading(false);
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', my: 5 }}>
        <Typography variant="h4">Create Your Own Poll</Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Would you rather...
        </Typography>
      </Box>
      
      <form onSubmit={handleSavePoll}>
        <TextField
          label="Option One"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
        />
        <TextField
          label="Option Two"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
        />
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            size="large"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default NewPoll;
