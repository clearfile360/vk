import React, { useState } from 'react';
import { SAMPLE_STATUSES } from '../data/tamilData';
import { ServiceStatus } from '../types';
import { Search, CheckCircle2, Clock, AlertCircle, FileText, ArrowRight, Building } from 'lucide-react';

export const StatusTracker: React.FC = () => {
  const [refInput, setRefInput] = useState('TN-REG-2026-1082');
  const [currentStatus, setCurrentStatus] = useState<ServiceStatus | null>(SAMPLE_STATUSES[0]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = SAMPLE_STATUSES.find(s => s.referenceNo.toLowerCase() === refInput.trim().toLowerCase());
    if (found) {
      setCurrentStatus(found);
    } else {
      // Create a mock tracking result for any entered reference number
      setCurrentStatus({
        referenceNo: refInput.trim().toUpperCase() || 'TN-REG-CUSTOM',
        applicantName: 'விண்ணப்பதாரர்',
        serviceType: 'பத்திரச் சேவை / ஆன்லைன் இ-சேவை',
        status: 'ஆவணங்கள் சரிபார்ப்பு',
        progressPercent: 50,
        submittedDate: '2026-08-04',
        expectedDate: '2026-08-10',
        subRegistrarOffice: 'வாணியம்பாடி சார்பதிவாளர் அலுவலகம்',
        notes: 'ஆவணங்கள் பெறப்பட்டு சரிபார்க்கப்பட்டு வருகின்றன. விரைவில் குறுஞ்செய்தி (SMS) மூலம் அறிவிப்பு வரும்.',
        steps: [
          { title: 'விண்ணப்பம் பதிவு செய்யப்பட்டது', completed: true, date: '2026-08-04' },
          { title: 'ஆவணங்கள் சரிபார்ப்பு நிலுவையில் உள்ளது', completed: true, date: '2026-08-05' },
          { title: 'சார்பதிவாளர் ஒப்புதல்', completed: false },
          { title: 'சேவை நிறைவுற்றது', completed: false }
        ]
      });
    }
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/20 text-center space-y-3">
        <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" /> ஆன்லைன் சேவை கண்காணிப்பு
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-50">
          விண்ணப்ப நிலவரம் சரிபார்ப்பு (Track Service Status)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          உங்களது பத்திரப் பதிவு, வில்லங்க சான்றிதழ் (EC) அல்லது பட்டா விண்ணப்ப குறிப்பு எண்ணை (Reference No) உள்ளிட்டு தற்போதைய நிலவரத்தை அறிந்துகொள்ளுங்கள்.
        </p>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto pt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="எ.கா: TN-REG-2026-1082"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 font-mono font-bold text-sm bg-slate-800 text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow transition-colors flex items-center gap-1.5"
          >
            <span>தேடுக</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Preset sample links */}
        <div className="pt-2 text-xs text-slate-400 flex flex-wrap items-center justify-center gap-2">
          <span>மாதிரி எண்கள்:</span>
          {SAMPLE_STATUSES.map(s => (
            <button
              key={s.referenceNo}
              onClick={() => {
                setRefInput(s.referenceNo);
                setCurrentStatus(s);
              }}
              className="text-amber-400 font-mono underline hover:text-amber-300"
            >
              {s.referenceNo}
            </button>
          ))}
        </div>
      </div>

      {/* Results Card */}
      {currentStatus && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">விண்ணப்ப எண்</span>
              <h3 className="text-xl font-black font-mono text-slate-900">{currentStatus.referenceNo}</h3>
              <p className="text-sm font-bold text-amber-700 mt-0.5">{currentStatus.serviceType}</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">தற்போதைய நிலை</span>
              <span className="inline-block bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs px-3 py-1 rounded-full mt-1">
                {currentStatus.status}
              </span>
            </div>
          </div>

          {/* Details Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500 block">விண்ணப்பதாரர்:</span>
              <span className="font-bold text-slate-900">{currentStatus.applicantName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">விண்ணப்பித்த தேதி:</span>
              <span className="font-bold text-slate-900">{currentStatus.submittedDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">எதிர்பார்க்கும் தேதி:</span>
              <span className="font-bold text-slate-900">{currentStatus.expectedDate}</span>
            </div>
            <div>
              <span className="text-slate-500 block">அலுவலகம்:</span>
              <span className="font-bold text-slate-900">{currentStatus.subRegistrarOffice}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>முன்னேற்றம் (Progress)</span>
              <span>{currentStatus.progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${currentStatus.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Step Pipeline List */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-slate-900 text-sm">சேவை நிலைப் படிகள் (Pipeline Progress):</h4>

            <div className="space-y-2">
              {currentStatus.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                    step.completed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className={`w-4 h-4 ${step.completed ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>{step.title}</span>
                  </div>
                  {step.date && <span className="text-[11px] text-slate-500">{step.date}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Notes Box */}
          {currentStatus.notes && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>சார்பதிவாளர் / பத்திர எழுத்தாளர் அறிவிப்பு:</span>
              </div>
              <p className="leading-relaxed">{currentStatus.notes}</p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
