import "../styles/Home.module.css";
import Layout from "../components/Layout";
import Home from "../sections/Home";
import { UserProvider } from "../context/userContext";
import { AppProvider } from "../context/appContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Homepage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <UserProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Home />
          </Layout>
        </QueryClientProvider>
      </AppProvider>
    </UserProvider>
  );
}
