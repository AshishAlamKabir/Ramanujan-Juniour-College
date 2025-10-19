import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import collegeLogo from "@assets/Screenshot 2025-10-12 163912_1760267377713.png";

export default function Header() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const baseNavigation = [
    { name: "Home", href: "/" },
    { 
      name: "About", 
      href: "/about",
      subItems: [
        { name: "History", href: "/about#history" },
        { name: "Objectives", href: "/about#objectives" },
        { name: "Leadership", href: "/about#leadership" },
      ]
    },
    { 
      name: "Academics", 
      href: "/academics",
      subItems: [
        { name: "Streams", href: "/academics#streams" },
        { name: "Subjects", href: "/academics#subjects" },
        { name: "Teachers", href: "/academics#teachers" },
        { name: "Students", href: "/academics#students" },
      ]
    },
    { name: "Admissions", href: "/admissions" },
    { name: "Students", href: "/students" },
    { name: "Contact", href: "/contact" },
  ];

  const navigation = isAuthenticated
    ? baseNavigation
    : [...baseNavigation, { name: "Login/Signup", href: "/login" }];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and College Name */}
          <Link href="/" data-testid="logo-link">
            <div className="flex items-center gap-2.5">
              <img 
                src={collegeLogo} 
                alt="Ramanujan Junior College Logo" 
                className="w-10 h-10 object-contain"
              />
              <div className="leading-tight">
                <h1 className="text-base font-bold text-foreground">Ramanujan Junior College</h1>
                <p className="text-xs text-muted-foreground -mt-0.5">Assam (AHSEC)</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger 
                          className={cn(
                            "text-foreground hover:text-primary transition-colors",
                            location === item.href && "text-primary"
                          )}
                          data-testid={`nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                    )}
                                    data-testid={`nav-sub-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                                  >
                                    <div className="text-sm font-medium leading-none">{subItem.name}</div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            location === item.href && "text-primary bg-accent/50"
                          )}
                          data-testid={`nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2" data-testid="nav-user-menu">
                    <User className="h-4 w-4" />
                    <span className="hidden xl:inline">{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer" data-testid="nav-profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer" data-testid="nav-dashboard">
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 dark:text-red-400"
                    data-testid="nav-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" data-testid="mobile-menu-button">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-3 mt-6" data-testid="mobile-nav">
                {isAuthenticated && user && (
                  <div className="pb-3 mb-3 border-b">
                    <p className="text-sm font-medium">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <Link href="/profile">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => setTimeout(() => setIsOpen(false), 100)}
                          data-testid="mobile-nav-profile"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 text-red-600 dark:text-red-400"
                        onClick={() => {
                          handleLogout();
                          setTimeout(() => setIsOpen(false), 100);
                        }}
                        data-testid="mobile-nav-logout"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-foreground hover:text-primary transition-colors py-2 text-lg font-medium",
                        location === item.href && "text-primary"
                      )}
                      onClick={() => {
                        setTimeout(() => setIsOpen(false), 100);
                      }}
                      data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-muted-foreground hover:text-primary transition-colors py-1"
                            onClick={() => {
                        setTimeout(() => setIsOpen(false), 100);
                      }}
                            data-testid={`mobile-nav-sub-${subItem.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
