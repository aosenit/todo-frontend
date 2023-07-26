import axios from "axios";
import { useQuery } from "react-query";
import { useStore } from "../state";

const useFetchAuthorized = ({ key, url }) => {
  const user = useStore((state) => state.user);
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user.token,
  };
  const fetchTodoList = async () => {
    try {
      const data = await axios.get(url, {
        headers: headers,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  const { isLoading, isError, data, error } = useQuery(key, fetchTodoList);

  return { isLoading, isError, data, error };
};

export default useFetchAuthorized;
