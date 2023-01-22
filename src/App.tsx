import { useState } from "react";
import { Footer } from "./components/Footer";
import { Timer } from "./components/Timer";
import wallp from '../src/assets/wallp.avif'

export function App() {


  return (
    <div className={`relative`}>
      <header className="flex justify-center items-center w-screen h-40 text-zinc-50 bg-zinc-900 relative z-100">
        <span className="text-2xl font-bold leading-relaxed">Pomodoro Timer</span>
      </header>
      <section className="w-screen h-screen flex items-start justify-center relative z-50">
        <Timer />
      </section>
      <Footer />
    </div >
  )
}
