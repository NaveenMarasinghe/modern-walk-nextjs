import { Dispatch, Fragment, useState } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import ShoppingCartTable from "@components/ShoppingCartTable";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ProductAPI } from "@services/product.services";
import { useUser } from "@context/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "@styles/ShoppingCart.module.scss";
import { style } from "@mui/system";
import Button from "@components/Button";

type Props = {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

export default function ShoppingCart({ setOpen, open }: Props) {
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpen(false);
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleShoppingCartButton = () => {
    setShowShoppingCart(!showShoppingCart);
  };

  const clearCart = async () => {
    if (user?.id) {
      const res = ProductAPI.clearCart(user?.id);
      console.log(res);
      return res;
    }
  };

  const mutation = useMutation(clearCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
    },
  });

  const handleClearCart = () => {
    mutation.mutate();
    closeModal();
  };

  return (
    <Popover>
      <Popover.Button
        className={styles.cartButton}
        onClick={handleShoppingCartButton}
      >
        <ShoppingCartIcon />
      </Popover.Button>

      {/* clear cart modal */}
      <>
        <Transition appear show={isOpen} as={Fragment}>
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
              <div className={styles.popoverBackground} />
            </Transition.Child>

            <div className={styles.content}>
              <div className={styles.contentBody}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className={styles.dialogPanel}>
                    <div className={styles.dialogPanelContent}>
                      <Dialog.Title as="div" className={styles.dialogTitle}>
                        Clear cart
                      </Dialog.Title>
                      <div
                        className={styles.dialogCrossButton}
                        onClick={closeModal}
                      >
                        X
                      </div>
                    </div>
                    <div className={styles.dialogConfirm}>
                      <p className={styles.dialogConfirmText}>
                        Are you sure you want to remove all items in the
                        shopping cart?
                      </p>
                    </div>

                    <div className={styles.dialogButtons}>
                      <div className={styles.popoverButton}>
                        <Button varient="secondary-danger" onClick={closeModal}>
                          Cancel
                        </Button>
                      </div>
                      <div className={styles.popoverButton}>
                        <Button
                          varient="primary-danger"
                          onClick={handleClearCart}
                        >
                          Clear cart
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      <Transition
        as={Fragment}
        show={showShoppingCart}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel unmount={false} className={styles.popoverPanel}>
          <div className={styles.popoverContainer}>
            <ShoppingCartTable />
            <div className={styles.popoverButtons}>
              <div className={styles.popoverButton}>
                <Button
                  varient="secondary"
                  onClick={async () => {
                    setShowShoppingCart(false);
                  }}
                >
                  Close
                </Button>
              </div>
              <div className={styles.popoverButton}>
                <Button varient="primary" onClick={openModal}>
                  Clear cart
                </Button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
