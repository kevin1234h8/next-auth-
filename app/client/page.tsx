"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GoogleMapView from "../components/GoogleMapView";
const page = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  console.log(session);

  return <div></div>;
};

export default page;
