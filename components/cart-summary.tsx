import { getCart } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";

export default async function CartSummary() {
  const cart = await getCart();
  if (!cart) {
    return null;
  }
  const subtotal = cart.subtotal;
  const taxes = 0;
  const shipping = 0;

  const total = subtotal + taxes + shipping;
  return (
    <div className="flex flex-col pt-4">
      <div className="text-muted-foreground text-sm">
        <div className="text-muted-foreground text-sm">
          <div className="flex justify-between items-center mb-3 pb-1 border-b s">
            <p>Subtotal</p>
            <p className="text-foreground text-base">{formatPrice(subtotal)}</p>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          <div className="flex justify-between items-center mb-3 pb-1 border-b s">
            <p>Taxes</p>
            <p>Calculated at checkout</p>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          <div className="flex justify-between items-center mb-3 pb-1 border-b s">
            <p>Shipping</p>
            <p>Calculated at checkout</p>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          <div className="flex justify-between items-center mb-3 pb-1 border-b font-semibold">
            <p>Total</p>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
