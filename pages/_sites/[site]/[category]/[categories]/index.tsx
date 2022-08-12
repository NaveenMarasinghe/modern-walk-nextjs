import { useRouter } from "next/router";
export default function Categories() {
  const { query } = useRouter();
  return <h1>{query.site}</h1>;
}
