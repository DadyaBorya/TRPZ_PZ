const colors = require("colors");
const player = require('play-sound')();
function print(text, color, soundPath) {
    console.log(colors[color](text))
    player.play(soundPath, function(err){
        if (err) console.log(`Could not play sound: ${err}`);
    })
}

function main() {
    print("text1", "rainbow", "sounds/sound1.mp3")
    setTimeout(() => print("text2", "red", "sounds/sound2.mp3"), 2000)
}

main()
