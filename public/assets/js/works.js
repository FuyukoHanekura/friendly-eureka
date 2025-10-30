document.querySelectorAll('.credit-card').forEach(card => 
    {
        const img = card.querySelector('.profile-picture');
        if (img && img.src)
        {
            const src = img.getAttribute('src');
            card.style.setProperty('--card-img', `url(${img.src})`);
        }
    });
