// pages/index.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Daakye Digital</h1>
      <p className="text-xl text-gray-600 mb-8">
        Empowering African MSMEs with digital tools for tomorrow’s business growth.
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg transition">
        Get Started
      </button>
    </main>
  );
}
