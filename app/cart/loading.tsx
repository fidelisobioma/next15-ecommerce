import { Skeleton } from "@/components/ui/skeleton";

export default function CartEntry() {
  return (
    <main className="mx-auto py-4 container">
      <div className="flex justify-between py-4 border-muted border-b">
        <div className="flex space-x-4">
          <Skeleton className="z-10 absolute -mt-2 -ml-1 rounded-full w-6 h-6" />
          <Skeleton className="rounded-md w-16 h-16" />
          <div className="flex flex-col">
            <Skeleton className="w-32 h-3" />
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-2">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="rounded-full w-25 h-8" />
        </div>
      </div>

      <div className="flex justify-between py-4 border-muted border-b">
        <div className="flex space-x-4">
          <Skeleton className="z-10 absolute -mt-2 -ml-1 rounded-full w-6 h-6" />
          <Skeleton className="rounded-md w-16 h-16" />
          <div className="flex flex-col">
            <Skeleton className="w-32 h-3" />
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-2">
          <Skeleton className="w-12 h-3" />
          <Skeleton className="rounded-full w-25 h-8" />
        </div>
      </div>

      <div className="flex flex-col pt-4">
        <div className="text-muted-foreground text-sm">
          <div className="text-muted-foreground text-sm">
            <div className="flex justify-between items-center mb-3 pb-1 border-b s">
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            <div className="flex justify-between items-center mb-3 pb-1 border-b s">
              <Skeleton className="w-8 h-3" />
              <Skeleton className="w-32 h-3" />
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            <div className="flex justify-between items-center mb-3 pb-1 border-b s">
              <Skeleton className="w-12 h-3" />
              <Skeleton className="w-32 h-3" />
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            <div className="flex justify-between items-center mb-3 pb-1 border-b font-semibold">
              <Skeleton className="w-8 h-3" />
              <Skeleton className="w-12 h-3" />
            </div>
          </div>
        </div>
        <Skeleton className="mt-4 w-full h-12" />
      </div>
    </main>
  );
}
