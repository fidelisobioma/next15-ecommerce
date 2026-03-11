import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="pt-0 min-h-100 overflow-hidden">
      <div className="relative aspect-video">
        <Skeleton className="w-full" />
      </div>
      <CardHeader>
        <Skeleton className="mb-2 w-4/5 h-5" />
        <Skeleton className="mt-2 w-full h-4" />
        <Skeleton className="mt-1 w-2/3 h-4" />
      </CardHeader>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="w-4/5 h-6" />
        <Skeleton className="w-20 h-6" />
      </CardFooter>
    </Card>
  );
}
