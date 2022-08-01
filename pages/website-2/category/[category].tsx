import Layout from "@components/Layout";
import { useEffect, useState } from "react";
import styles from "@styles/Clothing.module.scss";
import Card from "@components/card/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { ProductAPI } from "@services/product.services";

export enum categoriesEnum {
  men = "men",
  women = "women",
  electronics = "electronics",
  jewelary = "jewelary",
}

export async function getStaticPaths() {
  const paths = [
    { params: { category: categoriesEnum.men } },
    { params: { category: categoriesEnum.women } },
    { params: { category: categoriesEnum.electronics } },
    { params: { category: categoriesEnum.jewelary } },
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
