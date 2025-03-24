import { accesses, pages } from "@/pages";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

export const SideBar: React.FC = async () => {
  var cookieStore = await cookies();
  var access =
    cookieStore.get("JWT") || cookieStore.get("JWT_refresh")
      ? accesses.authorized
      : accesses.nonAuthorized;

  return (
    <>
      {Object.values(pages)
        .filter((item) => item.access === access)
        .map((item) => (
          <Link
            key={item.name}
            className="text-white p-3 sidebar-point"
            href={item.value}
          >
            {item.name}
          </Link>
        ))}
    </>
  );
};
