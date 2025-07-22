// main.js - 主交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('introScreen');
    const startButton = document.getElementById('startButton');
    const mainContent = document.getElementById('mainContent');
    const photoWall = document.querySelector('.photo-wall');
    const photoViewer = document.getElementById('photoViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const closeViewer = document.getElementById('closeViewer');
    const musicBtn = document.getElementById('musicBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const bgMusic = document.getElementById('bgMusic');

    const photos = [
        {img: "assets/images/photo1.jpg", caption: "这是我们第一次旅行的美好记忆"},
        {img: "assets/images/photo2.jpg", caption: "生日派对的欢乐时光"},
        {img: "assets/images/photo3.jpg", caption: "一起看日落的浪漫时刻"},
        {img: "assets/images/photo4.jpg", caption: "周末聚餐的欢声笑语"},
        {img: "assets/images/photo5.jpg", caption: "户外冒险的刺激体验"},
        {img: "assets/images/photo6.jpg", caption: "节日庆祝的温馨氛围"}
    ];

    let currentPhotoIndex = 0;

    // 渲染照片项
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        item.innerHTML = `
            <img src="${photo.img}" alt="回忆${index + 1}">
            <div class="photo-caption">${photo.caption}</div>
        `;
        item.addEventListener('click', () => {
            currentPhotoIndex = index;
            openPhotoViewer();
        });
        photoWall.appendChild(item);

        setTimeout(() => {
            item.classList.add('visible');
        }, index * 150);
    });

    startButton.addEventListener('click', function() {
        introScreen.style.opacity = '0';
        introScreen.style.transform = 'scale(1.1)';
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.style.display = 'block';
            playBackgroundMusic();
        }, 1000);
    });

    function playBackgroundMusic() {
        bgMusic.volume = 0.5;
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicBtn.classList.add('music-playing');
            }).catch(() => showMusicPrompt());
        }
    }

    function showMusicPrompt() {
        const prompt = document.createElement('div');
        prompt.innerHTML = '点击<i class="fas fa-music"></i>按钮播放音乐';
        prompt.style.cssText = `
            position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
            background: rgba(0,0,0,0.8); color: white; padding: 10px 20px;
            border-radius: 30px; font-size: 0.9rem; z-index: 100;
            animation: fadeInOut 5s forwards;
        `;
        document.body.appendChild(prompt);
        setTimeout(() => {
            prompt.style.opacity = '0';
            setTimeout(() => prompt.remove(), 1000);
        }, 4000);
    }

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('music-playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('music-playing');
        }
    });

    closeViewer.addEventListener('click', () => photoViewer.classList.remove('active'));

    prevBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        openPhotoViewer();
    });

    nextBtn.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        openPhotoViewer();
    });

    function openPhotoViewer() {
        viewerImage.src = photos[currentPhotoIndex].img;
        viewerCaption.textContent = photos[currentPhotoIndex].caption;
        photoViewer.classList.add('active');
    }

    // 支持滑动切换
    let touchStartX = 0;
    photoViewer.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    photoViewer.addEventListener('touchend', e => {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 50) {
            currentPhotoIndex = (currentPhotoIndex + (diffX > 0 ? 1 : -1) + photos.length) % photos.length;
            openPhotoViewer();
        }
    });
});
