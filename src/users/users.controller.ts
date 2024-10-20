import { validate } from 'uuid';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Request } from '../utils/request';
import { Response } from '../utils/response';
import { Controller } from '../types';

export class UsersController implements Controller {
  private userService = new UsersService();

  async GET(_: Request, res: Response) {
    const users = this.userService.getAll();
    return res.status(200).end(users);
  }

  async DELETE_ID(req: Request, res: Response) {
    const [id] = req.params;
    if (!id) {
      return res.status(400).end('user id not provide');
    }

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    this.userService.delete(id);

    return res.status(204).end();
  }

  async PUT_ID(req: Request, res: Response) {
    const [id] = req.params;

    if (!id) {
      return res.status(400).end('user id not provide');
    }

    if (!validate(id)) return res.status(400).end('userId is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    try {
      const body = (await req.getBody()) as Partial<User>;
      const updatedUser = this.userService.update(user, new User(body));

      return res.status(200).end(updatedUser);
    } catch (err) {
      return res.status(400).end((err as Error).message);
    }
  }

  async POST(req: Request, res: Response) {
    try {
      const body = (await req.getBody()) as Partial<User>;
      const user = new User(body);
      this.userService.create(user);
      return res.status(201).end(user);
    } catch (err) {
      return res.status(400).end((err as Error).message);
    }
  }

  async GET_ID(req: Request, res: Response) {
    const [id] = req.params;

    if (!id) {
      return res.status(400).end('user id not provide');
    }

    if (!validate(id)) return res.status(400).end('user id is invalid (not uuid)');

    const user = this.userService.getById(id);
    if (!user) return res.status(404).end(`user with id:${id} doesn't exist`);

    return res.status(200).end(user);
  }
}
