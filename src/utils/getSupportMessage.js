import { IMG_URL } from "../components/Message/index.js";

const DAYS_OF_WEEK = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];

export const getSupportMessage = (answerId, messageId) => {
  const now = new Date();
  let newMessage;

  switch (answerId) {
    case 0: {
      const dayOfWeek = DAYS_OF_WEEK[now.getDay()];

      newMessage = {
        key: messageId,
        person: {
          role: "support",
          name: "Jayne N",
          imgUrl: IMG_URL,
          message: [{ id: messageId, text: `Сьогодні ${dayOfWeek}` }],
        },
        type: "default-message",
      };
      break;
    }

    case 1: {
      const currentTime = now.toLocaleTimeString();

      newMessage = {
        key: messageId,
        person: {
          role: "support",
          name: "Jayne N",
          imgUrl: IMG_URL,
          message: [{ id: messageId, text: `Зараз ${currentTime}` }],
        },
        type: "default-message",
      };
      break;
    }

    case 2: {
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const daysUntilNewYear = Math.ceil(
        (newYear - now) / (1000 * 60 * 60 * 24),
      );

      newMessage = {
        key: messageId,
        person: {
          role: "support",
          name: "Jayne N",
          imgUrl: IMG_URL,
          message: [
            {
              id: messageId,
              text: `До Нового Року залишилося ${daysUntilNewYear} днів`,
            },
          ],
        },
        type: "default-message",
      };
      break;
    }

    default:
      break;
  }

  return newMessage;
};
