import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  QrCode,
  Download,
  Calendar,
  Clock,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { InternshipItem } from '../types';

interface TestFeePaymentModalProps {
  internship: InternshipItem;
  candidateName?: string;
  candidateCollege?: string;
  onClose: () => void;
  onSuccess: (paymentData: {
    transactionId: string;
    hallTicketNumber: string;
    amount: string;
    paidAt: string;
  }) => void;
}

export const TestFeePaymentModal: React.FC<TestFeePaymentModalProps> = ({
  internship,
  candidateName = 'Devansh Sharma',
  candidateCollege = 'Delhi Technological University (DTU)',
  onClose,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiSubTab, setUpiSubTab] = useState<'id' | 'qr'>('id');
  const [upiId, setUpiId] = useState('devansh@okhdfcbank');
  const [isUpiVerified, setIsUpiVerified] = useState(true);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 8921');
  const [cardHolder, setCardHolder] = useState(candidateName);
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('834');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing & completion states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedData, setCompletedData] = useState<{
    transactionId: string;
    hallTicketNumber: string;
    amount: string;
    paidAt: string;
  } | null>(null);

  const feeAmount = internship.registrationFee || '₹299';

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxn = `TXN-CC-${Date.now().toString().slice(-6)}`;
      const generatedHT = `HT-2026-${internship.company.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const paymentInfo = {
        transactionId: generatedTxn,
        hallTicketNumber: generatedHT,
        amount: feeAmount,
        paidAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };

      setIsProcessing(false);
      setIsCompleted(true);
      setCompletedData(paymentInfo);
      onSuccess(paymentInfo);
    }, 1200);
  };

  const handleDownloadHallTicket = () => {
    // Generate a simple simulated download or print view
    const printContent = `
========================================
COLLEGE CULTURE • OFFICIAL ADMIT CARD
========================================
Company: ${internship.company}
Position: ${internship.title}
Candidate: ${candidateName} (${candidateCollege})
Hall Ticket No: ${completedData?.hallTicketNumber || 'HT-2026-CC-8912'}
Transaction ID: ${completedData?.transactionId || 'TXN-CC-992144'}
Test Date: ${internship.testDate || '15 Oct 2025'}
Test Centre: ${internship.testCentre || 'Online Assessment Portal / Campus'}
Reporting Time: 09:30 AM IST
Status: TEST FEE PAID (${feeAmount}) - VERIFIED
========================================
Please bring your College ID and this Admit Card to the venue.
    `;
    const blob = new Blob([printContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Admit_Card_${internship.company.replace(/\s+/g, '_')}_${candidateName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isCompleted && completedData ? (
          /* Payment Success & Hall Ticket Screen */
          <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full inline-block mb-1 border border-emerald-200">
                Payment Verified ✓
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Test Fee Paid Successfully! 🎉
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your online aptitude assessment slot is confirmed for{' '}
                <strong className="text-slate-800">{internship.company}</strong>.
              </p>
            </div>

            {/* Hall Ticket Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-left space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">
                    Official Admit Card
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                  {completedData.hallTicketNumber}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Candidate</span>
                  <span className="font-bold text-slate-800 truncate block">{candidateName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">College</span>
                  <span className="font-bold text-slate-800 truncate block">{candidateCollege}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Test Date</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {internship.testDate || '15 Oct 2025'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Slot Timing</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    10:00 AM – 11:30 AM
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 block font-semibold">Test Centre Venue</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    {internship.testCentre || `${internship.company} Campus / Online Portal`}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Txn ID: {completedData.transactionId}</span>
                <span className="font-bold text-emerald-600">Paid: {completedData.amount}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleDownloadHallTicket}
                className="flex-1 py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-blue-600" />
                <span>Download Admit Card</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Done & View Application
              </button>
            </div>
          </div>
        ) : (
          /* Payment Flow Form */
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>CollegeCulture Secure Payment</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Pay Online Assessment & Test Fee
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirm your aptitude test slot for {internship.company}
            </p>

            {/* Test & Company Summary */}
            <div className="mt-3.5 p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-center gap-3">
              <img
                src={internship.companyLogo}
                alt={internship.company}
                className="w-11 h-11 rounded-xl object-contain bg-white p-1 border border-blue-200 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-slate-900 truncate">
                  {internship.title}
                </h4>
                <p className="text-[11px] text-blue-700 font-medium truncate">
                  {internship.company} • {internship.testCentre || internship.location}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                  <span>📅 {internship.testDate || '15 Oct 2025'}</span>
                  <span>•</span>
                  <span>⏱️ 90 Mins Assessment</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 block">Fee Payable</span>
                <span className="text-base font-black text-blue-700">{feeAmount}</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="mt-4">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'netbanking'
                      ? 'border-blue-600 bg-blue-50/60 text-blue-700 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Building className="w-4 h-4 text-purple-600" />
                  <span>Net Banking</span>
                </button>
              </div>
            </div>

            {/* Tab Specific Content */}
            <form onSubmit={handlePay} className="mt-4 space-y-3.5">
              {paymentMethod === 'upi' && (
                <div className="space-y-3">
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
                    <button
                      type="button"
                      onClick={() => setUpiSubTab('id')}
                      className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                        upiSubTab === 'id' ? 'bg-white text-slate-900 shadow-2xs' : ''
                      }`}
                    >
                      UPI ID (GPay / PhonePe)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUpiSubTab('qr')}
                      className={`flex-1 py-1.5 rounded-lg text-center transition-colors cursor-pointer ${
                        upiSubTab === 'qr' ? 'bg-white text-slate-900 shadow-2xs' : ''
                      }`}
                    >
                      Scan QR Code
                    </button>
                  </div>

                  {upiSubTab === 'id' ? (
                    <div className="space-y-2.5">
                      {/* Popular UPI quick buttons */}
                      <div className="grid grid-cols-4 gap-2 text-[11px] font-bold">
                        {[
                          { name: 'GPay', app: '@okaxis' },
                          { name: 'PhonePe', app: '@ybl' },
                          { name: 'Paytm', app: '@paytm' },
                          { name: 'CRED', app: '@axisbank' },
                        ].map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => {
                              setUpiId(`devansh${item.app}`);
                              setIsUpiVerified(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-slate-700 text-center transition-colors cursor-pointer"
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          Virtual Payment Address (UPI ID)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => {
                              setUpiId(e.target.value);
                              setIsUpiVerified(e.target.value.includes('@'));
                            }}
                            placeholder="username@okhdfcbank"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                          />
                          {isUpiVerified && (
                            <span className="absolute right-3 top-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                              Verified ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Scan QR Code tab */
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-2">
                      <div className="w-32 h-32 bg-white p-2 border-2 border-slate-300 rounded-xl mx-auto flex items-center justify-center shadow-2xs">
                        <QrCode className="w-28 h-28 text-slate-800" />
                      </div>
                      <p className="text-[11px] font-bold text-slate-700">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Dynamic QR expires in 04:59 mins
                      </p>
                    </div>
                  )}
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full pl-3 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-mono"
                      />
                      <span className="absolute right-3 top-2 text-[10px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                        RuPay / Visa
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="space-y-2.5">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Popular Indian Banks
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                    {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB'].map(
                      (bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                            selectedBank === bank
                              ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {bank}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Aptitude Assessment Registration</span>
                  <span className="font-semibold text-slate-800">{feeAmount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Test Centre Proctoring & Evaluation</span>
                  <span className="font-semibold text-emerald-600">Included</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Student Concession GST (18%)</span>
                  <span className="font-semibold text-emerald-600">₹0 (Waived)</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold pt-1.5 border-t border-slate-200 text-sm">
                  <span>Total Payable</span>
                  <span className="text-blue-700 font-black">{feeAmount}</span>
                </div>
              </div>

              {/* Security guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit SSL Encrypted • Instant Hall Ticket Confirmation</span>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay {feeAmount} & Confirm Assessment Slot</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
