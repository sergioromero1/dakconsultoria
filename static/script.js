const menuEmail = document.querySelector('.navbar-email')
const desktopMenu = document.querySelector('.desktop-menu')
const cartMenu = document.querySelector('.navbar-right-img')
const imgMiddle = document.querySelector('.left-image-section')

menuEmail.addEventListener('click', toggleDesktopMenu)

function toggleDesktopMenu() {
  aside.classList.add('inactive')
  desktopMenu.classList.toggle('inactive')
}

const hamburger = document.querySelector('.menu')
const hamburgerMenu = document.querySelector('.mobile-menu')

hamburger.addEventListener('click', togglehamburgerMenu)

function togglehamburgerMenu() {
  hamburgerMenu.classList.toggle('inactive')
}

const aside = document.querySelector('.subscription-detail')

function toogleCartMenu() {
  desktopMenu.classList.add('inactive')
  hamburgerMenu.classList.add('inactive')
  aside.classList.toggle('inactive')
}

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('.mobile-menu a');

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerMenu.classList.add('inactive');
  });
});

// Facebook Pixel Contact Tracking for WhatsApp Button
const btnWhatsapp = document.querySelector('#whatsapp-button');
if (btnWhatsapp) {
  btnWhatsapp.addEventListener('click', function () {
    if (typeof fbq === 'function') {
      fbq('track', 'Contact');
    }
    // Google Ads Conversion
    if (typeof gtag_report_conversion === 'function') {
      gtag_report_conversion();
    }
  });
}