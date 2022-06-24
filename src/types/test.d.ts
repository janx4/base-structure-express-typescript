export interface User {
    id: number;
    username: string;
    name: string;
}

export type UserCredentials = {
    username?: string;
    name?: string;
};
