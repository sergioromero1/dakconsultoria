// Mobile Dropdown Toggle
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle span');
const mobileDropdown = document.querySelector('.mobile-dropdown-toggle');

if (mobileDropdownToggle) {
    mobileDropdownToggle.addEventListener('click', () => {
        mobileDropdown.classList.toggle('active');
    });
}
