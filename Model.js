const fs = require('fs');
const play = require('play-sound')();

const nameCoctails = fs
  .readFileSync('./topics/coctailsname.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));
console.log(nameCoctails);
const questionCostails = fs
  .readFileSync('./topics/coctailsquestion.txt', 'utf-8')
  .split('\n');
console.log(questionCostails);
const artistName = fs
  .readFileSync('./topics/artistnamesong.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionSongs = fs
  .readFileSync('./topics/songquestion.txt', 'utf-8')
  .split('\n');

function playMusic(num) {
  play.play(`./music/${num}.mp3`, (err) => {
    if (err) {
      console.log('Ошибка воспроизведения звука');
    }
  });
}
function createQuestion(listQuest, listAnswer) {
  const questions = [];

  for (let i = 0; i < listQuest.length; i++) {
    questions.push({
      type: 'list',
      name: 'highestMountain',
      message: listQuest[i],
      choices: listAnswer[i],
      validate: (input) =>
        input ? true : 'Пожалуйста, выберите один из вариантов.',
    });
  }
  return questions;
}
