import Link from "next/link";
import Image from "next/image";
import { Items } from "@typesData/items";
import styles from "@styles/Home.module.scss";
import Card from "@components/card/Card";
import { ProductAPI } from "@services/product.services";
import { useQuery } from "@tanstack/react-query";

type productDataProp = {
  tenant: any;
};

export default function Home({ tenant }: productDataProp) {
  const { isLoading, data } = useQuery(
    ["home"],
    async () => {
      return await ProductAPI.sale(tenant);
    },
    { enabled: !!tenant }
  );
  console.log("tenant from home:", tenant);
  console.log("data", data);
  return (
    <div className={styles.homeContainer}>
      <h2>Flash sale</h2>
      <div className={styles.homeFlashSaleItems}>
        {!data?.error ? (
          data?.result?.map((item: Items) => <Card key={item.id} data={item} />)
        ) : (
          <div>{data?.error.message}</div>
        )}
      </div>
      <div className={styles.homeCategories}>
        <h2>Categories</h2>
        <div className={styles.homeCategoriesItems}>
          <Link
            href="/products/men"
            as="products/men"
            style={{ textDecoration: "none" }}
          >
            <a>
              <div className={styles.categoryCard}>
                <div className={styles.homeCategoriesImage}>
                  <Image
                    src="https://i.ebayimg.com/thumbs/images/g/x54AAOSw6JJe7xmV/s-l225.webp"
                    alt="men"
                    layout="fill"
                  ></Image>
                </div>
                {`Men's Clothing`}
              </div>
            </a>
          </Link>
          <Link href="/category/women" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard}>
                <div className={styles.homeCategoriesImage}>
                  <Image
                    src="https://i.ebayimg.com/thumbs/images/g/KFoAAOSwFYJe7xmV/s-l225.webp"
                    alt="men"
                    layout="fill"
                  ></Image>
                </div>
                {`Women's Clothing`}
              </div>
            </a>
          </Link>
          <Link href="/category/electronics" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard}>
                <div className={styles.homeCategoriesImage}>
                  <Image
                    src="https://i.ebayimg.com/thumbs/images/g/cGUAAOSwTxpb0x1v/s-l225.webp"
                    alt="men"
                    layout="fill"
                  ></Image>
                </div>
                {`Electronics`}
              </div>
            </a>
          </Link>
          <Link href="/category/jewelary" style={{ textDecoration: "none" }}>
            <a>
              <div className={styles.categoryCard}>
                <div className={styles.homeCategoriesImage}>
                  <Image
                    src="https://i.ebayimg.com/thumbs/images/g/DO0AAOSwG3RbrPWX/s-l225.webp"
                    alt="men"
                    layout="fill"
                  ></Image>
                </div>
                {`Jewelary`}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
