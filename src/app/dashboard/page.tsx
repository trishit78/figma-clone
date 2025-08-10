"use client"

import React from "react";
import { signout } from "../actions/auth";

const Page = () => {
  return (
    <div>
      <p>Dashboard</p>
      <button onClick={() => signout()}>Signout</button>
    </div>
  );
};

export default Page;
