// Read or Write Cookie with JSON
$.JSONcookie = (key, value, options) => {
    // Write
    if (value !== undefined)
        return $.cookie(key, JSON.stringify(value), options)
    // Read
    let cookie = $.cookie(key);
    try {
        return JSON.parse(cookie);
    } catch (error) {
        return cookie;
    }
}

// Content Setting
// HTML, Text(defualt), Image, YouTube Embed
var setupContent = {
    config(elem, content) {
        if ((cls = content.class) !== undefined)
            elem.addClass(cls);
        if ((attr = content.attr) !== undefined)
            elem.attr(attr);
        if ((css = content.css) !== undefined)
            elem.css(css);
    },
    text(content) {
        if (content===undefined || !Object.keys(content).length)
            content = {type:'text', text:'owo', css:{'fontSize':'10vh'}};
        let elem = $('<div/>').text(content.text);
        this.config(elem, content);
        app.html(elem[0].outerHTML);
        $.JSONcookie('content', content);
    },
    html(content) {
        content.type = 'html';
        app.html(content.html);
        $.JSONcookie('content', content);
    },
    img(content) {
        content.type = 'img';
        content.src ||= 'img/rick.gif';
        let img = $('<img>').attr('src', content.src);
        content.attr ||= {'width': 360};
        this.config(img, content);
        app.html(img);
        $.JSONcookie('content', content);
    },
    youtube(content) {
        content.type = 'youtube';
        content.src ||= 'tOuvNGrjoL0';
        content.args ||= {autoplay:1, mute:0, loop:1};
        content.attr ||= {type:'text/html',frameborder:0, allow:'autoplay; encrypted-media', width:640, height:360};
        let elem = $('<iframe/>');
        let src = `https://www.youtube.com/embed/${content.src.match(/[0-9a-zA-Z_\-]{11}/)}`
        if (Object.keys(content.args)) {
            src += '?';
            for (arg in content.args) {
                src += `${arg}=${content.args[arg]}&`;
            }
            src = src.slice(0,-1);
        }
        elem.attr('src', src);
        this.config(elem, content);
        app.html(elem);
        $.JSONcookie('content', content);
    },
    byCookie() {
        if (!(content=$.JSONcookie('content'))) {
            this.text();
        } else {
            this[content.type](content);
        }
    }
}