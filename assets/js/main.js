// main.js：主功能脚本

document.addEventListener("DOMContentLoaded", function () {
  // 开场动画控制
  const introScreen = document.getElementById("introScreen");
  const startButton = document.getElementById("startButton");
  const bgMusic = document.getElementById("bgMusic");

  startButton.addEventListener("click", () => {
    introScreen.style.display = "none";
    bgMusic.play();
  });

  // 照片幻灯片控制
  const photos = [
    { src: "assets/images/photo1.jpg", caption: "我们一起走过的第一步" },
    { src: "assets/images/photo2.jpg", caption: "那次阳光灿烂的旅行" },
    { src: "assets/images/photo3.jpg", caption: "友情的每一个瞬间" },
    // 更多照片...
  ];

  let currentPhotoIndex = 0;
  const slideshowImage = document.getElementById("slideshowImage");
  const captionText = document.getElementById("captionText");

  function updateSlideshow() {
    const photo = photos[currentPhotoIndex];
    slideshowImage.src = photo.src;
    captionText.textContent = photo.caption;
  }

  document.getElementById("prevPhoto").addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateSlideshow();
  });

  document.getElementById("nextPhoto").addEventListener("click", () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateSlideshow();
  });

  updateSlideshow();

  // 留言板功能
  const messageForm = document.getElementById("messageForm");
  const nameInput = document.getElementById("nameInput");
  const messageInput = document.getElementById("messageInput");
  const messagesContainer = document.getElementById("messagesContainer");

  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
      const msgDiv = document.createElement("div");
      msgDiv.className = "message-item";
      msgDiv.innerHTML = `<strong>${name}</strong>：${message}`;
      messagesContainer.prepend(msgDiv);

      messageInput.value = "";
    }
  });

  // 视频弹幕（简化示例）
  const video = document.getElementById("memoryVideo");
  const danmakuContainer = document.getElementById("danmakuContainer");

  const danmakus = ["太美了！", "满满的回忆！", "还想去！", "友谊万岁✨"];

  video.addEventListener("play", () => {
    danmakus.forEach((text, i) => {
      setTimeout(() => createDanmaku(text), i * 1500);
    });
  });

  function createDanmaku(text) {
    const span = document.createElement("span");
    span.className = "danmaku";
    span.textContent = text;
    span.style.top = `${Math.random() * 80}%`;
    danmakuContainer.appendChild(span);

    span.animate([
      { transform: "translateX(100%)" },
      { transform: "translateX(-100%)" }
    ], {
      duration: 8000,
      easing: "linear"
    });

    setTimeout(() => danmakuContainer.removeChild(span), 8000);
  }
});
