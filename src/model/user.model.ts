export interface IUser {
    id?: string,
    name?: string;
    email?: string;
    password?: string;
    accessToken?: string;
    active?: boolean;
    role?: string;
}

export class User implements IUser {
    constructor(
        public id?: string,
        public name?: string,
        public email?: string,
        public password?: string,
        public accessToken?: string,
        public active?: boolean,
        public role?: string
    ) {}
}