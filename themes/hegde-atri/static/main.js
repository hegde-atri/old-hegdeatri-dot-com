function initMobile() {
  var $mobileNav = document.getElementById('mobile-navbar');
  var $mobileNavIcon = document.querySelector('.mobile-navbar-icon');

  var slideout = new Slideout({
    panel: document.getElementById('mobile-panel'),
    menu: document.getElementById('mobile-menu'),
    padding: 180,
    tolerance: 70,
  });
  slideout.disableTouch();

  $mobileNavIcon.addEventListener('click', function () {
    slideout.toggle();
  });

  slideout.on('beforeopen', function () {
    $mobileNav.classList.add('fixed-open');
    $mobileNavIcon.classList.add('icon-click');
    $mobileNavIcon.classList.remove('icon-out');
  });

  slideout.on('beforeclose', function () {
    $mobileNav.classList.remove('fixed-open');
    $mobileNavIcon.classList.add('icon-out');
    $mobileNavIcon.classList.remove('icon-click');
  });

  document
    .getElementById('mobile-panel')
    .addEventListener('touchend', function () {
      slideout.isOpen() && $mobileNavIcon.click();
    });
}

function toggleTheme() {
  let body = document.getElementsByTagName('body')[0];
  if (body) {
    body.style.transition = 'background-color 1s ease-in-out';
    if (body.getAttribute('data-theme') === 'light') {
      body.setAttribute('data-theme', 'dark');
      window.localStorage.setItem('theme', 'dark');
    } else if (body.getAttribute('data-theme') === 'dark') {
      body.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
    } else {
      body.setAttribute('data-theme', 'light');
      window.localStorage.setItem('theme', 'light');
    }
  }
  setTimeout(function () {
    var d = document,
      s = d.createElement('script');
    s.src = 'https://xypnox-blag.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  }, 1000);
}

if (
  document.readyState === 'complete' ||
  (document.readyState !== 'loading' && !document.documentElement.doScroll)
) {
  initMobile();
  // initToc();
} else {
  document.addEventListener('DOMContentLoaded', initMobile);
  // document.addEventListener('DOMContentLoaded', initToc);
}