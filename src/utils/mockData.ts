import type { Chat, Message, User } from '../App';

const firstNames = [
  'Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил',
  'Анна', 'Мария', 'Елена', 'Ольга', 'Ирина', 'Наталья', 'Татьяна', 'Юлия', 'Светлана', 'Екатерина',
  'Виктор', 'Владимир', 'Евгений', 'Николай', 'Павел', 'Денис', 'Роман', 'Игорь', 'Иван', 'Антон',
  'Дарья', 'Валерия', 'Анастасия', 'Вероника', 'Алина', 'Ксения', 'Полина', 'София', 'Маргарита', 'Виктория',
];

const lastNames = [
  'Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Соколов', 'Михайлов', 'Новиков',
  'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов',
];

const groupNames = [
  'Команда разработки', 'Семья', 'Друзья', 'Университет', 'Спортзал', 'Книжный клуб',
  'Проект Alpha', 'Дизайнеры', 'Маркетинг', 'HR отдел',
];

const statuses = [
  'В сети', 'Занят', 'Не беспокоить', 'На работе', 'В отпуске', 'На встрече',
];

const lastMessages = [
  'Привет! Как дела?',
  'Спасибо за помощь!',
  'Отлично, договорились',
  'Можем встретиться завтра?',
  'Отправил файлы',
  'Хорошо, жду',
  'До встречи!',
  'Понял, сделаю',
  'Спасибо за информацию',
  'Когда будет готово?',
  'Созвонимся позже',
  'Отличная идея!',
  'Нужна твоя помощь',
  'Все в порядке',
  'Скоро буду',
];

const imageUrls = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTimestamp(): string {
  const now = new Date();
  const hoursSinceLastMessage = Math.random() * 72;

  if (hoursSinceLastMessage < 1) {
    return `${Math.floor(hoursSinceLastMessage * 60)} мин`;
  } else if (hoursSinceLastMessage < 24) {
    return `${Math.floor(hoursSinceLastMessage)} ч`;
  } else {
    const days = Math.floor(hoursSinceLastMessage / 24);
    return days === 1 ? 'Вчера' : `${days} дн`;
  }
}

export function generateMockData() {
  const users: User[] = [];
  const chats: Chat[] = [];
  const messages: Record<string, Message[]> = {};

  for (let i = 0; i < 50; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const isOnline = Math.random() > 0.6;

    const user: User = {
      id: `user-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: imageUrls[i % imageUrls.length],
      status: getRandomElement(statuses),
      online: isOnline,
    };
    users.push(user);

    const hasUnread = Math.random() > 0.7;
    const isPinned = Math.random() > 0.9;

    const chat: Chat = {
      id: `chat-${i}`,
      name: user.name,
      avatar: user.avatar,
      lastMessage: getRandomElement(lastMessages),
      timestamp: getRandomTimestamp(),
      unread: hasUnread ? getRandomInt(1, 5) : 0,
      online: user.online,
      pinned: isPinned,
      muted: false,
    };
    chats.push(chat);

    const messageCount = getRandomInt(3, 15);
    const chatMessages: Message[] = [];

    for (let j = 0; j < messageCount; j++) {
      const isFromMe = Math.random() > 0.5;
      const hoursAgo = messageCount - j;
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - hoursAgo);

      const messageTexts = [
        'Привет! Как дела?',
        'Отлично, спасибо!',
        'Можем встретиться завтра?',
        'Конечно, во сколько?',
        'Может в 15:00?',
        'Хорошо, договорились',
        'До встречи!',
        'Спасибо за помощь',
        'Всегда пожалуйста',
        'Как продвигается проект?',
        'Все идет по плану',
        'Отлично!',
        'Нужна твоя помощь с задачей',
        'Конечно, чем могу помочь?',
        'Отправлю детали позже',
      ];

      chatMessages.push({
        id: `msg-${i}-${j}`,
        text: getRandomElement(messageTexts),
        sender: isFromMe ? 'me' : 'other',
        timestamp,
        read: true,
      });
    }

    messages[chat.id] = chatMessages;
  }

  for (let i = 0; i < 5; i++) {
    const groupChat: Chat = {
      id: `group-${i}`,
      name: groupNames[i],
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      lastMessage: getRandomElement(lastMessages),
      timestamp: getRandomTimestamp(),
      unread: getRandomInt(0, 10),
      online: false,
      isGroup: true,
      members: Array.from({ length: getRandomInt(3, 8) }, (_, idx) => `user-${idx}`),
    };
    chats.push(groupChat);

    const groupMessages: Message[] = [];
    const messageCount = getRandomInt(5, 20);

    for (let j = 0; j < messageCount; j++) {
      const isFromMe = Math.random() > 0.7;
      const hoursAgo = messageCount - j;
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - hoursAgo);

      groupMessages.push({
        id: `group-msg-${i}-${j}`,
        text: getRandomElement(lastMessages),
        sender: isFromMe ? 'me' : 'other',
        timestamp,
        read: true,
      });
    }

    messages[groupChat.id] = groupMessages;
  }

  chats.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return { users, chats, messages };
}
