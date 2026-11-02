/* ============================================================
   test-checker.js — единый модуль проверки тестов ЭУМК
   Подключается на страницах тестов. Автоматически находит
   форму, определяет тест по data-test-id и проверяет ответы.
   ============================================================ */

(function () {
    'use strict';

    /* ---------- БАЗА ПРАВИЛЬНЫХ ОТВЕТОВ ---------- */
    /* Ключ — id теста. Значения: correct — правильный value,
       points — баллы за вопрос. total считается автоматически. */
    const TESTS = {
        1: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Высокие', points: 20 },
                { name: 'q2', correct: '7', points: 20 },
                { name: 'q3', correct: 'Большие инструменты', points: 20 },
                { name: 'q4', correct: 'Последовательность звуков по высоте', points: 20 },
                { name: 'q5', correct: 'Октава', points: 20 }
            ]
        },
        2: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Скрипичный', points: 10 },
                { name: 'q2', correct: 'Соль', points: 10 },
                { name: 'q3', correct: 'До, Ре, Ми, Фа, Соль, Ля, Си', points: 10 },
                { name: 'q4', correct: 'На первой добавочной нижней линии', points: 10 },
                { name: 'q5', correct: 'Скрипичный ключ', points: 10 },
                { name: 'q6', correct: 'Вторая линия', points: 10 },
                { name: 'q7', correct: 'Семь', points: 10 },
                { name: 'q8', correct: 'Си', points: 10 },
                { name: 'q9', correct: 'Скрипичный ключ', points: 10 },
                { name: 'q10', correct: 'Ля', points: 10 }
            ]
        },
        3: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Целая', points: 10 },
                { name: 'q2', correct: 'Половинная', points: 10 },
                { name: 'q3', correct: 'Штиль', points: 10 },
                { name: 'q4', correct: 'Восьмая', points: 10 },
                { name: 'q5', correct: 'Темп', points: 10 },
                { name: 'q6', correct: 'Все перечисленные', points: 10 },
                { name: 'q7', correct: 'Восьмая', points: 10 },
                { name: 'q8', correct: 'Штиль', points: 10 },
                { name: 'q9', correct: 'Ритм', points: 10 },
                { name: 'q10', correct: 'Allegro', points: 10 } /* исправлено: Largo — медленный */
            ]
        },
        4: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Последовательность звуков', points: 10 },
                { name: 'q2', correct: 'Все перечисленные', points: 10 },
                { name: 'q3', correct: 'Тоника', points: 10 },
                { name: 'q4', correct: 'Мажорная и минорная', points: 10 },
                { name: 'q5', correct: 'Все перечисленные', points: 10 },
                { name: 'q6', correct: 'Семь', points: 10 },
                { name: 'q7', correct: 'Тональность', points: 10 },
                { name: 'q8', correct: 'Все перечисленные', points: 10 },
                { name: 'q9', correct: 'Мажорная гамма', points: 10 },
                { name: 'q10', correct: 'Тональность', points: 10 }
            ]
        },
        5: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Первая', points: 10 },
                { name: 'q2', correct: 'Слабая', points: 10 },
                { name: 'q3', correct: 'Марш', points: 10 },
                { name: 'q4', correct: 'Две', points: 10 },
                { name: 'q5', correct: 'Первая', points: 10 },
                { name: 'q6', correct: 'Слабые', points: 10 },
                { name: 'q7', correct: 'Доля', points: 10 },
                { name: 'q8', correct: 'Третья', points: 10 }
            ]
        },
        6: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Метр', points: 10 },
                { name: 'q2', correct: 'Такт', points: 10 },
                { name: 'q3', correct: 'Тактовая черта', points: 10 },
                { name: 'q4', correct: 'В начале произведения', points: 10 },
                { name: 'q5', correct: 'Все перечисленные', points: 10 },
                { name: 'q6', correct: 'Метр', points: 10 },
                { name: 'q7', correct: 'Такт', points: 10 },
                { name: 'q8', correct: 'Две', points: 10 },
                { name: 'q9', correct: 'Размер', points: 10 }
            ]
        },
        7: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Тоника', points: 10 },
                { name: 'q2', correct: 'I, III, V', points: 10 },
                { name: 'q3', correct: 'II, IV, VI, VII', points: 10 },
                { name: 'q4', correct: 'VII', points: 10 },
                { name: 'q5', correct: 'В тонику', points: 10 },
                { name: 'q6', correct: 'Покой', points: 10 },
                { name: 'q7', correct: 'Движение', points: 10 },
                { name: 'q8', correct: 'Си', points: 10 },
                { name: 'q9', correct: 'Тоника', points: 10 }
            ]
        },
        8: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Две', points: 10 },
                { name: 'q2', correct: 'Первая', points: 10 },
                { name: 'q3', correct: 'Ритмическая группа', points: 10 },
                { name: 'q4', correct: 'Марш', points: 10 },
                { name: 'q5', correct: 'Слабая', points: 10 },
                { name: 'q6', correct: 'Все перечисленные', points: 10 },
                { name: 'q7', correct: 'Сильная и слабая', points: 10 },
                { name: 'q8', correct: 'Ритмическая группа', points: 10 },
                { name: 'q9', correct: 'В начале такта', points: 10 }
            ]
        },
        9: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'До', points: 10 },
                { name: 'q2', correct: 'Си', points: 10 },
                { name: 'q3', correct: 'До, Ми, Соль', points: 10 },
                { name: 'q4', correct: 'Опевание', points: 10 },
                { name: 'q5', correct: 'Си', points: 10 },
                { name: 'q6', correct: 'Тоника', points: 10 },
                { name: 'q7', correct: 'Третья', points: 10 },
                { name: 'q8', correct: 'Все перечисленные', points: 10 },
                { name: 'q9', correct: 'Вводный звук', points: 10 }
            ]
        },
        10: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Целая', points: 10 },
                { name: 'q2', correct: 'Половинная', points: 10 },
                { name: 'q3', correct: 'Пауза', points: 10 },
                { name: 'q4', correct: 'До, Ми, Соль', points: 10 },
                { name: 'q5', correct: 'Ре, Фа, Ля, Си', points: 10 },
                { name: 'q6', correct: 'Покой', points: 10 },
                { name: 'q7', correct: 'Движение', points: 10 },
                { name: 'q8', correct: 'Для выразительности', points: 10 },
                { name: 'q9', correct: 'Пауза', points: 10 }
            ]
        },
        11: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Полутон', points: 10 },
                { name: 'q2', correct: 'Два полутона', points: 10 },
                { name: 'q3', correct: 'Все перечисленные', points: 10 },
                { name: 'q4', correct: 'Повышает на полутон', points: 10 },
                { name: 'q5', correct: 'Понижает на полутон', points: 10 },
                { name: 'q6', correct: 'Отменяет действие диеза или бемоля', points: 10 },
                { name: 'q7', correct: 'Ми–Фа', points: 10 },
                { name: 'q8', correct: 'Си–До', points: 10 },
                { name: 'q9', correct: 'До–Ре', points: 10 }
            ]
        },
        12: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Тон — тон — полутон — тон — тон — тон — полутон', points: 10 },
                { name: 'q2', correct: 'До, Ре, Ми, Фа, Соль, Ля, Си, До', points: 10 },
                { name: 'q3', correct: 'Ми–Фа', points: 10 },
                { name: 'q4', correct: 'Си–До', points: 10 },
                { name: 'q5', correct: 'Семь', points: 10 },
                { name: 'q6', correct: 'Светлое и радостное', points: 10 },
                { name: 'q7', correct: 'Тон и полутон', points: 10 },
                { name: 'q8', correct: 'До', points: 10 },
                { name: 'q9', correct: 'Тон', points: 10 }
            ]
        },
        13: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Соль', points: 10 },
                { name: 'q2', correct: 'Один диез', points: 10 },
                { name: 'q3', correct: 'Фа♯', points: 10 },
                { name: 'q4', correct: 'Соль, Ля, Си, До, Ре, Ми, Фа♯, Соль', points: 10 },
                { name: 'q5', correct: 'Фа♯', points: 10 },
                { name: 'q6', correct: 'В начале строки', points: 10 },
                { name: 'q7', correct: 'Светлое и радостное', points: 10 },
                { name: 'q8', correct: 'Соль', points: 10 },
                { name: 'q9', correct: 'Один диез', points: 10 }
            ]
        },
        14: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Три', points: 10 },
                { name: 'q2', correct: 'Первая', points: 10 },
                { name: 'q3', correct: 'Вальс', points: 10 },
                { name: 'q4', correct: 'Три четверти', points: 10 },
                { name: 'q5', correct: 'Плавное', points: 10 },
                { name: 'q6', correct: 'В начале строки', points: 10 },
                { name: 'q7', correct: 'Сильная и две слабые', points: 10 },
                { name: 'q8', correct: 'Такт', points: 10 },
                { name: 'q9', correct: 'Вальс', points: 10 }
            ]
        },
        15: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Ре', points: 10 },
                { name: 'q2', correct: 'Два диеза', points: 10 },
                { name: 'q3', correct: 'Фа♯ и До♯', points: 10 },
                { name: 'q4', correct: 'Ре, Ми, Фа♯, Соль, Ля, Си, До♯, Ре', points: 10 },
                { name: 'q5', correct: 'Седьмая', points: 10 },
                { name: 'q6', correct: 'В тонику', points: 10 },
                { name: 'q7', correct: 'Неустойчивые', points: 10 },
                { name: 'q8', correct: 'До♯', points: 10 },
                { name: 'q9', correct: 'Покой', points: 10 }
            ]
        },
        16: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Ре, Ми, Фа♯, Соль, Ля, Си, До♯, Ре', points: 10 },
                { name: 'q2', correct: 'Два диеза', points: 10 },
                { name: 'q3', correct: 'Фа♯ и До♯', points: 10 },
                { name: 'q4', correct: 'Ре', points: 10 },
                { name: 'q5', correct: 'Тон — тон — полутон — тон — тон — тон — полутон', points: 10 },
                { name: 'q6', correct: 'Светлое и радостное', points: 10 },
                { name: 'q7', correct: 'Фа♯', points: 10 },
                { name: 'q8', correct: 'До♯', points: 10 },
                { name: 'q9', correct: 'В начале строки', points: 10 }
            ]
        },
        17: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Фа', points: 10 },
                { name: 'q2', correct: 'Один бемоль', points: 10 },
                { name: 'q3', correct: 'Си♭', points: 10 },
                { name: 'q4', correct: 'Фа, Соль, Ля, Си♭, До, Ре, Ми, Фа', points: 10 },
                { name: 'q5', correct: 'Си♭', points: 10 },
                { name: 'q6', correct: 'В начале строки', points: 10 },
                { name: 'q7', correct: 'Светлое и мягкое', points: 10 },
                { name: 'q8', correct: 'Фа', points: 10 },
                { name: 'q9', correct: 'Один бемоль', points: 10 }
            ]
        },
        18: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Фа', points: 10 },
                { name: 'q2', correct: 'Один бемоль', points: 10 },
                { name: 'q3', correct: 'Си♭', points: 10 },
                { name: 'q4', correct: 'Фа, Соль, Ля, Си♭, До, Ре, Ми, Фа', points: 10 },
                { name: 'q5', correct: 'Затакт', points: 10 },
                { name: 'q6', correct: 'В начале произведения', points: 10 },
                { name: 'q7', correct: 'Меньше', points: 10 },
                { name: 'q8', correct: 'Последний такт', points: 10 },
                { name: 'q9', correct: 'Для начала мелодии с нужной доли', points: 10 }
            ]
        },
        19: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Целая', points: 10 },
                { name: 'q2', correct: 'Половинная', points: 10 },
                { name: 'q3', correct: 'Пауза', points: 10 },
                { name: 'q4', correct: 'Тон — тон — полутон — тон — тон — тон — полутон', points: 10 },
                { name: 'q5', correct: 'До, Ре, Ми, Фа, Соль, Ля, Си, До', points: 10 },
                { name: 'q6', correct: 'Ми–Фа', points: 10 },
                { name: 'q7', correct: 'Си–До', points: 10 },
                { name: 'q8', correct: 'Семь', points: 10 },
                { name: 'q9', correct: 'Для выразительности', points: 10 }
            ]
        },
        20: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Тон — полутон — тон — тон — полутон — тон — тон', points: 10 },
                { name: 'q2', correct: 'Ля, Си, До, Ре, Ми, Фа, Соль, Ля', points: 10 },
                { name: 'q3', correct: 'Нет знаков', points: 10 },
                { name: 'q4', correct: 'Минорная гамма', points: 10 },
                { name: 'q5', correct: 'Грустное и мягкое', points: 10 },
                { name: 'q6', correct: 'Ля', points: 10 },
                { name: 'q7', correct: 'Семь', points: 10 },
                { name: 'q8', correct: 'Ми–Фа', points: 10 },
                { name: 'q9', correct: 'Си–До', points: 10 }
            ]
        },
        21: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Басовый ключ', points: 10 },
                { name: 'q2', correct: 'Фа', points: 10 },
                { name: 'q3', correct: 'Четвертая линия', points: 10 },
                { name: 'q4', correct: 'Виолончель', points: 10 },
                { name: 'q5', correct: 'Левая рука', points: 10 },
                { name: 'q6', correct: 'Фа малой октавы', points: 10 },
                { name: 'q7', correct: 'Басовый ключ', points: 10 },
                { name: 'q8', correct: 'Для записи низких звуков', points: 10 },
                { name: 'q9', correct: 'Четвертая линия', points: 10 }
            ]
        },
        22: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Малая и большая', points: 10 },
                { name: 'q2', correct: 'До, Ре, Ми, Фа, Соль, Ля, Си', points: 10 },
                { name: 'q3', correct: 'До, Ре, Ми, Фа, Соль, Ля, Си', points: 10 },
                { name: 'q4', correct: 'Басовый ключ', points: 10 },
                { name: 'q5', correct: 'Густо и глубоко', points: 10 },
                { name: 'q6', correct: 'Левая рука', points: 10 },
                { name: 'q7', correct: 'Басовые инструменты', points: 10 },
                { name: 'q8', correct: 'Для записи низких звуков', points: 10 },
                { name: 'q9', correct: 'Басовый ключ', points: 10 }
            ]
        },
        23: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Фа, Соль, Ля, Си♭, До, Ре, Ми, Фа', points: 10 },
                { name: 'q2', correct: 'Ре, Ми, Фа, Соль, Ля, Си♭, До, Ре', points: 10 },
                { name: 'q3', correct: 'Один бемоль', points: 10 },
                { name: 'q4', correct: 'Один бемоль', points: 10 },
                { name: 'q5', correct: 'Параллельные гаммы', points: 10 },
                { name: 'q6', correct: 'Си♭', points: 10 },
                { name: 'q7', correct: 'Фа', points: 10 },
                { name: 'q8', correct: 'Ре', points: 10 },
                { name: 'q9', correct: 'Грустное и мягкое', points: 10 }
            ]
        },
        24: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Интервал', points: 10 },
                { name: 'q2', correct: 'Все перечисленные', points: 10 },
                { name: 'q3', correct: 'Все перечисленные', points: 10 },
                { name: 'q4', correct: 'Октава', points: 10 },
                { name: 'q5', correct: 'Секунда', points: 10 },
                { name: 'q6', correct: 'Терция', points: 10 },
                { name: 'q7', correct: 'Кварта', points: 10 },
                { name: 'q8', correct: 'Квинта', points: 10 },
                { name: 'q9', correct: 'Секста', points: 10 }
            ]
        },
        25: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Секунда', points: 10 },
                { name: 'q2', correct: 'Терция', points: 10 },
                { name: 'q3', correct: 'Кварта', points: 10 },
                { name: 'q4', correct: 'Квинта', points: 10 },
                { name: 'q5', correct: 'Секста', points: 10 },
                { name: 'q6', correct: 'Септима', points: 10 },
                { name: 'q7', correct: 'Октава', points: 10 },
                { name: 'q8', correct: 'Прима', points: 10 },
                { name: 'q9', correct: 'Терция', points: 10 }
            ]
        },
        26: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Три', points: 10 },
                { name: 'q2', correct: 'Четыре', points: 10 },
                { name: 'q3', correct: 'Пять', points: 10 },
                { name: 'q4', correct: 'Шесть', points: 10 },
                { name: 'q5', correct: 'Семь', points: 10 },
                { name: 'q6', correct: 'Восемь', points: 10 },
                { name: 'q7', correct: 'Три', points: 10 },
                { name: 'q8', correct: 'Четыре', points: 10 },
                { name: 'q9', correct: 'Пять', points: 10 }
            ]
        },
        27: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Два тона', points: 10 },
                { name: 'q2', correct: 'Полутон', points: 10 },
                { name: 'q3', correct: 'Два с половиной тона', points: 10 },
                { name: 'q4', correct: 'Три с половиной тона', points: 10 },
                { name: 'q5', correct: 'Четыре с половиной тона', points: 10 },
                { name: 'q6', correct: 'Пять с половиной тонов', points: 10 },
                { name: 'q7', correct: 'Шесть тонов', points: 10 },
                { name: 'q8', correct: 'Тон', points: 10 },
                { name: 'q9', correct: 'Полутон', points: 10 }
            ]
        },
        28: {
            passing: 70,
            questions: [
                { name: 'q1', correct: 'Ми', points: 10 },
                { name: 'q2', correct: 'Ре', points: 10 },
                { name: 'q3', correct: 'До', points: 10 },
                { name: 'q4', correct: 'Ля', points: 10 },
                { name: 'q5', correct: 'Фа', points: 10 },
                { name: 'q6', correct: 'Си', points: 10 },
                { name: 'q7', correct: 'До', points: 10 },
                { name: 'q8', correct: 'Ре', points: 10 },
                { name: 'q9', correct: 'Фа', points: 10 }
            ]
        }
    };

    /* ---------- ДИАПАЗОНЫ ФИДБЭКА ---------- */
    const FEEDBACK = [
        { min: 0,  max: 50,  message: 'Вам стоит повторить материал урока и попробовать пройти тест ещё раз.' },
        { min: 51, max: 69,  message: 'Неплохо! Вы усвоили основные понятия, но есть темы, которые стоит повторить.' },
        { min: 70, max: 100, message: 'Отлично! Вы прекрасно усвоили материал урока.' }
    ];

    /* ---------- ПОИСК ТЕСТА НА СТРАНИЦЕ ---------- */
    /* Определяем id теста:
       1) из data-test-id на <body> или на <form>
       2) из имени файла testN.htm
       3) из <title> по номеру после "Тест" */
    function detectTestId() {
        const bodyId = document.body.getAttribute('data-test-id');
        if (bodyId && TESTS[bodyId]) return String(bodyId);

        const form = document.querySelector('form');
        if (form) {
            const formId = form.getAttribute('data-test-id');
            if (formId && TESTS[formId]) return String(formId);
        }

        const m = location.pathname.match(/test(\d+)\.htm/i);
        if (m && TESTS[m[1]]) return m[1];

        const t = document.title.match(/Тест\s*(\d+)/i);
        if (t && TESTS[t[1]]) return t[1];

        return null;
    }

    /* ---------- ПРОВЕРКА ---------- */
    function checkTest() {
        const testId = detectTestId();
        if (!testId) {
            alert('Не удалось определить номер теста. Проверьте, что файл называется testN.htm или задан data-test-id.');
            return;
        }

        const config = TESTS[testId];
        const form = document.querySelector('form');
        if (!form) {
            alert('На странице не найдена форма теста.');
            return;
        }

        let totalPoints = 0;
        let earned = 0;
        let unanswered = 0;
        let wrong = 0;

        config.questions.forEach(function (q) {
            totalPoints += q.points;

            const input = form.querySelector('input[name="' + q.name + '"]');
            if (!input) return; // вопрос отсутствует в HTML — пропускаем

            const questionBlock = input.closest('.question');
            if (questionBlock) {
                questionBlock.classList.remove('correct', 'incorrect', 'unanswered');
            }

            const selected = form.querySelector('input[name="' + q.name + '"]:checked');
            if (!selected) {
                unanswered++;
                if (questionBlock) questionBlock.classList.add('unanswered');
            } else if (selected.value === q.correct) {
                earned += q.points;
                if (questionBlock) questionBlock.classList.add('correct');
            } else {
                wrong++;
                if (questionBlock) questionBlock.classList.add('incorrect');
            }
        });

        const percent = totalPoints > 0 ? Math.round((earned / totalPoints) * 100) : 0;
        const range = FEEDBACK.find(function (r) { return percent >= r.min && percent <= r.max; });
        const message = range ? range.message : '';

        let resultText = 'Ваш результат: ' + earned + ' из ' + totalPoints +
            ' баллов (' + percent + '%).\n\n' + message;

        if (unanswered > 0) {
            resultText += '\n\nВы не ответили на ' + unanswered + ' вопрос(ов).';
        }

        /* Показываем результат в отдельном блоке, а не только alert */
        showResultPanel(resultText, percent, config.passing);

        /* Прокрутка к первому проблемному вопросу */
        const firstProblem = form.querySelector('.question.incorrect, .question.unanswered');
        if (firstProblem) {
            firstProblem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /* ---------- ПАНЕЛЬ РЕЗУЛЬТАТА ---------- */
    function showResultPanel(text, percent, passing) {
        let panel = document.getElementById('test-result-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'test-result-panel';
            panel.style.cssText =
                'margin:20px 0;padding:16px 20px;border-radius:8px;' +
                'font-size:1.05em;line-height:1.5;white-space:pre-line;' +
                'box-shadow:0 2px 8px rgba(0,0,0,0.12);';
            const form = document.querySelector('form');
            form.parentNode.insertBefore(panel, form.nextSibling);
        }

        let bg, border;
        if (percent >= passing) {
            bg = '#e8f5e9'; border = '#2e7d32';
        } else if (percent >= 51) {
            bg = '#fffde7'; border = '#f9a825';
        } else {
            bg = '#ffebee'; border = '#c62828';
        }

        panel.style.background = bg;
        panel.style.borderLeft = '6px solid ' + border;
        panel.textContent = text;
        panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /* ---------- АВТОПОДКЛЮЧЕНИЕ КНОПКИ ---------- */
    function bindButton() {
        const form = document.querySelector('form');
        if (!form) return;

        const btn = form.querySelector('button');
        if (!btn) return;

        /* Заменяем старый onclick, чтобы убрать alert-заглушку */
        btn.onclick = function (e) {
            e.preventDefault();
            checkTest();
        };
        btn.removeAttribute('onclick'); // на случай, если атрибут остался
        btn.setAttribute('type', 'button');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindButton);
    } else {
        bindButton();
    }

    /* На всякий случай делаем функцию глобальной —
       если где-то остался onclick="checkTest()", он сработает */
    window.checkTest = checkTest;
})();