// ~/assets/js/main.js：主功能入口脚本

document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");
    const sections = {
        intro: document.getElementById("introScreen"),
        photo: document.getElementById("photoSection"),
        video: document.getElementById("videoSection"),
        final: document.getElementById("finalMessage")
    };

    sections.intro.style.display = "flex";
    sections.photo.style.display = "none";
    sections.video.style.display = "none";
    sections.final.style.display = "none";

    initIntro();
    initSlideshow();
    initVideoDanmaku();

    // ========== 开场动画 ==========
    function initIntro() {
        const startButton = document.getElementById("startButton");
        const titleLines = document.querySelectorAll('.title-line');
        
        // 触发标题动画
        titleLines.forEach(line => {
            line.style.opacity = 1;
            line.style.transform = 'translateY(0)';
        });
        
        // 触发按钮动画
        startButton.style.opacity = 1;
        startButton.style.transform = 'translateY(0)';
        
        // 添加点击事件
        startButton.addEventListener("click", () => {
            sections.intro.style.display = "none";
            requestAnimationFrame(() => {
                showSection(sections.photo);
            });
            bgMusic.play().catch(err => console.log("音乐播放失败:", err));
        });
    }

    function showSection(target) {
        Object.values(sections).forEach(sec => sec.classList.remove("active"));
        target.classList.add("active");
        if (target === sections.photo) {
            setTimeout(() => {
                startAutoPlay();
            }, 300);
        }

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
            {src: "assets/images/photo1.jpg", caption: "千年胭脂色 犹带盛唐春"},
            {src: "assets/images/photo3.jpg", caption: "鞍鞯金斑，曾驮驼铃过阳关"},
            {src: "assets/images/photo5.jpg", caption: "千载风霜蚀不去袖中云纹"},
            {src: "assets/images/photo7.jpg", caption: "则天之目 龙门之魄"},
            {src: "assets/images/photo9.jpg", caption: "卢舍那千尺目光下"},
            {src: "assets/images/photo11.jpg", caption: "朝圣者化身为流动的星点"},
            {src: "assets/images/photo13.jpg", caption: "龙门石窟客服专线接通中..."},
            {src: "assets/images/photo15.jpg", caption: "可爱捏~"},
            {src: "assets/images/photo17.jpg", caption: "风起洛阳城，尘落白马寺"},
            {src: "assets/images/photo19.jpg", caption: "待寺扶正缘"},
            {src: "assets/images/photo21.jpg", caption: "泰式佛殿苑"},
            {src: "assets/images/photo23.jpg", caption: "印度佛殿苑"},
            {src: "assets/images/photo25.jpg", caption: "万岁通天应天门"},
            {src: "assets/images/photo27.jpg", caption: "扶摇直上九万里"},
            {src: "assets/images/photo29.jpg", caption: "白云千载空悠悠"},
            {src: "assets/images/photo31.jpg", caption: "松拂云开万古心"},
            {src: "assets/images/photo33.jpg", caption: "奇峰云海悬金殿"},
            {src: "assets/images/photo35.jpg", caption: ""},
            {src: "assets/images/photo37.jpg", caption: "天门之道仙气韵"},
            {src: "assets/images/photo38.jpg", caption: ""},
            {src: "assets/images/photo39.jpg", caption: "哈基旺 今年旺！"},
            {src: "assets/images/photo41.jpg", caption: ""},
            {src: "assets/images/photo43.jpg", caption: ""},
            {src: "assets/images/photo45.jpg", caption: ""},
            {src: "assets/images/photo47.jpg", caption: ""},
            {src: "assets/images/photo49.jpg", caption: "石为地魄，云为天工"},
            {src: "assets/images/photo53.jpg", caption: "不知天上宫阙"},
            {src: "assets/images/photo55.jpg", caption: "今夕是何年"},
            {src: "assets/images/photo57.jpg", caption: "天下四风谷之一"},
            {src: "assets/images/photo58.jpg", caption: ""},
            {src: "assets/images/photo59.jpg", caption: ""},
            {src: "assets/images/photo60.jpg", caption: "仙侠奇境，灯星浮世"},
            {src: "assets/images/photo61.jpg", caption: "神舟破浪起风帆"},
            {src: "assets/images/photo63.jpg", caption: "霓虹光影水波漾"},
            {src: "assets/images/photo65.jpg", caption: ""},
            {src: "assets/images/photo67.jpg", caption: ""},
            {src: "assets/images/photo69.jpg", caption: "飞檐朱灯缀天色"},
            {src: "assets/images/photo71.jpg", caption: "双塔接星轨 暖金蚀夜幕"}
        ];

        let current = 0;
        let interval;
        const slideshowImage = document.getElementById("slideshowImage");
        const captionText = document.getElementById("captionText");
        const container = document.querySelector(".photo-container");

        function updateSlideshow() {
            const photo = photos[current];

            captionText.classList.remove("visible-caption");
            slideshowImage.classList.remove("visible-photo");
            void captionText.offsetWidth;
            void slideshowImage.offsetWidth;

            slideshowImage.src = photo.src;
            captionText.textContent = photo.caption;
            setTimeout(() => {
                slideshowImage.onload = () => {
                    slideshowImage.classList.add("visible-photo");

                    slideshowImage.addEventListener("transitionend", () => {
                        captionText.classList.add("visible-caption");
                    }, {once: true});
                };
            }, 300);
        }

        function nextPhoto() {
            // 先让图片淡出
            container.classList.add("fade-out");
            // 文字先隐藏，去掉 visible-caption
            captionText.classList.remove("visible-caption");

            setTimeout(() => {
                current = (current + 1) % photos.length;
                updateSlideshow();

                // 图片淡入
                container.classList.remove("fade-out");

                // 图片淡入动画持续0.8秒，0.8秒后触发文字淡入
                setTimeout(() => {
                    captionText.classList.add("visible-caption");
                }, 800);

                if (current === photos.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => {
                        document.getElementById("memoryVideo").load();
                        showSection(sections.video);
                    }, 3000);
                }
            }, 800); // 等待图片淡出动画完成
        }

        function prevPhoto() {
            container.classList.add("fade-out");
            captionText.classList.remove("visible-caption");

            setTimeout(() => {
                current = (current - 1 + photos.length) % photos.length;
                updateSlideshow();

                container.classList.remove("fade-out");

                setTimeout(() => {
                    captionText.classList.add("visible-caption");
                }, 800);

                resetAutoPlay();
            }, 800);
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

        if (sections.photo.classList.contains("active")) {
            startAutoPlay();
        }
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
            span.animate([{transform: "translateX(100vw)"}, {transform: "translateX(-100%)"}], {
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



    // ========== 诗歌展示 ==========
    async function showPoemLines() {
        const lines = document.querySelectorAll(".poem-line");
        const poemStage = document.getElementById("poemStage");
        const poemContainer = document.querySelector(".poem-container");

        // 隐藏原始容器，防止样式干扰
        poemContainer.style.display = "none";

        const segments = [
            [0, 3], [3, 7], [7, 11], [11, 15], [15, 19], [19, 22], [22, 25]
        ];

        for (const [start, end] of segments) {
            // 创建新的段落容器
            const segmentDiv = document.createElement("div");
            segmentDiv.className = "poem-segment";
            if (end === 25) segmentDiv.classList.add("final-segment");

            // 添加对应诗句
            for (let i = start; i < end; i++) {
                if (lines[i]) {
                    const lineClone = lines[i].cloneNode(true);
                    segmentDiv.appendChild(lineClone);
                }
            }

            // 添加到舞台中并激活动画
            poemStage.appendChild(segmentDiv);
            await delay(100); // 确保 DOM 渲染完成
            segmentDiv.classList.add("active");

            // 一句一句进入动画
            const lineEls = segmentDiv.querySelectorAll(".poem-line");
            await showLinesWithDelay(lineEls, 800);

            // 非最后一段需要淡出并删除
            if (!segmentDiv.classList.contains("final-segment")) {
                await delay(2000); // 等待观赏
                segmentDiv.classList.remove("active");
                segmentDiv.classList.add("fade-out");
                await delay(1000);
                poemStage.removeChild(segmentDiv);
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
