export default function Home() {
  return (
    <main className="flex flex-col mx-auto items-center p-4 gap-8">
      <h1 className="text-3xl">Placeholder Title</h1>

      {/* User Input Boxes to Enter User ID's */}
      <div className="flex flex-row gap-8">
        <div className="flex flex-col items items-center">
          <p className="pb-2">User 1</p>
          <input className="bg-white text-black"></input>
        </div>
        <div className="flex flex-col items items-center">
          <p className="pb-2"> User 2</p>
          <input className="bg-white text-black"></input>
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
      <section>
        <div className="flex flex-row gap-16 bg-slate-800 p-6 rounded-2xl">
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
