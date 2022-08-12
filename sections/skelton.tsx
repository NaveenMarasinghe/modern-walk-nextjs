import { UserProvider } from "@context/userContext";
import { AppProvider } from "@context/appContext";
import { CartProvider } from "@context/cartContext";
import { AddToCartModalContextProvider } from "@context/AddToCartModalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootStyleLoader from "@utils/root-style-loader.utility";
import Layout from "@components/Layout";
import theme1 from "@utils/theme1.config.json";

type Props = {
  children?: React.ReactNode;
};

export default function Skelton({ children }: Props) {
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
              <RootStyleLoader theme={theme1} />
              <Layout>
                <div>{children}</div>
              </Layout>
            </QueryClientProvider>
          </AddToCartModalContextProvider>
        </CartProvider>
      </AppProvider>
    </UserProvider>
  );
}
