import { useSelector } from "react-redux";
import "../styles/Notification.css"

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) return null;

  return <div className="notification">{message}</div>;
};

export default Notification;
