import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setLoading(true);
    setResult("");

    const username = form.username.value;
    const email = form.email.value;

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email })
      });

      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 flex items-center justify-center text-white p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          ⚡ Garena Mail Sender
        </h1>

        <p className="text-center text-white/60 mb-6 text-sm">
          Clean Vercel API + Modern UI
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            name="username"
            placeholder="Username"
            required
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/40"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-white/40"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            {loading ? "Sending..." : "Send Code 🚀"}
          </button>
        </form>

        {result && (
          <pre className="mt-6 bg-black/40 p-4 rounded-xl text-xs max-h-48 overflow-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}