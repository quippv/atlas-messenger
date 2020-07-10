import React from "react";
import classes from "./Chats.module.css";
import ChatBubble from "./ChatBubble/ChatBubble";

const Chats = (props) => {
  return (
    <div className={classes.Chats} ref={props.chatContainer}>
      {props.search
        ? props.chats
            .filter((chat) =>
              chat.data.value.toLowerCase().includes(props.search.toLowerCase())
            )
            .map((chat) => (
              <ChatBubble
                key={chat.id}
                name={chat.data.username}
                value={chat.data.value}
                date={chat.data.date}
                image={chat.data.imageUrl}
                userId={props.userId}
                myId={chat.data.userId}
                loading={props.loading}
              />
            ))
        : props.chats.map((chat) => (
            <ChatBubble
              key={chat.id}
              name={chat.data.username}
              value={chat.data.value}
              date={chat.data.date}
              image={chat.data.imageUrl}
              userId={props.userId}
              myId={chat.data.userId}
              loading={props.loading}
            />
          ))}
    </div>
  );
};

export default Chats;
