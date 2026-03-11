"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex flex-col justify-center items-center gap-4 mx-auto h-screen container">
      <h1 className="font-bold text-2xl">Something went wrong</h1>
      <p className="text-muted-foreground text-sm">
        An error has occurred while fetching the product
      </p>
      <Button onClick={() => reset()}>Try again</Button>
      <Link href="/" className="text-muted-foreground text-sm hover:underline">
        Go back to home
      </Link>
    </main>
  );
}
