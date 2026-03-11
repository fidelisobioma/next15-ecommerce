"use client";

import { ProductCard } from "@/app/ProductCard";
import { Product } from "@/generated/prisma";

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-muted-foreground text-center">No products found</div>
    );
  }

  return (
    <>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

// export default async function SearchPage({ searchParams }: SearchPageProps) {
//   const params = await searchParams;
//   const query = params.query?.trim() ?? "";
//   const sort = params.sort;

//   const breadcrumbs = [
//     { label: "products", href: "/" },
//     {
//       label: `Results for "${query}"`,
//       href: `/search?query=${encodeURIComponent(query)}`,
//     },
//   ];
//   return (
//     <>
//       <Breadcrumbs items={breadcrumbs} />
//       <Suspense key={`slug-${query}-${sort}`} fallback={<ProductsSkeleton />}>
//         <Products query={query} sort={sort} />
//       </Suspense>
//     </>
//   );
// }
