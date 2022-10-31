import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react';

class QuestionDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.question.likes_count
    }

    this.updateLikeCount = this.updateLikeCount.bind(this);
  }

  updateLikeCount() {
    this.setState({
      likeCount: this.state.likeCount + 1
    })
    this.updateQuestionCounter({count_for: 'like'});
  }

  updateQuestionCounter = (data) => {
    fetch(`http://localhost:3000/api/v1/questions/${this.props.question.id}/update_counter`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.log(error));
  }


  render() {
    return (
      <div className="card rounded-0 mt-3">
        <div className="card-body">
          <h3 className="card-title">{this.props.question.title}</h3>
          <p className="lead">
            <span className="badge bg-primary">{this.props.question.tag}</span>
          </p>
          <button 
            type="button" className="btn btn-primary position-relative"
            onClick={this.updateLikeCount}
          >
            Like
            { this.state.likeCount > 0 ?
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {this.state.likeCount}
              </span> : ''
            }
          </button>
        </div>
      </div>    
    )
  }
};


// const QuestionDetails = (props) => {
//   const [likeCount, setLikeCount] = useState(0);

//   return (
//     <div className="card rounded-0 mt-3">
//       <div className="card-body">
//         <h3 className="card-title">{props.question.title}</h3>
//         <p className="lead">
//           <span className="badge bg-primary">{props.question.tag}</span>
//         </p>
//         <button className="btn btn-primary mt-1" onClick={() => setLikeCount(likeCount + 1)}>Like!</button>
//         { likeCount > 0 ?
//           <span className="badge bg-primary ms-2">{likeCount}</span> : ''
//         }
//       </div>
//     </div>
//   )
// };

export default QuestionDetails;