"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";

const NavBar = ({
  signInButton,
  signOutButton,
}: {
  signInButton: ReactNode;
  signOutButton: ReactNode;
}) => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  return (
    <div className="flex bg-slate-200 p-5">
      <Link href={"/"} className="mr-5">
        Restaurant Inventory System
      </Link>

      {status === "authenticated" && (
          <Link href={"/dashboard"} className="mr-5">
            Transactions
          </Link>
        ) && (
          <div className="flex">
            {session?.user!.name}
            <span className="ml-3">{signOutButton}</span>
          </div>
        )}
      {status === "unauthenticated" && <div>{signInButton}</div>}
    </div>
  );
};

export default NavBar;
