import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

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
    { name: "About", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Students", href: "/students" },
    { name: "Contact", href: "/contact" },
  ];

  const navigation = isAuthenticated
    ? baseNavigation
    : [...baseNavigation, { name: "Login/Signup", href: "/login" }];

  return (
    <header className="hidden lg:block sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-14 gap-4">
          {/* Desktop - Only show user menu if authenticated */}
          {isAuthenticated && user && (
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <p className="font-medium">{user.fullName}</p>
                <p className="text-xs text-muted-foreground">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/profile">
                  <Button variant="outline" size="sm" className="gap-2" data-testid="nav-profile">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                {user.role === "management" && (
                  <Link href="/management">
                    <Button variant="default" size="sm" data-testid="nav-management">
                      Management
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 dark:text-red-400"
                  onClick={handleLogout}
                  data-testid="nav-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="fixed top-4 right-4 lg:hidden z-50 bg-white/90 backdrop-blur-sm shadow-md"
            data-testid="mobile-menu-button"
          >
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
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex gap-2">
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
                  {user.role === "management" && (
                    <Link href="/management">
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => setTimeout(() => setIsOpen(false), 100)}
                        data-testid="mobile-nav-management"
                      >
                        Management
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
            {navigation.map((item) => (
              <Link
                key={item.name}
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
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
