"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

type category = { name: string; slug: string };
type props = {
  categories: category[];
};

export function CategorySidebar({ categories }: props) {
  const params = useParams();
  const activeCategory = params.slug as string;

  return (
    <div className="flex-none w-31.32">
      <h3 className="mb-2 font-medium text-muted-foreground text-xs">
        Collection
      </h3>
      <ul>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/search/${category.slug}`}
              className={`text-sm hover:text-primary ${
                activeCategory === category.slug ? "underline" : ""
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
