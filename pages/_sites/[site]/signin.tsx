import React from "react";
import "@styles/Home.module.scss";
import Skelton from "@sections/skelton";
import Signin from "@sections/signin";
import { useRouter } from "next/router";
import { TenantAPI } from "@services/tenant.services";
import Layout from "@components/Layout";

export default function Homepage() {
  return (
    <Skelton>
      <Signin />
    </Skelton>
  );
}
