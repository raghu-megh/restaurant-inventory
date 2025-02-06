"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

const NavBar = ({ children }: { children: ReactNode }) => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href={"/"} className="mr-5">
        Restaurant Inventory System
      </Link>
      <Link href={"/users"} className="mr-5">
        Users
      </Link>
      {status === "authenticated" && <div>{session?.user!.name}</div>}
      {status === "unauthenticated" && <div>{children}</div>}
    </div>
  );
};

export default NavBar;
