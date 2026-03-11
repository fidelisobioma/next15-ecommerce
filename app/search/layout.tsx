import { CategorySidebar } from "@/components/category-sidebar";
import { SortingControls } from "@/components/sorting-controls";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

async function CategorySidebarServerWrapper() {
  const categories = await unstable_cache(
    () => {
      return prisma.category.findMany({
        select: { name: true, slug: true },
        orderBy: { name: "asc" },
      });
    },
    ["categories"],
    { tags: ["categories"], revalidate: 3600 },
  )();
  return <CategorySidebar categories={categories} />;
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto py-4 container">
      <div className="flex gap-8">
        <div className="flex-none w-31.25">
          <Suspense fallback={<div className="bg-gray-200 rounded w-31.32" />}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="flex-none w-31.25">
          <SortingControls />
        </div>
      </div>
    </main>
  );
}
