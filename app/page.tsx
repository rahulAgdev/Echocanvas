"use client";
import Live from "@/components/Live";
import { Room } from "./Room";
import Navbar from "@/components/Navbar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

export default function Page() {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      <section className="flex h-full flex-row">
        <LeftSideBar />
        <Live />
        <RightSideBar />

      </section>
    </main>
  );
}
