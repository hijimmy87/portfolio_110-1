/**
 * Copyright (c) 2021 HiJimmy.
 */

const body = $('body'), app = $('#app');
const randint = (a, b) => a + Math.floor(Math.random() * (b - a));
var Runner = {
    init() {
        // Random direction
        // Range: 15 ~ 75, 105 ~ 165, 195 ~ 255, 285 ~ 345
        let dire = (randint(0, 4) * 90 + randint(15, 75)) * Math.PI / 180;
        let x,y;
        x = Math.round(Math.cos(dire) * 750) / 1000;
        y = Math.round(Math.sin(dire) * 750) / 1000;
        this.vector = [x, y];
        // Random location
        x = randint(0, body.width() - app.width());
        y = randint(0, body.height() - app.height());
        // Start
        this.now = [x, y];
        this.changeColor();
        this.run();
    },
    changeColor() {
        // Random color (except black)
        let hsl = `hsl(${randint(0, 360)},${randint(0, 100)}%,${randint(20, 100)}%)`;
        app.css('color', hsl);
    },
    stop() {
        clearTimeout(this.runTimeout);
    },
    run() {
        for (let i in [0, 1]) {
            let attr = ['width', 'height'][i],
                border = body[attr]() - app[attr]();
            this.now[i] += this.vector[i];
            // Out of window
            if (this.now[i] > border) {this.now[i] = border;}
            if (this.now[i] < 0 || this.now[i] == border) {
                this.vector[i] = -this.vector[i];
                this.now[i] += 2 * this.vector[i];
                this.changeColor();
            }
        }
        // Setup location
        app.css('left', this.now[0] + 'px').css('bottom', this.now[1] + 'px');
        this.runTimeout = setTimeout(()=>{this.run()}, 5);
    }
};

body.ready(() => {
    Runner.init();
    setupContent.byCookie();
});