import { User } from './user.model';

export interface ILog {
    id?: string,
    title?: string,
    detail?: string,
    event?: number,
    level?: string,
    environment?: string,
    enabled?: boolean,
    ip?: string,
    token?: string,
    user?: User
}

export class Log implements ILog {
    constructor(
        public id?: string,
        public title?: string,
        public detail?: string,
        public event?: number,
        public level?: string,
        public environment?: string,
        public enabled?: boolean,
        public ip?: string,
        public token?: string,
        public user?: User
    ) {}
}