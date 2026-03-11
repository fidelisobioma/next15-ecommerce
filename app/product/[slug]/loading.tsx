import BreadcrumbsSkeleton from "@/components/breadcrumbs-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

export default async function Loading() {
  return (
    <main className="mx-auto p-4 container">
      <BreadcrumbsSkeleton />
      <Card className="mx-auto max-w-3xl">
        <CardContent className="p-6">
          <Skeleton className="w-1/2 h-8" />
          <div className="space-y-2">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-32 h-6" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
