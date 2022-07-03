import { useState } from "react";
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";


export function App() {


  return (
    <div className="relative">
      <header className="flex justify-center items-center w-screen h-20 text-zinc-50 bg-zinc-900">
        <span className="text-2xl font-bold leading-relaxed">Pomodoro Timer</span>
      </header>
      <section className="w-screen h-screen flex items-start mt-12 justify-center ">
        <Timer />
      </section>
      <Footer />
    </div >
  )
}
