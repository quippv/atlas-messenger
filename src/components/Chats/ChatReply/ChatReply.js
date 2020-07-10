import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../UI/Input/Input";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { checkValidation, updatedObject } from "../../../shared/utility";
import classes from "./ChatReply.module.css";
import { RateReview, Backup } from "@material-ui/icons";
import * as actions from "../../../store/actions/index";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import { storage } from "../../../firebase/index";

const ChatReply = (props) => {
  const [reply, setReply] = useState({
    elementType: "reply",
    elementConfig: {
      type: "text",
      placeholder: "Write your message",
    },
    value: "",
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  });
  const [images, setImages] = useState(null);
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [modal, setModal] = useState(false);

  const showEmojiHandler = () => {
    setEmojiPicker(!emojiPicker);
  };

  const showModalHandler = () => {
    setModal(!modal);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const chat = {
      userId: props.userId,
      username: props.username,
      date: Date.now(),
      imageUrl: props.imageUrl,
      value: reply.value,
    };
    props.onInitChat(chat);
    setReply(
      updatedObject(reply, {
        value: "",
      })
    );
  };

  const onUploadHandler = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref(`chats/${images.name}`).put(images);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        // error function...
        console.log(error);
      },
      () => {
        // complete function...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const chat = {
            userId: props.userId,
            username: props.username,
            date: Date.now(),
            imageUrl: props.imageUrl,
            value: downloadUrl,
          };
          props.onInitChat(chat);
          setImages(null);
        });
      }
    );
    setModal(!modal);
  };

  const inputChangeHandler = (event) => {
    setReply(
      updatedObject(reply, {
        value: event.target.value,
        valid: checkValidation(event.target.value, reply.validation),
        touched: true,
      })
    );
  };

  const inputUploadHandler = (event) => {
    setImages(event.target.files[0]);
  };

  const addEmoji = (event) => {
    setReply(
      updatedObject(reply, {
        value: reply.value + event.native,
        valid: checkValidation(event.native, reply.validation),
        touched: true,
      })
    );
  };

  return (
    <React.Fragment>
      <div className={classes.Reply}>
        <form onSubmit={onSubmitHandler}>
          {emojiPicker && (
            <div className={classes.Emoji}>
              <Picker onSelect={addEmoji} title="Pick your emoji..." />
            </div>
          )}
          <Input
            elementType={reply.elementType}
            elementConfig={reply.elementConfig}
            clickedEmoji={showEmojiHandler}
            closedEmoji={emojiPicker}
            value={reply.value}
            invalid={!reply.valid}
            shouldValidate={reply.validation}
            isTouched={reply.touched}
            changed={inputChangeHandler}
          />
          <div style={{ display: "flex" }}>
            <button className={classes.Success} onClick={props.clicked}>
              <span>
                <RateReview fontSize="small" />
              </span>{" "}
              Add Reply
            </button>
            <div className={classes.Upload} onClick={showModalHandler}>
              Upload Media{" "}
              <span>
                <Backup fontSize="small" />
              </span>
            </div>
          </div>
        </form>
      </div>
      <Modal show={modal} canceled={showModalHandler}>
        <form onSubmit={onUploadHandler}>
          <Input
            elementType="profile"
            elementConfig={{
              type: "file",
              required: true,
            }}
            value=""
            changed={inputUploadHandler}
          />
          <div style={{ display: "flex" }}>
            <Button btnType="Success" clicked={props.closed}>
              Upload
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
              onClick={showModalHandler}
            >
              Cancel
            </div>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    userId: state.user.userId,
    loading: state.chat.loading,
    imageUrl: state.user.imageUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitChat: (chat) => dispatch(actions.chatInit(chat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatReply);
