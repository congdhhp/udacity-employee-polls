import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegQuestionCircle } from "react-icons/fa";
import QuestionCategory from "../components/QuestionCategory";
import clsx from "clsx";

const HomePage = () => {
  const [isDefaultView, setIsDefaultView] = useState(true);
  const authedId = useSelector((state) => state.auth.authedId);
  const users = useSelector((state) => state.user.users);
  const questions = useSelector((state) => state.question.questions);

  const [newQuestions, setNewQuestions] = useState([]);
  const [doneQuestions, setDoneQuestions] = useState([]);

  useEffect(() => {
    if (questions && users) {
      const newQ = [];
      const doneQ = [];

      Object.keys(questions).forEach((key) => {
        let q = { ...questions[key] };
        q.user = users[q.author];
        
        // Check if the user has answered the question
        if (
          q.optionOne.votes.indexOf(authedId) < 0 &&
          q.optionTwo.votes.indexOf(authedId) < 0
        ) {
          newQ.push(q);
        } else {
          doneQ.push(q);
        }
      });

      // Sort questions by timestamp
      setNewQuestions(newQ.sort((a, b) => b.timestamp - a.timestamp));
      setDoneQuestions(doneQ.sort((a, b) => b.timestamp - a.timestamp));
    }
  }, [authedId, questions, users]);

  // UseMemo to prevent recalculation of new and done questions unnecessarily
  const displayedQuestions = useMemo(() => {
    return isDefaultView ? newQuestions : doneQuestions;
  }, [isDefaultView, newQuestions, doneQuestions]);

  return (
    <div className="home-page">
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          checked={isDefaultView}
          onChange={() => setIsDefaultView(true)}
        />
        <label className={clsx("btn", "btn-outline-primary", { active: isDefaultView })} htmlFor="btnradio1">
          Unanswered
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          checked={!isDefaultView}
          onChange={() => setIsDefaultView(false)}
        />
        <label className={clsx("btn", "btn-outline-primary", { active: !isDefaultView })} htmlFor="btnradio2">
          Answered
        </label>
      </div>

      <QuestionCategory
          title={
              <div className="d-flex align-items-center justify-content-center">
                  <FaRegQuestionCircle className="me-2" style={{ fontSize: '1.5rem', color: '#007bff' }} />
                  <span>{isDefaultView ? "New Questions" : "Done"}</span>
              </div>
          }
          questions={displayedQuestions}
      />
    </div>
  );
};

export default HomePage;
