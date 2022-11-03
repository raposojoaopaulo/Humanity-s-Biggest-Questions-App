import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useState } from 'react';
import ServerSideError from './ServerSideError';

const NewAnswer = (props) => {

  const [isServerSideError, setIsServerSideError] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  const [formFields, setFormFields] = useState({
    body: ''
  });

  const handleFormFieldsChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value
    });
  };

    const handleAnswerSubmit = (event) => {
      event.preventDefault();
      createAnswer(formFields);
    };

    const createAnswer = (data) => {
      fetch(`http://localhost:3000/api/v1/questions/${props.question}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          if (data['status'] === 'failure') {
            setIsServerSideError(true);
            setServerErrors(data.errors);
          } else {
            setIsServerSideError(false);
            setServerErrors([]);
            setFormFields({
              body: '',
            });
          };
          
        })
        .catch(error => console.log(error));
    };    

  return(
    <div className="inputAnswer" id={`inputAnswer${props.question.id}`}>
      {
        isServerSideError && <ServerSideError errors={serverErrors} />
      }
      <form onSubmit={handleAnswerSubmit}>
        <div className="form-group">
          <textarea 
            className="form-control" 
            name="body"
            id="exampleFormControlTextarea1" 
            rows="3"
            placeholder="share your knowledge with humanity"
            value={formFields.body}
            onChange={(event) => handleFormFieldsChange(event)} 
          >
          </textarea>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-outline-success mt-1 me-md-2">Submit Answer</button>
          </div>
        </div>
      </form>
    </div>
  );
};


export default NewAnswer;
