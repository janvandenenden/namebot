// import Image from "next/image";
// import { Inter } from "next/font/google";
import { useState, useRef } from 'react'
// import { json } from "stream/consumers";

export default function Home() {
  const [businessIdea, setBusinessIdea] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const resultRef = useRef<null | HTMLDivElement>(null)

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: businessIdea, count: 10 }),
    })
    const result = await response.json()
    setSuggestions(result.suggestions)
    setLoading(false)
    resultRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-2 md:p-12 lg:p-24">
      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold mb-3">Namebot</h1>
          <p className="font-light text-xl">Generate a list of business names based on your idea</p>
        </div>
        <form
          className="flex flex-col mx-auto py-6 bg-slate-900 lg:p-12 p-4 mb-6 rounded lg:w-3/4"
          onSubmit={submitForm}
        >
          <label className="mb-3 text-sm">Please enter a brief description of your business idea</label>
          <input
            className="mb-6 p-1 h-12 text-black rounded"
            placeholder="Write your business idea"
            maxLength={280}
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            required
          ></input>
          <button type="submit" className="bg-indigo-700 px-4 py-4 rounded font-bold">
            {loading ? (
              <>
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 mr-4 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Loading...
                </div>
              </>
            ) : (
              'Generate names'
            )}
          </button>
        </form>
      </div>
      <div className="container mx-auto grid gap-3 lg:grid-cols-3" ref={resultRef}>
        {suggestions.length > 0 && <h1 className="my-2 col-span-3 text-center text-6xl font-bold">Results</h1>}
        {suggestions.map((s, i) => (
          <div
            className="rounded text-center col-span-1 bg-gradient-to-t from-gray-800 to-gray-700 flex items-center justify-center p-12 font-bold text-3xl"
            key={i}
          >
            {s}
          </div>
        ))}
      </div>
    </main>
  )
}
