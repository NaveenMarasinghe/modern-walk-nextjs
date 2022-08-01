import "@styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@context/userContext";
import { AppProvider } from "@context/appContext";
import { CartProvider } from "@context/cartContext";
import { AddToCartModalContextProvider } from "@context/AddToCartModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage, NextPageContext } from "next";

type InitialPropsType = {
  Component: NextPage;
  ctx: any;
};

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
              <Component {...pageProps} />
            </QueryClientProvider>
          </AddToCartModalContextProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: InitialPropsType) => {
  const tenant = ctx?.req?.tenant?.name;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {
    pageProps: {
      ...pageProps,
      tenant,
    },
  };
};

export default MyApp;
