"use strict";
/*
File Name: game.ts scripts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
let game1 = (function () {
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let currentSceneState;
    let currentScene;
    let keyboardManager;
    let assetManifast = [
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "background", src: "./Assets/images/background2.gif" },
        { id: "enemy", src: "./Assets/images/enemy.png" },
        { id: "boss", src: "./Assets/images/boss.png" },
        { id: "player", src: "./Assets/images/player.png" },
        { id: "pbullet", src: "./Assets/images/pbullet.png" },
        { id: "ebullet", src: "./Assets/images/ebullet.png" },
        { id: "bbullet", src: "./Assets/images/bossbullet.png" },
        { id: "bullet", src: "./Assets/images/bulleticon.png" },
        { id: "score", src: "./Assets/images/score.png" },
        { id: "life", src: "./Assets/images/lives.png" },
        { id: "lifeup", src: "./Assets/images/lifeup.png" },
        { id: "bomb", src: "./Assets/images/bomb.png" },
        { id: "points", src: "./Assets/images/points.png" },
        { id: "startScreen", src: "./Assets/images/startScreen.png" },
        { id: "instructImage", src: "./Assets/images/instruct.png" },
        { id: "explosion", src: "./Assets/images/explosion.png" },
        { id: "explosion1", src: "./Assets/images/explosion01.png" },
        { id: "explosion2", src: "./Assets/images/explosion2.png" },
        { id: "explosion3", src: "./Assets/images/explosion4.png" },
        { id: "youWin", src: "./Assets/images/youwin.png" },
        { id: "youLose", src: "./Assets/images/youLose.png" },
        //buttons
        { id: "startButton", src: "./Assets/images/start.png" },
        { id: "instructionButton", src: "./Assets/images/instruction.png" },
        { id: "exitButton", src: "./Assets/images/exit.png" },
        { id: "replayButton", src: "./Assets/images/replay.png" },
        { id: "menuButton", src: "./Assets/images/menu.png" },
        //Audio
        { id: "backAudio", src: "./Assets/audio/gamest.wav" },
        { id: "startAudio", src: "./Assets/audio/playerbullet.wav" },
        { id: "crashAudio", src: "./Assets/audio/playerdied.mp3" },
        { id: "crashAudio", src: "./Assets/audio/enemydied.wav" },
        { id: "breakAudio", src: "./Assets/audio/points.wav" }
    ];
    // comments from Tom
    function Preload() {
        assets = new createjs.LoadQueue();
        config.Game.ASSETS = assets;
        assets.installPlugin(createjs.Sound);
        assets.loadManifest(assetManifast);
        assets.on("complete", Start);
    }
    /**
     * Perform Initialization in the Start function
     *
     */
    function Start() {
        console.log(`%c Game Started`, "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        config.Game.STAGE = stage; // create a reference to the Global Stage
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE_STATE = scenes.State.START;
        keyboardManager = new managers.Keyboard();
        config.Game.keyboardManager = keyboardManager;
    }
    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE_STATE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This function is the main function of the game
     *
     */
    function Main() {
        console.log(`%c Switching Scenes`, "color: green; font-size:16px;");
        // cleanup
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.removeAllChildren();
            stage.removeAllChildren();
        }
        // state machine
        switch (config.Game.SCENE_STATE) {
            case scenes.State.START:
                currentScene = new scenes.Start();
                break;
            case scenes.State.INSTRUCTION:
                currentScene = new scenes.Instruction();
                break;
            case scenes.State.PLAY:
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                currentScene = new scenes.End();
                break;
            case scenes.State.WINNER:
                currentScene = new scenes.Winner();
                break;
        }
        // add the scene to the stage and setup the current scene
        stage.addChild(currentScene);
        currentSceneState = config.Game.SCENE_STATE;
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=game.js.map