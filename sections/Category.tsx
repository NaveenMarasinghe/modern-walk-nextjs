import { useEffect, useState } from "react";
import styles from "@styles/Clothing.module.scss";
import Card from "@components/card/Card";
import { Items, CategoryDetails } from "@typesData/items";
import { useQuery } from "@tanstack/react-query";
import { ProductAPI } from "@services/product.services";
import { TenantAPI } from "@services/tenant.services";

export enum categoriesEnum {
  men = "men",
  women = "women",
  electronics = "electronics",
  jewelery = "jewelery",
}

type TenantDetails = {
  id: number;
  name: string;
  code: string;
};

export default function Categor({ tenant, category }: any) {
  const [categoryDetails, setCategoryDetails] =
    useState<CategoryDetails | null>(null);
  const [tenantDetails, setTenantDetails] = useState<TenantDetails | null>(
    null
  );

  // if (products) {
  //   if (
  //     !Object.values(categoriesEnum).includes(
  //       products as unknown as categoriesEnum
  //     )
  //   ) {
  //     router.push("/404");
  //   }
  // }
  useEffect(() => {
    let tmpTenantDetails;
    const getTenantDetails = async () => {
      const tenantArr = tenant.split(".");
      tmpTenantDetails = await TenantAPI.getTenant(tenantArr[0]);
      setTenantDetails(tmpTenantDetails);
    };
    if (tenant) {
      getTenantDetails();
    }
  }, [tenant]);

  const returnProductCategory = () => {
    switch (category) {
      case "men":
        return "men%27s%20clothing";
      case "women":
        return "women%27s%20clothing";
      case "electronics":
        return "electronics";
      case "jewelery":
        return "jewelery";
    }
  };

  const { isLoading, data } = useQuery(
    [returnProductCategory()],
    async () => {
      if (tenantDetails) {
        return await ProductAPI.items(
          returnProductCategory(),
          tenantDetails.code
        );
      }
    },
    { enabled: !!tenantDetails }
  );

  useEffect(() => {
    switch (category) {
      case "women":
        setCategoryDetails({
          id: 1,
          categoryTitle: "Women's Clothing",
          url: "women",
        });
        break;
      case "men":
        setCategoryDetails({
          id: 2,
          categoryTitle: "Men's Clothing",
          url: "men",
        });
        break;
    }
  }, [category]);

  return (
    <div>
      <h2>{categoryDetails?.categoryTitle}</h2>
      <div className={styles.clothingContainer}>
        {isLoading && <div>Loading...</div>}
        {!data?.error ? (
          data?.result?.map((item: Items) => (
            <Card key={item.id} data={item} type={categoryDetails?.id} />
          ))
        ) : (
          <div>{data?.error?.message}</div>
        )}
      </div>
    </div>
  );
}
