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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_model_1 = require("./notification.model");
const createNotification = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.create(payload);
    return notification;
});
const getNotificationsByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({
        email,
        status: "unread",
    }).sort({
        createdAt: -1,
    });
    return notifications;
});
const getAllNotificationsByUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield notification_model_1.Notification.find({
        email,
    }).sort({
        createdAt: -1,
    });
    return notifications;
});
const markNotificationAsRead = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notification_model_1.Notification.findByIdAndUpdate(notificationId, { status: "read" }, { new: true });
    return notification;
});
exports.NotificationService = {
    createNotification,
    getNotificationsByUserEmail,
    markNotificationAsRead,
    getAllNotificationsByUserEmail
};
