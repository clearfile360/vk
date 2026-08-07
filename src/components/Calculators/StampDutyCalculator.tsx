import React, { useState } from 'react';
import { Calculator, AlertCircle, Info, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export const StampDutyCalculator: React.FC = () => {
  const [level, setLevel] = useState<'level1' | 'level2'>('level2');
  const [deedType, setDeedType] = useState<'sale' | 'settlement_family' | 'partition' | 'mortgage' | 'rent'>('sale');
  const [calculationMode, setCalculationMode] = useState<'direct' | 'unit'>('direct');
  
  // Level 2 Zone Classifications
  const [zoneTier, setZoneTier] = useState<'corporation' | 'municipality' | 'town_panchayat' | 'village'>('municipality');
  const [propertyUsage, setPropertyUsage] = useState<'residential' | 'commercial' | 'agricultural' | 'highway_facing'>('residential');
  
  // Direct amount
  const [propertyValue, setPropertyValue] = useState<number>(2500000); // Default 25 Lakhs

  // Unit based
  const [landArea, setLandArea] = useState<number>(1000); // 1000 sq ft
  const [unitType, setUnitType] = useState<'sqft' | 'cent'>('sqft');
  const [guidelineRate, setGuidelineRate] = useState<number>(2500); // ₹2500 per sqft

  // Effective consideration amount
  const rawPropertyValue = calculationMode === 'direct' 
    ? propertyValue 
    : unitType === 'sqft' 
      ? landArea * guidelineRate 
      : (landArea * 435.6) * guidelineRate;

  // Level 2 Zone Multipliers
  const zoneMultiplier = level === 'level2' 
    ? propertyUsage === 'commercial' ? 1.15 : propertyUsage === 'highway_facing' ? 1.20 : 1.0
    : 1.0;

  const computedPropertyValue = Math.round(rawPropertyValue * zoneMultiplier);

  // Calculate Stamp Duty & Registration Fee
  const calculateFees = () => {
    let stampRate = 0;
    let regRate = 0;
    let stampAmount = 0;
    let regAmount = 0;
    let maxStampCap: number | null = null;
    let maxRegCap: number | null = null;
    let compFee = level === 'level2' ? 350 : 200; // standard / level 2 computer + barcode fee
    let subdivisionFee = level === 'level2' ? 1000 : 0; // Level 2 subdivision survey fee

    switch (deedType) {
      case 'sale':
        stampRate = 0.07; // 7%
        regRate = 0.02;   // 2%
        stampAmount = computedPropertyValue * stampRate;
        regAmount = computedPropertyValue * regRate;
        break;

      case 'settlement_family':
        stampRate = 0.04; // 4% max 40k
        regRate = 0.01;   // 1% max 10k
        maxStampCap = 40000;
        maxRegCap = 10000;
        stampAmount = Math.min(computedPropertyValue * stampRate, maxStampCap);
        regAmount = Math.min(computedPropertyValue * regRate, maxRegCap);
        break;

      case 'partition':
        stampRate = 0.01; // 1%
        regRate = 0.01;   // 1%
        stampAmount = computedPropertyValue * stampRate;
        regAmount = computedPropertyValue * regRate;
        break;

      case 'mortgage':
        stampRate = 0.01;
        regRate = 0.01;
        stampAmount = computedPropertyValue * stampRate;
        regAmount = computedPropertyValue * regRate;
        break;

      case 'rent':
        stampRate = 0.01;
        regRate = 0.01;
        stampAmount = Math.max(100, computedPropertyValue * stampRate);
        regAmount = Math.max(100, computedPropertyValue * regRate);
        break;
    }

    const totalGovtFee = stampAmount + regAmount + compFee + subdivisionFee;

    return {
      stampRatePercent: (stampRate * 100).toFixed(1),
      regRatePercent: (regRate * 100).toFixed(1),
      stampAmount,
      regAmount,
      compFee,
      subdivisionFee,
      totalGovtFee,
      maxStampCap,
      maxRegCap
    };
  };

  const results = calculateFees();

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-6">
      
      {/* Title & Level Switcher */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden space-y-4">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" /> 2026 தமிழ்நாடு அரசு பதிவுத்துறை கட்டணங்கள்
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-50">
              முத்திரைக் கட்டணம் & பதிவுக் கட்டணக் கணிப்பான்
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              கிரையம், குடும்ப செட்டில்மென்ட், பாகப்பிரிவினை மற்றும் அடமானப் பத்திரங்களுக்கான அரசு தோராயக் கட்டணங்களை துல்லியமாகக் கணக்கிடுங்கள்.
            </p>
          </div>

          {/* Level Switcher */}
          <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
            <button
              type="button"
              onClick={() => setLevel('level1')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                level === 'level1'
                  ? 'bg-slate-100 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              நிலை 1 (Standard)
            </button>
            <button
              type="button"
              onClick={() => setLevel('level2')}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                level === 'level2'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>நிலை 2 (Audit Level)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Form Column */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-5">
          
          {/* Deed Type Choice */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. பத்திர வகையைத் தேர்ந்தெடுக்கவும்
            </label>
            <select
              value={deedType}
              onChange={(e) => setDeedType(e.target.value as any)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="sale">கிரைய பத்திரம் (Sale Deed - 7% + 2%)</option>
              <option value="settlement_family">குடும்ப செட்டில்மென்ட் (Settlement - 4% + 1% Max Cap)</option>
              <option value="partition">பாகப்பிரிவினை (Partition Deed - 1% + 1%)</option>
              <option value="mortgage">அடமான பத்திரம் (Mortgage Deed - 1% + 1%)</option>
              <option value="rent">வாடகை / குத்தகை ஒப்பந்தம் (Lease Agreement - 1% + 1%)</option>
            </select>
          </div>

          {/* Mode choice */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. சொத்து மதிப்பு கணக்கீட்டு முறை
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCalculationMode('direct')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                  calculationMode === 'direct'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                நேரடி மொத்த மதிப்பு (₹)
              </button>
              <button
                type="button"
                onClick={() => setCalculationMode('unit')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                  calculationMode === 'unit'
                    ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                பரப்பளவு x சதுர அடி மதிப்பு
              </button>
            </div>
          </div>

          {calculationMode === 'direct' ? (
            /* Direct Amount Input */
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                சொத்தின் மொத்த மதிப்பு அல்லது கைமாற்றுத் தொகை (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 font-bold text-base text-slate-900 bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="2500000"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                எழுத்தால்: <span className="font-bold text-slate-800">₹ {computedPropertyValue.toLocaleString('en-IN')}</span> (அரசு வழிகாட்டி மதிப்பை விடக் குறைவாக இருக்கக் கூடாது)
              </p>
            </div>
          ) : (
            /* Unit based Input */
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">நிலப் பரப்பளவு</label>
                  <input
                    type="number"
                    value={landArea}
                    onChange={(e) => setLandArea(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">அலகு (Unit)</label>
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="sqft">சதுர அடி (Sq.Ft)</option>
                    <option value="cent">சென்ட் (Cent)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  அரசு வழிகாட்டி மதிப்பு (Guideline Value Rate ₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={guidelineRate}
                    onChange={(e) => setGuidelineRate(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick preset buttons */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              மாதிரி தொகைகள்:
            </span>
            <div className="flex flex-wrap gap-2">
              {[500000, 1500000, 2500000, 5000000, 10000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setCalculationMode('direct');
                    setPropertyValue(amt);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  ₹{(amt / 100000).toFixed(0)} இலட்சம்
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                கட்டணக் கணக்கீட்டு முடிவு விவரங்கள்
              </h3>
              <span className="text-xs text-slate-400 font-mono">2026 TNREGINET Rate</span>
            </div>

            {/* Total Consideration Summary */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between">
              <span className="text-xs text-slate-300">சொத்தின் மொத்த மதிப்பு:</span>
              <span className="text-lg font-black text-amber-300">
                ₹ {computedPropertyValue.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Detailed Fee Rows */}
            <div className="space-y-2 text-xs">
              
              <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">முத்திரைக் கட்டணம் (Stamp Duty - {results.stampRatePercent}%)</span>
                  {results.maxStampCap && (
                    <span className="text-[10px] text-amber-400">குடும்ப செட்டில்மென்ட் சலுகை வரம்பு ₹40,000</span>
                  )}
                </div>
                <span className="font-bold text-base text-slate-100">
                  ₹ {results.stampAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">பதிவுக் கட்டணம் (Registration Fee - {results.regRatePercent}%)</span>
                  {results.maxRegCap && (
                    <span className="text-[10px] text-amber-400">குடும்ப செட்டில்மென்ட் சலுகை வரம்பு ₹10,000</span>
                  )}
                </div>
                <span className="font-bold text-base text-slate-100">
                  ₹ {results.regAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/50 flex items-center justify-between border border-slate-800">
                <span className="font-bold text-slate-200">கணினி & பார்‌கோடு இ-செலான் கட்டணம் (Computer & Barcode Fee)</span>
                <span className="font-bold text-slate-100">₹ {results.compFee}</span>
              </div>

              {level === 'level2' && (
                <div className="p-3 rounded-lg bg-amber-500/10 flex items-center justify-between border border-amber-500/30">
                  <div>
                    <span className="font-bold text-amber-300 block">நில அளவை / உட்பிரிவு கட்டணம் (Subdivision Survey Fee)</span>
                    <span className="text-[10px] text-slate-400">நிலை 2 பட்டா நில அளவை ஆய்வுக் கட்டணம்</span>
                  </div>
                  <span className="font-bold text-base text-amber-300">₹ {results.subdivisionFee}</span>
                </div>
              )}

            </div>

            {/* Total Highlight Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-black flex items-center justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-950 block">
                  மொத்த தோராய அரசாங்கக் கட்டணம்:
                </span>
                <span className="text-[11px] font-semibold text-slate-900">
                  (Stamp Duty + Reg Fee + E-Challan)
                </span>
              </div>
              <span className="text-2xl font-black">
                ₹ {results.totalGovtFee.toLocaleString('en-IN')}
              </span>
            </div>

          </div>

          {/* Legal Note */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-400">
              <Info className="w-3.5 h-3.5" />
              <span>முக்கிய குறிப்பு (Legal Advisory):</span>
            </div>
            <p className="leading-relaxed">
              மேற்கண்ட கட்டணம் தமிழ்நாட்டின் தற்போதைய பதிவுத் துறை சட்ட விதிகளின்படியான தோராய மதிப்பீடு ஆகும். சார்பதிவாளர் அலுவலக கள ஆய்வு மற்றும் கட்டட மதிப்பு (Building valuation) ஆகியவற்றைப் பொறுத்து சிறு மாற்றங்கள் ஏற்படலாம்.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
