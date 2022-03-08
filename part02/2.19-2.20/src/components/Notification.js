const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  } else if (type === "success") {
    return <div className="notification success">{message}</div>;
  }
    
  return <div className="notification fail">{message}</div>;
};

export default Notification;
