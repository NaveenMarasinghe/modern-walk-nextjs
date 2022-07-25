import styles from "@styles/Home.module.scss";
import Card from "@components/Card";
import Link from "next/link";
import { Items } from "@typesData/items";

type productDataProp = {
  data: any;
};

export default function Home({ data }: productDataProp) {
  return (
    <div className={styles.homeContainer}>
      <h2>Flash sale</h2>
      <div className={styles.homeFlashSaleItems}>
        {!data?.error ? (
          data?.map((item: Items) => <Card key={item.id} data={item} />)
        ) : (
          <div>{data?.error.message}</div>
        )}
      </div>
      <div className={styles.homeCategories}>
        <h2>Categories</h2>
        <div className={styles.homeCategoriesItems}>
          <Link href="/products/men" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard + " " + styles.men}>
                {`Men's Clothing`}
              </div>
            </a>
          </Link>
          <Link href="/category/women" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard + " " + styles.women}>
                {`Women's Clothing`}
              </div>
            </a>
          </Link>
          <Link href="/category/electronics" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard + " " + styles.men}>
                {`Electronics`}
              </div>
            </a>
          </Link>
          <Link href="/category/jewelary" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard + " " + styles.women}>
                {`Jewelary`}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
