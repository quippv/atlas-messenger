import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import httpErrorHandler from "../../hooks/httperrorhandler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, errorConfirmedHandler] = httpErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal show={error} canceled={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
