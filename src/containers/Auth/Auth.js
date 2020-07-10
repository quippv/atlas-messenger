import React, { useState } from "react";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import loginImage from "../../assets/images/login.png";
import welcomeImage from "../../assets/images/welcome.png";
import classes from "./Auth.module.css";
import Button from "../../components/UI/Button/Button";
import * as actions from "../../store/actions/index";
import { updatedObject, checkValidation } from "../../shared/utility";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router";
import axios from "../../axios-chats";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const Auth = (props) => {
  const [elements, setElements] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "test@test.com",
        required: true,
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Your Password",
        required: true,
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignUp, setIsSignUp] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(elements.email.value, elements.password.value, isSignUp);
  };

  const inputChangeHandler = (event, controlName) => {
    setElements(
      updatedObject(elements, {
        [controlName]: updatedObject(elements[controlName], {
          value: event.target.value,
          valid: checkValidation(
            event.target.value,
            elements[controlName].validation
          ),
          touched: true,
        }),
      })
    );
  };

  const switchSignUpHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const elementsArray = [];
  for (const key in elements) {
    elementsArray.push({
      id: key,
      config: elements[key],
    });
  }

  let inputElement = elementsArray.map((element) => (
    <Input
      key={element.id}
      elementType={element.config.elementType}
      elementConfig={element.config.elementConfig}
      label={element.id}
      value={element.config.value}
      invalid={!element.config.valid}
      shouldValidate={element.config.validation}
      isTouched={element.config.touched}
      changed={(event) => inputChangeHandler(event, element.id)}
    />
  ));

  if (props.loading) {
    inputElement = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p style={{ textAlign: "center" }}>{props.error.message}</p>;
  }

  let redirect = null;
  if (props.isAuthenticated) {
    redirect = <Redirect to={props.setAuthRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {isSignUp ? (
        <img src={welcomeImage} alt="Welcome" />
      ) : (
        <img src={loginImage} alt="Login" />
      )}
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {inputElement}
        <Button btnType="Success">{isSignUp ? "Sign Up" : "Sign In"}</Button>
      </form>
      <Button btnType="Danger" clicked={switchSignUpHandler}>
        {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
      </Button>
      {redirect}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    setAuthRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
