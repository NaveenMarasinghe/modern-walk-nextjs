import "@styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@context/userContext";
import { AppProvider } from "@context/appContext";
import { CartProvider } from "@context/cartContext";
import { AddToCartModalContextProvider } from "@context/AddToCartModalContext";
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
          <AddToCartModalContextProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />{" "}
            </QueryClientProvider>
          </AddToCartModalContextProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}

export default MyApp;
