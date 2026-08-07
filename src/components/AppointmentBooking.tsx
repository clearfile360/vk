import React, { useState } from 'react';
import { Calendar, Clock, Phone, MapPin, CheckCircle, ShieldCheck, User, Mail, FileText, Send } from 'lucide-react';

interface AppointmentBookingProps {
  initialDeedName?: string;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ initialDeedName }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: initialDeedName || 'கிரைய பத்திரம் (Sale Deed)',
    office: 'வாணியம்பாடி சார்பதிவாளர் அலுவலகம் (Vaniyambadi SRO)',
    date: '',
    time: '10:30 AM',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'TN-BOOK-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto space-y-8">
      
      {/* Title */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-amber-500/20 text-center space-y-3">
        <span className="bg-amber-500 text-slate-950 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider inline-flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" /> அங்கீகரிக்கப்பட்ட பத்திர எழுத்தாளர் ஆலோசனை
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-50">
          ஆன்லைன் பத்திரப் பதிவு & ஆலோசனை முன்பதிவு
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
          உங்கள் ஆவணங்களைத் தயாரிக்கவும் சார்பதிவாளர் அலுவலகத்தில் ஆன்லைன் டோக்கன் முன்பதிவு செய்யவும் உங்கள் விவரங்களை உள்ளிடுங்கள். எங்களது பத்திர எழுத்தாளர் குழு உங்களைத் தொடர்பு கொள்ளும்.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Applicant Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                1. விண்ணப்பதாரர் பெயர் (Full Name) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="திரு / திருமதி ... (ஆதார் படி)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. கைபேசி எண் (Mobile Number) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210 (10 இலக்கங்கள்)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Service Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                3. தேவைப்படும் ஆவணச் சேவை (Service Type) *
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              >
                <option value="கிரைய பத்திரம் (Sale Deed)">கிரைய பத்திரம் (Sale Deed)</option>
                <option value="குடும்ப செட்டில்மென்ட் (Settlement Deed)">குடும்ப செட்டில்மென்ட் (Settlement Deed)</option>
                <option value="பாகப்பிரிவினை (Partition Deed)">பாகப்பிரிவினை (Partition Deed)</option>
                <option value="வில்லங்க சான்றிதழ் (EC)">வில்லங்க சான்றிதழ் (Encumbrance Certificate - EC)</option>
                <option value="பட்டா / சிட்டா பெயர் மாற்றம் (Patta Transfer)">பட்டா / சிட்டா பெயர் மாற்றம் (Patta Transfer)</option>
                <option value="வாடகை / குத்தகை ஒப்பந்தம் (Rent Agreement)">வாடகை / குத்தகை ஒப்பந்தம் (Rent Agreement)</option>
                <option value="பொது அதிகாரம் (Power of Attorney)">பொது அதிகாரம் (Power of Attorney)</option>
              </select>
            </div>

            {/* Sub Registrar Office Area */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                4. சார்பதிவாளர் அலுவலக மண்டலம் (SRO Area) *
              </label>
              <select
                value={formData.office}
                onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              >
                <option value="வாணியம்பாடி சார்பதிவாளர் அலுவலகம் (Vaniyambadi SRO)">வாணியம்பாடி சார்பதிவாளர் அலுவலகம்</option>
                <option value="திருப்பத்தூர் சார்பதிவாளர் அலுவலகம் (Tirupattur SRO)">திருப்பத்தூர் சார்பதிவாளர் அலுவலகம்</option>
                <option value="வேலூர் சார்பதிவாளர் அலுவலகம் (Vellore SRO)">வேலூர் சார்பதிவாளர் அலுவலகம்</option>
                <option value="சென்னை மண்டலம் (Chennai Region SRO)">சென்னை மண்டல அலுவலகங்கள்</option>
                <option value="இதர தமிழ்நாடு அலுவலகங்கள் (Other TN SRO)">இதர தமிழ்நாடு சார்பதிவாளர் அலுவலகங்கள்</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                5. விரும்பும் ஆவணம் வரைவு / ஆலோசனை தேதி *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
            </div>

            {/* Time Slot */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                6. விரும்பும் நேரம் (Preferred Slot) *
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 font-bold text-sm bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              >
                <option value="10:00 AM">காலை 10:00 மணி</option>
                <option value="11:30 AM">காலை 11:30 மணி</option>
                <option value="02:30 PM">மதியம் 02:30 மணி</option>
                <option value="04:30 PM">மாலை 04:30 மணி</option>
                <option value="06:30 PM">மாலை 06:30 மணி</option>
              </select>
            </div>

          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              7. சொத்து விவரங்கள் / கூடுதல் குறிப்புகள் (Optional Notes)
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="சொத்தின் கிராமம், சர்வே எண் அல்லது சந்தேகங்களைக் குறிப்பிடலாம்..."
              className="w-full p-3 rounded-xl border border-slate-300 font-medium text-xs bg-slate-50 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5 text-slate-950" />
            <span>முன்பதிவு செய்ய சப்மிட் செய்க</span>
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            🔒 உங்கள் விவரங்கள் தமிழ்நாடு அரசு பதிவு பெற்ற பத்திர எழுத்தாளரால் ரகசியமாகவும் பாதுகாப்பாகவும் பராமரிக்கப்படும்.
          </p>

        </form>
      ) : (
        /* Confirmation Card */
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">முன்பதிவு வெற்றிகரமாக முடிந்தது!</h3>
            <p className="text-xs text-slate-600">
              உங்கள் முன்பதிவு உறுதி செய்யப்பட்டது. எங்களது பத்திர எழுத்தாளர் குழு உங்களை தொலைபேசி மூலம் விரைவில் தொடர்பு கொள்ளும்.
            </p>
          </div>

          {/* Booking Receipt Box */}
          <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-900 text-white text-left space-y-3 font-mono text-xs border border-amber-500/30 shadow-xl">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">முன்பதிவு எண்:</span>
              <span className="font-bold text-amber-400">{bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">பெயர்:</span>
              <span className="font-bold">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">கைபேசி:</span>
              <span className="font-bold">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">சேவை:</span>
              <span className="font-bold text-amber-300">{formData.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">அலுவலகம்:</span>
              <span className="font-bold">{formData.office}</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-2 text-slate-300">
              <span>தேதி & நேரம்:</span>
              <span className="font-bold text-white">{formData.date} - {formData.time}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                service: 'கிரைய பத்திரம் (Sale Deed)',
                office: 'வாணியம்பாடி சார்பதிவாளர் அலுவலகம் (Vaniyambadi SRO)',
                date: '',
                time: '10:30 AM',
                notes: ''
              });
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
          >
            புதிய முன்பதிவு செய்ய
          </button>
        </div>
      )}

    </div>
  );
};
