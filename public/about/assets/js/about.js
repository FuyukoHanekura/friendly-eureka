const overlay = document.querySelector('#overlay-contact');
const formOpenBtn = document.querySelector('#contact-button');
const formCloseBtn = document.querySelector('#close-contact-form');
const contactForm = document.querySelector('#contact-form');
const sendButton = document.querySelector('#send-button');

formOpenBtn.addEventListener('click', openContactForm);
formCloseBtn.addEventListener('click', closeContactForm);
contactForm.addEventListener('submit', submitContactForm);

function openContactForm()
{
    overlay.classList.add('contact-visible')
}

function closeContactForm()
{
    overlay.classList.remove('contact-visible')
}

function onFormError(data)
{
    sendButton.textContent = data.message;
    setTimeout(formResetButton, 2000);
}

function onFormSubmitted(data)
{
    sendButton.textContent = data.message;
    contactForm.reset();
    sendButton.classList.add('form-submitted-result');

    setTimeout(formSubmitted, 3000);

}

function formSubmitted()
{
    closeContactForm();
    formResetButton();
}

function formResetButton()
{
    sendButton.textContent = 'Send';
    
    sendButton.classList.remove('form-submitted-result');
    sendButton.disabled = false;
}

function submitContactForm(event)
{
    event.preventDefault();
    sendButton.disabled = true;
    
    const formData = new FormData(contactForm);
    
    fetch("assets/php/contact.php", {method: "POST", body: formData})
    .then(response => response.json())
    .then(data => {
        if(data.status === 'success') 
        {
            onFormSubmitted(data);
        } 
        else 
        {
            onFormError(data);
        }
    })
    .catch(error => { console.error('Request failed', error) })
}

