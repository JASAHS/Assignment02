/*  
File Name: Scene.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module objects {
    export abstract class Scene extends createjs.Container {
        constructor() {
            super();

            //this.Start();
        }

        // Life Cycle Functions

        /**
         * Initialization Method
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Start(): void;

        /**
         * Updates all game objects attached to the Scene
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Update(): void;

        /**
         * Scene functionality happens in this method
         *
         * @abstract
         * @memberof Scene
         */
        public abstract Main(): void;
    }
}