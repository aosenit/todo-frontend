import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <QueryClientProvider client={queryClient}>
      <div className="grid place-content-center h-[100vh]">
        <App />
      </div>
    </QueryClientProvider>
  </MantineProvider>
);
