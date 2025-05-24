"use client";

import React from 'react';
// import { useRouter } from 'next/navigation'; // Removed as it's no longer used directly here
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut, Users, Gift, ScanLine, QrCode, Award, PlusCircle } from 'lucide-react'; 
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white selection:bg-blue-500 selection:text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800/80 backdrop-blur-md p-6 space-y-6 border-r border-slate-700/60 hidden md:flex flex-col shadow-2xl">
          <div className="text-center pb-4 border-b border-slate-700/60">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400">Dembegna</h2>
            <p className="text-xs text-slate-400 mt-1">Admin Panel</p>
          </div>
          <nav className="flex-grow space-y-2">
              <a href="/dashboard" className="flex items-center p-3 text-slate-100 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-indigo-500/20 border border-sky-500/50 rounded-lg transition-all duration-200 ease-in-out hover:shadow-lg hover:border-sky-400">
                <LayoutDashboard className="h-5 w-5 mr-3 text-sky-300" />
                Dashboard
              </a>
              <a href="#" className="flex items-center p-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 ease-in-out group">
                <Users className="h-5 w-5 mr-3 text-sky-400 group-hover:text-sky-300 transition-colors" />
                Customers
              </a>
              <a href="#" className="flex items-center p-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 ease-in-out group">
                <Gift className="h-5 w-5 mr-3 text-sky-400 group-hover:text-sky-300 transition-colors" />
                Rewards
              </a>
               <a href="#" className="flex items-center p-3 text-slate-300 hover:bg-slate-700/50 rounded-lg transition-colors duration-200 ease-in-out group">
                <ScanLine className="h-5 w-5 mr-3 text-sky-400 group-hover:text-sky-300 transition-colors" />
                Pass Scanner
              </a>
          </nav>
          <div className="pt-4 border-t border-slate-700/60">
            <Button 
              onClick={logout} 
              variant="ghost" 
              className="w-full justify-start text-slate-300 hover:bg-red-600/70 hover:text-red-200 transition-all duration-200 ease-in-out group p-3"
            >
              <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                Admin Dashboard
              </h1>
              <p className="text-slate-400 text-sm md:text-base">
                Welcome back, {user?.name || user?.username}!
              </p>
            </div>
            <Button 
              onClick={logout} 
              variant="outline" 
              className="md:hidden bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-red-600/70 hover:text-red-200 transition-colors duration-200 ease-in-out self-start"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </header>
          
          {/* Informational Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <DashboardCard icon={Users} title="Total Customers" value="0" description="Registered loyalty members" />
            <DashboardCard icon={Gift} title="Rewards Redeemed" value="0" description="This month" />
            <DashboardCard icon={PlusCircle} title="Stamps Issued" value="0" description="Today" />
          </div>
          
          {/* Quick Actions Section */}
          <div className="bg-slate-800/70 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-slate-700/60">
             <h3 className="text-2xl font-semibold text-sky-300 mb-6">Quick Actions</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActionButton icon={QrCode} label="Scan Customer Pass" onClick={() => alert("Scan Customer Pass (Not Implemented)")} />
              <ActionButton icon={PlusCircle} label="Add Stamps" onClick={() => alert("Add Stamps (Not Implemented)")} />
              <ActionButton icon={Award} label="Redeem Reward" onClick={() => alert("Redeem Reward (Not Implemented)")} />
             </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Helper component for Dashboard Cards
interface DashboardCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  description: string;
}
function DashboardCard({ icon: Icon, title, value, description }: DashboardCardProps) {
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-700/60 hover:shadow-sky-500/20 hover:border-sky-500/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-sky-300">{title}</h3>
        <Icon className="h-7 w-7 text-sky-500" />
      </div>
      <p className="text-4xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  );
}

// Helper component for Action Buttons
interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}
function ActionButton({ icon: Icon, label, onClick }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full h-auto p-4 bg-slate-700/50 hover:bg-sky-600/40 border border-slate-600 hover:border-sky-500 text-slate-200 hover:text-sky-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-2"
    >
      <Icon className="h-8 w-8 mb-1 text-sky-400" />
      <span className="text-sm font-medium text-center">{label}</span>
    </Button>
  );
}
