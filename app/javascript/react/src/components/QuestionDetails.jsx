import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react';
import ShowAnswares from './ShowAnswares';

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
            <span className="badge rounded-pill bg-secondary">{this.props.question.tag}</span>
          </p>
          <button 
            type="button" className="btn btn-primary position-relative me-3" 
            onClick={this.updateLikeCount}
          >
            Like
            { this.state.likeCount > 0 ?
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {this.state.likeCount}
              </span> : ''
            }
          </button>          
          {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
          </button> */}
          <ShowAnswares question={this.props.question} />
        </div>
      </div>    
    )
  }
};

export default QuestionDetails;
