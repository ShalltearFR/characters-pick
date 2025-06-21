"use client";
import { UserContext, User } from "./UserContext";
import React from "react";

export default function DashboardProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
