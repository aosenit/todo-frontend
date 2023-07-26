/* eslint-disable react/prop-types */
import { Alert } from "@mantine/core";
import { LuAlertCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Error = ({ error }) => {
  const navigate = useNavigate();
  if (error.message.includes("401")) {
    return (
      <div className="w-full h-screen grid place-content-center text-center">
        <Alert
          icon={<LuAlertCircle size="1rem" />}
          title=" Opps, Session Expired!"
          color="red"
        >
          <p
            className="text-blue-900 block text-[14px] cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Go to login
          </p>
        </Alert>
      </div>
    );
  }
  return (
    <div className="w-full h-screen grid place-content-center text-center">
      <Alert
        icon={<LuAlertCircle size="1rem" />}
        title=" Opps, Network Error"
        color="red"
      >
        <p
          className="text-blue-900 block text-[14px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Retry
        </p>
      </Alert>
    </div>
  );
};

export default Error;
