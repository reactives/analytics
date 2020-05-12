import { User } from '@app/_models/user';

export class Site {
  _id: number;
  siteName: string;
  host: string;
  user: User;
}
