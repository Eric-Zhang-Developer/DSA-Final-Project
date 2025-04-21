"use client";
import { useState } from "react";

export default function Home() {

  // State mangement, variables live here
  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");

  // Handler fuctions for reading input 
  const handleSetUser1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser1(event.target.value);
  };

  const handleSetUser2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser2(event.target.value);
  };

  
  return (
    <main className="flex flex-col mx-auto items-center p-4 gap-8">
      <h1 className="text-3xl">Placeholder Title</h1>

      {/* User Input Boxes to Enter User ID's */}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items items-center">
          <p className="pb-2 text-lg">User 1</p>
          <input
            type="text"
            onChange={handleSetUser1}
            value={user1}
            className="bg-white text-black text-lg"
          ></input>
        </div>
        <div className="flex flex-col items items-center">
          <p className="pb-2 text-lg"> User 2</p>
          <input
            type="text"
            onChange={handleSetUser2}
            value={user2}
            className="bg-white text-black text-lg"
          ></input>
        </div>
      </div>

      {/* Compare */}
      <button
        className="transform bg-slate-800 text-white text-xl
          py-3 px-4 mr-4 rounded-lg shadow-md 
          transition hover:shadow-xl hover:bg-emerald-500 hover:scale-105 cursor-pointer
          "
      >
        Compare
      </button>

      {/* Results */}
      <section className="flex flex-col bg-slate-800 p-6 rounded-2xl items-center gap-6">
        <h3 className="text-xl">
          {user1} is __ steps away from {user2}
        </h3>

        {/* Dijkstra's vs A* Comparison */}
        {/* Path length for the algos is kept for troubleshooting for now*/}
        <div className="flex flex-row gap-16 ">
          <div className=" flex flex-col gap-2">
            <h3 className="text-xl">Dijkstra&apos;s Results:</h3>
            <p>Time:</p>
            <p>Nodes Explored: </p>
            <p>Path Length: </p>
          </div>
          <div className=" flex flex-col gap-2">
            <h3 className="text-xl">A* Results:</h3>
            <p>Time:</p>
            <p>Nodes Explored:</p>
            <p>Path Length:</p>
          </div>
        </div>
      </section>
    </main>
  );
}
