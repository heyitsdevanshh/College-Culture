import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Star, CreditCard, Smartphone, Building, Sparkles, ArrowRight } from 'lucide-react';
import { HackathonMaster } from '../types';

interface HackathonMasterPaymentModalProps {
  master: HackathonMaster;
  hackathonTitle: string;
  onClose: () => void;
  onSuccess: (master: HackathonMaster) => void;
}

export const HackathonMasterPaymentModal: React.FC<HackathonMasterPaymentModalProps> = ({
  master,
  hackathonTitle,
  onClose,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('devansh@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      setTimeout(() => {
        onSuccess(master);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isCompleted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Payment Successful! 🎉
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              <strong>{master.name}</strong> has been added to your hackathon squad. They will join your team’s in-app Group Discussion room!
            </p>
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-semibold inline-block">
              Transaction ID: TXN-{Date.now().toString().slice(-8)} • Verified
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Invite Hackathon Master</span>
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Book Expert Mentorship
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              for {hackathonTitle}
            </p>

            {/* Master Summary Card */}
            <div className="mt-4 p-3.5 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 rounded-2xl border border-indigo-100 flex items-center gap-3.5">
              <img
                src={master.avatar}
                alt={master.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-300 shadow-xs"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900 truncate">
                    {master.name}
                  </h4>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{master.rating}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 truncate">{master.title}</p>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Mentor • 100% Hackathon Support</span>
                </div>
              </div>
            </div>

            {/* Mentorship Inclusions */}
            <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600 border border-slate-200">
              <p className="font-bold text-slate-800">What’s included in this fee:</p>
              <ul className="space-y-1 pl-4 list-disc text-[11px]">
                <li>Direct membership in your squad’s in-app Group Discussion room</li>
                <li>1:1 Architectural blueprint review & Gemini AI integration advice</li>
                <li>Pitch deck and 3-minute video demo feedback before deadline</li>
              </ul>
            </div>

            {/* Pricing Breakdown */}
            <div className="mt-4 border-t border-slate-100 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Master Consultation Fee</span>
                <span>{master.currency}{master.mentoringFee}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Platform Student Discount</span>
                <span className="text-emerald-600 font-bold">- 100% OFF Platform Fee</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 text-sm pt-2 border-t border-slate-200">
                <span>Total Amount Payable</span>
                <span className="text-indigo-600">{master.currency}{master.mentoringFee}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
              </div>

              {/* Dynamic Input based on method */}
              <div className="mt-3">
                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">
                      Enter UPI ID (Google Pay, PhonePe, Paytm)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@upi"
                      className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        defaultValue="12/28"
                        placeholder="MM/YY"
                        className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                      <input
                        type="password"
                        defaultValue="842"
                        placeholder="CVV"
                        className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Select Bank</label>
                    <select className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <option>HDFC Bank</option>
                      <option>State Bank of India (SBI)</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <span>Pay {master.currency}{master.mentoringFee} & Confirm</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
