let lastScroll = 0;
let scrollTimeout;

window.addEventListener('scroll', function () {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Calculate rotation based on scroll difference
  let rotation = (lastScroll - currentScroll) / 2; // Adjust swing intensity here
  rotation = Math.max(-10, Math.min(10, rotation)); // Limit the swing to 10 degrees in either direction

  const items = document.querySelectorAll('.item');

  // Apply rotation during scrolling
  items.forEach(item => {
    item.style.transformOrigin = 'top center';
    item.style.transition = ''; // No transition during scrolling
    item.style.transform = `rotate3d(0, 0, 1, ${rotation}deg)`;
  });

  lastScroll = currentScroll;

  // Clear the previous timeout if it exists
  clearTimeout(scrollTimeout);

  // Set a timeout to start the oscillation after scrolling stops
  scrollTimeout = setTimeout(() => {
    let currentAngle = rotation; // Start with the current rotation angle
    const interval = setInterval(() => {
      currentAngle *= 0.9; // Gradually reduce the angle (damping effect)
      const oscillation = currentAngle * Math.sin(Date.now() / 100); // Create a sine wave for oscillation

      items.forEach(item => {
        item.style.transition = 'transform 0.1s ease-out'; // Short transition for smooth oscillation
        item.style.transform = `rotate3d(0, 0, 1, ${oscillation}deg)`;
      });

      if (Math.abs(currentAngle) < 0.1) { // Stop when the angle is very small
        clearInterval(interval); // Stop the oscillation
        items.forEach(item => {
          item.style.transition = 'transform 0.5s ease-out'; // Smooth transition back to original position
          item.style.transform = 'rotate3d(0, 0, 1, 0deg)'; // Reset rotation
        });
      }
    }, 50); // Adjust interval timing as needed (50ms in this case)
  }, 200); // Adjust delay as needed (200ms in this case)
});