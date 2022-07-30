window.addEventListener('load', function(event) {

  const navigationItem = document.querySelectorAll('.navigation__item');
  const numOfNavigationItem = navigationItem.length;
  const fraction = 360 / numOfNavigationItem;

  let oldWindowWidth = 0;
  let newWindowWidth = window.innerWidth;
  
  const animatedGearNav = () => {

    let moveToTop = -60;
    let angle = 0;
    
    for (let i = 0; i < numOfNavigationItem; i++) {
      const navigationLink = navigationItem[i].getElementsByClassName('navigation__link')[0];
      const navigationLabel = navigationItem[i].getElementsByClassName('navigation__label')[0];
      const navigationIconWrapper = navigationItem[i].getElementsByClassName('navigation__icon-wrapper')[0];
      
      /* Mobile animations
          (Do animations only if windows size is smaller than 1024 or 1024 breakpoint was crossed after resize)
      */
      if (newWindowWidth < 1024 && (oldWindowWidth === 0 || oldWindowWidth > 1023)) {

        // Reset element rotations
        navigationItem[i].style.transform = 'rotate(0deg)';
        navigationLink.style.transform = 'rotate(0deg)';

        // Remove additional classes
        navigationLink.classList.remove('navigation__link--top', 'navigation__link--left', 'navigation__link--bottom', 'navigation__link--right');
        navigationLabel.classList.remove('navigation__label--top', 'navigation__label--left', 'navigation__label--bottom', 'navigation__label--right');
        navigationIconWrapper.classList.remove('navigation__icon-wrapper--top', 'navigation__icon-wrapper--left', 'navigation__icon-wrapper--bottom', 'navigation__icon-wrapper--right');

        // Add styles that move every element to navigation section top
        navigationItem[i].style.top = `calc(${moveToTop}px - ${i}rem)`; 

        // Set top position for next element 
        moveToTop -= 60;
      }

      /* Desktop animations
          (Do animations only if windows size is bigger than 1024 or 1024 breakpoint was crossed after resize)
      */
      else if (newWindowWidth > 1023 && oldWindowWidth < 1024) {

        // Reset top position
        navigationItem[i].style.top = 'auto';

        // Set variables
        const negativeAngle = -Math.abs(angle);

        // Position item in right place in circle by rotating it
        navigationItem[i].style.transform = `rotate(${angle}deg)`;

        // Unrotate link inside item
        navigationLink.style.transform = `rotate(${negativeAngle}deg)`;

        // Depending on angle - add style to link, link label and link icon wrapper
        switch (true) {
          case (angle < 20):
            navigationLink.classList.add('navigation__link--top');
            navigationLabel.classList.add('navigation__label--top');
            navigationIconWrapper.classList.add('navigation__icon-wrapper--bottom');
            break;

          case (angle < 160):
            navigationLink.classList.add('navigation__link--right');
            navigationLabel.classList.add('navigation__label--right');
            navigationIconWrapper.classList.add('navigation__icon-wrapper--left');
            break;

          case (angle < 200):
            navigationLink.classList.add('navigation__link--bottom');
            navigationLabel.classList.add('navigation__label--bottom');
            navigationIconWrapper.classList.add('navigation__icon-wrapper--top');
            break;

          case (angle < 340):
            navigationLink.classList.add('navigation__link--left');
            navigationLabel.classList.add('navigation__label--left');
            navigationIconWrapper.classList.add('navigation__icon-wrapper--right');
            break;

          case (angle < 361):
            navigationLink.classList.add('navigation__link--top');
            navigationLabel.classList.add('navigation__label--top');
            navigationIconWrapper.classList.add('navigation__icon-wrapper--bottom');
            break;
        }

        // Set angle rotation for next element
        angle += fraction;
      }
    }
  }

  animatedGearNav();

  /* After window resize:
      - set previous windows width as oldWindowWidth,
      - set current windows width as newWindowWidth,
      - do animatedGearNav function
  */

  window.addEventListener('resize', function(event) {
    oldWindowWidth = newWindowWidth;
    newWindowWidth = window.innerWidth;

    animatedGearNav();
  });
});
