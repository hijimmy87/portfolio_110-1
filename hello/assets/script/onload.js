function now() {
    var now = new Date();

    let h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),

        Y = now.getFullYear(),
        M = now.getMonth() + 1,
        D = now.getDate();
    return `${Y}/${M>9 ? M : '0'+M}/${D>9 ? D : '0'+D} ${h>9 ? h : '0'+h}:${m>9 ? m : '0'+m}:${s>9 ? s : '0'+s}`;
}

function randomLocate() {
    location.href = 'random.html';
}

var time = 0;
function showTime() {
    time++;
    document.getElementById('time').innerHTML = now();
    setTimeout('showTime()', 1000);
}

function indexOnload() {
    function loadArticles(index) {
        var xhr = new XMLHttpRequest();
        index = Math.floor(Math.random() * index)
        var path = 'assets/articles/' + index + '.html'
        if (index == 5) {
            document.body.removeEventListener('click', randomLocate);
        }
        xhr.open('get', path);
        xhr.send();
        xhr.onload = function() {
            var article = xhr.responseText;
            document.getElementById('ariticle').innerHTML = article;
        }
    }
    document.body.addEventListener('click', randomLocate);
    showTime();
    loadArticles(10);
    setInterval(function() {
        if (time == 3) {
            randomLocate()
        }
    })
}

function aboutOnload() {
    showTime();
    // loadUrls();
    document.body.addEventListener('click', randomLocate);
    setInterval(function() {
        document.getElementById('time-past').innerText = time;
    })
}