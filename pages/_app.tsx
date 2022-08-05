import "@styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@context/userContext";
import { AppProvider } from "@context/appContext";
import { CartProvider } from "@context/cartContext";
import { AddToCartModalContextProvider } from "@context/AddToCartModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage, NextPageContext } from "next";
import { UserAPI } from "@services/user.services";
import RootStyleLoader from "../utils/root-style-loader.utility";
import theme1 from "../utils/theme1.config.json";
import theme2 from "../utils/theme2.config.json";

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
  const getTheme = () => {
    console.log("theme", pageProps.tenant);
    if (pageProps.tenant === "123") {
      return theme1;
    } else return theme2;
  };
  // if (pageProps.tenant===null){
  //   return
  // }
  return (
    <UserProvider>
      <AppProvider>
        <CartProvider>
          <AddToCartModalContextProvider>
            <QueryClientProvider client={queryClient}>
              <RootStyleLoader theme={getTheme()} />
              <Component {...pageProps} />
            </QueryClientProvider>
          </AddToCartModalContextProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: InitialPropsType) => {
  let tenantCode;
  const tenant = ctx?.req?.headers?.host;
  tenantCode = await UserAPI.getTenant(tenant);
  console.log("ctx", tenantCode);
  if (tenantCode.code) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps: {
        ...pageProps,
        tenant: tenantCode.code,
      },
    };
  }
};

export default MyApp;
