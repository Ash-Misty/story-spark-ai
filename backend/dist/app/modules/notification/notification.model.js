"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const notification_utils_1 = require("./notification.utils");
const NotificationPayloadSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    userName: { type: String, required: false },
});
const NotificationSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    data: { type: NotificationPayloadSchema, required: true },
    status: {
        type: String,
        enum: Object.values(notification_utils_1.ENUM_NOTIFICATION_STATUS),
        default: notification_utils_1.ENUM_NOTIFICATION_STATUS.UNREAD,
    },
    type: { type: String, required: false },
}, { timestamps: true });
exports.Notification = (0, mongoose_1.model)("Notification", NotificationSchema);
