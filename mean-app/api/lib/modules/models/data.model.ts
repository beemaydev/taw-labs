export interface IPost {
    title: string;
    text: string;
    image: string;
}

export type Query<T> = {
    [key: string]: T;
};
