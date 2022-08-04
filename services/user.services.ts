import { axiosInstance } from "@services/api.services";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

async function signup(user: NewUser) {
  try {
    const res = await axiosInstance.post("/users", user);
    return res;
  } catch (err) {
    return err;
  }
}

async function login(email: string, password: string) {
  try {
    const res = await axiosInstance.get(
      `/users?email=${email}&password=${password}`
    );
    return res;
  } catch (err) {
    return err;
  }
}

async function email(email: string) {
  try {
    const res = await axiosInstance.get(`/users/email=${email}`);
    return res;
  } catch (err) {
    return err;
  }
}

async function getTenant(tenant: any) {
  let tenantCode = null;
  try {
    const hostArr = tenant?.split(".");
    const res = await axiosInstance.get(`/tenant?name=${hostArr[0]}`);
    tenantCode = res?.data[0];
  } catch (err) {
    console.log(err);
  }
  console.log("tenantCode::Service", tenantCode);
  return tenantCode;
}

export const UserAPI = {
  login: login,
  signup: signup,
  email: email,
  getTenant: getTenant,
};
