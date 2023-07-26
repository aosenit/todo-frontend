/* eslint-disable react/prop-types */
import moment from "moment";
import { useStore } from "../../util/state";
import { BsEyeFill, BsFillTrashFill } from "react-icons/bs";
import useDeleteTask from "../../util/hooks/useDeleteTask";

const TaskBox = ({ withStat, todo = {}, setCloseModal }) => {
  const setTodo = useStore((state) => state.setTodo);
  const user = useStore((state) => state.user);

  const { mutate, isLoading } = useDeleteTask(todo._id, user.token);

  const checkPriority = () => {
    if (todo.priority == "low") return "bg-green-500";
    else if (todo.priority == "intermediate") return "bg-yellow-500";
    else return "bg-red-500";
  };

  const dateTimeAgo = moment
    .utc(todo.createdAt)
    .local()
    .startOf("seconds")
    .fromNow();

  const handleClickEdit = () => {
    setCloseModal(true);
    setTodo({ ...todo, editTodo: true });
  };

  const handleClickDelete = () => {
    mutate();
  };

  return (
    <div
      className={`${
        isLoading && "bg-gray-200"
      } h-[74px] border-[#D9D9D9] border-[1px] w-full rounded-[16px] flex items-center justify-between  p-4`}
    >
      <div className="flex gap-4 items-center w-full">
        <div
          className={`h-[40px] rounded-[5px] w-[5px] ${checkPriority()}`}
        ></div>
        <div className="grid ">
          <h4 className="font-bold text-[14px] capitalize">{todo.title}</h4>
          <p className=" text-[10px]  text-[#928F8F]">
            <code className="tracking-tighter">{dateTimeAgo}</code>
          </p>
        </div>
      </div>
      {withStat && (
        <div className="flex items-center gap-3">
          <BsEyeFill
            className="text-green-500 text-xl cursor-pointer"
            onClick={handleClickEdit}
          />
          <BsFillTrashFill
            className="text-red-500 text-xl cursor-pointer"
            onClick={handleClickDelete}
          />
        </div>
      )}
    </div>
  );
};

export default TaskBox;
