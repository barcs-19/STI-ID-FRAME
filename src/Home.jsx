import { Link } from "react-router-dom";
import stiLogo from "./assets/Systems_Technology_Institute.png";
import "./App.css";

const Home = () => {
  return (
    <div className="min-h-screen w-full home-bg flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden text-white font-sans">
      {/* Decorative Gradient Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-1.5 rounded-lg shadow-lg">
            <img src={stiLogo} alt="STI Logo" className="h-7 object-contain" />
          </div>
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
            STI ID Frame
          </span>
        </div>
      </header>

      {/* Main Hero Content */}
      <main className="max-w-4xl w-full flex flex-col items-center text-center my-auto py-12 z-10 space-y-6">
        {/* Badge */}

        {/* Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-tight text-white">
          Recapture Your <span className="text-yellow-400">Best</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl font-medium">
          Create customized, high-resolution STI Senior High School and College student ID card previews instantly on any device.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <Link
            to="/ID"
            className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-slate-950 text-base font-extrabold px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-yellow-400/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            CREATE YOUR ID NOW
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Responsive Floating Funny Quote Pills */}
        <div className="flex flex-wrap justify-center items-center gap-3 max-w-3xl pt-8">
          <div className="bg-slate-800/90 border border-slate-700 text-blue-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-2xl shadow-md animate-float">
            "Kuya isang pic pa!"
          </div>
          <div className="bg-slate-800/90 border border-slate-700 text-yellow-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-2xl shadow-md animate-float-delayed">
            "Pwede ba dalawa kami sa ID pic?"
          </div>
          <div className="bg-slate-800/90 border border-slate-700 text-emerald-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-2xl shadow-md animate-float">
            "I Lab my ID 💛"
          </div>
          <div className="bg-slate-800/90 border border-slate-700 text-purple-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-2xl shadow-md animate-float-delayed">
            "Hanggang 4th year na to!"
          </div>
        </div>

        {/* Feature Grid */}
        <div className="hidden grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-12 text-left">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="text-yellow-400 text-xl font-bold mb-1">📱 Mobile Ready</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Fully optimized for iOS & Android smartphones and desktop displays.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="text-blue-400 text-xl font-bold mb-1">🎓 Both ID Formats</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Toggle between SHS, College, or view both ID cards side-by-side.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm">
            <div className="text-emerald-400 text-xl font-bold mb-1">📷 Live Camera & Crop</div>
            <p className="text-slate-400 text-xs sm:text-sm">
              Upload photos or snap pictures with your webcam with built-in cropper.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-xs text-slate-500 z-10 border-t border-slate-800/60">
        By STIers for STI
      </footer>
    </div>
  );
}

export default Home;