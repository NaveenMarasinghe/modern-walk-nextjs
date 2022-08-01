import * as React from "react";
import { useUser } from "@context/userContext";
import { useApp } from "@context/appContext";
import { UserAPI } from "@services/user.services";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "@styles/Signin.module.scss";
import Input from "@components/input/Input";
import { useRouter } from "next/router";

export default function Signin() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [redirect, setRedirect] = React.useState<boolean>(false);
  const [checkboxStatus, setCheckboxStatus] = React.useState(null);
  const [loginError, setLoginError] = React.useState(0);
  const [pwInputType, setPwInputType] = React.useState<string>("password");
  const [rememberPw, setRememberPw] = React.useState(false);
  const [rememberedEmail, setRememberedEmail] = React.useState("");

  const { loginUser, user } = useUser();
  const { openAlert } = useApp();

  const router = useRouter();

  React.useEffect(() => {
    if (redirect) {
      router.push("/");
    }
  }, [redirect, router]);

  const handleSubmit = async () => {
    const response: any = await UserAPI.login(email, password);
    if (response.data[0]) {
      console.log(response);
      setLoginError(0);
      loginUser({
        id: response.data[0].id,
        name: response.data[0].name,
        email: response.data[0].email,
      });
      openAlert("Login Successful");
      if (rememberPw) {
        localStorage.setItem("mwemail", email);
      }
      console.log(user);
      setRedirect(true);
    } else {
      setLoginError(1);
    }
  };

  const toglePwInputType = () => {
    if (pwInputType === "password") {
      setPwInputType("text");
    } else {
      setPwInputType("password");
    }
  };

  React.useEffect(() => {
    const email = localStorage.getItem("mwemail");
    if (email) {
      setEmail(email);
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.containerBody}>
          <div className={styles.title}>Modern Walk</div>
          <div className={styles.emailRow}>
            <div>Email address</div>
            <span className={styles.emailStar}>*</span>
          </div>
          <Input
            varient="primary"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {loginError === 1 && (
            <div className={styles.inputError}>
              Please enter a valid email address
            </div>
          )}
          {loginError === 2 && (
            <div className={styles.inputError}>
              {`We couldn't find your account. Try again or contact your admin`}
            </div>
          )}
          <div className={styles.passwordRow}>
            <div>Password</div>
            <span className={styles.emailStar}>*</span>
          </div>
          <div className={styles.passwordInputRow}>
            <Input
              varient="primary"
              type={pwInputType}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.passwordIcon}>
              {pwInputType === "password" && (
                <VisibilityOffIcon
                  className={styles.icon}
                  onClick={toglePwInputType}
                />
              )}
              {pwInputType === "text" && (
                <VisibilityIcon
                  className={styles.icon}
                  onClick={toglePwInputType}
                />
              )}
            </div>
          </div>
          {loginError === 3 && (
            <div className={styles.inputError}>Invalid password</div>
          )}
          <div className={styles.forgot}>Forgot password?</div>
          <div className={styles.rememberRow}>
            <div className={styles.rememberCheck}>
              {rememberPw ? (
                <CheckBoxIcon
                  className={styles.rememberCheckbox}
                  onClick={() => setRememberPw(!rememberPw)}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  className={styles.rememberCheckboxActive}
                  onClick={() => setRememberPw(!rememberPw)}
                />
              )}
              <div className={styles.rememberText}>Remember me</div>
            </div>
            <div>
              <button
                type="submit"
                className={styles.button}
                onClick={handleSubmit}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
