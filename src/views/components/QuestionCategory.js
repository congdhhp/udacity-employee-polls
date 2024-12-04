import Question from "./Question";

const QuestionCategory = (props) => {
  const { title, questions } = props;

  return (
    <div className="mb-5">
      <h2 className="text-center mb-4">{title}</h2>
      
      {/* Kiểm tra và hiển thị câu hỏi hoặc thông báo không có dữ liệu */}
      {questions && questions.length ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {questions.map((q) => (
            <div className="col" key={q.id}>
              <Question question={q} />
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center">
          <h4>No questions available at the moment.</h4>
          <p>Seems like there are no questions here. Why not create one?</p>
          <a href="/new" className="btn btn-primary mt-3">Create a new question</a>
        </div>
      )}
    </div>
  );
};

export default QuestionCategory;
