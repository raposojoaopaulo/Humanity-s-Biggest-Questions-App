import * as React from 'react';
import * as ReactDOM from 'react-dom';

const EmptyQuestionMessage = (props) => {
  return(
    <div>
      <div className="mt-5 alert alert-warning alert-dismissible fade show" role="alert">
        Ops! No questions found with the tag <strong>{props.tagname}</strong>.
        Please select another option from the list.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
};

export default EmptyQuestionMessage;