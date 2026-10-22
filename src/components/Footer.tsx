import React, { useState, useEffect, useRef } from 'react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watermarkRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(watermarkRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <footer
        className={`nf w-full bg-[#f5f5f7] text-[#1d1d1f] font-sans pt-16 md:pt-24 pb-8 overflow-hidden border-t border-neutral-200 ${
          isInView ? 'is-in' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Top Center Logo Glyph */}
          <div className="flex justify-center pb-8 mb-12 border-b border-black/10">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[28px] font-extrabold tracking-tight text-neutral-900 hover:opacity-75 transition-opacity"
              aria-label="Back to top"
            >
              Ø
            </a>
          </div>

          {/* Nav Columns */}
          {/* Nav Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Collections */}
            <div>
              <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                Коллекции
              </h2>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[14px] text-neutral-600">
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    Базовые вещи (CORE)
                  </a>
                </li>
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    Фирменная униформа
                  </a>
                </li>
                <li>
                  <a href="#shop-tops" className="hover:text-black transition-colors">
                    Каталог верха
                  </a>
                </li>
                <li>
                  <a href="#showcase-tops" className="hover:text-black transition-colors">
                    Полевая система 001
                  </a>
                </li>
                <li>
                  <a href="#showcase-bottoms" className="hover:text-black transition-colors">
                    Графическая серия · FW 2025
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: About & Contact */}
            <div className="flex justify-start md:justify-end gap-16">
              <div>
                <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                  О бренде
                </h2>
                <ul className="space-y-2.5 text-[14px] text-neutral-600">
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'NØRTH — независимая студия функциональной верхней одежды и униформы, основанная в 2024 году. Разработано между Марокко и Лондоном с фокусом на тяжелый необработанный текстиль, технологичные материалы и архитектурный крой.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Наша история
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'Журнал NØRTH: Исследование суровых вершин Атласских гор, ночные экспедиции и полевые тесты материалов в координатах 31°37\'N 8°01\'W.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Журнал
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-[12px] font-bold tracking-wider uppercase text-neutral-900 mb-4">
                  Контакты
                </h2>
                <ul className="space-y-2.5 text-[14px] text-neutral-600">
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'Вопросы и сотрудничество: studio@north-uniform.com\nЧасы работы: Пн - Пт, 09:00 - 18:00 GMT'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Связаться с нами
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        setModalContent(
                          'Часто задаваемые вопросы:\n\n• Доставка: 2-4 рабочих дня по всему миру через экспресс-службу.\n• Посадка: Свободный оверсайз-крой со спущенной линией плеч.\n• Возврат: Бесплатный возврат в течение 14 дней с момента получения.'
                        )
                      }
                      className="hover:text-black transition-colors cursor-pointer text-left"
                    >
                      Помощь и FAQ
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Giant SVG Wordmark "NØRTH" with rise animation */}
          <div ref={watermarkRef} className="nf__wm mt-14 md:mt-24 select-none pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 1000 215"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-auto block"
            >
              <defs>
                <linearGradient id="nf-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity="1" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <g className="nf__wm-g">
                <text
                  x="0"
                  y="205"
                  fontSize="290"
                  textLength="1000"
                  lengthAdjust="spacingAndGlyphs"
                  fontFamily="Archivo, sans-serif"
                  fontWeight="800"
                  fill="url(#nf-grad)"
                >
                  NØRTH
                </text>
              </g>
            </svg>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between text-[12px] text-neutral-500 gap-3">
            <p>© 2026 NØRTH. Все права защищены.</p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setModalContent(
                    'Политика конфиденциальности: NØRTH уважает конфиденциальность клиентов. Ваши данные никогда не передаются и не продаются третьим лицам.'
                  )
                }
                className="hover:text-black transition-colors cursor-pointer"
              >
                Политика конфиденциальности
              </button>
              <span>•</span>
              <button
                onClick={() =>
                  setModalContent(
                    'Условия обслуживания: Все заказы формируются и подтверждаются после проведения оплаты.'
                  )
                }
                className="hover:text-black transition-colors cursor-pointer"
              >
                Условия обслуживания
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-2xl text-black">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="whitespace-pre-line text-[14px] leading-relaxed text-neutral-700 mt-2">
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
