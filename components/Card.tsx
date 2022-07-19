import Styles from "../styles/Card.module.scss";
import { Items } from "../types/items";
import { useUser } from "../context/userContext";
import AddToCartModal from "./AddToCartModal";

type Props = {
  data: Items;
  type?: number;
};

export default function Card({ data, type }: Props) {
  const { user } = useUser();
  return (
    <div className={Styles["cardContainer"]}>
      <div className={Styles["cardTitle"]}>{data.title}</div>
      <div className={Styles["cardImage"]}>
        <img
          src={data.image}
          className={Styles["cardImageFile"]}
          alt="Clothing"
        ></img>
      </div>
      <div className={type === 1 ? Styles["women"] : Styles["men"]}>
        <div className={Styles["cardPrice"]}>RS {data.price}</div>
        <div className={Styles["cardDescription"]}>
          {data.description.substring(0, 140) +
            (data.description.length > 140 && "...")}
        </div>
        {user?.name && <AddToCartModal data={data} />}
      </div>
    </div>
  );
}
