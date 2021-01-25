var density = 0.5;// Служит для задания первоначальной плотности живых клеток
var resolution = 10;// Сколько пикселей будет занимать одна клетка
var width = 1400;// Ширина поля пикселей 
var height = 700;// Высота поля пикселей 
var simSpeed = 150;// Скорость симуляции 
var plot;// Переменная для хранения текущего состояния клеток 
var inTimePlot;// Переменная для хранения промежуточного состояния клеток 



function init() {
    canvas = document.getElementById('plot'); //получаем элемент с id="plot" на нашей странице 
    ctx = canvas.getContext('2d');// "говорим" что будем работать с 2D графикой
    if (ctx) {
        plot = new Array(width / resolution);
        inTimePlot = new Array(width / resolution);
        ctx.fillStyle = 'rgb(0, 0, 0)'; // Устанавливаем черный цвет для рисования фигур
        ctx.fillRect(0, 0, width, height); // Рисуем квадрат
        for (let i = 0; i < width / resolution; i++) {
            plot[i] = new Array(height / resolution);
            inTimePlot[i] = new Array(height / resolution);
            for (let j = 0; j < height / resolution; j++) {
                inTimePlot[i][j] = 0;
                plot[i][j] = 0;
            }
        }

        for (let i = 1; i < width / resolution - 1; i++) {
            for (let j = 1; j < height / resolution - 1; j++) {
                if (Math.random() > density) {
                    plot[i][j] = 1;
                } else
                    plot[i][j] = 0;
            }
        }

    }
    else {
        alert('Something is wrong');
    }

}

function startSimulation() {
    for (let x = 1; x < width / resolution - 1; x++) {
        for (let y = 1; y < height / resolution - 1; y++) {
            var neighbors = 0;
            for (let xx = -1; xx < 2; xx++) {
                for (let yy = -1; yy < 2; yy++) {
                    neighbors += plot[x + xx][y + yy];
                }
            }
            neighbors -= plot[x][y];
            if (plot[x][y]) {
                if ((neighbors == 2) || (neighbors == 3)) {
                    inTimePlot[x][y] = 1;
                } else {
                    inTimePlot[x][y] = 0;
                }
            } else {
                if (neighbors == 3) {
                    inTimePlot[x][y] = 1;
                }
            }
        }
    }

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'rgb(200, 0, 0)';
    for (let x = 0; x < width / resolution; x++) {
        for (let y = 0; y < height / resolution; y++) {
            plot[x][y] = inTimePlot[x][y];
            if (plot[x][y]) {
                ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
            }
        }
    }
}


function main() {
    init();
    setInterval(startSimulation, simSpeed);
}