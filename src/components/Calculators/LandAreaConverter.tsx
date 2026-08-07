import React, { useState } from 'react';
import { AREA_UNITS } from '../../data/tamilData';
import { ArrowRightLeft, Layers, Compass, Landmark, Info, CheckCircle2 } from 'lucide-react';

export const LandAreaConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>(10); // Default 10 cent
  const [fromUnit, setFromUnit] = useState<string>('cent');

  const selectedUnitObj = AREA_UNITS.find(u => u.id === fromUnit) || AREA_UNITS[0];

  // Convert input to Sq.Ft first
  const valueInSqFt = inputValue * selectedUnitObj.factorToSqFt;

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-2">
          <span className="bg-blue-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1">
            <ArrowRightLeft className="w-3.5 h-3.5" /> தமிழ்நாடு நில அளவை அலகுகள்
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-50">
            நில அளவை மாற்றி (Land Area Unit Converter)
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            சென்ட், சதுர அடி, மனை (Ground), ஏக்ரா, ஹெக்டேர் மற்றும் குழி அளவீடுகளை உடனடியாக மாற்றி அறியுங்கள்.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Converter Input Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
          
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. நிலப் பரப்பளவை உள்ளிடவும்
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Math.max(0, Number(e.target.value)))}
              className="w-full p-3.5 rounded-xl border border-slate-300 font-black text-xl text-slate-900 bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="10"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. தற்போதைய அலகு (From Unit)
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {AREA_UNITS.map(unit => (
                <option key={unit.id} value={unit.id}>{unit.name}</option>
              ))}
            </select>
          </div>

          {/* Preset Buttons */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">பிரபல நில அளவுகள்:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { val: 1, u: 'cent', label: '1 சென்ட்' },
                { val: 5, u: 'cent', label: '5 சென்ட்' },
                { val: 10, u: 'cent', label: '10 சென்ட்' },
                { val: 1, u: 'ground', label: '1 மனை (Ground)' },
                { val: 1, u: 'acre', label: '1 ஏக்ரா' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputValue(preset.val);
                    setFromUnit(preset.u);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Equivalent Formula Box */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-amber-950">
              <Info className="w-4 h-4 text-amber-700" />
              <span>நிலையான சமன்பாடு (Standard Formula):</span>
            </div>
            <p className="text-[11px] text-amber-900 font-medium">
              1 சென்ட் = 435.6 சதுர அடி | 1 மனை = 2,400 சதுர அடி | 1 ஏக்ரா = 100 சென்ட் = 43,560 சதுர அடி.
            </p>
          </div>

        </div>

        {/* Live Converted Values Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              அனைத்து அலகுகளிலும் மாற்றப்பட்ட விவரங்கள்
            </h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {inputValue} {selectedUnitObj.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AREA_UNITS.map((unit) => {
              const convertedVal = valueInSqFt / unit.factorToSqFt;
              const isSource = unit.id === fromUnit;

              return (
                <div
                  key={unit.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isSource
                      ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-400'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-500 block">{unit.name}</span>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-black text-slate-900 font-mono">
                      {convertedVal >= 1000 
                        ? convertedVal.toLocaleString('en-IN', { maximumFractionDigits: 2 })
                        : convertedVal.toFixed(4).replace(/\.?0+$/, '')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{unit.id}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Land Classification Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              வருவாய்த்துறை நில வகைப்பாடுகள் (Land Classifications in Tamil Nadu)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🌾 நன்செய் (Wet Land)</span>
                <p className="text-slate-600 text-[11px]">ஆறு, ஏரி அல்லது பாசன வசதி கொண்ட விவசாய நிலங்கள்.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🌵 புன்செய் (Dry Land)</span>
                <p className="text-slate-600 text-[11px]">மழைநீரை நம்பியுள்ள அல்லது வானம் பார்த்த பூமி.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🏡 நத்தம் நிலம் (Natham Land)</span>
                <p className="text-slate-600 text-[11px]">கிராமப்புற குடியிருப்புகளுக்காக ஒதுக்கப்பட்ட மனை நிலங்கள்.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">🏙️ மனை நிலம் (Approved Plot)</span>
                <p className="text-slate-600 text-[11px]">DTCP / CMDA நகரமைப்பு அனுமதி பெற்ற மனைப்பிரிவு நிலங்கள்.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
