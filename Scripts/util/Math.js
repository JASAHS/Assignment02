"use strict";
/*
File Name: Math.ts
Authors Name: Jasah Shamsudheen
Student Number:300981749
Last Modified By: Jasah Shamsudheen
Date Last Modified: 2020 - 04 - 01
Program Description: Simple 2D Scrolling Game - Space Shooter
Revision History: 1.0
*/
var util;
(function (util) {
    class Math {
        static Clamp(value, min, max) {
            if (value < min) {
                value = min;
            }
            else if (value > max) {
                value = max;
            }
            return value;
        }
        static Clamp01(value) {
            if (value < 0.0) {
                return 0.0;
            }
            if (value > 1.0) {
                return 1.0;
            }
            return value;
        }
        static Lerp(a, b, t) {
            return a + (b - a) * Math.Clamp01(t);
        }
        static LerpUnclamped(a, b, t) {
            return a + (b - a) * t;
        }
    }
    util.Math = Math;
})(util || (util = {}));
//# sourceMappingURL=Math.js.map