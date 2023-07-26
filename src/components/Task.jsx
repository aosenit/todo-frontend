/* eslint-disable react/prop-types */
import { BsChevronLeft } from "react-icons/bs";
import { BiDotsVertical } from "react-icons/bi";
import { Button } from "@mantine/core";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { createTodoUrl } from "../../util/url";
import { useStore } from "../../util/state";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Task = ({ setCloseModal }) => {
  const { editTodo, ...others } = useStore((state) => state.todo);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [showLogout, setShowLogout] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [todoData, setTodoData] = useState({
    title: others.title,
    date: others.date || null,
    description: others.description,
  });
  const [priority, setPriority] = useState(others.priority);

  const handleChange = (e) => {
    setTodoData({ ...todoData, [e.target.name]: e.target.value });
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };

  const createTodo = async (todo) => {
    if (!editTodo) {
      return axios.post(createTodoUrl, todo, { headers: headers });
    } else {
      return axios.patch(`${createTodoUrl}/${others._id}`, todo, {
        headers: headers,
      });
    }
  };

  const { mutate, isLoading, isError, error } = useMutation(createTodo, {
    onSuccess: (data) => {
      if (data) {
        setCloseModal(false);
        queryClient.invalidateQueries("todos");
      }
    },
  });

  if (error) {
    console.log(error);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...todoData, priority: priority };
    if (priority === "") {
      alert("priority is required");
      return;
    }
    mutate(dataToSubmit);
  };
  let createTask = !editTodo ? true : false;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogout(false);
    navigate("/login", { replace: true });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full relative flex flex-col items-center py-5"
    >
      <div className="flex justify-between w-full">
        <BsChevronLeft
          onClick={() => setCloseModal(false)}
          className="font-extrabold text-[var(--primary-color)] text-[16px] cursor-pointer hover:opacity-90 transition"
        />
        <div className="relative ">
          <BiDotsVertical
            onClick={() => setShowLogout((prev) => !prev)}
            className="font-extrabold hover:text-[var(--primary-color)] text-[30px] transition cursor-pointer"
          />
          {showLogout && (
            <h5
              onClick={handleLogout}
              className=" cursor-pointer absolute text-[10px] -bottom-1/2 left-1/2 -translate-x-1/2 px-2 bg-red-500 text-white"
            >
              logout
            </h5>
          )}
        </div>{" "}
      </div>
      <h2 className="text-[16px] font-extrabold text-center">
        {createTask ? " Create new task" : "Edit task"}
      </h2>
      <div className="flex flex-col w-[90%] gap-5 mt-10 items-center">
        <div className="w-full">
          <h5 className="text-sm text-[var(--primary-color)] font-medium mb-2">
            Task title
          </h5>
          <input
            type="text"
            name="title"
            value={todoData.title}
            className="outline-[var(--primary-color)] text-xs h-[46px] shadow-md rounded-[32px] px-5 w-full"
            placeholder="Create new task"
            onChange={handleChange}
            required
          />
        </div>

        <div className="w-full">
          <h5 className=" text-sm text-[var(--primary-color)] font-medium mb-2">
            Task Date
          </h5>
          <input
            required
            type="datetime-local"
            name="date"
            value={
              todoData.date
                ? moment(todoData.date).format("YYYY-MM-DDTHH:mm")
                : ""
            }
            onChange={handleChange}
            className="outline-[var(--primary-color)] text-xs h-[46px] shadow-md rounded-[32px] px-5 w-full"
            // placeholder="Create new task"
          />
        </div>

        <div className="w-full">
          <h5 className="text-sm text-[var(--primary-color)] font-medium mb-2">
            Choose priorities
          </h5>
          <div className="flex items-center  gap-1 justify-between my-2">
            <span
              onClick={() => setPriority("high")}
              className={`${
                priority === "high" && "scale-125"
              } text-xs px-7 py-[6px] hover:scale-105 transition bg-red-400 text-white rounded-[16px] cursor-pointer`}
            >
              High
            </span>
            <span
              onClick={() => setPriority("intermediate")}
              className={`${
                priority === "intermediate" && "scale-125"
              } text-xs px-7 py-[6px] hover:scale-105 transition bg-yellow-400 text-white rounded-[16px] cursor-pointer`}
            >
              Intermediate
            </span>
            <span
              onClick={() => setPriority("low")}
              className={`${
                priority === "low" && "scale-125"
              } text-xs px-7 py-[6px] hover:scale-105 transition bg-green-400 text-white rounded-[16px] cursor-pointer`}
            >
              Low
            </span>
          </div>
        </div>

        <div className="w-full">
          <h5 className="text-sm text-[var(--primary-color)] font-medium mb-2">
            Description
          </h5>
          <textarea
            name="description"
            value={todoData.description}
            onChange={handleChange}
            required
            className="outline-[var(--primary-color)] w-full shadow-sm rounded-[32px] p-5 min-h-[100px] text-xs "
            placeholder="It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable"
          ></textarea>
        </div>

        {isError && (
          <p className="bg-red-500 text-white text-center items-center text-[12px] px-4 py-1 rounded-[8px] w-[100%]">
            Opps, an error occured, please try again
          </p>
        )}

        <div className="flex  gap-[20px]  items-center justify-center w-full">
          <Button
            loading={isLoading}
            disabled={isLoading}
            type="submit"
            className=" shadow-md bg-[var(--primary-color)] hover:bg-white  text-white hover:text-[var(--primary-color)] w-full h-[46px] hover:opacity-90 transition rounded-[32px]"
          >
            {createTask ? "Add task" : "Edit task"}
          </Button>

          <Button
            onClick={() => setCloseModal(false)}
            className="shadow-md bg-white hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white w-full h-[46px] hover:opacity-90 transition rounded-[32px]"
          >
            Close
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Task;
