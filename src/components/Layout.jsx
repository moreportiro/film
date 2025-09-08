import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function Layout() {
  // useLocation отслеживает на какой странице находишься
  const { pathname } = useLocation();
  const isHomePage = useMemo(() => pathname === "/", [pathname]);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white px-6 py-5">
      {!isHomePage && (
        <header className="mb-10 flex items-center justify-between">
          <Link to="/">Лого</Link>
        </header>
      )}
      <Outlet />
    </div>
  );
}
