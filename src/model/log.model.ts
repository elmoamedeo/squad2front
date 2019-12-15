import { User } from './user.model';

export class Log {
    _id: string;
    title: string;
    detail: string;
    event: number;
    level: string;
    environment: string;
    enabled: boolean;
    ip: string;
    user: User;
}