import Skelton from "@sections/skelton";
import Category from "@sections/Category";
import { useRouter } from "next/router";
export default function Categories() {
  const { query } = useRouter();

  return (
    <Skelton>
      <Category tenant={query.site} category={query.category} />
    </Skelton>
  );
}
