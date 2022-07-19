import * as React from "react";
import styles from "../styles/Layout.module.scss";
import Link from "next/link";
import ShoppingCart from "../components/ShoppingCart";
import { useUser } from "../context/userContext";
import { useApp } from "../context/appContext";
import SnackBar from "../components/SnackBar";
import Button from "../components/Button";

type Props = {
  children: React.ReactNode;
};

export default function PageTemplate({ children }: Props) {
  const [open, setOpen] = React.useState(false);

  const { logoutUser, user } = useUser();

  const handleLogout = () => {
    logoutUser();
    openAlert("Logged out successfully");
  };

  const { alertMessage, openAlert } = useApp();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}></div>
        <div className={styles.headerCenter}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.headerCenter}>Modern Walk</div>
            </a>
          </Link>
        </div>
        <div className={styles.headerRight}>
          {user?.name ? (
            <div className={styles.headerRightItems}>
              <ShoppingCart setOpen={setOpen} open={open} />
              <Button varient="primary" onClick={handleLogout} className="mx-2">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login" style={{ textDecoration: "none" }}>
              <a>
                <Button varient="primary">Login</Button>
              </a>
            </Link>
          )}
        </div>
      </div>
      <hr className={styles.hr}></hr>
      <div className={styles.homeContent}>
        <div className={styles.content}>{children}</div>
      </div>
      <SnackBar alert={alertMessage} />
    </div>
  );
}
