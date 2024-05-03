
const inquirer = require('inquirer');
const play = require('play-sound')();
const fs = require('fs');
const chalk = require('chalk');

const AnswerCoctails = fs
  .readFileSync('./topics/coctailsname.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionCostails = fs
  .readFileSync('./topics/coctailsquestion.txt', 'utf-8')
  .split('\n');

const artistAnswer = fs
  .readFileSync('./topics/artistnamesong.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionSongs = fs
  .readFileSync('./topics/songquestion.txt', 'utf-8')
  .split('\n');

function createQuestion(listQuest, listAnswer) {
  const questions = [];

  for (let i = 0; i < listQuest.length; i++) {
    questions.push({
      type: 'list',
      name: `${i}`,
      message: listQuest[i],
      choices: listAnswer[i],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    });
  }
  return questions;
}
// console.log(createQuestion(questionCostails, AnswerCoctails))
function askCoctailsQuestions(index = 0) {
  const questions = createQuestion(questionCostails, AnswerCoctails)
  const correctAnswers = {
    '0': 'Май-Тай',
    '1': 'Негрони',
    '2': 'Маргарита',
    '3': 'Олд-Фешн',
    '4': 'Белый-Русский'
  };
  // Здесь будет логика для задавания географических вопросов
  if (index < questions.length) {
    play.play(`./music/icebaby.mp3`)
    inquirer.prompt([questions[index]]).then((answers) => {
      const questionKey = Object.keys(answers)[0];
      const userAnswer = answers[questionKey];
      const correctAnswer = correctAnswers[questionKey];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log(chalk.green('Правильный ответ!✅'));
      } else {
        console.log(chalk.red(`Неправильный ответ🚫. Правильный ответ: ${correctAnswer}`));
      }

      // Переход к следующему вопросу
      askCoctailsQuestions(index + 1);
    });
  } else {
    console.log('Вопросы закончились. Спасибо за участие!🔥');
    chooseCategory();
  }
}

function askSongsQuestions(index = 0) {
  // Здесь будет логика для задавания исторических вопросов
  const questions = createQuestion(questionSongs, artistAnswer)
  const correctAnswers = {
    '0': '50 cent',
    '1': 'Snoop Dog',
    '2': 'Nirvana',
    '3': 'PSY',
    '4': 'The White Stripes'
  };
  // Здесь будет логика для задавания географических вопросов
  if (index < questions.length) {
    play.play(`./music/${index+1}.mp3`)
    inquirer.prompt([questions[index]]).then((answers) => {
      const questionKey = Object.keys(answers)[0];
      const userAnswer = answers[questionKey];
      const correctAnswer = correctAnswers[questionKey];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log(chalk.green('Правильный ответ!✅'));
      } else {
        console.log(chalk.red(`Неправильный ответ🚫. Правильный ответ: ${correctAnswer}`));
      }

      // Переход к следующему вопросу
      askSongsQuestions(index + 1);
    });
  } else {
    console.log('Вопросы закончились. Спасибо за участие!🔥');
    chooseCategory();
  }
}

let categoriesCompleted = {};
// Функция для выбора категории
function chooseCategory() {
  if (Object.keys(categoriesCompleted).length === 2) {
    console.log('Спасибо за игру!');
    return;
  }
  const categories = ['Коктейли', 'Угадай мелодию'];
  const choices = categories.map((category) => {
    // Проверяем, была ли категория уже пройдена
    if (categoriesCompleted[category]) {
      return `${category} (уже пройдено)`; // Добавляем метку к названию
    }
    return category;
  });
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Выберите категорию вопросов:',
        choices: choices,
      },
    ])
    .then((answers) => {
      const selectedCategory = answers.category.replace(' (уже пройдено)', '');
      if (categoriesCompleted[selectedCategory]) {
        console.log(`Категория "${selectedCategory}" уже была пройдена.`);
        chooseCategory();
      } else {
        switch (selectedCategory) {
          case 'Коктейли':
            askCoctailsQuestions();
            categoriesCompleted[selectedCategory] = true;
            break;
          case 'Угадай мелодию':
            askSongsQuestions();
            categoriesCompleted[selectedCategory] = true;
            break;
          default:
            console.log('Категория не выбрана');
            break;
        }
      }
    });
}
// Запуск выбора категории
chooseCategory();

