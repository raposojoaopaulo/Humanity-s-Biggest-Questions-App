import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import ServerSideError from './ServerSideError.jsx';

const NewQuestion = () => {
  const questionsTags = [
    { label: 'astronomy', value: 'astronomy' },
    { label: 'biology', value: 'biology' },
    { label: 'philosophy', value: 'philosophy' },
    { label: 'physics', value: 'physics' },
    { label: 'science', value: 'science' },
    { label: 'useless knowledge', value: 'useless knowledge' }
  ];

  const [isServerSideError, setIsServerSideError] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const [formFields, setFormFields] = useState({
    title: '',
    tag: questionsTags[0].value
  });

  const handleFormFieldsChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    });
  };

  const handleQuestionSubmit = (event) => {
    event.preventDefault();
    createQuestion(formFields);
  };

  const createQuestion = (data) => {
    fetch('http://localhost:3000/api/v1/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data['status'] === 'failure') {
          setIsServerSideError(true);
          setServerErrors(data['data']);
        } else {
          setIsServerSideError(false);
          setServerErrors([]);
          setFormFields({
            title: '',
            tag: questionsTags[0].value
          });
        };
        
      })
      .catch(error => console.log(error));
  };

  return(
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Contribute to humanity's biggest questions</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form onSubmit={handleQuestionSubmit}>
          <div className="modal-body">
            {
              isServerSideError && <ServerSideError errors={serverErrors} />
            }
            <div className="form-group">
              <label className="form-label mt-3 mb-3">Title: </label>
              <input 
                type="text" 
                name="title"
                className="form-control form-control-lg rounded-0" 
                placeholder="Enter your question"
                value={formFields.title}
                onChange={(event) => handleFormFieldsChange(event)} 
              />
            </div>
            <div className="form-group">
              <label className="form-label mt-3 mb-3">Select the question tag: </label>
              <select 
                className="form-select form-select-lg mb-3" 
                aria-label=".form-select-lg example"
                value={formFields.tag}
                onChange={(event) => handleFormFieldsChange(event)}
                name="tag"
              >
                {questionsTags.map((tag) => {
                  return(
                    <option key={tag.value} value={tag.value}>{tag.label}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary">Submit Question</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default NewQuestion;