import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { _saveQuestionAnswer } from "../../_DATA";
import { fetchUsers } from "../../reducers/userSlice";
import { fetchQuestions } from "../../reducers/questionSlice";
import NotFound from "./NotFound";

const PollDetail = () => {
  const { question_id } = useParams();
  const authedId = useSelector((state) => state.auth.authedId);
  const users = useSelector((state) => state.user.users);
  const questions = useSelector((state) => state.question.questions);
  const [user, setUser] = useState({});
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleVote = async (ev, option) => {
    ev.preventDefault();
    const answer = {
      authedUser: authedId,
      qid: question_id,
      answer: option,
    };
    _saveQuestionAnswer(answer).then(async () => {
      setLoading(true);
      await dispatch(fetchUsers());
      await dispatch(fetchQuestions());
      setLoading(false);
    });
  };

  useEffect(() => {
    if (questions[question_id]) {
      let q = {
        ...questions[question_id],
        isVoted: false,
        totalVoted: 0,
        optionOne: { ...questions[question_id].optionOne, percent: 0, isVoted: false },
        optionTwo: { ...questions[question_id].optionTwo, percent: 0, isVoted: false },
      };
      const u = { ...users[q.author] };
      q.totalVoted = q.optionOne.votes.length + q.optionTwo.votes.length;
      q.optionOne["percent"] =
        (q.optionOne.votes.length / (q.totalVoted === 0 ? 1 : q.totalVoted)) * 100;
      q.optionOne.isVoted = q.optionOne.votes.indexOf(authedId) > -1;
      q.optionTwo["percent"] =
        (q.optionTwo.votes.length / (q.totalVoted === 0 ? 1 : q.totalVoted)) * 100;
      q.optionTwo.isVoted = q.optionTwo.votes.indexOf(authedId) > -1;
      q.isVoted = q.optionTwo.isVoted || q.optionOne.isVoted;

      setUser(u);
      setQuestion(q);
    }
  }, [authedId, question_id, questions, users]);

  if (!question) return <NotFound />;

  return (
    <div>
      <h1 className="mb-5 text-center">Poll by {user.name}</h1>
      <div className="text-center">
        <strong>@{user.id}</strong>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <img
          src={user.avatarURL}
          alt={user.name}
          className="bg-info rounded-circle mb-3"
        />
      </div>
      <h4 className="text-center mb-3">Would you rather...</h4>

      {question.isVoted && (
        <div className="text-center mb-3">
          <span className="badge bg-success p-2">
            Total Voted: {question.totalVoted}
          </span>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <div className={`d-grid p-3 border rounded text-center ${question.optionOne.isVoted ? 'bg-primary text-white' : ''}`}>
            <div className="mb-2 fw-bold">{question.optionOne.text}</div>
            {question.isVoted ? (
              <div>Voted: {question.optionOne.votes.length} - Percent: {question.optionOne.percent}%</div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionOne")}
                disabled={loading}
              >
                Vote
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className={`d-grid p-3 border rounded text-center ${question.optionTwo.isVoted ? 'bg-primary text-white' : ''}`}>
            <div className="mb-2 fw-bold">{question.optionTwo.text}</div>
            {question.isVoted ? (
              <div>Voted: {question.optionTwo.votes.length} - Percent: {question.optionTwo.percent}%</div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionTwo")}
                disabled={loading}
              >
                Vote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollDetail;
