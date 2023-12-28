"use client";
import React from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const count = useSelector((state) => state.counter.value);
  return <div className="w-full h-16 bg-slate-800 sm:rounded-md">{count}</div>;
}
