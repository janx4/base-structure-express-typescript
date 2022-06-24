import type { User, UserCredentials } from "../types/test";

const Test = () => {
    let users: User[] = [
        {
            id: 1,
            username: "test",
            name: "Test user",
        },
    ];

    return {
        findById(id: number): User | undefined {
            const user = users.find((user) => user.id === id);

            return user;
        },

        getAll(): User[] {
            return users;
        },

        add({ username, name }: UserCredentials): void {
            if (!username) {
                username = "";
            }
            if (!name) {
                name = "";
            }

            // Find the current id of data
            const maxId: number = users.reduce(
                (max, user) => (user.id > max ? user.id : max),
                users[0].id || 0
            );
            users.push({ id: maxId + 1, username, name });
        },

        update(user: User, { username, name }: UserCredentials): User {
            username && (user.username = username);
            name && (user.name = name);

            return user;
        },

        delete(id: number): number {
            users = users.filter((user) => user.id !== id);
            return id;
        },
    };
};

const TestModel = Test();

export default TestModel;
