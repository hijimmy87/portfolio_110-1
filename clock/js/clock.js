// 類比時鐘
function drowClock(h, m, s) {
    let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');
    let O = [canvas.width / 2, canvas.height / 2],
    // O[0] 或 O[1] 最小值為半徑
        r = O[0] > O[1] ? O[1] : O [0];
    let roundAngle = 2 * Math.PI,
        sixDeg = Math.PI / 30;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    // 外框
    ctx.beginPath();
    ctx.arc(r, r, 0.98 * r, 0, roundAngle);
    ctx.closePath();
    ctx.lineWidth = r / 50;
    ctx.stroke();
    // 刻度
    ctx.translate(O[0], O[1]);
    ctx.font = `${r / 5}px Arial`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    let dot = r / 100;
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        if (i % 5 == 0) {
            let n = i / 5,
                rad = i * sixDeg;
            ctx.translate(0, 0.75 * r);
            ctx.rotate(-rad);
            ctx.fillText(n > 6 ? n - 6 : n + 6, 0, 0);
            ctx.rotate(rad);
            ctx.translate(0, -0.75 * r);
            ctx.arc(0.9 * r, 0, 2 * dot, 0, roundAngle);
        }
        ctx.arc(0.9 * r, 0, dot, 0, roundAngle);
        ctx.closePath();
        ctx.fill();
        ctx.rotate(sixDeg);
    }
    ctx.restore();
    // 指針
    let sA = s * sixDeg,
        mA = m * sixDeg + sA / 60,
        hA = h * sixDeg * 5 + mA / 12;
    let angle = {
            second: sA,
            minute: mA,
            hour: hA
        },
        len = {
            second: r * 0.8,
            minute: r * 0.75,
            hour: r * 0.5
        },
        width = {
            second: r / 40,
            minute: r / 25,
            hour: r / 20
        };
    ['hour', 'minute', 'second'].forEach(hand => {
        ctx.save();
        ctx.translate(O[0], O[1]);
        ctx.rotate(angle[hand]);
        // 紅色秒針
        if (hand == 'second') {
            ctx.strokeStyle = 'red';
        }
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -len[hand]);
        ctx.closePath();
        ctx.lineWidth = width[hand];
        ctx.stroke();
        ctx.restore();
    });
    // 中央圓圈
    ctx.save();
    ctx.beginPath();
    ctx.arc(r, r, 0.04 * r, 0, roundAngle);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}