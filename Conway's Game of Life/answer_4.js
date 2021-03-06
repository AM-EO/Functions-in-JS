/*
Практика №4
Задание:
1. Написать Игру Жизнь.
2. Описать необходимые переменные и задать для них начальные значения (если необходимо).
*/

/////////////////
var canvas;// Хранит элемент <canvas>.
var ctx;// Хранит контекст, нужна для отрирсовки пикселей.
var density = 0.5;// Служит для задания первоначальной плотности живых клеток.
var resolution = 10;// Сколько пикселей будет занимать одна клетка.
var width = 1400;// Ширина поля пикселей. 
var height = 700;// Высота поля пикселей. 
var simSpeed = 150;// Скорость симуляции. 
var plot;// Переменная для хранения текущего состояния клеток. 
var inTimePlot;// Переменная для хранения промежуточного состояния клеток.
var canvas;// Хранит элемент <canvas>.
var ctx;// Хранит контекст, нужна для отрирсовки пикселей.
/////////////////



/*
3. Реализовать 3 функции: init(), startSimulation(), main().
*/

function init() {
    // В данной функции реализуется то, что делается программой один раз.
    // Т.е. подготовительная часть для последующей симуляции "Жизни".
    canvas = document.getElementById('plot'); // Получаем элемент с id="plot" на нашей странице.
    ctx = canvas.getContext('2d');// "Говорим", что будем работать с 2D графикой.
    if (ctx) {// Проверка на правильность полученных значений, если все хорошо, то мы можем рисовать.
        /////////////////
        /*
        Создайте два двумерных массива размером 140х70 и зполните 0 для переменных plot и inTimePlot.
        Вы могли заметить, что размеры холста и массивов разные. Это сделано для того, чтобы наши клетки были не в 1px,
        а больше (10px), а то нам сложно будет их увидеть.
        */
        plot = new Array(width / resolution);
        inTimePlot = new Array(width / resolution);
        for (let i = 0; i < width / resolution; i++) {
            plot[i] = new Array(height / resolution);
            inTimePlot[i] = new Array(height / resolution);
            for (let j = 0; j < height / resolution; j++) {
                inTimePlot[i][j] = 0;
                plot[i][j] = 0;
            }
        }
        /////////////////

        /////////////////
        /*
        С помощью функции Math.random() заполните массив plot.
        если Math.random() > density, то клетка "живая", значение 1,
        если Math.random() <= density, то клетка пустая, значение 0.
       */
        for (let i = 1; i < width / resolution - 1; i++) {
            for (let j = 1; j < height / resolution - 1; j++) {
                if (Math.random() > density) {
                    plot[i][j] = 1;
                } else
                    plot[i][j] = 0;
            }
        }
        /////////////////
        return 0;// Если все работает, то функция вернет 0, и мы сможем это узнать.
    }
    else {
        alert('Something is wrong');// Сообщение об ошибке.
        return -1;// Если есть проблемы, то мы сможем узнать и прекратить выполнение других функций.
    }
}

function startSimulation() {
    // В данной функции реализуется циклическая часть программы и отрисовка. Мы проверяем соседей для каждой клетки.
    // В пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь.
    // Если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить;
    // в противном случае, если соседей меньше двух или больше трёх, клетка умирает («от одиночества» или «от перенаселённости»).

    /////////////////
    /*
    Упростим задачу, будем считать, что все клетки по периметру всегда мертвые и для них мы не будем искать соседей.  
    Пройдитесь по всем внутренним клекткам и найдите соседей. 
    Проверьте условия, если в клетке должна быть живой, запишите в соответствующую ячейку inTimePlot 1, если нет -- 0. 
    */
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
    /////////////////

    /*
    Подготовьте холст для новой отрисовки, заполните его черным цветом.
    */
    ctx.fillStyle = 'rgb(0, 0, 0)';// Устанавливаем черный цвет пера: R(ed) 0, G(een) 0, B(lue) 0.
    ctx.fillRect(0, 0, width, height);// Рисуем прямоугольник с левым верхним углом в x=0 и y=0, и размерами "ширина" и "высота".

    ctx.fillStyle = 'rgb(200, 0, 0)';// Устанавливаем красный цвет пера: R(ed) 200, G(een) 0, B(lue) 0.

    /////////////////
    /* 
    Поэлентно перезапишите переменную plot (брать значения из inTimePlot) и отрисуйте каждую клетку. 
    Для того, чтобы нарисовать живую клетку используйте функцию:
    ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
    где x и y -- номера ячейки plot.
    Мы сменили цвет инструкцией выше (ctx.fillStyle = 'rgb(200, 0, 0)';).
    */
    for (let x = 0; x < width / resolution; x++) {
        for (let y = 0; y < height / resolution; y++) {
            plot[x][y] = inTimePlot[x][y];
            if (plot[x][y]) {
                ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
            }
        }
    }
    /////////////////
}

function main() {
    // Из данной функции происходит вызов всех остальных функции.
    // Сама функция main() вызывается браузером после загрузки страницы 
    // благодаря <body onload="main()">.

    /*
    Вызовите функцию init(), если она вернет 1, то закончите программу с помощью return.
    Если все работает, то создайте цикл while(1) и вызывайте функцию startSimulation(). 
    Сохраните и запустите. 
    Что произошло?!
    -- Ситуация схожа с той, когда мы рекурсивно искали факториал для 100000. Но в данном случае можно сказать,
    -- что браузер (интерпритатор) пытается выделить память под беконечное число вызовов нашей функции. 
    Закоментируйте блок while(1), а вместо него вывовите функцию setInterval(startSimulation, simSpeed).
    Данная функция сама вызывает startSimulation() каждые simSpeed милисекунд.
    */

    if(!init()){
        /*while (1) {
            startSimulation();
        }*/
        setInterval(startSimulation, simSpeed);
    }
    else {
        return -1;
    }
}