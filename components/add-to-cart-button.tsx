"use client";
import { Product } from "@/generated/prisma";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { addTocart } from "@/lib/actions";
import { useCart } from "@/lib/action/use-cart";

export function AddToCartButton({ product }: { product: Product }) {
  const [isAdding, setIsAdding] = useState(false);
  const { revalidateCart } = useCart();

  const handleAddTocart = async () => {
    try {
      setIsAdding(true);
      await addTocart(product.id, 1);
      revalidateCart();
    } catch (error) {
      console.error("Error adding to cart", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <Button
      onClick={handleAddTocart}
      disabled={product.inventory === 0 || isAdding}
      className="flex justify-center items-center bg-black hover:bg-gray-800 disabled:bg-gray-500 dark:bg-white dark:hover:bg-gray-200 disabled:opacity-50 px-4 py-2 rounded-md w-full text-white dark:text-black disabled:cursor-not-allowed"
    >
      <ShoppingCart className="mr-1 w-4 h-4" />
      {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}
