"use client"; // This is required when using hooks like usePathname

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavigationItem = {
  title: string;
  href: string;
};

const Navbar = ({ navigationData }: { navigationData: NavigationItem[] }) => {
  const pathname = usePathname(); // Get the current active URL

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <nav className="flex flex-1 items-center justify-between font-medium md:justify-center md:gap-8 lg:gap-16">
          <div className="hidden md:flex gap-8 lg:gap-16 bg-background">
            {navigationData.slice(0, 2).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo-transparent.png"
              alt="Company Logo"
              width={80}
              height={80}
              className="h-16 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex gap-8 lg:gap-16">
            {navigationData.slice(2, 4).map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`transition-colors hover:text-primary ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden" asChild>
            <Button variant="outline" size="icon" aria-label="Open Menu">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              {navigationData.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link
                      href={item.href}
                      className={`w-full cursor-pointer ${isActive ? "text-primary font-bold bg-muted/50" : ""}`}
                    >
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
