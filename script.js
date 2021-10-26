const map = document.getElementById('map');
const hint = document.getElementById('hint');
const mapwrapper = document.getElementById ('mapwrapper'); 

class Treasure {
    constructor (width, height) {
        this.x = Math.round((Math.random() * (width - 150)) + 75);
        this.y = Math.round((Math.random() * (height - 150)) + 75);
    }

    getLengthTo({offsetX, offsetY}) {
        return Math.sqrt(Math.pow((this.x - offsetX), 2) + Math.pow((this.y - offsetY), 2));
    }

   static status  = ["Treasure found!", "Hot!", 'Warm', "Cold!", 'Winter is coming']

    static getTreasureSeekStatus (length) {
        if (length < 50) {
            return 0;

        } else if (length < 100) {
            return 1;
        } else if (length < 140) {
            return 2;
        } else if (length < 180) {
            return 3;
        } else  {
            return 4;
        }
    }
}

const treasure = new Treasure(map.width, map.height);

console.log(treasure);

const mapClickCounter = createMapClickCounter();

// делаем ссылку на функцию чтобы удалить ее mapClickhandler


map.addEventListener('click', mapClickhandler);
map.addEventListener('click', mapClickCounter);


function mapClickhandler (e) {
    const statusValue = Treasure.getTreasureSeekStatus(treasure.getLengthTo(e));
    hint.textContent = Treasure.status[statusValue];

    if (statusValue === 0) {
        mapwrapper.append(createChest(e));
        map.removeEventListener('click', mapClickhandler);
    }

}


function createChest ({offsetX, offsetY}) {

    const wrapper = document.createElement('div');

    wrapper.id = 'treasure';
    wrapper.style.left = `${offsetX}px`;
    wrapper.style.top = `${offsetY}px`;

    const img = document.createElement('img');
    img.src = 'img/treasure.png';

    const msgWrapper = document.createElement('div');
    const text = document.createElement('span');
    text.textContent = `You made ${mapClickCounter()} clicks`;
    const restart = document.createElement ('button');
    restart.textContent = 'restart';

    msgWrapper.append(text, restart);

    wrapper.append(img, msgWrapper);

    setTimeout(() => {
        wrapper.append(msgWrapper);

    }, 2000)

    return wrapper;
}



function createMapClickCounter () {
    let counter = 1;
    return function () {
        return counter++;
    }
}
 

// TIMER START




const createTimer = () => {
    let time = 60;
    return () => time ? --time : time; // time && --time;


}

const time = createTimer();

/*function startTimer () {
    const timerId = setInterval(() => {
    timer.textContent = time() || gameOver(timerId);
    
},1000)

//clearInterval(timerId)

map.removeEventListener('click', startTimer);

}*/





class Timer {
    constructor (anchor) {
        this.anchor = anchor;

    }

    #timer = (() => {
        let time = 60;
        return() => time && --time;
    })();

    #timerId = null;

    start () {
        if (this.#timerId === null) {

        
        this.#timerId = setInterval(() => {
            this.anchor.textContent = this.#timer();

        }, 1000)
        }
    }

    stop () {}
}

const timer = new Timer(document.getElementById('timer'));
timer.start();

// TIMER END

