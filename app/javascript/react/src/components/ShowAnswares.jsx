import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import QuestionDetails from './QuestionDetails';

const ShowAnswares = (props) => {
  const [answearsList, setAnswearsList] = useState([]);

  const fetchAnswearsList = () => {
    fetch(`http://localhost:3000/api/v1/questions/${props.question.id}/answers`)
      .then(response => response.json())
      .then(data => {
        setAnswearsList(data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchAnswearsList();
  }, []);

  return(
    <div className="collapse mt-3" id={`collapse${props.question.id}`}> 
      <div className="card card-body mt-3 mb-3">
        <div className="card-header">
          <p><strong>Answears:</strong></p>        
          { answearsList.length > 0 ? 
            answearsList.map((answear, index) => {
              return(
                <blockquote className="blockquote mb-3" key={index}>
                  <p>{answear.body}</p>
                  <hr />
                </blockquote>
              )
          }) : <p>There is no answears for this question.</p> 
          }
          <footer className="blockquote-footer mt-1"> <cite title="Source Title">These are the answers to this great question of humanity</cite></footer>
        </div>  
      </div>    
    </div>
  );
};

export default ShowAnswares;
