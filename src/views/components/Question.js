import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Question = (props) => {
  const { question } = props;
  const navigate = useNavigate();

  const handleShow = (e) => {
    e.preventDefault();
    navigate(`/questions/${question.id}`);
  };

  return (
    <div className="card border-light shadow-sm mb-3">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              height={80}
              width={80}
              className="bg-info rounded-circle me-3"
              src={question.user.avatarURL}
              alt={question.user.name}
            />
            <div>
              <h5 className="card-title mb-1">{question.user.name}</h5>
              <p className="card-text text-muted">{formatDate(question.timestamp)}</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-outline-primary d-flex align-items-center"
              type="button"
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faEye} className="me-2" />
              <span>Show</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
