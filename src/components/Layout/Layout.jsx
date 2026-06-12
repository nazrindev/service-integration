import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  InboxIcon,
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// Updated with a refined Emerald / Cyan-Teal accent palette
const navLinkClass = ({ isActive }) =>
  `group flex w-full items-center rounded-lg py-2.5 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-emerald-400 ${
    isActive
      ? "bg-slate-800 text-emerald-400 border-l-4 border-emerald-500 rounded-l-none"
      : ""
  }`;

export default function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Sidebar - Deep Dark Slate */}
      <aside
        className={`relative flex shrink-0 flex-col overflow-hidden bg-slate-900 text-slate-100 shadow-xl transition-[width] duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-[4.5rem]"
        }`}
      >
        {/* Header Section */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-800 transition-all duration-300 ${
            sidebarOpen ? "justify-between px-4" : "justify-center px-2"
          }`}
        >
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              sidebarOpen ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            <h1 className="whitespace-nowrap text-lg font-bold tracking-wide bg-gradient-to-r mercantile from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-400"
          >
            {sidebarOpen ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3">
          <NavLink
            to="/dashboard"
            title={sidebarOpen ? undefined : "Employees"}
            className={({ isActive }) =>
              `${navLinkClass({ isActive })} ${sidebarOpen ? "gap-3 px-3" : "justify-center px-0"}`
            }
          >
            <InboxIcon className="h-5 w-5 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-in-out ${
                sidebarOpen ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Employees
            </span>
          </NavLink>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={sidebarOpen ? undefined : "Log out"}
            className={`flex w-full items-center rounded-lg py-2.5 text-slate-400 transition-all duration-200 hover:bg-rose-950/40 hover:text-rose-400 ${
              sidebarOpen ? "gap-3 px-3" : "justify-center px-0"
            }`}
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0" />
            <span
              className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-in-out ${
                sidebarOpen ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Log out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
