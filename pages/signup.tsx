import * as React from "react";
import { UserAPI } from "@services/user.services";
import Input from "@components/Input";
import styles from "@styles/signup.module.scss";
import { useRouter } from "next/router";

type NewUser = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    const userData: NewUser = {
      name: name,
      email: email,
      password: password,
    };
    if (password === repeatPassword) {
      const response: any = await UserAPI.signup(userData);
      if (response.data) {
        alert("New account created");
        setRedirect(true);
      } else if (response.error) {
        console.log(response.error);
      }
    } else {
      alert("Password does not match");
    }
  };

  React.useEffect(() => {
    if (redirect) {
      router.push("/login");
    }
  }, [redirect, router]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerBody}>
          <div className={styles.title}>Modern Walk</div>
          <div>
            <div className={styles.label}>
              <div>Name</div>
              <span className={styles.star}>*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <div className={styles.label}>
              <div>Email address</div>
              <span className={styles.star}>*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className={styles.label}>
              <div>Password</div>
              <span className={styles.star}>*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className={styles.label}>
              <div>Repeat password</div>
              <span className={styles.star}>*</span>
            </div>
            <Input
              type="text"
              varient="primary"
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <div className={styles.label}>
            <button
              type="submit"
              className={styles.button}
              onClick={handleSubmit}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
