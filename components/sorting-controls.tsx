"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
// import { use } from "react";

export function SortingControls() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  const createSortUrl = (sortValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }

    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : "";
  };
  return (
    <>
      <h3 className="mb-2 font-medium text-muted-foreground text-xs">
        Sort By
      </h3>
      <ul>
        <li>
          <Link
            className={cn(
              "hover:text-primary text-sm",
              !currentSort ? "underline" : "",
            )}
            href={createSortUrl(null)}
          >
            Latest
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-asc" ? "underline" : "",
            )}
            href={createSortUrl("price-asc")}
          >
            Price: Low to High
          </Link>
        </li>
        <li>
          <Link
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-desc" ? "underline" : "",
            )}
            href={createSortUrl("price-desc")}
          >
            Price: High to Low
          </Link>
        </li>
      </ul>
    </>
  );
}
