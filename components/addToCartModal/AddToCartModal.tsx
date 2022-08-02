import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useCart } from "@context/cartContext";
import { useUser } from "@context/userContext";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ProductAPI } from "@services/product.services";
import styles from "./AddToCartModal.module.scss";
import Button from "@components/button/Button";
import Image from "next/image";
import { useAddToCartModal } from "@context/AddToCartModalContext";
import { User } from "@typesData/user";

export default function AddToCartModal() {
  const { modalData, closeModal } = useAddToCartModal();
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(modalData?.price);
  const { cart, addToCart } = useCart();
  const { getUser } = useUser();
  const [added, setAdded] = useState(false);

  const [user, setUser] = useState<User | null>();

  const queryClient = useQueryClient();

  useEffect(() => {
    const userDetails = getUser();
    if (userDetails) {
      setUser(userDetails);
    }
  }, [getUser]);

  const handlePlus = () => {
    setQty(qty + 1);
  };
  const handleMinus = () => {
    setQty(qty - 1);
  };
  useEffect(() => {
    if (modalData) {
      setTotal(qty * modalData.price);
    }
  }, [qty, modalData]);

  const patchCart = async (items: any) => {
    if (user?.id) {
      const res = ProductAPI.addToCart(items, user?.id);
      console.log(res);
      return res;
    }
  };

  const mutation = useMutation(patchCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
      setAdded(true);
    },
  });

  const handleAdd = async () => {
    if (user?.id && modalData) {
      const itemData = {
        userId: user.id,
        itemId: modalData.id,
        title: modalData.title,
        price: modalData.price,
        qty: qty,
      };
      addToCart(itemData);
      mutation.mutate(itemData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAdded(false);
    }, 5000);
  }, [added]);

  return (
    <>
      <Transition appear show={modalData?.isOpen || false} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={styles.modalRoot} />
          </Transition.Child>

          <div className={styles.container}>
            <div className={styles.body}>
              {/* <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              > */}
              <Dialog.Panel className={styles.panel}>
                <div className={styles.panelTitle}>
                  <Dialog.Title as="div" className={styles.panelTitleText}>
                    Add to cart
                  </Dialog.Title>
                  <div className={styles.panelCloseIcon} onClick={closeModal}>
                    x
                  </div>
                </div>
                {modalData && (
                  <div className={styles.details}>
                    <div className={styles.detailsBody}>
                      <div className={styles.detailsBodyImage}>
                        <Image
                          src={modalData.image}
                          alt="item"
                          width={200}
                          height={200}
                        />
                      </div>

                      <div className={styles.detailsTitle}>
                        <div className={styles.detailsTitleText}>
                          {modalData.title}
                        </div>
                        <div className={styles.detailsPrice}>
                          {"Rs. " + modalData.price}
                        </div>
                      </div>
                    </div>
                    <div className={styles.qtyContainer}>
                      <div className={styles.qtyBody}>
                        <div className={styles.qtyTitle}>Qty</div>
                        <div className={styles.qtyChange}>
                          <button
                            className={styles.qtyChangeIcon}
                            onClick={() => handleMinus()}
                          >
                            -
                          </button>
                          <div className={styles.qtyAmount}>{qty}</div>
                          <button
                            className={styles.qtyChangeIcon}
                            onClick={() => {
                              handlePlus();
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className={styles.qtyTotal}>
                        <div className={styles.qtyTotalTitle}>Total</div>
                        <div className={styles.qtyTotalAmount}>{total}</div>
                      </div>
                    </div>
                  </div>
                )}
                {!added ? (
                  <div className={styles.buttons}>
                    <Button
                      varient="secondary"
                      className={styles.button}
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      varient="primary"
                      className={styles.button}
                      onClick={handleAdd}
                    >
                      Add to cart
                    </Button>
                  </div>
                ) : (
                  <div className={styles.itemAdded}>
                    <div className={styles.itemAddedText}>
                      Item added successfully
                    </div>
                  </div>
                )}
              </Dialog.Panel>
              {/* </Transition.Child> */}
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
