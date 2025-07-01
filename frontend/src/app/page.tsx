"use client";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  interface ConnectionPair {
    user1: string;
    user2: string;
  }

  interface JSONPayload {
    dijkstra : ExpectedResult;
    bfs : ExpectedResult;
  }

  interface ExpectedResult {
    start: string;
    end: string;
    runtime_seconds: number;
    nodes_expanded: number;
    cost: number;
    path: string[]
  }

  const connectionPairs: ConnectionPair[] = [
    // Single step
    { user1: "214328887", user2: "34428380" },
    { user1: "380580781", user2: "18996905" },
    { user1: "17116707", user2: "28465635" },
    { user1: "221036078", user2: "153460275" },
    { user1: "107830991", user2: "17868918" },

    // Two steps
    { user1: "222261763", user2: "222411742" },
    { user1: "88097807", user2: "109740608" },
    { user1: "254839786", user2: "35359596" },
    { user1: "74107696", user2: "221036078" },
    { user1: "400689940", user2: "131613362" },
    { user1: "133055665", user2: "187773078" },

    // Three steps
    { user1: "17759158", user2: "355823615" },
    { user1: "18996905", user2: "8163442" },
    { user1: "34428380", user2: "260769396" },
    { user1: "394263193", user2: "176222605" },
    { user1: "394263193", user2: "26649453" },

    // Four steps
    { user1: "21146135", user2: "404376053" },

    // Five steps
    { user1: "283306479", user2: "14050306" },

    // Invalid
    { user1: "2704495328", user2: "8163442" },
    { user1: "2704498", user2: "2163442" },
  ];

  // State management, variables live here
  const [user1, setUser1] = useState<string>("");
  const [user2, setUser2] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [results, setResults] = useState<JSONPayload | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // Handler functions for reading input
  const handleSetUser1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser1(event.target.value);
  };
  const handleSetUser2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser2(event.target.value);
  };

  // Select Random element from static pair and assign it to user1  and user2
  function getRandomElement(): void {
    const randomIndex = Math.floor(Math.random() * connectionPairs.length);
    setUser1(connectionPairs[randomIndex].user1);
    setUser2(connectionPairs[randomIndex].user2);

    // Trigger pulse animation on the analyze button
    setShouldPulse(true);
    setTimeout(() => setShouldPulse(false), 2000);
  }

  // Server will start up from cold when page is initially loaded
  useEffect(() => {
    warmUpServer();
  }, []);

  const warmUpServer = async () => {
    console.log("Warming up Render Server!!");
    try {
      const response = await fetch(
        "https://cop3530-final-project-twitter-traverse.onrender.com/api/health"
      );
      if (response.ok) {
        console.log("Server is Warm!");
      } else {
        console.log("Server Response but Error");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // Handles comparison
  // The big meaty logic is here
  // Skeleton for now
  const handleCompare = async () => {
    console.log("Comparing!");
    // Resets comparison
    setIsLoading(true);
    setResults(undefined);
    setError(null);

    try {
      // call backend
      // http://127.0.0.1:5001/api/compare
      // call production
      // https://cop3530-final-project-twitter-traverse.onrender.com/api/compare
      const response = await fetch(
        "https://cop3530-final-project-twitter-traverse.onrender.com/api/compare",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: user1, end: user2 }),
        }
      );

      // error handling
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      // get data and store it
      const data = await response.json();
      setResults(data);
      console.log(results);
    } catch (error) {
      // Store error message, wipe results
      setError("Failed to fetch");
      setResults(undefined);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col mx-auto items-center p-4 gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-emerald-400 tracking-wide drop-shadow-md">
        TwitterTraverse
      </h1>

      {/* User Input Boxes to Enter User ID's */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 w-full max-w-md">
        <div className="flex flex-col items-center flex-1">
          <label
            htmlFor="user1-input"
            className="pb-1.5 text-lg font-medium text-emerald-300 uppercase tracking-wider" // Sci-fi label style
          >
            User 1
          </label>
          <input
            type="text"
            onChange={handleSetUser1}
            value={user1}
            className="bg-slate-800 border border-slate-600 text-gray-100 text-lg p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500 transition duration-200 shadow-inner"
            placeholder="User ID"
          ></input>
        </div>
        <div className="flex flex-col items-center flex-1">
          <label
            className="pb-1.5 text-lg font-medium text-emerald-300 uppercase tracking-wider" // Sci-fi label style
          >
            User 2
          </label>
          <input
            type="text"
            onChange={handleSetUser2}
            value={user2}
            className="bg-slate-800 border border-slate-600 text-gray-100 text-lg p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-500 transition duration-200 shadow-inner"
            placeholder="User ID"
          ></input>
        </div>
      </div>

      <button
        onClick={getRandomElement}
        disabled={isLoading} // Keep disabled logic for styling state
        className="
    transform bg-emerald-600 text-white text-lg sm:text-2xl font-semibold tracking-wide
    py-3 sm:px-10 px-8 rounded shadow-md border border-emerald-700
    transition duration-200
    hover:bg-emerald-500 hover:shadow-lg hover:border-emerald-500 hover:scale-105
    hover:cursor-pointer
    disabled:opacity-40"
      >
        🎲 Try Random Connection 🎲
      </button>

      {/* Compare */}
      <button
        id="analyze-btn"
        onClick={handleCompare}
        disabled={isLoading || !user1 || !user2}
        className={`
            transform bg-slate-700 text-white text-md font-medium
            py-2 px-6 rounded shadow-md border border-slate-600
            transition duration-200
            hover:bg-slate-600 hover:shadow-lg hover:border-slate-500
            hover:cursor-pointer
            disabled:opacity-40
            disabled:cursor-not-allowed
            ${shouldPulse && user1 && user2 ? "animate-pulse ring-2 ring-emerald-400" : ""}
          `}
      >
        {isLoading ? "Analyzing..." : "Analyze Connection →"}
      </button>

      {/* --- Display Area --- */}
      <div className="w-full min-h-[250px]">
        {/* Error Handling */}
        {!isLoading && error && (
          <p className="text-center text-red-500 text-lg pt-4">Error: {error}</p>
        )}

        {/* Loading */}
        {isLoading && (
          <section className="container mx-auto flex flex-col items-center justify-center p-4 gap-4">
            <LoaderCircle className="animate-spin" size={45}></LoaderCircle>
            <p className="text-sm text-gray-500 text-center">
              First request may take 20-40 seconds while the server wakes up
            </p>
          </section>
        )}

        {/* Main Results */}
        {/* Appears ONLY when isLoading is false AND error is null AND results has data */}
        {!isLoading && !error && results && (
          <section className="flex flex-col bg-slate-800 p-6 rounded-2xl items-center gap-6 w-full mt-4 container mx-auto">
            {/* Overall Summary */}
            <h3 className="text-xl text-center">
              {results.dijkstra.cost !== null && results.dijkstra.cost >= 0
                ? `${results.dijkstra.start} is ${results.dijkstra.cost} steps away from ${results.dijkstra.end}` // Use IDs from results for consistency
                : `No path found between ${user1} and ${user2}`}{" "}
            </h3>

            {/* Display the Path */}
            <div className="w-full text-center">
              <h4 className="text-xl text-emerald-400 mb-1">Path Found:</h4>
              <p className="text-sm bg-slate-700 p-2">
                {results.dijkstra.path && results.dijkstra.path.length > 0
                  ? results.dijkstra.path.join(" -> ")
                  : "N/A"}
              </p>
            </div>

            {/* Dijkstra's vs BFS Comparison */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center">
              {/* Dijkstra Column */}
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-xl text-emerald-400">Dijkstra&apos;s Algorithm:</h3>
                <p>Time: {results.dijkstra?.runtime_seconds?.toFixed(4) ?? "N/A"} s</p>
                <p>Nodes Explored: {results.dijkstra?.nodes_expanded?.toLocaleString() ?? "N/A"}</p>
                <p>Path Length: {results.dijkstra?.cost ?? "N/A"}</p>
              </div>

              {/* A* Column */}
              <div className="flex flex-col gap-2 text-center md:text-left">
                <h3 className="text-xl text-emerald-400">Breadth-First Search:</h3>
                <p>Time: {results.bfs?.runtime_seconds?.toFixed(4) ?? "N/A"} s</p>
                <p>Nodes Explored: {results.bfs?.nodes_expanded?.toLocaleString() ?? "N/A"}</p>
                <p>Path Length: {results.bfs?.cost ?? "N/A"}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
