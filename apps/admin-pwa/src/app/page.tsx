// apps/admin-pwa/src/app/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Gift, LogIn, UserPlus, SmartphoneNfc } from 'lucide-react'; // Added SmartphoneNfc, DownloadCloud

export default function AdminLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-slate-200 selection:bg-purple-700 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="p-4 sm:p-6 flex justify-between items-center sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/40">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
          Dembegna
        </div>
        <div className="space-x-2 sm:space-x-3">
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 transition-colors duration-300">
            <Link href="/login">
              <LogIn className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Admin Login</span>
            </Link>
          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link href="/login"> {/* Still points to /login as per V1 request */}
             <UserPlus className="mr-0 sm:mr-2 h-4 w-4" /> <span className="hidden sm:inline">Get Started</span>
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32 relative overflow-hidden">
        {/* Subtle background elements - optional */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          {/* You could place a very subtle SVG pattern or blurred shapes here */}
        </div>
        
        <div className="max-w-4xl z-10">
          <div className="inline-block px-4 py-1 mb-6 text-xs font-semibold tracking-wider text-purple-300 uppercase rounded-full bg-purple-500/20 border border-purple-500/30">
            The Future of Customer Loyalty
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-tr from-purple-300 via-pink-400 to-orange-300 leading-tight drop-shadow-md">
            Loyalty, Reimagined. <span className="block">Seamlessly in Their Wallet.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Dembegna revolutionizes customer rewards. Offer digital loyalty cards directly in your customers&apos; **Apple Wallet & Google Wallet** – no app downloads required. Simple for them, powerful for your wine shop.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg bg-purple-600 hover:bg-purple-700 text-white px-10 py-7 shadow-lg hover:shadow-purple-500/30 transform transition-all duration-300 hover:scale-105 rounded-lg">
              <Link href="/login">
                Access Admin Portal
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg border-2 border-slate-600 text-slate-300 hover:bg-slate-700/40 hover:text-slate-100 hover:border-slate-500 px-10 py-7 shadow-md transform transition-all duration-300 hover:scale-105 rounded-lg">
              <Link href="/login"> {/* Points to admin login for now */}
                Explore Features
              </Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Value Proposition / Features Section */}
      <section className="py-20 sm:py-28 bg-slate-900/50 w-full border-t border-b border-slate-700/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-slate-100 tracking-tight">
            Everything You Need for Lasting Loyalty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-slate-800/70 rounded-xl shadow-lg border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-500/30 text-purple-300 shadow-md">
                <SmartphoneNfc className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-100">Direct to Wallet</h3>
              <p className="text-slate-400 text-sm leading-relaxed">No app fatigue. Customers add their loyalty card straight to Apple Wallet or Google Wallet with a simple scan or tap. Frictionless and always accessible.</p>
            </div>
            <div className="p-8 bg-slate-800/70 rounded-xl shadow-lg border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-500/30 text-purple-300 shadow-md">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-100">Simple & Intuitive</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Dembegna is designed for ease of use – for your customers to join and for your staff to manage stamps and rewards effortlessly via a clean admin PWA.</p>
            </div>
            <div className="p-8 bg-slate-800/70 rounded-xl shadow-lg border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-purple-500/30 text-purple-300 shadow-md">
                <Gift className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-100">Boost Repeat Business</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Incentivize loyalty, delight your customers with tangible rewards, and watch them return more often, building a stronger connection with your wine shop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-10 text-sm text-slate-500 bg-slate-900/60 border-t border-slate-800/70">
        <p className="mb-2 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">Dembegna</p>
        <p>&copy; {new Date().getFullYear()} Dembegna Loyalty Solutions. Helping wine shops thrive.</p>
        {/* Optional: Add a link back to the login if appropriate for this page's context */}
        {/* <p className="mt-2"><Link href="/login" className="hover:text-pink-400 transition-colors">Admin Access</Link></p> */}
      </footer>
    </div>
  );
}