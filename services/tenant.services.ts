import { axiosInstance } from "@services/api.services";

async function getTenant(tenant: any) {
  let tenantCode = null;
  try {
    const hostArr = tenant?.split(".");
    const res = await axiosInstance.get(`/tenant?name=${hostArr[0]}`);
    tenantCode = res?.data[0];
  } catch (err) {
    console.log(err);
  }
  return tenantCode;
}

export const TenantAPI = {
  getTenant: getTenant,
};
