'use client';

import { useState, useEffect, useCallback } from 'react';
import { foodList } from '../../data/foods';
import { spiritualReminders } from '../../data/reminders';

// --- Types ---
interface Food {
  name: string;
  [key: string]: unknown;
}

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

// --- Main Component ---
export default function Home() {
  const [phase, setPhase] = useState<'welcome' | 'result'>('welcome');
  const [food, setFood] = useState<Food | null>(null);
  const [reminder, setReminder] = useState<Reminder | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Confetti[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => {
      setFood(getRandom(foodList) as Food);
      setReminder(getRandom(spiritualReminders) as Reminder);
      setIsSpinning(false);
    }, 600);
  }, []);

  const handleStart = () => {
    pickRandom();
    setPhase('result');
    setShowConfetti(false);
  };

  const handleSukaa = () => {
    setConfettiPieces(generateConfetti());
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3500);
  };

  const handleReshuffle = () => {
    setShowConfetti(false);
    pickRandom();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Nunito:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #FFFDF7;
          font-family: 'Nunito', sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 20px 16px 40px;
        }

        .card {
          background: white;
          border: 3px solid #F4A460;
          border-radius: 24px;
          width: 100%;
          max-width: 420px;
          padding: 28px 24px 24px;
          position: relative;
          box-shadow: 4px 4px 0px #F4A460;
          min-height: 85vh;
          display: flex;
          flex-direction: column;
        }

        /* Title */
        .title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }
        .title {
          font-family: 'Caveat', cursive;
          font-size: 2.4rem;
          font-weight: 700;
          color: #F4A460;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .title-icon { font-size: 1.4rem; }
        .divider {
          height: 2px;
          background: #F4A460;
          border-radius: 2px;
          margin-bottom: 6px;
          width: 100%;
        }
        .tagline {
          font-family: 'Caveat', cursive;
          font-size: 1.05rem;
          color: #8B6914;
          margin-bottom: 20px;
        }

        /* Welcome box */
        .welcome-box {
          background: repeating-linear-gradient(
            -45deg,
            #FFF8E1,
            #FFF8E1 8px,
            #FFFDF7 8px,
            #FFFDF7 16px
          );
          border: 2px solid #F4A460;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          flex: 1;
        }
        .welcome-text {
          font-size: 0.92rem;
          color: #5C4A1A;
          line-height: 1.75;
        }
        .welcome-text p { margin-bottom: 12px; }
        .welcome-text p:last-child { margin-bottom: 0; }
        .welcome-bold {
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          font-weight: 700;
          color: #F4A460;
          display: block;
          margin-top: 4px;
        }

        /* CTA button */
        .cta-btn {
          background: #F4A460;
          color: white;
          border: none;
          border-radius: 50px;
          padding: 14px 28px;
          font-family: 'Caveat', cursive;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 3px 3px 0px #C17800;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 4px 5px 0px #C17800; }
        .cta-btn:active { transform: translateY(1px); box-shadow: 1px 1px 0px #C17800; }

        /* Result phase */
        .food-box {
          border: 2.5px solid #F4A460;
          border-radius: 16px;
          padding: 18px 16px;
          text-align: center;
          margin-bottom: 16px;
          min-height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s;
        }
        .food-box.spinning { opacity: 0.4; }
        .food-name {
          font-family: 'Caveat', cursive;
          font-size: 1.5rem;
          font-weight: 700;
          color: #8B6914;
        }

        .btn-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        .btn-suka {
          background: #F4A460;
          color: white;
          border: 2px solid #F4A460;
          border-radius: 50px;
          padding: 10px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 2px 2px 0 #C17800;
        }
        .btn-suka:hover { transform: translateY(-1px); }
        .btn-suka:active { transform: translateY(1px); }

        .btn-outline {
          background: white;
          color: #F4A460;
          border: 2.5px solid #F4A460;
          border-radius: 50px;
          padding: 10px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          flex: 1;
          transition: transform 0.15s;
          box-shadow: 2px 2px 0 #FFE4B5;
        }
        .btn-outline:hover { transform: translateY(-1px); background: #FFF8E1; }
        .btn-outline:active { transform: translateY(1px); }

        .btn-cuba {
          display: block;
          width: 100%;
          background: white;
          color: #F4A460;
          border: 2.5px dashed #F4A460;
          border-radius: 50px;
          padding: 10px 20px;
          font-family: 'Caveat', cursive;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 16px;
          transition: transform 0.15s, background 0.15s;
        }
        .btn-cuba:hover { background: #FFF8E1; transform: translateY(-1px); }

        /* Nasihat box */
        .nasihat-box {
          border: 2px solid #F4A460;
          border-radius: 16px;
          padding: 18px 16px;
          flex: 1;
          background: #FFFDF7;
          transition: opacity 0.3s;
          position: relative;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .nasihat-box.spinning { opacity: 0.3; }
        .nasihat-title {
          font-family: 'Caveat', cursive;
          font-size: 1.15rem;
          font-weight: 700;
          color: #F4A460;
          margin-bottom: 8px;
        }
        .nasihat-content {
          font-size: 0.88rem;
          color: #5C4A1A;
          line-height: 1.7;
          font-style: italic;
        }

        /* Footer */
        .footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          margin-top: 14px;
          font-family: 'Caveat', cursive;
          font-size: 0.85rem;
          color: #C4A47C;
        }
        .footer-cat { font-size: 1.1rem; }

        /* Confetti */
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
          width: 10px;
          height: 10px;
          border-radius: 2px;
          animation: fall linear forwards;
        }
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }

        @keyframes spin-in {
          0%   { transform: scale(0.85) rotate(-2deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .animate-in { animation: spin-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
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

      <div className="card">
        {/* Header — always visible */}
        <div className="title-row">
          <span className="title-icon">🍊</span>
          <span className="title">Makan Makan</span>
          <span className="title-icon">🐾</span>
        </div>
        <div className="divider" />
        <div className="tagline">Makanan jasad &amp; makanan jiwa</div>

        {phase === 'welcome' && (
          <>
            <div className="welcome-box">
              <div className="welcome-text">
                <p>MakanMakan diciptakan bukan sekadar untuk mengisi perut yang lapar, tetapi untuk menyuburkan jiwa yang rindu ketenangan.</p>
                <p>Setiap kali anda menekan butang di atas, anda tidak hanya mendapat cadangan hidangan lazat, tetapi juga sebuah hadiah kecil dari langit — sebuah ingatan manis untuk tersenyum, bersyukur, dan kembali ingat bahawa kita hidup hanya untuk mencintai Dia.</p>
                <p>Jangan risau tentang rezeki, jangan bandingkan pilihan orang lain. Apa yang terpilih untuk anda hari ini adalah yang terbaik. Tarik nafas, lepaskan beban, dan mari kita makan dengan niat ibadah.</p>
                <span className="welcome-bold">Makanan Jasad &amp; Makanan Jiwa.<br />Kenyang perut, tenang hati. 🌸</span>
              </div>
            </div>

            <button className="cta-btn" onClick={handleStart}>
              🍽️ TOLONG! Saya tak tahu nak makan apa
            </button>
          </>
        )}

        {phase === 'result' && (
          <>
            <div className={`food-box ${isSpinning ? 'spinning' : 'animate-in'}`}>
              <span className="food-name">
                {isSpinning ? '...' : (food as { name?: string })?.name ?? String(food)}
              </span>
            </div>

            <div className="btn-row">
              <button className="btn-suka" onClick={handleSukaa}>Saya Suka! 🎉</button>
              <button className="btn-outline" onClick={handleReshuffle}>Tak Suka! 😅</button>
            </div>
            <button className="btn-cuba" onClick={handleReshuffle}>Cuba lagi! 🔄</button>

            <div className={`nasihat-box ${isSpinning ? 'spinning' : 'animate-in'}`}>
              {reminder && !isSpinning && (
                <>
                  <div className="nasihat-title">✨ {reminder.title}</div>
                  <div className="nasihat-content">{reminder.content}</div>
                </>
              )}
              {isSpinning && (
                <div className="nasihat-content" style={{ textAlign: 'center', color: '#F4A460' }}>
                  Sedang mencari nasihat... 🌙
                </div>
              )}
            </div>
          </>
        )}

        <div className="footer">
          <span className="footer-cat">🐱</span>
          <span>Fat Calico &amp; Co</span>
        </div>
      </div>
    </>
  );
}
