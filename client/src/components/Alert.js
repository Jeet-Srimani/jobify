import { useAppContext } from "../context/appContext";

function Alert({ children, type }) {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
}

export default Alert;
