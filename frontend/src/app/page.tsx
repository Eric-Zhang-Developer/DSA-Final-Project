/* eslint-disable @typescript-eslint/no-explicit-any */
// Being lazy with eslint here...

"use client";
import { useState } from "react";

export default function Home() {
  // State mangement, variables live here
  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Handler fuctions for reading input
  const handleSetUser1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser1(event.target.value);
  };
  const handleSetUser2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser2(event.target.value);
  };

  // Handles comparison
  // The big meaty logic is here
  // Skeleton for now
  const handleCompare = async () => {
    console.log("Comparing!");
    // Resets comparison
    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      // call backend
      // localhost for now 
      const response = await fetch("http://localhost:5000/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: user1, end: user2 }),
      });

      // error handling
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // get data and store it
      const data = await response.json();
      setResults(data);
      console.log(results);
    } catch (err: any) {
      // Store error message, wipe results
      setError(err.message || "Failed to fetch");
      setResults(null);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
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
            className="bg-white text-black text-lg p-0.5 rounded-lg pl-2"
            placeholder="Enter Start User Id"
          ></input>
        </div>
        <div className="flex flex-col items items-center">
          <p className="pb-2 text-lg"> User 2</p>
          <input
            type="text"
            onChange={handleSetUser2}
            value={user2}
            className="bg-white text-black text-lg p-0.5 rounded-lg pl-2"
            placeholder="Enter End User Id"
          ></input>
        </div>
      </div>

      {/* Compare */}
      <button
        onClick={handleCompare}
        className="transform bg-slate-800 text-white text-xl
          py-3 px-4 mr-4 rounded-lg shadow-md 
          transition hover:shadow-xl hover:bg-emerald-500 hover:scale-105 cursor-pointer
          "
      >
        {isLoading ? "Comparing..." : "Compare"}
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
