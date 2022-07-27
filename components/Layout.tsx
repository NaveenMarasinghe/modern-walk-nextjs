import * as React from "react";
import styles from "@styles/Layout.module.scss";
import Link from "next/link";
import ShoppingCart from "@components/shoppingCart/ShoppingCart";
import { useUser } from "@context/userContext";
import { useApp } from "@context/appContext";
import SnackBar from "@components/SnackBar";
import Button from "@components/button/Button";
import AddToCartModal from "@components/addToCartModal/AddToCartModal";

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
      {user?.name && <AddToCartModal />}
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
              <div className={styles.headerRightCartButton}>
                <ShoppingCart setOpen={setOpen} open={open} />
              </div>
              <Button
                varient="primary"
                onClick={handleLogout}
                className={styles.headerRightCartButton}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/signin" style={{ textDecoration: "none" }}>
              <a>
                <Button
                  varient="primary"
                  className={styles.headerRightCartButton}
                >
                  Sign in
                </Button>
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
