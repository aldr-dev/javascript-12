import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Gallery from './models/Gallery';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('galleries');
  } catch (e) {
    console.log('Skipping drop...');
  }

  const [user1, user2, admin1, admin2] = await User.create({
    username: 'test1@test.com',
    displayName: 'Иван',
    avatar: 'fixtures/ivan.webp',
    password: '*H#*YGYU',
    role: 'user',
    token: crypto.randomUUID(),
  }, {
    username: 'test2@test.com',
    displayName: 'Петр',
    avatar: 'fixtures/petr.jpg',
    password: '*IBU#D@BH',
    role: 'user',
    token: crypto.randomUUID(),
  }, {
    username: 'admin1@test.com',
    displayName: 'Антон',
    avatar: 'fixtures/anton.jpg',
    password: 'nif3i4bi@',
    role: 'admin',
    token: crypto.randomUUID(),
  }, {
    username: 'admin2@test.com',
    displayName: 'Андрей',
    avatar: 'fixtures/andrey.jpg',
    password: 'FDi&^&YGbi@',
    role: 'admin',
    token: crypto.randomUUID(),
  });

  await Gallery.create(
    {
      user: user1,
      title: 'Корова',
      image: 'fixtures/cow.jpg',
    },
    {
      user: user1,
      title: 'Курица',
      image: 'fixtures/chicken.jpg',
    },
    {
      user: user1,
      title: 'Порш 911',
      image: 'fixtures/porshe.jpg',
    },
    {
      user: user2,
      title: 'Милая кошка',
      image: 'fixtures/cat.jpg',
    },
    {
      user: user2,
      title: 'Дисней',
      image: 'fixtures/disney.jpg',
    },
    {
      user: user2,
      title: 'Милая собака',
      image: 'fixtures/dog.jpg',
    },
    {
      user: user2,
      title: 'Хэллоуин',
      image: 'fixtures/halloween.jpg',
    },
    {
      user: admin1,
      title: 'Цветы',
      image: 'fixtures/flower.jpg',
    },
    {
      user: admin1,
      title: 'Лес',
      image: 'fixtures/forest.jpg',
    },
    {
      user: admin1,
      title: 'Радио',
      image: 'fixtures/radio.jpg',
    },
    {
      user: admin1,
      title: 'Космос',
      image: 'fixtures/space.jpg',
    },
    {
      user: admin2,
      title: 'Пляж',
      image: 'fixtures/sendbox.jpg',
    }, {
      user: admin2,
      title: 'Ночной город',
      image: 'fixtures/night-city.jpg',
    },
    {
      user: admin2,
      title: 'Подвесной мост',
      image: 'fixtures/bridge.jpeg',
    },
    {
      user: admin2,
      title: 'Смартфон',
      image: 'fixtures/phone.jpg',
    },
  );

  await db.close();
};

run().catch(console.error);