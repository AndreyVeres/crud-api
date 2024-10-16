import { validate } from 'uuid';
import { JsonService } from '../utils/json.service.js';
import { User } from './user.model.js';
import { UsersService } from './users.service.js';

export class UsersController {
  constructor() {
    this.userService = new UsersService();
  }

  async DELETE(req, res) {
    const [id] = req.params;

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    this.userService.delete(id);

    return res.status(204).end();
  }

  async PUT(req, res) {
    const [id] = req.params;

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    const body = await req.getBody();
    const updatedUser = this.userService.update(user, body);

    return res.status(200).end(updatedUser);
  }

  async POST(req, res) {
    const body = await req.getBody();

    try {
      const user = new User(JsonService.parse(body));
      this.userService.create(user);
      res.status(201).end(user);
    } catch ({ message }) {
      res.status(400).end(message);
    }
  }

  async GET(req, res) {
    const [id] = req.params;

    if (id) {
      if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

      const user = this.userService.getById(id);
      if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

      return res.end(user);
    }

    const users = this.userService.getAll();
    return res.status(200).end(users);
  }
}
