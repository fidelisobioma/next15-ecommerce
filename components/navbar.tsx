import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import SearchInput from "./search-input";
import { CartIndicator } from "./cart-indicator";
import AuthStatus from "./auth-status";

export const categories = [
  { id: 1, name: "Electronics", href: "/search/electronics" },
  { id: 2, name: "Clothing", href: "/search/clothing" },
  { id: 3, name: "Home", href: "/search/home" },
];

export default function Navbar() {
  return (
    <div className="border-b border-dashed">
      <div className="flex justify-between items-center mx-auto h-16 container">
        <div>
          <div className="flex items-center gap-6">
            <Link className="hidden md:block font-bold text-2xl" href="/">
              Store
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className="font-medium text-muted-foreground hover:text-primary text-sm transition-colors"
                  href={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            {/* Mobile nav can go here */}
            <MobileNav />
          </div>
        </div>
        <div className="block mx-4 md:mx-8 w-full">
          <SearchInput />
        </div>
        <div className="flex items-center gap-0">
          <AuthStatus />

          <CartIndicator />

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
