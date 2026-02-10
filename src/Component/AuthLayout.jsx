export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">

      {/* Glass Card */}
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-md p-8 text-white animate-fadeIn">
        {children}
      </div>

    </div>
  );
}
