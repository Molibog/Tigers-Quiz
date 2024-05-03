const inquirer = require('inquirer');

function askGeographyQuestions(index = 0) {
  const questions = [
    {
      type: 'list',
      name: 'capitalOfFrance',
      message: 'Какая столица Франции?',
      choices: ['Лондон', 'Берлин', 'Париж', 'Мадрид'],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    },
    {
      type: 'list',
      name: 'highestMountain',
      message: 'Какая самая высокая гора в мире?',
      choices: ['Килиманджаро', 'Эверест', 'Эльбрус', 'Денали'],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    },
  ];
  const correctAnswers = {
    capitalOfFrance: 'Париж',
    highestMountain: 'Эверест',
  };
  // Здесь будет логика для задавания географических вопросов
  if (index < questions.length) {
    inquirer.prompt([questions[index]]).then((answers) => {
      const questionKey = Object.keys(answers)[0];
      const userAnswer = answers[questionKey];
      const correctAnswer = correctAnswers[questionKey];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log('Правильный ответ!');
      } else {
        console.log(`Неправильный ответ. Правильный ответ: ${correctAnswer}`);
      }

      // Переход к следующему вопросу
      askGeographyQuestions(index + 1);
    });
  } else {
    console.log('Вопросы закончились. Спасибо за участие!');
    chooseCategory();
  }
}

function askHistoryQuestions(index = 0) {
  // Здесь будет логика для задавания исторических вопросов
  const questions = [
    {
      type: 'list',
      name: 'capitalOfFrance',
      message: 'Какая столица Франции?',
      choices: ['Лондон', 'Берлин', 'Париж', 'Мадрид'],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    },
    {
      type: 'list',
      name: 'highestMountain',
      message: 'Какая самая высокая гора в мире?',
      choices: ['Килиманджаро', 'Эверест', 'Эльбрус', 'Денали'],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    },
  ];
  const correctAnswers = {
    capitalOfFrance: 'Париж',
    highestMountain: 'Эверест',
  };
  // Здесь будет логика для задавания географических вопросов
  if (index < questions.length) {
    inquirer.prompt([questions[index]]).then((answers) => {
      const questionKey = Object.keys(answers)[0];
      const userAnswer = answers[questionKey];
      const correctAnswer = correctAnswers[questionKey];

      if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        console.log('Правильный ответ!');
      } else {
        console.log(`Неправильный ответ. Правильный ответ: ${correctAnswer}`);
      }

      // Переход к следующему вопросу
      askHistoryQuestions(index + 1);
    });
  } else {
    console.log('Вопросы закончились. Спасибо за участие!');
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
	const categories = ['География', 'История'];
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
          case 'География':
            askGeographyQuestions();
            categoriesCompleted[selectedCategory] = true;
            break;
          case 'История':
            askHistoryQuestions();
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
