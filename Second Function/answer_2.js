/*
Практика №2
Задание:
1. Написать Вашу вторую функцию mySecondFunction(), которая будет получать имя, а возвращать приветствие с ним.
*/

/////////////////
function mySecondFunction(name) {// Задаем имя и входные параметры для функции.
    let message = 'Привет, ' + name + '!';// Тело функции. "Склеиваем" приветсвие, наше имя и восклицательный знак.
    return message;// Возвращаем наше сообщение. 
}
/////////////////

/*
2. Создать переменную myMessage, в которой будем хранить полученное приветствие. 
3. Записать послание.
4. Вызвать встроенную функицю alert() и вывести сообщение.
*/

/////////////////
//var myMessage = mySecondFunction();// Создаем переменную myMessage и записываем в нее значение, полученнное вызовом функции.
var myMessage = mySecondFunction('Женя');// Создаем переменную myMessage и записываем в нее значение, полученнное вызовом функции с параметром "имя".
alert(myMessage);// Выводим наше сообщение.
/////////////////

/*
5. Сохранить скрипт, загрузить страницу.
6. Не работает?! Что о чем говорит данное сообщение? 
-- Если все сделано правильно, то Вы получите "Привет, undefined!". Все потому, что не было передано Ваше имя при вызове функции.
7. Передайте в функцию mySecondFunction() Ваше имя и повторите пункты 4-5.
*/
