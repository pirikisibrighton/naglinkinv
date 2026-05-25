const db = require("../models");

const Notification = db.Notification;

const createNotification = async ({
  userId = null,
  roleTarget = null,
  orderId = null,
  title,
  message,
  type = "info",
}) => {
  try {
    await Notification.create({
      userId,
      roleTarget,
      orderId,
      title,
      message,
      type,
      isRead: false,
    });
  } catch (error) {
    console.error("Notification creation error:", error);
  }
};

module.exports = createNotification;