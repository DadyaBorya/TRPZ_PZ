const snakeNames = require('snake-names');
const nuzhdiki = require('nuzhdiki');
const player = require('play-sound')();

function play() {
    console.log("Приходит в бар -", snakeNames.random(), "и говорит")
    console.log(nuzhdiki.getNuzhdik().nuzhdik)



     setTimeout( () => player.play('sounds/smeh-1.mp3', { timeout: 30000 }, function(err){
        if (err) console.log(`Could not play sound: ${err}`);
    }), 8000)
}
play()
