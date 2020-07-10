import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Chats from "../../components/Chats/Chats";
import ChatHeader from "../../components/Chats/ChatHeader/ChatHeader";
import ChatReply from "../../components/Chats/ChatReply/ChatReply";
import ChatInfo from "../../components/Chats/ChatInfo/ChatInfo";
import classes from "./ChatContainer.module.css";

const ChatsContainer = (props) => {
  const chatContainer = useRef(0);
  const [search, setSearch] = useState("");

  const { onFetchChatInit, chats } = props;

  useEffect(() => {
    onFetchChatInit();
  }, [onFetchChatInit]);

  useEffect(() => {
    const shouldScrollToBottom =
      Math.floor(
        chatContainer.current.scrollTop + chatContainer.current.clientHeight
      ) <= chatContainer.current.scrollHeight;
    if (shouldScrollToBottom) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [chats]);

  const inputChangeHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <main className={classes.Main}>
      <ChatHeader chats={props.chats} inputChangeHandler={inputChangeHandler} />
      <Chats
        chatContainer={chatContainer}
        chats={props.chats}
        userId={props.userId}
        loading={props.loading}
        search={search}
      />
      <ChatReply chatContainer={chatContainer} />
      <ChatInfo />
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.chat.loading,
    chats: state.chat.chats,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchChatInit: () => dispatch(actions.fetchChatInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatsContainer);
