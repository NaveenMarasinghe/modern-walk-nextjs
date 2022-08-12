import "@styles/Home.module.scss";
import Skelton from "@sections/skelton";
import Home from "@sections/Home";

export default function Homepage({ tenant }: any) {
  console.log(tenant);

  return (
    <Skelton>
      <Home tenant={tenant} />
    </Skelton>
  );
}
