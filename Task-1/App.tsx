import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { LoginScreen } from './components/LoginScreen';
import { OTPVerificationScreen } from './components/OTPVerificationScreen';
import { ProfilePersonalizationScreen } from './components/ProfilePersonalizationScreen';
import { SuccessScreen } from './components/SuccessScreen';

type Screen =
| 'welcome'
| 'signup'
| 'login'
| 'otp'
| 'personalization'
| 'success';

export default function App() {
const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
const [generatedOTP, setGeneratedOTP] = useState('');
const [userEmail, setUserEmail] = useState('');

const handleSignUp = async (email: string) => {
const otp = Math.floor(
100000 + Math.random() * 900000
).toString();

```
setGeneratedOTP(otp);
setUserEmail(email);

try {
  await emailjs.send(
    'service_omut32b',
    'template_7q4p2xo',
    {
      email: email,
      passcode: otp,
      time: '15 minutes',
    },
    'AIe45IMC4-zXcD0YG'
  );

  alert('OTP sent successfully');
  setCurrentScreen('otp');
} catch (error) {
  console.error(error);
  alert('Failed to send OTP');
}
```

};

return ( <div className="size-full">
{currentScreen === 'welcome' && (
<WelcomeScreen
onGetStarted={() => setCurrentScreen('signup')}
/>
)}

```
  {currentScreen === 'signup' && (
    <SignUpScreen
      onSignUp={handleSignUp}
      onBackToWelcome={() => setCurrentScreen('welcome')}
      onSwitchToLogin={() => setCurrentScreen('login')}
    />
  )}

  {currentScreen === 'login' && (
    <LoginScreen
      onLogin={() => setCurrentScreen('otp')}
      onBackToWelcome={() => setCurrentScreen('welcome')}
      onSwitchToSignUp={() => setCurrentScreen('signup')}
    />
  )}

  {currentScreen === 'otp' && (
    <OTPVerificationScreen
      generatedOTP={generatedOTP}
      userEmail={userEmail}
      onVerify={() =>
        setCurrentScreen('personalization')
      }
      onBack={() => setCurrentScreen('signup')}
    />
  )}

  {currentScreen === 'personalization' && (
    <ProfilePersonalizationScreen
      onComplete={() => setCurrentScreen('success')}
    />
  )}

  {currentScreen === 'success' && <SuccessScreen />}
</div>

);
}
