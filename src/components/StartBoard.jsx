import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const StartBoard = () => {
  const navigate = useNavigate();
  return (
    <div className="px-5 flex flex-col items-center justify-center h-full">
      <img src="/todo.jpg" alt="" className="h-[294px] w-[90%]" />
      <div className="flex flex-col gap-[30px] w-full items-center">
        <h1 className="font-extrabold text-[32px]">Task Manager</h1>
        <div className="flex flex-col gap-[20px] w-[90%] items-center">
          <Button
            className=" shadow-md bg-[var(--primary-color)] hover:bg-white  text-white hover:text-[var(--primary-color)] w-full h-[46px] hover:opacity-90 transition rounded-[32px]"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            className="shadow-md bg-white hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white w-full h-[46px] hover:opacity-90 transition rounded-[32px]"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartBoard;
