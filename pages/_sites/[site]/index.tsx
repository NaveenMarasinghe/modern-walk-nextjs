import React from "react";
import "@styles/Home.module.scss";
import Skelton from "@sections/skelton";
import Home from "@sections/Home";
import { useRouter } from "next/router";
import { TenantAPI } from "@services/tenant.services";

type TenantData = {
  id: string;
  name: string;
  code: string;
};

export default function Homepage() {
  const [tenantData, setTenantData] = React.useState<null | TenantData>(null);

  const { query } = useRouter();

  React.useEffect(() => {
    const getTenantData = async () => {
      if (query.site) {
        const tenantArr = (query.site as string).split(".");
        const res = await TenantAPI.getTenant(tenantArr[0]);
        setTenantData(res);
        console.log("res", res);
      }
    };
    getTenantData();
  }, [query]);

  return (
    <Skelton>
      <Home tenant={tenantData?.code} />
    </Skelton>
  );
}
