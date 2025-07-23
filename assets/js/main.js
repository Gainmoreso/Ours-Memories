// ~/assets/js/main.js：主功能入口脚本

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const sections = {
    intro: document.getElementById("introScreen"),
    photo: document.getElementById("photoSection"),
    video: document.getElementById("videoSection"),
    message: document.getElementById("messageBoard"),
    final: document.getElementById("finalMessage")
  };

  initIntro();
  initSlideshow();
  initVideoDanmaku();
  initMessageBoard();
  initPoemDisplay();

  // ========== 开场动画 ==========
  function initIntro() {
    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", () => {
      sections.intro.style.display = "none";

      requestAnimationFrame(() => {showSection(sections.photo);});

      bgMusic.play().catch(err => console.log("音乐播放失败:", err));
    });
  }

  function showSection(target) {
    Object.values(sections).forEach(sec => sec.classList.remove("active"));
    target.classList.add("active");

    if (target === sections.video) {
      target.style.opacity = 0;
      target.style.transition = "opacity 1.5s ease-in-out";
      setTimeout(() => {
        target.style.opacity = 1;
        const video = document.getElementById("memoryVideo");
        video.play().catch(err => console.log("视频播放失败:", err));
      }, 100);
    }
  }

  // ========== 幻灯片播放 ==========
  function initSlideshow() {
      // === 保留原始 photos 数组定义 ===
      const photos = [
        { src: "assets/images/photo1.jpg", caption: "千年胭脂色 犹带盛唐春" },
        { src: "assets/images/photo3.jpg", caption: "鞍鞯金斑，曾驮驼铃过阳关" },
        { src: "assets/images/photo5.jpg", caption: "千载风霜蚀不去袖中云纹" },
        { src: "assets/images/photo7.jpg", caption: "则天之目 龙门之魄" },
        { src: "assets/images/photo9.jpg", caption: "卢舍那千尺目光下" },
        { src: "assets/images/photo11.jpg", caption: "朝圣者化身为流动的星点" },
        { src: "assets/images/photo13.jpg", caption: "龙门石窟客服专线接通中..." },
        { src: "assets/images/photo15.jpg", caption: "可爱捏~" },
        { src: "assets/images/photo17.jpg", caption: "风起洛阳城，尘落白马寺" },
        { src: "assets/images/photo19.jpg", caption: "待寺扶正缘" },
        { src: "assets/images/photo21.jpg", caption: "泰式佛殿苑" },
        { src: "assets/images/photo23.jpg", caption: "印度佛殿苑" },
        { src: "assets/images/photo25.jpg", caption: "万岁通天应天门" },
        { src: "assets/images/photo27.jpg", caption: "扶摇直上九万里" },
        { src: "assets/images/photo29.jpg", caption: "白云千载空悠悠" },
        { src: "assets/images/photo31.jpg", caption: "松拂云开万古心" },
        { src: "assets/images/photo33.jpg", caption: "奇峰云海悬金殿" },
        { src: "assets/images/photo35.jpg", caption: "" },
        { src: "assets/images/photo37.jpg", caption: "天门之道仙气韵" },
        { src: "assets/images/photo38.jpg", caption: "" },
        { src: "assets/images/photo39.jpg", caption: "哈基旺 今年旺！" },
        { src: "assets/images/photo41.jpg", caption: "" },
        { src: "assets/images/photo43.jpg", caption: "" },
        { src: "assets/images/photo45.jpg", caption: "" },
        { src: "assets/images/photo47.jpg", caption: "" },
        { src: "assets/images/photo49.jpg", caption: "石为地魄，云为天工" },
        { src: "assets/images/photo53.jpg", caption: "不知天上宫阙" },
        { src: "assets/images/photo55.jpg", caption: "今夕是何年" },
        { src: "assets/images/photo57.jpg", caption: "天下四风谷之一" },
        { src: "assets/images/photo58.jpg", caption: "" },
        { src: "assets/images/photo59.jpg", caption: "" },
        { src: "assets/images/photo60.jpg", caption: "仙侠奇境，灯星浮世" },
        { src: "assets/images/photo61.jpg", caption: "神舟破浪起风帆" },
        { src: "assets/images/photo63.jpg", caption: "霓虹光影水波漾" },
        { src: "assets/images/photo65.jpg", caption: "" },
        { src: "assets/images/photo67.jpg", caption: "" },
        { src: "assets/images/photo69.jpg", caption: "飞檐朱灯缀天色" },
        { src: "assets/images/photo71.jpg", caption: "双塔接星轨 暖金蚀夜幕" }
      ];

      let current = 0;
      let interval;
      const slideshowImage = document.getElementById("slideshowImage");
      const captionText = document.getElementById("captionText");
      const container = document.querySelector(".photo-container");

      function updateSlideshow() {
        const photo = photos[current];
        captionText.style.opacity = 0;
        captionText.style.transform = "translateY(20px)";
        captionText.style.transition = "none";

        slideshowImage.style.opacity = 0;
        slideshowImage.style.transform = "scale(0.95)";
        slideshowImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";

        setTimeout(() => {
          slideshowImage.src = photo.src;
          captionText.textContent = photo.caption;

          captionText.style.transition = "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s";

          slideshowImage.onload = () => {
            slideshowImage.style.opacity = 1;
            slideshowImage.style.transform = "scale(1)";
            slideshowImage.addEventListener("transitionend", () => {
              captionText.style.opacity = 1;
              captionText.style.transform = "translateY(0)";
            }, { once: true });
          };
        }, 300);
      }

      function nextPhoto() {
        container.classList.add("fade-in-out");
        setTimeout(() => {
          current = (current + 1) % photos.length;
          updateSlideshow();
          container.classList.remove("fade-in-out");

          if (current === photos.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              document.getElementById("memoryVideo").load();
              showSection(sections.video);
            }, 3000);
          }
        }, 500);
      }

      function prevPhoto() {
        container.classList.add("fade-in-out");
        setTimeout(() => {
          current = (current - 1 + photos.length) % photos.length;
          updateSlideshow();
          container.classList.remove("fade-in-out");
          resetAutoPlay();
        }, 500);
      }

      function startAutoPlay() {
        clearInterval(interval);
        interval = setInterval(nextPhoto, 1500);
      }

      function resetAutoPlay() {
        clearInterval(interval);
        startAutoPlay();
      }

      document.getElementById("nextPhoto").addEventListener("click", nextPhoto);
      document.getElementById("prevPhoto").addEventListener("click", prevPhoto);
      updateSlideshow();

      sections.photo.addEventListener("transitionend", () => {
        if (sections.photo.classList.contains("active")) {
          startAutoPlay();
        }
      });
    }



  // ========== 视频弹幕 ==========
  function initVideoDanmaku() {
    const video = document.getElementById("memoryVideo");
    const danmakuContainer = document.getElementById("danmakuContainer");
    const danmakus = [
      "太美了！", "满满的回忆！", "还想去！", "友谊万岁✨",
      "时光不老，我们不散", "青春永驻", "最美好的时光",
      "永远珍藏这一刻", "笑的真开心", "下次再聚"
    ];
    const colors = ["#ff6b9d", "#ff9dcf", "#80ccff", "#ffd166", "#06d6a0"];

    function createDanmaku(text) {
      const span = document.createElement("span");
      span.className = "danmaku";
      span.textContent = text;
      span.style.top = `${Math.random() * 80}%`;
      span.style.color = colors[Math.floor(Math.random() * colors.length)];
      span.style.fontSize = `${Math.random() * 10 + 18}px`;

      danmakuContainer.appendChild(span);
      span.animate([{ transform: "translateX(100vw)" }, { transform: "translateX(-100%)" }], {
        duration: Math.random() * 5000 + 5000,
        easing: "linear"
      });

      setTimeout(() => {
        if (danmakuContainer.contains(span)) danmakuContainer.removeChild(span);
      }, 10000);
    }

    video.addEventListener("play", () => {
      danmakus.forEach((text, i) => {
        setTimeout(() => createDanmaku(text), i * 1500);
      });
    });

    video.addEventListener("ended", () => {
      showSection(sections.final);
      showPoemLines();
    });
  }

  // ========== 留言板 ==========
  function initMessageBoard() {
    const form = document.getElementById("messageForm");
    const nameInput = document.getElementById("nameInput");
    const messageInput = document.getElementById("messageInput");
    const container = document.getElementById("messagesContainer");

    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (name && message) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message-item";
        msgDiv.innerHTML = `<strong>${name}</strong>：${message}`;
        container.prepend(msgDiv);

        nameInput.value = "";
        messageInput.value = "";
      }
    });
  }

  // ========== 诗歌展示 ==========
  function initPoemDisplay() {
    // 空占位，用于在 video ended 中调用
  }

  async function showPoemLines() {
    const lines = document.querySelectorAll(".poem-line");
    const poemContainer = document.querySelector(".poem-container");
    poemContainer.innerHTML = "";

    const segments = [
      [0, 3], [3, 7], [7, 11], [11, 15], [15, 19], [19, 22], [22, 25]
    ];

    for (const [start, end] of segments) {
      const segmentDiv = document.createElement("div");
      segmentDiv.className = "poem-segment";
      if (end === 25) segmentDiv.classList.add("final-segment");

      for (let i = start; i < end; i++) {
        if (lines[i]) {
          const lineClone = lines[i].cloneNode(true);
          segmentDiv.appendChild(lineClone);
        }
      }

      poemContainer.appendChild(segmentDiv);
    }

    for (const segment of poemContainer.children) {
      segment.classList.add("active");
      const lineEls = segment.querySelectorAll(".poem-line");
      await showLinesWithDelay(lineEls, 800);

      if (!segment.classList.contains("final-segment")) {
        await delay(2000);
        segment.classList.remove("active");
        await delay(1200);
      }
    }
  }

  function showLinesWithDelay(lines, delayTime) {
    return new Promise(resolve => {
      let i = 0;
      function show() {
        if (i < lines.length) {
          lines[i].classList.add("visible");
          setTimeout(show, delayTime);
          i++;
        } else {
          resolve();
        }
      }
      show();
    });
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
