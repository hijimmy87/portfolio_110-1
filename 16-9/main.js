var caption  = document.querySelector('#caption'),
    formulas = document.querySelector('#formulas'),
    parseHTML = html => {
        let node = document.createElement('div');
        node.innerHTML = html;
        return node.firstChild;
    };

function writeFormula() {
    let delay = 0,
        formula = parseHTML('<div class="formula"><div class="minuend">16</div></div>');
    formulas.append(formula);
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });

    caption.innerText = '16 減 9';
    [
        {class:'subtrahend', text:9},
        {class:'operator', text:'-'},
        {class:'bar'}
    ].forEach(elem => {
        delay += 400;
        setTimeout(() => {
            formula.append(parseHTML(`<div class="${elem.class}">${elem.text || '' }</div>`));
        }, delay);
    })

    delay += 800;
    setTimeout(() => {
        caption.innerText = '6 減 9 不夠';
    }, delay);

    delay += 1000;
    setTimeout(() => {
        caption.innerText = '借 1';
        formula.append(parseHTML('<div class="dot"></div>'));
    }, delay);
    delay += 750;
    setTimeout(() => {
        caption.innerText += '，等於';
        setTimeout(writeFormula, 750);
    }, delay);
}

setTimeout(writeFormula, 1000);