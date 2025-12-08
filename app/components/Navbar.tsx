useEffect(() => {
    const minSwipeDistance = 70; 
    const triggerZoneStart = typeof window !== 'undefined' ? window.innerWidth - (window.innerWidth * 0.40) : 0;

    let touchStartX = 0;
    let touchStartY = 0;
    let isSwipeIgnored = false;
    let isHorizontalSwipe = false; // Flag nou pentru a bloca decizia pe durata atingerii

    const handleTouchStart = (e: TouchEvent) => {
      if (hideHamburger) {
        isSwipeIgnored = true;
        return;
      }

      const target = e.target as HTMLElement;
      // Ignorăm swipe-ul pe elemente care au propriul scroll orizontal sau clase specifice
      if (target.closest('.prevent-nav-swipe')) {
        isSwipeIgnored = true;
        return; 
      }

      isSwipeIgnored = false;
      isHorizontalSwipe = false; // Resetăm flag-ul
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isSwipeIgnored) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = currentX - touchStartX;
      const diffY = currentY - touchStartY;

      // 1. Verificăm direcția DOMINANTĂ.
      // Dacă mișcarea pe X este mai mare decât pe Y, considerăm că e intenție de Swipe.
      const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

      // 2. Prag de toleranță (Threshold)
      // Ignorăm micro-mișcările (tremuratul degetului) sub 10px
      if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) return;

      // 3. Logica de blocare a scroll-ului
      if (isHorizontal) {
        // Verificăm dacă suntem în zona care permite swipe (marginea dreaptă sau meniul deschis)
        if (isMobileMenuOpen || touchStartX > triggerZoneStart) {
             // AICI E FIX-UL: Dacă e clar orizontală mișcarea, omorâm scroll-ul paginii
             if (e.cancelable) {
                 e.preventDefault();
                 isHorizontalSwipe = true; // Marcam că am intrat în mod swipe
             }
        }
      } else {
        // Dacă mișcarea e verticală (scroll), NU dăm preventDefault, lăsăm pagina să curgă.
        // Dar dacă am început deja un swipe orizontal valid anterior în același touch event, continuăm să blocăm
        if (isHorizontalSwipe && e.cancelable) {
            e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSwipeIgnored) return;
      
      // Resetăm flag-ul
      isHorizontalSwipe = false;

      const endX = e.changedTouches[0].clientX;
      const swipeDistance = endX - touchStartX;

      // Swipe Stânga (Deschidere) - Validăm doar dacă distanța e suficientă
      if (
        swipeDistance < -minSwipeDistance && 
        !isMobileMenuOpen &&
        touchStartX > triggerZoneStart
      ) {
        setIsMobileMenuOpen(true);
      }

      // Swipe Dreapta (Închidere)
      if (swipeDistance > minSwipeDistance && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    // 'passive: false' este CRUCIAL pentru a putea folosi e.preventDefault()
    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobileMenuOpen, hideHamburger]);
