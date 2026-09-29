import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgStyles = {
    success: 'bg-[#2A7C13] text-[#FFF8CF] border-[#346b22] shadow-lg shadow-[#2A7C13]/25',
    info: 'bg-[#2A7C13] text-[#FFF8CF] border-[#346b22] shadow-lg shadow-[#2A7C13]/25',
    error: 'bg-rose-600 text-white border-rose-700 shadow-lg shadow-rose-900/30',
  }[type];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-xl border text-xs sm:text-sm font-medium ${bgStyles}`}
      >
        {type === 'success' && (
          <svg className="w-4 h-4 text-[#76C457] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {type === 'info' && (
          <svg className="w-4 h-4 text-[#FFF8CF] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
        {type === 'error' && (
          <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 -mr-1 p-0.5 rounded-md opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};
