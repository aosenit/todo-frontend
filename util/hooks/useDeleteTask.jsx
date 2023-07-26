import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { createTodoUrl } from "../url";

const useDeleteTask = (id, token) => {
  const queryClient = useQueryClient();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const deleteTodo = async () => {
    return axios.delete(`${createTodoUrl}/${id}`, {
      headers: headers,
    });
  };

  const { mutate, isLoading, isError, error } = useMutation(deleteTodo, {
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries("todos");
        alert("Todo deleted successfully");
      }
    },
  });

  if (isError) {
    // alert("Todo failed to be deleted");
    console.log(error);
  }

  return { mutate, isLoading };
};

export default useDeleteTask;
