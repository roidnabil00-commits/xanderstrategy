import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1C] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-transparent border-2 border-teal-500 rounded flex items-center justify-center transform -skew-x-12">
              <span className="text-teal-500 font-bold text-lg leading-none transform skew-x-12">X</span>
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-bold text-white tracking-widest uppercase leading-none">
                 XANDER<span className="text-teal-500">.</span>
               </span>
               <span className="text-[10px] text-slate-500 tracking-widest mt-1 uppercase">Business Tech Strategist</span>
            </div>
          </div>

          <div className="flex flex-col md:text-right">
             <span className="text-slate-500 text-xs font-bold tracking-widest mb-2 uppercase">Information</span>
             <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors mb-1">Terms & Condition</a>
             <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
          </div>

        </div>

        <div className="text-center border-t border-white/5 pt-8">
          <p className="text-xs text-slate-600 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} XANDER SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}