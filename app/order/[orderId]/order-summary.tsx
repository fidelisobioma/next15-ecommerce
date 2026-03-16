import OrderStatusBadge from "@/components/order-status-badge";
import { OrderWithItemsAndProduct } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";

interface OrderSummaryProps {
  order: OrderWithItemsAndProduct;
}

export default async function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="flex flex-col pt-4">
      <div className="text-muted-foreground text-sm">
        <div className="flex justify-between items-center mb-3 pb-1 border-b">
          <p>Subtotal</p>
          <p className="text-foreground text-base">
            {formatPrice(order.total)}
          </p>
        </div>

        <div className="flex justify-between items-center mb-3 pb-1 border-b">
          <p>Taxes</p>
          <p>{formatPrice(0)}</p>
        </div>

        <div className="flex justify-between items-center mb-3 pb-1 border-b">
          <p>Shipping</p>
          <p>{formatPrice(0)}</p>
        </div>

        <div className="flex justify-between items-center mb-3 pb-1 border-b">
          <p>Status</p>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex justify-between items-center mb-3 pb-1 border-b font-semibold">
          <p>Total</p>
          <p className="text-foreground text-base">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
