const fs = require('fs');
const play = require('play-sound')();

const nameCoctails = fs
  .readFileSync('./topics/coctailsname.txt', 'utf-8')
  .split('\n')
  .map((el) => el.split(','));

const questionCostails = fs
  .readFileSync('./topics/coctailsquestion.txt', 'utf-8')
  .split('\n');

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
playMusic(2);
