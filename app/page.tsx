'use client';

import { useState, useCallback } from 'react';
import { foodList } from '../data/foods';
import { spiritualReminders } from '../data/reminders';

// --- Types ---
interface Reminder {
  title: string;
  content: string;
}

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
}

// --- Helpers ---
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const CONFETTI_COLORS = ['#F4A460', '#FFE4B5', '#FF8C00', '#FFA500', '#FFD700', '#FF6347', '#98FB98', '#87CEEB'];

function generateConfetti(): Confetti[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  }));
}

const SOL_WALLET = '9CtW8L44LNMJxnAVnE6GFHcZbRy1bLsdJByLPe29MBFK';

// --- Main Component ---
export default function Home() {
  const [phase, setPhase] = useState<'welcome' | 'thinking' | 'result'>('welcome');
  const [food, setFood] = useState<string | null>(null);
  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Confetti[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pickRandom = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => {
      setFood(getRandom(foodList) as unknown as string);
      setReminder(getRandom(spiritualReminders) as unknown as Reminder);
      setIsSpinning(false);
    }, 600);
  }, []);

  const handleStart = () => {
    setPhase('thinking');
    setShowConfetti(false);
    setTimeout(() => {
      setFood(getRandom(foodList) as unknown as string);
      setReminder(getRandom(spiritualReminders) as unknown as Reminder);
      setPhase('result');
    }, 1250);
  };

  const handleSukaa = () => {
    setConfettiPieces(generateConfetti());
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const handleReshuffle = () => {
    setShowConfetti(false);
    setPhase('thinking');
    setTimeout(() => {
      setFood(getRandom(foodList) as unknown as string);
      setReminder(getRandom(spiritualReminders) as unknown as Reminder);
      setPhase('result');
    }, 1250);
  };

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(SOL_WALLET).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      {/* Preload all images */}
      <link rel="preload" as="image" href="/welcome.webp" />
      <link rel="preload" as="image" href="/thinking.webp" />
      <link rel="preload" as="image" href="/result.webp" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=Caveat:wght@600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold: #D4A017;
          --gold-light: #F5D080;
          --gold-glow: rgba(212, 160, 23, 0.5);
          --cream: #FDF6E3;
          --dark: #1A1008;
        }

        html, body {
          height: 100%;
          width: 100%;
          overflow: hidden;
          font-family: 'Lora', serif;
          background: #0f0802;
        }

        /* ===== NAVBAR ===== */
        .navbar {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: calc(100% - 32px);
          max-width: 480px;
          background: rgba(15, 8, 2, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(212, 160, 23, 0.45);
          border-radius: 100px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 32px rgba(212, 160, 23, 0.18), 0 0 0 1px rgba(212,160,23,0.08);
        }
        .navbar-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
          flex: 1;
          text-align: center;
        }
        .navbar-title {
          font-family: 'Cinzel Decorative', cursive;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--gold-light);
          letter-spacing: 2px;
          text-shadow: 0 0 18px var(--gold-glow);
          line-height: 1.2;
        }
        .navbar-sub {
          font-family: 'Lora', serif;
          font-size: 0.6rem;
          color: rgba(245, 208, 128, 0.65);
          font-style: italic;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .hamburger-btn {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 4px;
          z-index: 101;
        }
        .hamburger-btn span {
          display: block;
          width: 20px;
          height: 2px;
          background: var(--gold-light);
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger-btn.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; }
        .hamburger-btn.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* Dropdown */
        .menu-dropdown {
          position: fixed;
          top: 80px;
          right: calc(50% - 240px + 16px);
          width: 190px;
          background: rgba(15, 8, 2, 0.95);
          border: 1px solid rgba(212, 160, 23, 0.4);
          border-radius: 16px;
          padding: 8px;
          z-index: 200;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          animation: fadeSlideDown 0.2s ease;
        }
        @media (max-width: 512px) { .menu-dropdown { right: 16px; } }

        .menu-divider {
          height: 1px;
          background: rgba(212,160,23,0.15);
          margin: 4px 8px;
        }
        .menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          background: none;
          border: none;
          color: var(--gold-light);
          font-family: 'Lora', serif;
          font-size: 0.88rem;
          padding: 10px 14px;
          text-align: left;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.15s;
          letter-spacing: 0.3px;
          text-decoration: none;
        }
        .menu-item:hover { background: rgba(212,160,23,0.12); }
        .menu-item-icon { font-size: 1rem; flex-shrink: 0; }

        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 150;
        }

        /* ===== SCREENS ===== */
        /*
          Desktop: image is portrait 5:7.
          We show it centered at full height, letterboxed on sides.
          Side gradient bars fill the dark gaps with a gradient fade — looks intentional and pretty.
        */
        .screen {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 48px;
          background: #0f0802;
          overflow: hidden;
        }

        /* Gradient side bars for desktop letterboxing */
        .screen::before,
        .screen::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 28%;
          z-index: 3;
          pointer-events: none;
        }
        .screen::before {
          left: 0;
          background: linear-gradient(to right,
            #0f0802 0%,
            rgba(15,8,2,0.9) 40%,
            rgba(15,8,2,0.4) 75%,
            transparent 100%
          );
        }
        .screen::after {
          right: 0;
          background: linear-gradient(to left,
            #0f0802 0%,
            rgba(15,8,2,0.9) 40%,
            rgba(15,8,2,0.4) 75%,
            transparent 100%
          );
        }
        /* Hide side bars on mobile — full bleed */
        @media (max-width: 600px) {
          .screen::before,
          .screen::after { display: none; }
        }

        .screen-bg {
          position: absolute;
          /* Desktop: portrait image centered, full height, auto width */
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 100%;
          width: auto;
          aspect-ratio: 5 / 7;
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          z-index: 0;
        }
        /* Mobile: stretch to fill */
        @media (max-width: 600px) {
          .screen-bg {
            width: 100%;
            height: 100%;
            left: 0;
            transform: none;
            aspect-ratio: unset;
          }
        }

        /* ===== WELCOME SCREEN ===== */
        .welcome-bg { background-image: url('/welcome.webp'); }
        .welcome-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,5,1,0.92) 0%,
            rgba(10,5,1,0.55) 40%,
            rgba(10,5,1,0.1) 70%,
            transparent 100%
          );
          z-index: 2;
        }
        .welcome-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 0 24px;
          max-width: 420px;
          width: 100%;
          text-align: center;
          animation: fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }
        .welcome-text {
          font-family: 'Lora', serif;
          font-size: 0.9rem;
          color: rgba(245,230,190,0.88);
          line-height: 1.8;
          font-style: italic;
          text-shadow: 0 2px 12px rgba(0,0,0,0.8);
        }
        .sparkle-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--gold);
          font-size: 0.8rem;
          opacity: 0.7;
          letter-spacing: 6px;
        }

        /* ===== CTA BUTTON ===== */
        .cta-btn {
          background: linear-gradient(135deg, #D4A017 0%, #F5D080 50%, #D4A017 100%);
          color: var(--dark);
          border: none;
          border-radius: 100px;
          padding: 15px 36px;
          font-family: 'Cinzel Decorative', cursive;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 1.5px;
          box-shadow: 0 0 32px rgba(212,160,23,0.6), 0 4px 16px rgba(0,0,0,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          transform: rotate(45deg) translateX(-100%);
          transition: transform 0.5s;
        }
        .cta-btn:hover::before { transform: rotate(45deg) translateX(100%); }
        .cta-btn:hover { transform: translateY(-3px); box-shadow: 0 0 48px rgba(212,160,23,0.8), 0 8px 24px rgba(0,0,0,0.4); }
        .cta-btn:active { transform: translateY(0px); }
        .magic-ring {
          position: absolute;
          inset: -4px;
          border-radius: 100px;
          border: 1px solid rgba(245,208,128,0.4);
          animation: ring-pulse 2s ease-in-out infinite;
        }

        /* ===== THINKING SCREEN ===== */
        .thinking-bg { background-image: url('/thinking.webp'); }
        .thinking-overlay {
          position: absolute;
          inset: 0;
          background: rgba(5,3,1,0.35);
          z-index: 2;
        }
        .thinking-image-wrap {
          position: absolute;
          inset: 0;
          animation: float-gentle 3s ease-in-out infinite;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thinking-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          padding-bottom: 80px;
        }
        .thinking-text {
          font-family: 'Cinzel Decorative', cursive;
          font-size: 0.85rem;
          color: var(--gold-light);
          letter-spacing: 3px;
          text-shadow: 0 0 20px var(--gold-glow);
          animation: pulse-gold 1.5s ease-in-out infinite;
        }
        .thinking-dots { display: flex; gap: 8px; }
        .thinking-dot {
          width: 8px; height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: dot-bounce 1.2s ease-in-out infinite;
          box-shadow: 0 0 8px var(--gold-glow);
        }
        .thinking-dot:nth-child(2) { animation-delay: 0.2s; }
        .thinking-dot:nth-child(3) { animation-delay: 0.4s; }

        /* ===== RESULT SCREEN ===== */
        .result-bg { background-image: url('/result.webp'); }
        .result-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,5,1,0.95) 0%,
            rgba(10,5,1,0.6) 45%,
            rgba(10,5,1,0.15) 75%,
            transparent 100%
          );
          z-index: 2;
        }
        .result-content {
          position: relative;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
          max-width: 420px;
          width: 100%;
        }

        /* Food card — staggered fade-up, no colour snap */
        .food-card {
          background: rgba(253,246,227,0.1);
          border: 1px solid rgba(212,160,23,0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 18px 28px;
          text-align: center;
          width: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,208,128,0.2);
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0s both;
        }
        .food-label {
          font-family: 'Lora', serif;
          font-size: 0.65rem;
          color: var(--gold);
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 6px;
          opacity: 0.8;
        }
        .food-name {
          font-family: 'Cinzel Decorative', cursive;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--gold-light);
          text-shadow: 0 0 20px var(--gold-glow);
          line-height: 1.3;
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.06s both;
        }

        /* Buttons */
        .btn-row {
          display: flex;
          gap: 10px;
          width: 100%;
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.12s both;
        }
        .btn-suka {
          background: linear-gradient(135deg, #D4A017, #F5D080);
          color: var(--dark);
          border: none;
          border-radius: 100px;
          padding: 12px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 0 20px rgba(212,160,23,0.4);
          letter-spacing: 0.5px;
        }
        .btn-suka:hover { transform: translateY(-2px); box-shadow: 0 0 32px rgba(212,160,23,0.7); }
        .btn-suka:active { transform: translateY(0); }
        .btn-outline {
          background: rgba(255,255,255,0.07);
          color: var(--gold-light);
          border: 1px solid rgba(212,160,23,0.5);
          backdrop-filter: blur(10px);
          border-radius: 100px;
          padding: 12px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
          transition: transform 0.15s, background 0.15s;
        }
        .btn-outline:hover { background: rgba(212,160,23,0.12); transform: translateY(-2px); }
        .btn-outline:active { transform: translateY(0); }
        .btn-cuba {
          width: 100%;
          background: rgba(255,255,255,0.05);
          color: rgba(245,208,128,0.7);
          border: 1px dashed rgba(212,160,23,0.35);
          border-radius: 100px;
          padding: 10px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
          letter-spacing: 0.5px;
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.18s both;
        }
        .btn-cuba:hover { background: rgba(212,160,23,0.1); color: var(--gold-light); }

        /* Nasihat card */
        .nasihat-card {
          background: rgba(253,246,227,0.08);
          border: 1px solid rgba(212,160,23,0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 20px;
          padding: 16px 20px;
          width: 100%;
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(245,208,128,0.1);
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.25s both;
        }
        .nasihat-title {
          font-family: 'Cinzel Decorative', cursive;
          font-size: 0.68rem;
          color: var(--gold);
          letter-spacing: 1px;
          margin-bottom: 8px;
          text-shadow: 0 0 12px var(--gold-glow);
          /* Centred with sparkles both sides */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          text-align: center;
        }
        .nasihat-content {
          font-family: 'Lora', serif;
          font-size: 0.82rem;
          color: rgba(245,230,190,0.85);
          line-height: 1.75;
          font-style: italic;
          text-align: center;
        }

        /* Footer */
        .footer-tag {
          font-family: 'Lora', serif;
          font-size: 0.65rem;
          color: rgba(212,160,23,0.35);
          letter-spacing: 2px;
          font-style: italic;
          margin-top: 4px;
          animation: fade-up 0.55s cubic-bezier(0.22,1,0.36,1) 0.32s both;
        }

        /* ===== WALLET MODAL ===== */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(5,3,1,0.85);
          backdrop-filter: blur(8px);
          z-index: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.25s ease;
        }
        .modal-box {
          background: linear-gradient(160deg, #1a0f02 0%, #0f0802 100%);
          border: 1px solid rgba(212,160,23,0.5);
          border-radius: 24px;
          padding: 32px 28px 28px;
          max-width: 380px;
          width: 100%;
          text-align: center;
          box-shadow: 0 0 60px rgba(212,160,23,0.15), 0 24px 48px rgba(0,0,0,0.6);
          animation: modal-pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 14px; right: 16px;
          background: none;
          border: none;
          color: rgba(212,160,23,0.5);
          font-size: 1.2rem;
          cursor: pointer;
          line-height: 1;
          transition: color 0.15s;
        }
        .modal-close:hover { color: var(--gold-light); }
        .modal-icon { font-size: 2.4rem; margin-bottom: 12px; }
        .modal-title {
          font-family: 'Cinzel Decorative', cursive;
          font-size: 1rem;
          color: var(--gold-light);
          letter-spacing: 1.5px;
          margin-bottom: 6px;
          text-shadow: 0 0 16px var(--gold-glow);
        }
        .modal-sub {
          font-family: 'Lora', serif;
          font-size: 0.8rem;
          color: rgba(245,208,128,0.55);
          font-style: italic;
          margin-bottom: 22px;
          line-height: 1.6;
        }
        .wallet-box {
          background: rgba(212,160,23,0.07);
          border: 1px solid rgba(212,160,23,0.3);
          border-radius: 12px;
          padding: 14px 16px;
          margin-bottom: 16px;
          word-break: break-all;
          font-family: 'Courier New', monospace;
          font-size: 0.72rem;
          color: rgba(245,208,128,0.75);
          letter-spacing: 0.5px;
          line-height: 1.6;
          user-select: all;
        }
        .copy-btn {
          background: linear-gradient(135deg, #D4A017, #F5D080);
          color: var(--dark);
          border: none;
          border-radius: 100px;
          padding: 12px 32px;
          font-family: 'Cinzel Decorative', cursive;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          letter-spacing: 1px;
          width: 100%;
          transition: transform 0.15s, box-shadow 0.15s, background 0.3s;
          box-shadow: 0 0 24px rgba(212,160,23,0.4);
        }
        .copy-btn.copied {
          background: linear-gradient(135deg, #4CAF50, #81C784);
          box-shadow: 0 0 24px rgba(76,175,80,0.4);
        }
        .copy-btn:hover { transform: translateY(-2px); }
        .copy-btn:active { transform: translateY(0); }
        .modal-note {
          font-family: 'Lora', serif;
          font-size: 0.7rem;
          color: rgba(245,208,128,0.3);
          font-style: italic;
          margin-top: 14px;
        }

        /* ===== KEYFRAMES ===== */
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) scale(1.02); }
          50% { transform: translateY(-12px) scale(1.04); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.7; text-shadow: 0 0 12px var(--gold-glow); }
          50% { opacity: 1; text-shadow: 0 0 28px rgba(212,160,23,0.9); }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-10px); opacity: 1; }
        }
        @keyframes screen-reveal {
          from { opacity: 0; transform: scale(1.03); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modal-pop {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ring-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.04); opacity: 0.8; }
        }
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }

        .screen-enter { animation: screen-reveal 0.7s cubic-bezier(0.22,1,0.36,1) both; }

        .confetti-container {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 100vh;
          pointer-events: none;
          z-index: 999;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          top: -12px;
          width: 10px; height: 10px;
          border-radius: 2px;
          animation: fall linear forwards;
        }
      `}</style>

      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map((c) => (
            <div
              key={c.id}
              className="confetti-piece"
              style={{
                left: `${c.left}%`,
                animationDelay: `${c.delay}s`,
                animationDuration: `${c.duration}s`,
                background: c.color,
              }}
            />
          ))}
        </div>
      )}

      {/* ===== WALLET MODAL ===== */}
      {walletModalOpen && (
        <div className="modal-backdrop" onClick={() => setWalletModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setWalletModalOpen(false)}>✕</button>
            <div className="modal-icon">🌙</div>
            <div className="modal-title">Support Me</div>
            <div className="modal-sub">
              Terima kasih dari lubuk hati. Setiap sumbangan, walau sekecil mana, bermakna besar.
            </div>
            <div className="wallet-box">{SOL_WALLET}</div>
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopyWallet}
            >
              {copied ? '✓ Tersalin!' : 'Salin Alamat SOL'}
            </button>
            <div className="modal-note">Solana (SOL) wallet address</div>
          </div>
        </div>
      )}

      {/* Menu tap-to-close overlay */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* Floating Navbar */}
      <nav className="navbar">
        <div className="navbar-center">
          <span className="navbar-title">Makan Makan</span>
          <span className="navbar-sub">Makanan Jasad &amp; Jiwa</span>
        </div>
        <button
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="menu-dropdown">
          <a
            className="menu-item"
            href="https://instagram.com/fatcalico.co"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            <span className="menu-item-icon">📸</span>
            Contact Me
          </a>
          <div className="menu-divider" />
          <button
            className="menu-item"
            onClick={() => { setMenuOpen(false); setWalletModalOpen(true); }}
          >
            <span className="menu-item-icon">☕</span>
            Support Me!
          </button>
        </div>
      )}

      {/* ===== WELCOME SCREEN ===== */}
      {phase === 'welcome' && (
        <div className="screen screen-enter">
          <div className="screen-bg welcome-bg" />
          <div className="welcome-overlay" />
          <div className="welcome-content">
            <div className="sparkle-divider">✦ ✦ ✦</div>
            <p className="welcome-text">
              Makan Makan diciptakan bukan sekadar untuk mengisi jasad yang lapar, tetapi juga untuk jiwa yang memerlukan sajian keinsafan dan kesyukuran.
            </p>
            <div style={{ position: 'relative' }}>
              <div className="magic-ring" />
              <button className="cta-btn" onClick={handleStart}>
                🍽️ Tolong, saya tak tahu nak makan apa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== THINKING SCREEN ===== */}
      {phase === 'thinking' && (
        <div className="screen screen-enter">
          <div className="thinking-image-wrap">
            <div className="screen-bg thinking-bg" />
          </div>
          <div className="thinking-overlay" />
          <div className="thinking-content">
            <p className="thinking-text">Sedang mencari...</p>
            <div className="thinking-dots">
              <div className="thinking-dot" />
              <div className="thinking-dot" />
              <div className="thinking-dot" />
            </div>
          </div>
        </div>
      )}

      {/* ===== RESULT SCREEN ===== */}
      {phase === 'result' && (
        <div className="screen screen-enter">
          <div className="screen-bg result-bg" />
          <div className="result-overlay" />
          <div className="result-content">

            <div className="food-card">
              <div className="food-label">✦ Cadangan Hari Ini ✦</div>
              <div className="food-name">
                {isSpinning ? '...' : food ?? ''}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-suka" onClick={handleSukaa}>Saya Suka! 🎉</button>
              <button className="btn-outline" onClick={handleReshuffle}>Tak Suka 😅</button>
            </div>
            <button className="btn-cuba" onClick={handleReshuffle}>🔄 Cuba lagi</button>

            {reminder && !isSpinning && (
              <div className="nasihat-card">
                <div className="nasihat-title">
                  <span>✨</span>
                  {reminder.title}
                  <span>✨</span>
                </div>
                <div className="nasihat-content">{reminder.content}</div>
              </div>
            )}
            {isSpinning && (
              <div className="nasihat-card">
                <div className="nasihat-content" style={{ textAlign: 'center', color: 'rgba(212,160,23,0.6)' }}>
                  Sedang mencari nasihat... 🌙
                </div>
              </div>
            )}

            <div className="footer-tag">🐱 Fat Calico &amp; Co</div>
          </div>
        </div>
      )}
    </>
  );
}
