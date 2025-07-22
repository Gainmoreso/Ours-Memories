// main.js - 主交互逻辑


document.addEventListener('DOMContentLoaded', () => {
  const bgm = document.getElementById('bgMusic');
  const introScreen = document.getElementById('introScreen');
  const startButton = document.getElementById('startButton');
  const photoSection = document.getElementById('photoSection');
  const slideshowImage = document.getElementById('slideshowImage');
  const captionText = document.getElementById('captionText');
  const videoSection = document.getElementById('videoSection');
  const memoryVideo = document.getElementById('memoryVideo');
  const danmakuContainer = document.getElementById('danmakuContainer');
  const finalMessage = document.getElementById('finalMessage');
  const messageBoard = document.getElementById('messageBoard');
  const nameInput = document.getElementById('nameInput');
  const messageInput = document.getElementById('messageInput');
  const messagesContainer = document.getElementById('messagesContainer');

  const photos = Array.from({length: 20}, (_, i) => `assets/photos/photo${i+1}.jpg`);
  const captions = Array.from({length: 20}, (_, i) => `照片 ${i+1} 的文艺描述`);

  let currentIndex = 0;
  let photoTimer;

  startButton.addEventListener('click', () => {
    introScreen.style.display = 'none';
    photoSection.classList.remove('hidden');
    startSlideshow();
  });

  function showPhoto(index) {
    slideshowImage.classList.remove('visible');
    setTimeout(() => {
      slideshowImage.src = photos[index];
      captionText.textContent = captions[index];
      slideshowImage.classList.add('visible');
    }, 500);
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
  }

  function startSlideshow() {
    showPhoto(currentIndex);
    photoTimer = setInterval(() => {
      currentIndex++;
      if (currentIndex >= photos.length) {
        clearInterval(photoTimer);
        transitionToVideo();
      } else {
        showPhoto(currentIndex);
      }
    }, 4000);
  }

  document.getElementById('nextPhoto').onclick = nextPhoto;
  document.getElementById('prevPhoto').onclick = () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto(currentIndex);
  };

  function transitionToVideo() {
    photoSection.classList.add('hidden');
    videoSection.classList.remove('hidden');
    showDanmaku(['这是我们最美的回忆', '还记得那个夏天吗？', '一起走过的风景']);
    memoryVideo.play();
  }

  function showDanmaku(messages) {
    messages.forEach(msg => {
      const span = document.createElement('span');
      span.className = 'danmaku';
      span.textContent = msg;
      span.style.top = `${Math.random() * 60 + 10}%`;
      danmakuContainer.appendChild(span);
      setTimeout(() => danmakuContainer.removeChild(span), 10000);
    });
  }

  memoryVideo.onended = () => {
    videoSection.classList.add('hidden');
    finalMessage.classList.remove('hidden');
    setTimeout(() => {
      finalMessage.classList.add('hidden');
      messageBoard.classList.remove('hidden');
    }, 3000);
  };

  document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    if (name && message) {
      const div = document.createElement('div');
      div.className = 'messageBubble';
      div.textContent = `${name}: ${message}`;
      messagesContainer.appendChild(div);
      nameInput.value = '';
      messageInput.value = '';
    }
  });
});
