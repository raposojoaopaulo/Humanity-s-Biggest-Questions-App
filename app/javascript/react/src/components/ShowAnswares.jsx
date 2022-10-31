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
    <div className="card mt-3">
      <div className="card-header">
        Answears
      </div>
      <div className="card-body">
        <blockquote className="blockquote mb-0">
        { answearsList.length > 0 ?
          answearsList.map((answear, index) => {
            return(
              <div key={index}>
              <p>{answear.body}</p>
              <hr />
              </div>
            )
          }) : <p className="lead">No answears yet.</p>
        }
          <footer className="blockquote-footer"><cite title="Source Title">these are the answers to this great question of humanity</cite></footer>
        </blockquote>
      </div>
    </div>
  );
};

export default ShowAnswares;


// <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
// <div className="modal-dialog modal-xl">
//   <div className="modal-content">
//     <div className="modal-header">            
//       <h3 className="modal-title" id="staticBackdropLabel">
//         <span className="badge rounded-pill bg-secondary me-3">{props.question.tag} </span>
//         {props.question.title}
//       </h3>
      
//       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//     </div>
//     <div className="modal-body">
      // { answearsList.length > 0 ?
      //   answearsList.map((answear, index) => {
      //     return(
      //       <div className="card rounded-0 mt-3" key={index}>
      //         <div className="card-body">
      //           <p className="card-text">{answear.body}</p>
      //         </div>
      //       </div>
      //     )
      //   }) : <p className="lead">No answears yet.</p>
      // }
//     </div>
//     <div className="modal-footer">
//       <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//       <button type="button" className="btn btn-primary">Understood</button>
//     </div>
//   </div>
// </div>
// </div>
