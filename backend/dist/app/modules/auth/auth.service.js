"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const jwt_helper_1 = require("../../../utils/jwt.helper");
const config_1 = __importDefault(require("../../../config"));
const api_error_1 = __importDefault(require("../../../errors/api_error"));
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail, password } = payload;
    const isExistUser = yield user_model_1.User.findOne({ email: userEmail });
    if (!isExistUser) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const match = yield bcrypt_1.default.compare(password, isExistUser.password);
    if (!match) {
        throw new api_error_1.default(http_status_1.default.UNAUTHORIZED, "Password is not valid!");
    }
    const { email, role, subscriptionType, name, postsCount } = isExistUser;
    const accessToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email: userEmail } = payload;
    const isExistUser = yield user_model_1.User.findOne({ email: userEmail });
    if (isExistUser) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User already exist!");
    }
    const result = yield user_model_1.User.create(payload);
    const { email, role, subscriptionType, name, postsCount } = result;
    const accessToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwt_helper_1.JwtHalers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new api_error_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    const { email: userEmail } = verifiedToken;
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const { email, role, subscriptionType, name, postsCount } = user;
    const newAccessToken = jwt_helper_1.JwtHalers.createToken({ email, role, subscriptionType, name, postsCount }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    login,
    register,
    refreshToken,
};
