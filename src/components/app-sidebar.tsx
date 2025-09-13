"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { ArrowLeftIcon, ArrowRightIcon, DigipLogo } from "./ui/icons";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";

export const AppSidebar = () => {
  const { open, setOpen } = useSidebar();
  return (
    <Sidebar dir="rtl" side="right" collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-4">
        <div className="flex justify-between w-full">
          {open ? (
            <>
              <DigipLogo className="h-6" />
              <ArrowRightIcon
                onClick={() => {
                  setOpen(!open);
                }}
                className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
              />
            </>
          ) : (
            <ArrowLeftIcon
              onClick={() => {
                setOpen(!open);
              }}
              className="cursor-pointer w-6 h-6 hover:bg-zinc-100 hover:border hover:rounded"
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={`${!open && "justify-center"}`}>
            الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a className="mx-auto">
                    <ArrowRightIcon />
                    <span>hii</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
