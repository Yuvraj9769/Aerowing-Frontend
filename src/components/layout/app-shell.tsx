"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Compass,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navContent = (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Top Header Section */}
        {collapsed ? (
          <div className="mb-6 flex flex-col items-center">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/25 ring-1 ring-white/10">
              <Activity size={19} className="stroke-[2.5]" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b111e] bg-emerald-400" />
            </div>
          </div>
        ) : (
          <div className="mb-7 flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/25 ring-1 ring-white/10">
                <Activity size={18} className="stroke-[2.5]" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-[#0b111e] bg-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  Pulse<span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">CRM</span>
                </span>
                <span className="text-[10px] font-medium tracking-wide text-slate-400">
                  Sales Hub
                </span>
              </div>
            </div>

            {/* Collapse toggle button for desktop */}
            <button
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white md:flex"
              aria-label="Collapse sidebar"
              onClick={() => setCollapsed(true)}
              title="Collapse sidebar"
            >
              <PanelLeftClose size={17} className="shrink-0" />
            </button>

            {/* Close button for mobile */}
            <button
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Section Label */}
        {collapsed ? (
          <div className="my-3 mx-auto w-6 border-t border-white/10" />
        ) : (
          <div className="mb-2.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400/80">
            Workspace
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <Link
            className={cn(
              "group transition-all duration-150",
              collapsed
                ? "flex h-10 w-10 mx-auto items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-900/40"
                : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium bg-blue-600 text-white shadow-sm shadow-blue-900/40",
            )}
            href="/"
            onClick={() => setMobileOpen(false)}
            title="Dashboard"
          >
            <Compass size={18} className="shrink-0 text-white" />
            {!collapsed && <span className="truncate">Dashboard</span>}
          </Link>

          <Link
            className={cn(
              "group transition-all duration-150",
              collapsed
                ? "flex h-10 w-10 mx-auto items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.08] hover:text-white"
                : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
            )}
            href="/"
            onClick={() => setMobileOpen(false)}
            title="Leads"
          >
            <Users size={18} className="shrink-0 text-slate-400 group-hover:text-slate-200" />
            {!collapsed && <span className="truncate">Leads</span>}
          </Link>

          <Link
            className={cn(
              "group transition-all duration-150",
              collapsed
                ? "flex h-10 w-10 mx-auto items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.08] hover:text-white"
                : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
            )}
            href="/"
            onClick={() => setMobileOpen(false)}
            title="Reports"
          >
            <BarChart3 size={18} className="shrink-0 text-slate-400 group-hover:text-slate-200" />
            {!collapsed && <span className="truncate">Reports</span>}
          </Link>
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-white/[0.08] pt-3 pb-1 space-y-1.5">
        <Link
          className={cn(
            "group transition-all duration-150",
            collapsed
              ? "flex h-10 w-10 mx-auto items-center justify-center rounded-xl text-slate-400 hover:bg-white/[0.08] hover:text-white"
              : "flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
          )}
          href="/"
          onClick={() => setMobileOpen(false)}
          title="Settings"
        >
          <Settings size={18} className="shrink-0 text-slate-400 group-hover:text-slate-200" />
          {!collapsed && <span className="truncate">Settings</span>}
        </Link>

        {/* Expand button when sidebar is collapsed */}
        {collapsed && (
          <button
            className="flex h-10 w-10 mx-auto items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Expand sidebar"
            onClick={() => setCollapsed(false)}
            title="Expand sidebar"
          >
            <PanelLeftOpen size={18} className="shrink-0" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar Desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 border-r border-slate-800/60 bg-[#0b111e] py-5 shadow-xl transition-all duration-200 ease-in-out md:translate-x-0",
          collapsed ? "w-[72px] px-2.5" : "w-64 px-4",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {navContent}
      </aside>

      {/* Main Container */}
      <div
        className={cn(
          "transition-all duration-200 ease-in-out",
          collapsed ? "md:pl-[72px]" : "md:pl-64",
        )}
      >
        {/* Top Header with frosted glassmorphism */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/85 px-4 shadow-subtle backdrop-blur-md sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>

            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Sales Pipeline
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-800">Overview</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <span className="block text-xs font-semibold text-slate-900">
                Yuvraj Salte
              </span>
              <span className="block text-[11px] font-medium text-slate-500">
                Software Engineer
              </span>
            </div>
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-xs font-bold text-white ring-2 ring-blue-100 shadow-xs">
              YS
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
          </div>
        </header>

        {/* Main page content area */}
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen ? (
        <button
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-xs md:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </div>
  );
}
