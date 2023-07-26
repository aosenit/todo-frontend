import { useStore } from "../../util/state";
import Dashboard from "./Dashboard";
import StartBoard from "./StartBoard";

const Home = () => {
  const user = useStore((state) => state.user);

  return <>{!user ? <StartBoard /> : <Dashboard />}</>;
};

export default Home;
