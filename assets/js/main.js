// main.js：主功能脚本

document.addEventListener("DOMContentLoaded", function () {
  // 开场动画控制
  const introScreen = document.getElementById("introScreen");
  const startButton = document.getElementById("startButton");
  const bgMusic = document.getElementById("bgMusic");

  // 获取所有部分元素
  const sections = {
    photo: document.getElementById("photoSection"),
    video: document.getElementById("videoSection"),
    message: document.getElementById("messageBoard"),
    final: document.getElementById("finalMessage")
  };

  // 添加部分切换函数
  function showSection(sectionElement) {
    // 隐藏所有部分
    Object.values(sections).forEach(section => {
      section.classList.remove("active");
    });
    
    // 显示目标部分
    sectionElement.classList.add("active");
    
    // 特殊处理视频部分
    if (sectionElement === sections.video) {
      // 添加渐入动画
      sectionElement.style.opacity = 0;
      sectionElement.style.transition = "opacity 1.5s ease-in-out";
      
      setTimeout(() => {
        sectionElement.style.opacity = 1;
        
        // 尝试播放视频
        const video = document.getElementById("memoryVideo");
        const playPromise = video.play();
        
        // 处理自动播放被阻止的情况
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("视频自动播放被阻止:", error);
          });
        }
      }, 100);
    }
  }

  startButton.addEventListener("click", () => {
    introScreen.style.display = "none";
    showSection(sections.photo); // 显示照片部分
    
    // 尝试播放音乐
    bgMusic.play().catch(e => {
      console.log("音乐自动播放被阻止:", e);
    });
  });

  // 照片幻灯片控制（36张照片完整列表）
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

  let currentPhotoIndex = 0;
  const slideshowImage = document.getElementById("slideshowImage");
  const captionText = document.getElementById("captionText");
  let autoPlayInterval; // 用于存储自动播放计时器

// 照片幻灯片控制 - 更新updateSlideshow函数
function updateSlideshow() {
  const photo = photos[currentPhotoIndex];
  
  // 使用更流畅的动画效果
  slideshowImage.style.opacity = 0;
  slideshowImage.style.transform = "scale(0.95)";
  slideshowImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  
  setTimeout(() => {
    slideshowImage.src = photo.src;
    captionText.textContent = photo.caption;
    captionText.style.opacity = 0;
    captionText.style.transform = "translateY(20px)";
    captionText.style.transition = "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s";
    
    // 照片加载后动画
    slideshowImage.onload = function() {
      slideshowImage.style.opacity = 1;
      slideshowImage.style.transform = "scale(1)";
      
      // 文字动画
      setTimeout(() => {
        captionText.style.opacity = 1;
        captionText.style.transform = "translateY(0)";
      }, 300);
    };
  }, 300);
}

function showNextPhoto() {
  // 添加渐出效果
  photoContainer.classList.add("fade-in-out");
  
  setTimeout(() => {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    updateSlideshow(); // 更新图片后，新图片默认透明度为0
    
    // 移除渐出效果，添加渐入效果
    photoContainer.classList.remove("fade-in-out");
    photoContainer.classList.add("active-photo");
    
    resetAutoPlay();
    
    // 视频切换逻辑保持不变
    if (currentPhotoIndex === photos.length - 1) { 
      clearInterval(autoPlayInterval);
      setTimeout(() => showSection(sections.video), 3000);
    }
  }, 500);
}

function showPrevPhoto() {
 photoContainer.classList.add("fade-in-out");
  
  setTimeout(() => {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    updateSlideshow();
    photoContainer.classList.remove("fade-in-out");
    photoContainer.classList.add("active-photo");
    resetAutoPlay();
  }, 500);
}


  // 设置自动播放
  function startAutoPlay() {
    // 清除现有计时器（如果存在）
    clearInterval(autoPlayInterval);
    
    // 每1.5秒切换到下一张照片
    autoPlayInterval = setInterval(() => {
      showNextPhoto();
    }, 1500); // 1500毫秒 = 1.5秒
  }

  // 重置自动播放计时器
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // 绑定按钮事件
  document.getElementById("prevPhoto").addEventListener("click", showPrevPhoto);
  document.getElementById("nextPhoto").addEventListener("click", showNextPhoto);

  // 初始加载第一张照片
  updateSlideshow();
  
  // 当照片部分激活时开始自动播放
  sections.photo.addEventListener("transitionend", function() {
    if (sections.photo.classList.contains("active")) {
      startAutoPlay();
    }
  });

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

      // 清空输入框
      nameInput.value = "";
      messageInput.value = "";
    }
  });

  // 视频弹幕功能
  const video = document.getElementById("memoryVideo");
  const danmakuContainer = document.getElementById("danmakuContainer");

  // 弹幕内容
  const danmakus = [
    "太美了！", "满满的回忆！", "还想去！", "友谊万岁✨",
    "时光不老，我们不散", "青春永驻", "最美好的时光",
    "永远珍藏这一刻", "笑的真开心", "下次再聚"
  ];

  // 弹幕颜色
  const colors = ["#ff6b9d", "#ff9dcf", "#80ccff", "#ffd166", "#06d6a0"];

  // 创建弹幕函数
  function createDanmaku(text) {
    const span = document.createElement("span");
    span.className = "danmaku";
    span.textContent = text;
    span.style.top = `${Math.random() * 80}%`;
    span.style.color = colors[Math.floor(Math.random() * colors.length)];
    span.style.fontSize = `${Math.random() * 10 + 18}px`;
    
    danmakuContainer.appendChild(span);

    // 弹幕动画
    span.animate([
      { transform: "translateX(100vw)" },
      { transform: "translateX(-100%)" }
    ], {
      duration: Math.random() * 5000 + 5000, // 5-10秒随机
      easing: "linear"
    });

    // 动画结束后移除元素
    setTimeout(() => {
      if (danmakuContainer.contains(span)) {
        danmakuContainer.removeChild(span);
      }
    }, 10000);
  }

  // 视频播放时触发弹幕
  video.addEventListener("play", () => {
    // 初始弹幕
    danmakus.forEach((text, i) => {
      setTimeout(() => createDanmaku(text), i * 1500);
    });
    
    // 持续添加弹幕
    const interval = setInterval(() => {
      if (!video.paused) {
        const randomText = danmakus[Math.floor(Math.random() * danmakus.length)];
        createDanmaku(randomText);
      } else {
        clearInterval(interval);
      }
    }, 2500);
  });

   video.addEventListener("ended", () => {
    showSection(sections.final);
    
    // 显示诗歌内容
    showPoemLines();
    
    // 30秒后切换到留言板
    setTimeout(() => {
      showSection(sections.message);
    }, 30000); // 延长到30秒后切换
  });

  // 显示诗歌行函数
  function showPoemLines() {
    const poemLines = document.querySelectorAll(".poem-line");
    let delay = 500; // 初始延迟
    
    poemLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add("visible");
        
        // 为某些行添加额外效果
        if (index % 4 === 0) {
          line.style.color = "#ff9dcf";
          line.style.textShadow = "0 0 10px rgba(255, 157, 207, 0.8)";
        }
      }, delay);
      
      // 每行增加延迟
      delay += 1200;
    });
  }
  
  // 定义photoContainer变量（之前缺少这个定义）
  const photoContainer = document.querySelector(".photo-container");
  
  // 添加粒子效果（开场动画美化）
  function createParticles() {
    const introScreen = document.getElementById("introScreen");
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      
      // 随机大小和位置
      const size = Math.random() * 15 + 5;
      const posX = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = 10 + Math.random() * 20;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${duration}s`;
      
      // 随机颜色
      const colors = ["#ff9dcf", "#b3e0ff", "#ffd166", "#ffffff"];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      introScreen.appendChild(particle);
    }
  }
  
  // 创建粒子效果
  createParticles();
  
  
}); 
