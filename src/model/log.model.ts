import { User } from './user.model';

export class Log {
    _id: string;
    title: string;
    detail: string;
    event: number;
    level: string;
    environment: string;
    enabled: boolean;
    createdAt: Date;
    ip: string;
    user: User;
}