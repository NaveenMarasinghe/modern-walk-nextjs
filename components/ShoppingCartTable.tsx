import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "@context/cartContext";
import { useUser } from "@context/userContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductAPI } from "@services/product.services";

export type CartItems = {
  id: number;
  itemId: number;
  title: string;
  price: number;
  qty: number;
};

export default function ShoppingCartTable() {
  const [items, setItems] = React.useState<CartItems[]>([]);
  const { user } = useUser();
  const { cart, removeFromCart } = useCart();
  const [successStatus, setSuccessStatus] = React.useState(false);

  const queryClient = useQueryClient();

  const { status, isLoading, isError, data, error } = useQuery(
    ["getCart"],
    async () => {
      if (user?.id) {
        return await ProductAPI.getCart(user.id);
      }
    }
  );
  console.log(data?.data);

  const patchCart = async (id: number) => {
    const res = ProductAPI.removeFromCart(id);
    console.log(res);
    return res;
  };

  const mutation = useMutation(patchCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCart"]);
    },
  });

  return (
    <div className="">
      <div className="px-8 pb-8 text-2xl font-bold text-left">
        Shopping Cart
      </div>
      <div className="px-8">
        <Table sx={{ minWidth: 420 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.length == 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No items available
                </TableCell>
              </TableRow>
            )}
            {data?.data.map((row: CartItems) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="center">
                  <button
                    className="border-none bg-transparent hover:cursor-pointer"

                    // onClick={() => mutation.mutate(row.id)}
                  >
                    <CloseIcon className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* {({ close }) => (
          <button className="btn-2-primary" onClick={openModal}>
            Close
          </button>
        )} */}
      </div>
      <div className="flex justify-end bg-bg-elephant-grey rounded-b-xl px-8"></div>
    </div>
  );
}
