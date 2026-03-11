import { formatPrice } from "@/lib/utils";
import Image from "next/image";

import { Prisma } from "@/generated/prisma/edge";

interface OrderItemProps {
  orderItem: Prisma.OrderItemGetPayload<{ include: { product: true } }>;
}

export default function OrderItem({ orderItem }: OrderItemProps) {
  return (
    <li className="flex justify-between py-4 border-muted border-b">
      <div className="flex space-x-4">
        <div className="border border-muted rounded-md w-16 h-16 overflow-hidden w16">
          <Image
            className="w-full h-full object-cover"
            width={128}
            height={128}
            src={orderItem.product.image ?? "/placeholder.png"}
            // src={orderItem.product.image}
            alt={orderItem.product.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{orderItem.product.name}</div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end gap-2">
        <p className="font-medium">{formatPrice(orderItem.price)}</p>
        <div className="flex items-center border border-muted rounded-full">
          <p className="px-1 py-1.5 text-center">
            Quantity:{orderItem.quantity}
          </p>
        </div>
      </div>
    </li>
  );
}
