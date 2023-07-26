/* eslint-disable no-undef */
import { Button, Loader, Modal } from "@mantine/core";
import TaskBox from "./TaskBox";
import { BiDotsVertical } from "react-icons/bi";
import { useEffect, useState } from "react";
import Task from "./Task";
import { useStore } from "../../util/state";
import { useNavigate } from "react-router-dom";
import useFetchAuthorized from "../../util/hooks/useFetchAuthorized";
import { getAllTodosUrl } from "../../util/url";
import Error from "./Error";

const Dashboard = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const setTodo = useStore((state) => state.setTodo);
  const navigate = useNavigate();

  const [closeModal, setCloseModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const { isLoading, isError, error, data } = useFetchAuthorized({
    key: "todos",
    url: getAllTodosUrl,
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogout(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (data) {
      setTodoData(data.data);
    }
  }, [data]);

  let filteredTodos = [...todoData].filter(
    (todo) =>
      todo.description.toLowerCase().includes(filterValue.toLowerCase()) ||
      todo.title.toLowerCase().includes(filterValue.toLowerCase()) ||
      todo.priority.toLowerCase().includes(filterValue.toLowerCase())
  );

  const newTodos = [...todoData].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (isLoading)
    return (
      <div className="h-screen grid place-content-center w-full">
        <Loader size={48} color="green" />
      </div>
    );

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="p-5 h-full relative flex flex-col items-center">
      <>
        <div className="flex justify-between items-center my-5 w-full">
          <div className="flex items-center gap-4">
            <div className="h-[70px] w-[70px] bg-slate-500 rounded-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="h-full w-full object-cover object-center "
              />
            </div>
            <div className="grid ">
              <h4 className="text-[20px] font-bold">
                Hello,{" "}
                <span className="text-[var(--primary-color)]">
                  {user.name.toUpperCase()}
                </span>
              </h4>
              <p className="text-[14px] text-[#928F8F]">
                Welcome to Todo app, Enjoy
              </p>
            </div>
          </div>
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
          </div>
        </div>
        <div className="h-[45px] w-full  rounded-[16px]">
          <input
            type="search"
            onChange={(e) => setFilterValue(e.target.value)}
            value={filterValue}
            placeholder="search..."
            className="outline-[var(--primary-color)] w-full h-full px-[30px] py-[5px] rounded-[16px] border-[1px] border-[#EDE8E8]"
          />
        </div>
        <div className="w-full mt-8">
          <h5 className="text-md font-medium mb-2">Last added</h5>
          <div className="flex w-full gap-3">
            {newTodos.slice(0, 2).map((todo, i) => {
              return (
                <TaskBox key={i} todo={todo} setCloseModal={setCloseModal} />
              );
            })}
          </div>
        </div>
        {filteredTodos.length > 0 ? (
          <div className="flex flex-col gap-3 w-full mt-10 max-h-[40%]  overflow-y-scroll">
            {filteredTodos.map((todo, i) => {
              return (
                <TaskBox
                  withStat={true}
                  key={i}
                  todo={todo}
                  setCloseModal={setCloseModal}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full mt-10 max-h-[40%]  overflow-y-scroll">
            <p className="text-center">Opps! No todo available</p>
          </div>
        )}
        <Button
          onClick={() => {
            setCloseModal(true);
            setTodo({
              todo: { title: "", date: null, description: "" },
              editTodo: false,
            });
          }}
          className="absolute  bottom-10 font-bold mt-5 shadow-md bg-[var(--primary-color)] hover:bg-white  text-white hover:text-[var(--primary-color)] w-[90%] h-[46px] hover:opacity-90 transition rounded-[32px]"
        >
          Create task
        </Button>
      </>
      <>
        <Modal
          className="w-full"
          opened={!closeModal ? false : true}
          withCloseButton={false}
          onClose={() => setCloseModal(false)}
        >
          <Task
            setCloseModal={setCloseModal}
            handleLogout={handleLogout}
            setShowLogout={setShowLogout}
            showLogout={showLogout}
          />
        </Modal>
      </>
    </div>
  );
};

export default Dashboard;
