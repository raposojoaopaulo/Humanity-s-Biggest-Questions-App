import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react';
import QuestionDetails from './QuestionDetails';
import EmptyQuestionMessage from './EmptyQuestionMessage';
import Loader from './Loader';
import NewQuestion from './NewQuestion';

const QuestionList = () => {

  const questionsTags = [
    { label: 'All', value: 0 },
    { label: 'astronomy', value: 1 },
    { label: 'biology', value: 2 },
    { label: 'philosophy', value: 3 },
    { label: 'physics', value: 4 },
    { label: 'science', value: 5 },
    { label: 'useless knowledge', value: 6 }
  ];

  const [questionsList, setQuestionsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(questionsTags[0].value);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(true);

  const questionsUrl = 'http://localhost:3000/api/v1/questions';

  const fetchQuestionList = () => {
    setIsShowLoader(false);
    fetch(questionsUrl)
      .then(response => response.json())
      .then(data => {
        setQuestionsList(data);
        if (data.length == 0) {
          setIsShowAlert(true);
        } else {
          setIsShowAlert(false);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchQuestionList();
  }, [questionsList]);

  const updateSelectedItem = (event) => {
    setIsShowLoader(false);
    setIsShowAlert(false);
    setQuestionsList([]);
    setSelectedOption(event.target.value);
    fetch(questionsUrl + `?tags=${questionsTags[event.target.value].label}`)
      .then(response => response.json())
      .then(data => {
        setQuestionsList(data);
        if (data.length == 0) {
          setIsShowAlert(true);
          setIsShowLoader(true);
        } 
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="row">
      <div className="col-lg-10 mx-auto">
      <button type="button" className="mt-3 mb-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Send your question
      </button>
        <p className="lead fw-bold">Filter question by tags: </p>
        <select 
          className="form-select form-select-lg" 
          value={selectedOption}
          onChange={(event) => updateSelectedItem(event)}
        >
          {questionsTags.map((tag) => (
            <option key={tag.value} value={tag.value}>{tag.label}</option>
          ))
          }
        </select> 
        { questionsList.length > 0 ?
          questionsList.map((question) => 
          <QuestionDetails question={question} key={question.id} />
        ) : <Loader isShowLoader={isShowLoader} />
        }
        { isShowAlert && <EmptyQuestionMessage tagname={questionsTags[selectedOption].label} /> }
      </div>
      <NewQuestion />
    </div>
  )
};

export default QuestionList;