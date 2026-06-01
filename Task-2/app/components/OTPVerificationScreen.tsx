import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface OTPVerificationScreenProps {
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerificationScreen({ onVerify, onBack }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    onVerify();
  };

  const handleResend = () => {
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6 flex flex-col">
      <button
        onClick={onBack}
        className="self-start text-blue-600 flex items-center space-x-2 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
          <p className="text-slate-600">
            We've sent a 6-digit code to<br />
            <span className="font-medium text-slate-900">john@example.com</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-sm text-slate-700 mb-4 text-center">Enter verification code</label>
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-semibold rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl px-6 py-3 hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            Verify Code
          </button>

          <div className="text-center space-y-2">
            {resendTimer > 0 ? (
              <p className="text-sm text-slate-600">
                Resend code in <span className="font-medium text-blue-600">{resendTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-sm text-blue-600 hover:underline"
              >
                Didn't receive the code? Resend
              </button>
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <p className="text-sm text-blue-900 text-center">
              <span className="font-medium">Tip:</span> Check your spam folder if you don't see the email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
