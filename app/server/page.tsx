import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(options);
  console.log(session);
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div>
      <a href="/api/auth/signout">sign out</a>
    </div>
  );
};

export default page;
