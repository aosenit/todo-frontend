/* eslint-disable react/prop-types */
import { Button } from "@mantine/core";
import { BsChevronLeft, BsFillTriangleFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../util/state";
import { useMutation } from "react-query";
import { loginUrl, signupUrl } from "../../util/url";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.split("/")[1];
  const url = pathname === "login" ? loginUrl : signupUrl;

  const [userData, setUserData] = useState({});
  const setUser = useStore((state) => state.setUser);
  const { isLoading, mutate, isError, error } = useMutation(
    (data) => {
      return axios.post(url, data);
    },
    {
      onSuccess: (data) => {
        if (pathname === "login") {
          let dataToStore = {
            name: data.data.username,
            token: data.data.token,
          };
          localStorage.setItem("user", JSON.stringify(dataToStore));
          setUser(dataToStore);

          navigate("/", { replace: true });
        } else navigate("/login", { replace: true });
      },
    }
  );

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(userData);
  };

  return (
    <div className="p-5 h-full relative">
      <div className="flex justify-between h-[20%] my-5">
        <BsChevronLeft
          className="font-extrabold text-[var(--primary-color)] text-[30px] cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate("/")}
        />
        <BsFillTriangleFill className="font-extrabold text-[var(--primary-color)] text-[80px] rotate-180" />
      </div>

      <div className="h-[60%] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-center font-extrabold">
            {pathname == "login" ? "Welcome!" : "Sign Up"}
          </h1>
          <p className="text-[#928F8F] px-5">
            {pathname == "login"
              ? "Sign in to your account here and have access to your todos!"
              : "Create a new account"}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[90%] gap-5 mt-10 "
        >
          {pathname !== "login" && (
            <input
              type="text"
              name="username"
              required
              className="h-[46px] shadow-md rounded-[32px] px-5"
              placeholder="Username"
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            required
            className="h-[46px] shadow-md rounded-[32px] px-5 outline-[var(--primary-color)]"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            required
            className="h-[46px] shadow-md rounded-[32px] px-5 outline-[var(--primary-color)]"
            placeholder="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="font-bold mt-5 shadow-md bg-[var(--primary-color)] hover:bg-white  text-white hover:text-[var(--primary-color)] w-full h-[46px] hover:opacity-90 transition rounded-[32px]"
          >
            {pathname == "login" ? "  Login" : "Sign Up"}
          </Button>
          <a
            href={pathname == "login" ? "/signup" : "/login"}
            className="text-[var(--primary-color)] text-right w-fit self-end"
          >
            {pathname == "login" ? "signup" : "login"}
          </a>
          {isError && (
            <p className="bg-red-400 text-white p-2 text-xs rounded-[8px] text-center">
              {error.response.data.message ||
                "Opps, an error occurred, please try again"}
            </p>
          )}
        </form>
      </div>
      <div className="absolute left-0 bottom-10 flex justify-between items-center w-full">
        <div className=" bg-[var(--primary-color)] w-[40%] h-[3px] "> </div>
        <img src="/google.png" alt="" />
        <div className=" bg-[var(--primary-color)] w-[40%] h-[3px]"></div>
      </div>
    </div>
  );
};

export default Register;
