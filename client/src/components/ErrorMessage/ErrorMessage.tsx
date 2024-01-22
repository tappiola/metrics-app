import "./ErrorMessage.css";
const ErrorMessage = ({ text = "Something went wrong" }: { text?: string }) => {
  return <p className="error-message">{text}</p>;
};

export default ErrorMessage;
