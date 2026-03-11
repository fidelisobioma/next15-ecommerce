import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto py-4 container">
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </main>
  );
}
