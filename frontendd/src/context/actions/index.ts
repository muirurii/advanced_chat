const actionTypes: {
  SET_USER: string;
  SET_FRIENDS: string;
  TOGGLE_ONLINE: string;
  TOGGLE_CONVERSATION: string;
  SET_MESSAGES: string;
  SET_MESSAGE: string;
  SET_UNREAD_MESSAGES: string;
  SET_READ_MESSAGES: string;
  CLEAR_UNREAD_MESSAGES: string;
  SET_MESSAGE_DELIVERED: string;
  SET_TAB: string;
} = {
  SET_USER: "set_user",
  SET_FRIENDS: "set_token",
  TOGGLE_ONLINE: "toggle_online",
  TOGGLE_CONVERSATION: "toggle_conversation",
  SET_MESSAGES:"set_messages",
  SET_MESSAGE:"set_message",
  SET_UNREAD_MESSAGES:"set_unread_messages",
  SET_READ_MESSAGES:"set_read_messages",
  CLEAR_UNREAD_MESSAGES:"clear_unread_messages",
  SET_MESSAGE_DELIVERED:"set_message_delivered",
  SET_TAB:"set_tab",
};

export default actionTypes;
