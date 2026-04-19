"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const zod_1 = require("zod");
const register = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
        name: zod_1.z.string({ required_error: "Name is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
const login = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.UserValidator = {
    register,
    login,
};
