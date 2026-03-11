import { Skeleton } from "./ui/skeleton";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="flex items-center gap-2 mb-6 h-8">
      <Skeleton className="rounded-full w-4 h-4" />
      <Skeleton className="rounded-full w-20 h-4" />
      <Skeleton className="rounded-full w-30 h-4" />
    </div>
  );
}
