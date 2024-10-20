import { validate } from 'uuid';
import { User } from './user.model.js';
import { UsersService } from './users.service.js';

export class UsersController {
  constructor() {
    this.userService = new UsersService();
  }

  async DELETE_ID(req, res) {
    const [id] = req.params;

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    this.userService.delete(id);

    return res.status(204).end();
  }

  async PUT_ID(req, res) {
    const [id] = req.params;

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    try {
      const body = await req.getBody();
      const updatedUser = this.userService.update(user, new User(body));

      return res.status(200).end(updatedUser);
    } catch (err) {
      return res.status(400).end(err.message);
    }
  }

  async POST(req, res) {
    try {
      const body = await req.getBody();
      const user = new User(body);
      this.userService.create(user);
      res.status(201).end(user);
    } catch ({ message }) {
      res.status(400).end(message);
    }
  }

  async GET(_, res) {
    const users = this.userService.getAll();
    return res.status(200).end(users);
  }

  async GET_ID(req, res) {
    const [id] = req.params;

    if (!validate(id)) return res.status(400).end('user id is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    return res.status(200).end(user);
  }
}
