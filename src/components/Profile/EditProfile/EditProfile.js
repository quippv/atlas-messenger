import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import { updatedObject, checkValidation } from "../../../shared/utility";
import Button from "../../UI/Button/Button";
import * as actions from "../../../store/actions/index";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router";
import { storage } from "../../../firebase/index";

const EditProfile = (props) => {
  const [elements, setElements] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
        required: true,
      },
      value: "",
      validation: {
        required: true,
        maxLength: 8,
        minLength: 1,
      },
      valid: false,
      touched: false,
    },
    bio: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Bio",
        required: true,
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    profile: {
      elementType: "profile",
      elementConfig: {
        type: "file",
        placeholder: "Choose your profile",
        required: true,
      },
      image: null,
      url: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const { username, bio, imageUrl } = props;

  useEffect(() => {
    setElements(
      updatedObject(elements, {
        username: updatedObject(elements.username, {
          value: username,
        }),
        bio: updatedObject(elements.bio, {
          value: bio,
        }),
        profile: updatedObject(elements.profile, {
          url: imageUrl,
        }),
      })
    );
  }, [username, bio, imageUrl]);

  const onSubmitEditHandler = (event) => {
    event.preventDefault();
    const uploadTask = storage
      .ref(`users/${elements.profile.image.name}`)
      .put(elements.profile.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
      },
      (error) => {
        // error function...
        console.log(error);
      },
      () => {
        // complete function...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          setElements(
            updatedObject(elements, {
              profile: updatedObject(elements.profile, {
                url: downloadUrl,
              }),
            })
          );

          const users = {
            username: elements.username.value.toLowerCase(),
            userId: props.userId,
            bio: elements.bio.value.toLowerCase(),
            friends: props.friendsObj,
            imageUrl: downloadUrl,
          };
          props.onUserEdit(props.token, users);
        });
      }
    );
  };

  const inputChangeHandler = (event, controlName) => {
    setElements(
      updatedObject(elements, {
        [controlName]: updatedObject(elements[controlName], {
          value: controlName !== "profile" && event.target.value,
          image: controlName === "profile" && event.target.files[0],
          valid: checkValidation(
            event.target.value,
            elements[controlName].validation
          ),
          touched: true,
        }),
      })
    );
  };

  const elementsArray = [];
  for (const key in elements) {
    elementsArray.push({
      id: key,
      config: elements[key],
    });
  }

  let form = (
    <React.Fragment>
      <h2>Edit Profile</h2>
      <p>
        user id:{" "}
        <span style={{ color: "#595353", fontSize: "12px" }}>
          {props.userId}
        </span>
      </p>
      <form onSubmit={onSubmitEditHandler}>
        {elementsArray.map((element) => (
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
        ))}
        <div style={{ display: "flex" }}>
          <Button btnType="Success" clicked={props.closed}>
            Submit
          </Button>
          <div
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#595353",
              outline: "none",
              cursor: "pointer",
              font: "inherit",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              marginTop: "10px",
              marginLeft: "10px",
            }}
            onClick={props.closed}
          >
            Cancel
          </div>
        </div>
        <Redirect to="/" />
      </form>
    </React.Fragment>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <Modal show={props.opened} canceled={props.closed}>
      {form}
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    loading: state.user.loading,
    username: state.user.username,
    imageUrl: state.user.imageUrl,
    bio: state.user.bio,
    friendsObj: state.friend.friendsObj,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserEdit: (token, users) => dispatch(actions.userDispatch(token, users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
