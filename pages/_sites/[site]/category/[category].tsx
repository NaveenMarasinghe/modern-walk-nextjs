import Skelton from "@sections/skelton";
import Category from "@sections/category";
import { useRouter } from "next/router";
import Layout from "@components/Layout";

export default function Categories() {
  const { query } = useRouter();

  return (
    <Skelton>
      <Layout>
        <Category tenant={query.site} category={query.category} />
      </Layout>
    </Skelton>
  );
}
