const overlay = document.querySelector('#overlay-contact');
const formOpenBtn = document.querySelector('#contact-button');
const formCloseBtn = document.querySelector('#close-contact-form');

formOpenBtn.addEventListener('click', openContactForm);
formCloseBtn.addEventListener('click', closeContactForm);

function openContactForm()
{
    overlay.classList.add('contact-visible')
}

function closeContactForm()
{
    overlay.classList.remove('contact-visible')
}