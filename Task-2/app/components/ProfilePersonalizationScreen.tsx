import { useState } from 'react';
import { Camera, Check } from 'lucide-react';

interface ProfilePersonalizationScreenProps {
  onComplete: () => void;
}

const INTERESTS = [
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'design', label: 'Design', icon: '🎨' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'fitness', label: 'Fitness', icon: '💪' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'reading', label: 'Reading', icon: '📚' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
  { id: 'photography', label: 'Photography', icon: '📷' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'art', label: 'Art', icon: '🖼️' },
];

export function ProfilePersonalizationScreen({ onComplete }: ProfilePersonalizationScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Personalize Your Profile</h2>
          <p className="text-slate-600">Tell us about yourself</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-lg">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl text-white">👤</span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors border-2 border-blue-100">
                <Camera className="w-5 h-5 text-blue-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-slate-600 mt-3">Upload profile picture</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Select Your Interests
              <span className="text-sm font-normal text-slate-500 ml-2">
                (Choose at least 3)
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {INTERESTS.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-95'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {selectedInterests.includes(interest.id) && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <div className="text-xs text-slate-700">{interest.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onComplete}
            disabled={selectedInterests.length < 3}
            className={`w-full rounded-xl px-6 py-3 transition-all ${
              selectedInterests.length >= 3
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedInterests.length < 3
              ? `Select ${3 - selectedInterests.length} more interest${3 - selectedInterests.length > 1 ? 's' : ''}`
              : 'Complete Setup'}
          </button>

          <button
            onClick={onComplete}
            className="w-full text-slate-600 text-sm hover:text-slate-900 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
