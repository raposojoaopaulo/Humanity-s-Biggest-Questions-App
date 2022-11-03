import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

const ServerSideError = (props) => {
  return(
    <>
      <p className="lead fw-bold">Please fix errors below</p>
      {props.errors.map((error, index) => (
        <p className="alert alert-danger" key={index} role="alert">
          {error}
        </p>
      ))}
    </>
  );
};

export default ServerSideError;