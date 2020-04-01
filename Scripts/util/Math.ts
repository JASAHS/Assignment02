/*  
File Name: Math.ts 
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
module util {
    export class Math {
        public static Clamp(value: number, min: number, max: number) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }

            return value;
        }

        public static Clamp01(value: number): number {
            if (value < 0.0) {
                return 0.0;
            }

            if (value > 1.0) {
                return 1.0;
            }

            return value;
        }

        public static Lerp(a: number, b: number, t: number): number {
            return a + (b - a) * Math.Clamp01(t);
        }

        public static LerpUnclamped(a: number, b: number, t: number): number {
            return a + (b - a) * t;
        }
    }
}