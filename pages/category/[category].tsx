import Layout from "@components/Layout";
import { useEffect, useState } from "react";
import styles from "@styles/Clothing.module.scss";
import Card from "@components/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { ProductAPI } from "@services/product.services";

export async function getStaticPaths() {
  const paths = [
    { params: { category: "men" } },
    { params: { category: "women" } },
    { params: { category: "electronics" } },
    { params: { category: "jewelary" } },
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const productData = await ProductAPI.clothing(params.category);
  return {
    props: {
      productData,
    },
  };
}

export default function Category({ productData }: any) {
  const [categoryDetails, setCategoryDetails] =
    useState<CategoryDetails | null>(null);

  return (
    <Layout>
      <div>
        <h2>{categoryDetails?.categoryTitle}</h2>
        <div className={styles.clothingContainer}>
          {!productData?.error ? (
            productData?.result?.map((item: Items) => (
              <Card key={item.id} data={item} type={categoryDetails?.id} />
            ))
          ) : (
            <div>{productData?.error?.message}</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
