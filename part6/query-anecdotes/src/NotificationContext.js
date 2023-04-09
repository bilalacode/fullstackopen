import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return `${action.payload} has been voted`;
    case "ADDED":
      return `${action.payload} has been added`;
    case "HIDE":
      return "";
    case "ERROR":
      return `${action.payload}. Use at least 5 characters`;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notificationContent, notificationContentDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider
      value={[notificationContent, notificationContentDispatch]}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
