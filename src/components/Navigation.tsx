import { Home, LayoutDashboard, Plus, History, Ruler, Map } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/add-land", icon: Plus, label: "Add Land" },
    { to: "/history-disputes", icon: History, label: "History & Disputes" },
    { to: "/measurement", icon: Ruler, label: "Measurement Tool" },
    { to: "/map-view", icon: Map, label: "Map View" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <span className="text-lg font-bold text-primary-foreground">BB</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">BhumiBandhu</h1>
              <p className="text-xs text-muted-foreground">Your Land. Your Legacy.</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                      "hover:bg-muted hover:text-foreground",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
