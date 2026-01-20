let lastScroll = 0;
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Calculate rotation based on scroll difference
  let rotation = (lastScroll - currentScroll) / 2;
  rotation = Math.max(-15, Math.min(15, rotation));

  const items = document.querySelectorAll('.item');

  // Only apply animation if we're scrolling
  if (!isScrolling) {
    isScrolling = true;
    items.forEach(item => {
      item.style.transformOrigin = 'top center';
    });
  }

  // Apply rotation during scrolling with improved easing
  items.forEach(item => {
    item.style.transition = '';
    item.style.transform = `rotate3d(0, 0, 1, ${rotation}deg) scale(1)`;
  });

  lastScroll = currentScroll;

  clearTimeout(scrollTimeout);

  // Set a timeout to start the oscillation after scrolling stops
  scrollTimeout = setTimeout(() => {
    let currentAngle = rotation;
    let oscillationPhase = 0;
    const maxOscillations = 10;
    let oscillationCount = 0;

    const interval = setInterval(() => {
      oscillationCount++;
      currentAngle *= 0.92;
      oscillationPhase += Math.PI / 8;
      
      const oscillation = currentAngle * Math.sin(oscillationPhase);

      items.forEach(item => {
        item.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
        item.style.transform = `rotate3d(0, 0, 1, ${oscillation}deg) scale(1)`;
      });

      if (Math.abs(currentAngle) < 0.1 || oscillationCount > maxOscillations) {
        clearInterval(interval);
        isScrolling = false;
        items.forEach(item => {
          item.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
          item.style.transform = 'rotate3d(0, 0, 1, 0deg) scale(1)';
        });
      }
    }, 50);
  }, 150);
});