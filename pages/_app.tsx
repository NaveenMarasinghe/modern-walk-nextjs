import "@styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@context/userContext";
import { AppProvider } from "@context/appContext";
import { CartProvider } from "@context/cartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
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
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />{" "}
          </QueryClientProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}

export default MyApp;
