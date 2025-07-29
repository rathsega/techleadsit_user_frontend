'use client';

import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  memo
} from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the real component for SSR-safe usage
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
});

const SmartReCaptcha = memo(forwardRef(
  ({ siteKey, onTokenChange, theme = 'light', size = 'normal' }, ref) => {
    const recaptchaRef = useRef(null);
    const [timerId, setTimerId] = useState(null);

    // Expose resetCaptcha function to parent
    useImperativeHandle(ref, () => ({
      resetCaptcha: () => {
        if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
          recaptchaRef.current.reset();
          onTokenChange('');
          clearTimeout(timerId);
        } else if (recaptchaRef.current && typeof recaptchaRef.current.retry === 'function') {
          recaptchaRef.current.retry();
          onTokenChange('');
          clearTimeout(timerId);
        } else {
          console.warn('❌ reCAPTCHA instance not ready or invalid');
        }
      },
    }));

    const handleChange = (token) => {
      onTokenChange(token);

      // Clear previous timer
      if (timerId) clearTimeout(timerId);

      // Start new timer for auto-reset
      const id = setTimeout(() => {
        if (recaptchaRef.current && typeof recaptchaRef.current.reset === 'function') {
          recaptchaRef.current.reset();
          onTokenChange('');
        }
      }, 60 * 1000); // 60 seconds

      setTimerId(id);
    };

    const handleExpired = () => {
      recaptchaRef.current?.reset();
      onTokenChange('');
      if (timerId) clearTimeout(timerId);
    };

    useEffect(() => {
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    }, [timerId]);

    return (
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={siteKey}
        onChange={handleChange}
        onExpired={handleExpired}
        theme={theme}
        size={size}
      />
    );
  }
));

SmartReCaptcha.displayName = 'SmartReCaptcha';

export default SmartReCaptcha;