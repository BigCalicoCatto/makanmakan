'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { foodList } from '@/data/foods';
import { spiritualReminders } from '@/data/reminders';

const PASTEL_COLORS = {
  orange: '#F4A460',
  lightOrange: '#FFE4B5',
  creamBg: '#FFF8F0',
  darkText: '#8B6914',
};

export default function MakanMakanPage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedReminder, setSelectedReminder] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRandomize = () => {
    setIsAnimating(true);
    setSelectedFood(null);
    setSelectedReminder(null);

    // Simulate dice rolling animation
    const rollDuration = 600;
    const rollInterval = setInterval(() => {
      setSelectedFood(foodList[Math.floor(Math.random() * foodList.length)]);
      setSelectedReminder(
        spiritualReminders[Math.floor(Math.random() * spiritualReminders.length)]
      );
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      setSelectedFood(foodList[Math.floor(Math.random() * foodList.length)]);
      setSelectedReminder(
        spiritualReminders[Math.floor(Math.random() * spiritualReminders.length)]
      );
      setIsAnimating(false);
    }, rollDuration);

    setShowWelcome(false);
  };

  const handleYes = () => {
    setShowWelcome(true);
    setSelectedFood(null);
    setSelectedReminder(null);
  };

  const handleNo = () => {
    handleRandomize();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: PASTEL_COLORS.creamBg }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b-2" style={{ borderColor: PASTEL_COLORS.orange }}>
        <h1 className="text-2xl font-bold" style={{ color: PASTEL_COLORS.orange }}>
          🐱 MAKAN MAKAN
        </h1>
        <button
          className="p-2 hover:opacity-75 transition-opacity"
          style={{ color: PASTEL_COLORS.orange }}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
        {showWelcome ? (
          // Welcome Section
          <div className="w-full max-w-md">
            <div
              className="rounded-3xl p-8 shadow-lg border-4 flex flex-col gap-6"
              style={{
                borderColor: PASTEL_COLORS.orange,
                backgroundColor: 'white',
              }}
            >
              {/* Main Title */}
              <div className="text-center">
                <h2
                  className="text-4xl font-bold mb-2"
                  style={{ color: PASTEL_COLORS.orange }}
                >
                  🐱 MAKAN MAKAN
                </h2>
                <p
                  className="text-lg font-semibold"
                  style={{ color: PASTEL_COLORS.orange }}
                >
                  Makanan jasad & makanan jiwa
                </p>
              </div>

              {/* Tagline Box */}
              <div
                className="rounded-2xl p-4 text-center"
                style={{
                  backgroundColor: PASTEL_COLORS.lightOrange,
                  color: PASTEL_COLORS.darkText,
                }}
              >
                <p className="font-semibold text-sm">
                  🚫 TOLONG! Saya tak tahu nak makan apa
                </p>
              </div>

              {/* Welcoming Message */}
              <div
                className="rounded-2xl p-6 text-center space-y-4 text-sm leading-relaxed min-h-64 flex items-center justify-center"
                style={{
                  backgroundColor: '#FAFAFA',
                  color: PASTEL_COLORS.darkText,
                  borderWidth: '2px',
                  borderColor: PASTEL_COLORS.orange,
                }}
              >
                <div className="space-y-4">
                  <p>
                    MakanMakan diciptakan bukan sekadar untuk mengisi perut yang lapar, tetapi untuk menyuburkan jiwa yang rindu ketenangan.
                  </p>
                  <p>
                    Setiap kali anda menekan butang di atas, anda tidak hanya mendapat cadangan hidangan lazat, tetapi juga sebuah hadiah kecil dari langit, sebuah ingatan manis untuk tersenyum, bersyukur, dan kembali ingat bahawa kita hidup hanya untuk mencintai Dia.
                  </p>
                  <p>
                    Jangan risau tentang rezeki, jangan bandingkan pilihan orang lain. Apa yang terpilih untuk anda hari ini adalah yang terbaik. Tarik nafas, lepaskan beban, dan mari kita makan dengan niat ibadah.
                  </p>
                  <p className="font-semibold pt-4">
                    Makanan Jasad & Makanan Jiwa.
                    <br />
                    Kenyang perut, tenang hati.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleRandomize}
                className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all hover:shadow-lg active:scale-95"
                style={{ backgroundColor: PASTEL_COLORS.orange }}
              >
                ✨ Mari kita makan
              </button>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="w-full max-w-md">
            <div
              className="rounded-3xl p-8 shadow-lg border-4 flex flex-col gap-6"
              style={{
                borderColor: PASTEL_COLORS.orange,
                backgroundColor: 'white',
              }}
            >
              {/* Header */}
              <div className="text-center">
                <h2
                  className="text-4xl font-bold"
                  style={{ color: PASTEL_COLORS.orange }}
                >
                  🐱 MAKAN MAKAN
                </h2>
              </div>

              {/* Food Item Section */}
              <div className="space-y-4">
                <div
                  className="rounded-2xl p-4 text-center font-semibold"
                  style={{
                    backgroundColor: PASTEL_COLORS.lightOrange,
                    color: PASTEL_COLORS.darkText,
                  }}
                >
                  Makanan Jasad
                </div>
                <div
                  className="rounded-2xl p-6 min-h-24 flex items-center justify-center text-center"
                  style={{
                    backgroundColor: '#FAFAFA',
                    borderWidth: '2px',
                    borderColor: PASTEL_COLORS.orange,
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ color: PASTEL_COLORS.orange }}
                  >
                    {isAnimating ? '🍳 ...' : selectedFood}
                  </p>
                </div>
              </div>

              {/* Spiritual Reminder Section */}
              <div className="space-y-4">
                <div
                  className="rounded-2xl p-4 text-center font-semibold"
                  style={{
                    backgroundColor: PASTEL_COLORS.lightOrange,
                    color: PASTEL_COLORS.darkText,
                  }}
                >
                  Makanan Jiwa
                </div>
                <div
                  className="rounded-2xl p-6 min-h-40 flex items-center justify-center"
                  style={{
                    backgroundColor: '#FAFAFA',
                    borderWidth: '2px',
                    borderColor: PASTEL_COLORS.orange,
                  }}
                >
                  <p
                    className="text-sm leading-relaxed text-center"
                    style={{ color: PASTEL_COLORS.darkText }}
                  >
                    {isAnimating ? '✨ ...' : selectedReminder}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleYes}
                    className="py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg active:scale-95"
                    style={{ backgroundColor: PASTEL_COLORS.orange }}
                    disabled={isAnimating}
                  >
                    Saya Suka! ✓
                  </button>
                  <button
                    onClick={handleNo}
                    className="py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg active:scale-95"
                    style={{ backgroundColor: PASTEL_COLORS.orange }}
                    disabled={isAnimating}
                  >
                    Tak Suka! ✗
                  </button>
                </div>
                <button
                  onClick={handleRandomize}
                  className="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: PASTEL_COLORS.orange }}
                  disabled={isAnimating}
                >
                  🎲 Cuba lagi!
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 border-t-2 text-sm"
        style={{ borderColor: PASTEL_COLORS.orange, color: PASTEL_COLORS.darkText }}
      >
        <p className="font-semibold">Fat Calico & Co © 2026</p>
        <p>Engineered by Fat Calico & Co for Fat Calico & Co</p>
      </footer>
    </div>
  );
}
