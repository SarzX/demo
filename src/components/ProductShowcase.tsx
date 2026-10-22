import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductShowcaseProps {
  id: string;
  categoryTitle: string;
  modelBaseUrl: string;
  modelTorsoUrl?: string;
  products: Product[];
}

const GARMENT_TRANSFORMS: Record<string, string> = {
  'off-grid-heavyweight-zip-jacket': 'translate(-50%, -48.2%) scale(1.05)',
  'no-direction-tee': 'translate(-50%, -43.3%) scale(0.94)',
  'out-of-frame-long-sleeve': 'translate(-50%, -51.2%) scale(1.03)',
  'north-origin-copy': 'translate(-50%, -52.5%) scale(1.05)',
};

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  id,
  categoryTitle,
  modelBaseUrl,
  modelTorsoUrl,
  products
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchOffset, setTouchOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelLockRef = useRef(false);

  const { openProductModal } = useCart();
  const lastIndex = products.length - 1;

  // Change to target garment index and update window scroll
  const goTo = useCallback(
    (targetIdx: number) => {
      const clamped = Math.min(lastIndex, Math.max(0, targetIdx));
      setCurrentIndex(clamped);

      if (trackRef.current && stageRef.current) {
        const trackTop = trackRef.current.getBoundingClientRect().top + window.pageYOffset;
        const totalScrollable = trackRef.current.offsetHeight - stageRef.current.offsetHeight;
        if (totalScrollable > 0) {
          const targetScroll = trackTop + (clamped / lastIndex) * totalScrollable;
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }
    },
    [lastIndex]
  );

  // Wheel listener when hovering over the sticky stage
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      const rect = stageEl.getBoundingClientRect();
      // True when the stage is pinned in viewport
      const isPinned = rect.top <= 20 && rect.bottom >= window.innerHeight - 20;
      if (!isPinned) return;

      // Scrolling Down
      if (e.deltaY > 15 && currentIndex < lastIndex) {
        if (wheelLockRef.current) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        wheelLockRef.current = true;
        const next = Math.min(lastIndex, currentIndex + 1);
        goTo(next);
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 450);
      }
      // Scrolling Up
      else if (e.deltaY < -15 && currentIndex > 0) {
        if (wheelLockRef.current) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        wheelLockRef.current = true;
        const prev = Math.max(0, currentIndex - 1);
        goTo(prev);
        setTimeout(() => {
          wheelLockRef.current = false;
        }, 450);
      }
    };

    stageEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => stageEl.removeEventListener('wheel', handleWheel);
  }, [currentIndex, lastIndex, goTo]);

  // Page Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current || !stageRef.current) return;
      if (wheelLockRef.current) return;

      const trackRect = trackRef.current.getBoundingClientRect();
      const stageHeight = stageRef.current.offsetHeight || window.innerHeight;
      const totalScrollable = trackRef.current.offsetHeight - stageHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -trackRect.top;
      if (scrolled >= 0 && scrolled <= totalScrollable) {
        const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const calcIndex = Math.min(lastIndex, Math.max(0, Math.round(progress * lastIndex)));
        setCurrentIndex((prev) => (prev !== calcIndex ? calcIndex : prev));
      } else if (scrolled > totalScrollable) {
        setCurrentIndex(lastIndex);
      } else if (scrolled < 0) {
        setCurrentIndex(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastIndex]);

  // Touch and pointer gestures (drag or swipe)
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    touchStartRef.current = { x: clientX, y: clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !touchStartRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const dx = clientX - touchStartRef.current.x;
    const dy = clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy)) {
      let offset = dx;
      if ((currentIndex === 0 && dx > 0) || (currentIndex === lastIndex && dx < 0)) {
        offset = dx * 0.25;
      }
      setTouchOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 35;
    if (touchOffset < -threshold && currentIndex < lastIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (touchOffset > threshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }

    setTouchOffset(0);
    touchStartRef.current = null;
  };

  const currentProduct = products[currentIndex] || products[0];

  return (
    <section id={id} className="ps relative w-full bg-[#f6f6f6] text-[#111] select-none">
      {/* 
        Scroll track container:
        Height is (items * 90vh) so scrolling down sticks the stage and flips garments
      */}
      <div
        ref={trackRef}
        className="ps-track relative"
        style={{ height: `${products.length * 90}vh` }}
      >
        {/* Sticky 100vh stage */}
        <div
          ref={stageRef}
          className="ps-stage sticky top-0 h-screen overflow-hidden bg-[#f6f6f6] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
        >
          {/* Left Info Panel (Staggered Text Reveal) */}
          <div className="ps-info-wrap absolute left-6 sm:left-12 md:left-16 top-16 md:top-1/2 md:-translate-y-1/2 z-20 w-[min(90%,440px)] pointer-events-auto">
            <div className="ps-info active">
              {/* Collection Eyebrow */}
              <span className="ps-rv ps-eyebrow text-[12px] font-normal tracking-[0.16em] uppercase text-neutral-500 mb-4 block">
                <span key={`col-${currentIndex}`} style={{ '--i': 0 } as React.CSSProperties}>
                  {currentProduct.collection}
                </span>
              </span>

              {/* Product Title */}
              <h2 className="ps-title font-heading text-[26px] sm:text-[38px] md:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] uppercase">
                <span className="ps-rv">
                  <span key={`tit-${currentIndex}`} style={{ '--i': 1 } as React.CSSProperties}>
                    {currentProduct.title}
                  </span>
                </span>
              </h2>

              {/* Price */}
              <div className="ps-rv ps-price mt-3 sm:mt-4 text-[20px] sm:text-[24px] font-normal tracking-tight">
                <span key={`prc-${currentIndex}`} style={{ '--i': 2 } as React.CSSProperties}>
                  ${currentProduct.price.toFixed(2)}
                </span>
              </div>

              {/* Button & Arrow Controls */}
              <div className="ps-rv ps-btn-row mt-6 flex items-center gap-4">
                <span key={`btn-${currentIndex}`} style={{ '--i': 3 } as React.CSSProperties}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(currentProduct);
                    }}
                    className="ps-btn cursor-pointer shadow-xs"
                  >
                    <span>Купить</span>
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="w-4 h-4"
                    >
                      <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
                    </svg>
                  </button>
                </span>

                {/* Direct Prev / Next Garment Switcher Buttons */}
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className={`w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center transition-colors ${
                      currentIndex > 0
                        ? 'hover:border-black bg-white text-black cursor-pointer'
                        : 'opacity-30 cursor-not-allowed bg-neutral-100'
                    }`}
                    aria-label="Предыдущая вещь"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
                      <path d="M10 3L5 8l5 5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    disabled={currentIndex === lastIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((prev) => Math.min(lastIndex, prev + 1));
                    }}
                    className={`w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center transition-colors ${
                      currentIndex < lastIndex
                        ? 'hover:border-black bg-white text-black cursor-pointer'
                        : 'opacity-30 cursor-not-allowed bg-neutral-100'
                    }`}
                    aria-label="Следующая вещь"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-3.5 h-3.5">
                      <path d="M6 3l5 5-5 5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Garment Indicator Dots */}
              <div className="flex items-center gap-2 mt-7">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-400 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-black'
                        : 'w-2 bg-neutral-300 hover:bg-neutral-500'
                    }`}
                    aria-label={`Посмотреть вещь ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mannequin / Model Base Silhouette (Anchored in dead center) */}
          <img
            src={modelBaseUrl}
            alt="Модель"
            className="ps-model pointer-events-none select-none"
            draggable={false}
          />

          {/* Mannequin Torso with arms & neck: displayed for t-shirts & short sleeves */}
          {modelTorsoUrl && modelTorsoUrl !== modelBaseUrl && (
            <img
              src={modelTorsoUrl}
              alt="Торс модели"
              className="ps-model ps-torso pointer-events-none select-none transition-opacity duration-300"
              style={{
                zIndex: 1,
                opacity: currentProduct?.id === 'no-direction-tee' || currentProduct?.title.toLowerCase().includes('tee') ? 1 : 0
              }}
              draggable={false}
            />
          )}

          {/* 
            Sliding Garments:
            Exact formula from the original Shopify site:
            width & height match the model base,
            and clothes are centered at top:50%, left:50% with translate(-50%, -50%)
            plus horizontal translation d * slot.
          */}
          {products.map((product, idx) => {
            const diff = idx - currentIndex;
            // Slot spacing: card width approx 480px
            const slot = 480;
            const translateX = diff * slot + (isDragging ? touchOffset : 0);

            const isActive = diff === 0;
            const isNext = diff === 1;
            const isPrev = diff < 0;

            let className = 'ps-shirt select-none';
            if (isActive) className += ' active';
            else if (isNext) className += ' next is-next';
            else if (isPrev) className += ' prev';

            const isTops = id === 'showcase-tops' || categoryTitle?.toLowerCase().includes('top') || categoryTitle?.toLowerCase().includes('верх');
            const centerTransform = GARMENT_TRANSFORMS[product.id] || (isTops
              ? 'translate(-50%, -48%) scale(1)'
              : 'translate(-50%, -50%)');

            return (
              <img
                key={product.id}
                src={product.overlayImage || product.images[0]}
                alt={product.title}
                className={className}
                style={{
                  transform: `translate3d(${translateX}px, 0, 0) ${centerTransform}`,
                  opacity: isActive ? 1 : isNext ? 0.42 : diff === 2 ? 0.15 : 0
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isActive) {
                    openProductModal(product);
                  } else if (isNext) {
                    goTo(idx);
                  }
                }}
                draggable={false}
              />
            );
          })}

          {/* Bottom Right "Scroll or drag to change" prompt */}
          <div
            className="ps-explore text-neutral-600 transition-opacity duration-500 flex items-center gap-2"
            style={{ opacity: currentIndex === lastIndex ? 0 : 1 }}
          >
            <span className="text-[13px] font-medium tracking-tight">
              Листайте или тяните для смены
            </span>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4">
              <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
