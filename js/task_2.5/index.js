import {printMenu} from "./menus/MainMenu.js";
import {emitterEvents} from "./emitter/FsEmitter.js";
import EventEmitter from "events";

export const fsEmitter = new EventEmitter();

async function start() {
    emitterEvents(fsEmitter)
    await printMenu()
}

start()