import TestModel from "../models/test.model";
import { User, UserCredentials } from "../types/test";

export const findTestData = (id: number): User | undefined => {
    // do something with your business logic
    return TestModel.findById(id);
};

export const getTestData = (): User[] => {
    // do something with your business logic
    return TestModel.getAll();
};

export const addTestData = ({ username, name }: UserCredentials) => {
    // do something with your business logic
    return TestModel.add({ username, name });
};

export const updateTestData = (id: number, data: UserCredentials): User => {
    // do something with your business logic
    const user: User = TestModel.findById(id)!;
    return TestModel.update(user, data);
};

export const deleteTestData = (id: number): number => {
    // do something with your business logic
    return TestModel.delete(id);
};
