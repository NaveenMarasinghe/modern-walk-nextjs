import styles from "@styles/Home.module.css";
import Card from "@components/Card";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProductAPI } from "@services/product.services";
import { Items } from "@typesData/items";

type productDataProp = {
  data: any;
};

export default function Home({ data }: productDataProp) {
  // const { isLoading, data } = useQuery(["clothing"], () => {
  //   return ProductAPI.clothing("clothing");
  // });
  // console.log(data?.result?.data);

  console.log("data", data);
  return (
    <div className={styles.homeContainer}>
      <h2>Flash sale</h2>
      <div className={styles.homeFlashSaleItems}>
        {/* {isLoading && <div>Loading...</div>} */}
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
          <Link href="/products/women" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard + " " + styles.women}>
                {`Women's Clothing`}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
