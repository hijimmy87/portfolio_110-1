(function () {
    let timeElem = document.querySelector('#time'),
        dateElem = document.querySelector('#date');
    while (new Date().getMilliseconds() > 100) { continue; }
    setInterval(() => {
        let now = new Date();
        // 時間校正
        if (now.getMinutes() == 0 && now.getSeconds() == 0) {
            while (now.getMilliseconds() > 100) { now = new Date() }
        }
        let h = now.getHours(),
            m = now.getMinutes(),
            s = now.getSeconds(),

            Y = now.getFullYear(),
            M = now.getMonth() + 1,
            D = now.getDate();
        // 電子時鐘
        timeElem.innerText = `${h>9 ? h : '0'+h}:${m>9 ? m : '0'+m}:${s>9 ? s : '0'+s}`;
        dateElem.innerText = `${Y} 年 ${M>9 ? M : '0'+M} 月 ${D>9 ? D : '0'+D} 日 星期${'日一二三四五六'[now.getDay()]}`;
        // 類比時鐘
        drowClock(h, m, s);
    }, 1000);
})()