import { DataBase } from 'src/types';

export abstract class Service {
  database: DataBase = {
    users: [],
  };
  constructor() {
    process.on('message', ({ db }) => {
      if (db) {
        this.database = db;
      }
    });
  }

  updateDb() {
    if (process.send) {
      process.send({ db: this.database });
    }
  }
}

//  users: [
//   {
//     id: '8adcf0c8-de87-409a-a170-8050ff5dc4e3',
//     username: 'User 1',
//     age: 22,
//     hobbies: ['JavaScript'],
//   },
//   {
//     id: '3398c305-a252-4595-b441-dc931e8c54bf',
//     username: 'User 2',
//     age: 44,
//     hobbies: ['TypeScript'],
//   },

//   {
//     id: '37703441-ae7f-4b7a-89d0-fe590cb465d3',
//     username: 'User 3',
//     age: 33,
//     hobbies: ['Sleep'],
//   },
// ],
