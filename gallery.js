document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-container a');
    let currentIndex = 0; // Track the current index of the opened image

    // Create lightbox overlay elements
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    document.body.appendChild(lightboxOverlay);

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    lightboxOverlay.appendChild(lightboxImg);

    // Navigation buttons
    const prevButton = document.createElement('button');
    prevButton.innerText = '<';
    prevButton.className = 'lightbox-nav prev';
    lightboxOverlay.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.innerText = '>';
    nextButton.className = 'lightbox-nav next';
    lightboxOverlay.appendChild(nextButton);

    // Open lightbox function
    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = galleryItems[currentIndex].getAttribute('href');
        lightboxOverlay.style.display = 'flex';
    }

    // Navigate to the previous image
    function navigatePrev() {
        if (currentIndex > 0) {
            openLightbox(currentIndex - 1);
        } else {
            openLightbox(galleryItems.length - 1); // Loop back to the last image
        }
    }

    // Navigate to the next image
    function navigateNext() {
        if (currentIndex < galleryItems.length - 1) {
            openLightbox(currentIndex + 1);
        } else {
            openLightbox(0); // Loop back to the first image
        }
    }

    // Adding click events to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openLightbox(index); 
        });
    });

    // Close lightbox when overlay (excluding the image and nav buttons) is clicked
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
        }
    });

    // Attach navigation events
    prevButton.addEventListener('click', navigatePrev);
    nextButton.addEventListener('click', navigateNext);
    document.addEventListener('keydown', function(e) {
        if (lightboxOverlay.style.display === 'flex') { 
            if (e.key === 'ArrowLeft') {
                navigatePrev();
            } else if (e.key === 'ArrowRight') {
                navigateNext();
            } else if (e.key === 'Escape') {
                lightboxOverlay.style.display = 'none';
            }
        }
    });
});
