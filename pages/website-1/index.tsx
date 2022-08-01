import "@styles/Home.module.scss";
import Layout from "@components/Layout";
import Home from "@website-1/sections/Home";
import { ProductAPI } from "@services/product.services";

export default function Homepage({ data }: any) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await ProductAPI.clothing("clothing");
  const data = await res.result;

  // Pass data to the page via props
  return { props: { data } };
}
