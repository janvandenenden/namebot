import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    console.log(businessIdea);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold mb-3">Namebot</h1>
          <p className="font-light text-xl">
            Generate a list of business names based on your idea
          </p>
        </div>
        <form
          className="flex flex-col w-3/4 mx-auto py-6"
          onSubmit={submitForm}
        >
          <label className="mb-3 text-sm">
            Please enter a brief description of your business idea
          </label>
          <textarea
            className="mb-6 p-1 text-black rounded"
            placeholder="Write your business idea"
            rows={10}
            maxLength={280}
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-indigo-700 px-4 py-2 rounded">
            Generate names
          </button>
        </form>
      </div>
      <div>{businessIdea}</div>
    </main>
  );
}
