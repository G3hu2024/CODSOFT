import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-400 flex flex-col items-center justify-between p-6 text-white">
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-2xl">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold">Welcome to FlowApp</h1>
          <p className="text-lg text-white/90 max-w-sm">
            Your journey to seamless productivity starts here
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4 mt-8">
          <div className="flex items-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Easy to Use</span>
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Personalized Experience</span>
          </div>
        </div>
      </div>

      <button
        onClick={onGetStarted}
        className="w-full max-w-sm bg-white text-blue-600 rounded-2xl px-6 py-4 flex items-center justify-center space-x-2 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
      >
        <span>Get Started</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
