// script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const closeBtn = document.querySelector('.close-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgElement = item.querySelector('img');
            const videoElement = item.querySelector('video');
            const captionText = item.querySelector('.photo-caption p').textContent;
            const descriptionContent = item.querySelector('.photo-description') ? item.querySelector('.photo-description').innerHTML : '';

            // Limpiamos el contenido previo del lightbox
            lightboxContainer.innerHTML = '';
            
            // Creamos un contenedor para la foto/video y el pie de foto
            const photoInfoWrapper = document.createElement('div');
            photoInfoWrapper.classList.add('photo-info-wrapper');

            if (imgElement) {
                // Si es una imagen
                const newImg = document.createElement('img');
                newImg.classList.add('lightbox-img');
                newImg.src = imgElement.src;
                newImg.alt = imgElement.alt;
                photoInfoWrapper.appendChild(newImg);
            } else if (videoElement) {
                // Si es un video
                const newVideo = document.createElement('video');
                newVideo.classList.add('lightbox-video');
                newVideo.src = videoElement.src;
                newVideo.controls = true;
                newVideo.autoplay = true;
                photoInfoWrapper.appendChild(newVideo);
            }
            
            // Creamos y agregamos el pie de foto
            const captionDiv = document.createElement('div');
            captionDiv.classList.add('lightbox-caption');
            captionDiv.innerHTML = `<p>${captionText}</p>`;
            photoInfoWrapper.appendChild(captionDiv);

            lightboxContainer.appendChild(photoInfoWrapper);

            // Creamos y agregamos el contenedor de la descripción
            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('lightbox-description');
            descriptionDiv.innerHTML = `<h3>Descripción</h3>${descriptionContent}`;
            lightboxContainer.appendChild(descriptionDiv);

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';

            const videoInLightbox = lightboxContainer.querySelector('video');
            if (videoInLightbox) {
                videoInLightbox.play();
            }
        });
    });

    // Cerrar el lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        const video = lightboxContainer.querySelector('video');
        if (video) {
            video.pause();
        }
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox' || e.target.classList.contains('close-btn')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            const video = lightboxContainer.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            const video = lightboxContainer.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });
    
    // --- Lógica del Contador de Meses ---
    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        const startDate = new Date(2025, 6, 18);

        function updateCountdown() {
            const now = new Date();
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();

            if (days < 0) {
                months--;
                days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            let totalMonths = years * 12 + months;
            let message = "¡Llevamos ";
            
            if (totalMonths > 0) {
                message += `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
            }
            if (totalMonths > 0 && days > 0) {
                message += " y ";
            }
            if (days > 0 || (totalMonths === 0 && days === 0)) {
                 message += `${days} ${days === 1 ? 'día' : 'días'}`;
            }

            message += " juntos!";
            countdownElement.textContent = message;
        }

        updateCountdown();
    }
});