"use strict";
/*
File Name: State.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var scenes;
(function (scenes) {
    let State;
    (function (State) {
        State[State["NO_SCENE"] = -1] = "NO_SCENE";
        State[State["START"] = 0] = "START";
        State[State["INSTRUCTION"] = 1] = "INSTRUCTION";
        State[State["PLAY"] = 2] = "PLAY";
        State[State["END"] = 3] = "END";
        State[State["WINNER"] = 4] = "WINNER";
        State[State["NUM_OF_SCENES"] = 5] = "NUM_OF_SCENES";
    })(State = scenes.State || (scenes.State = {}));
})(scenes || (scenes = {}));
//# sourceMappingURL=State.js.map