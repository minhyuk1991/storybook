export type Row<T> = {
    id: string;
    cells: Array<{ _id: string; data: T }>;

    // [
    //     {
    //         _id: 'ad1de024-58ae-4416-82ae-07b9db98065d';
    //         data: null;
    //     },
    //     {
    //         _id: 'f52420b2-49f7-42eb-b34b-42d8a22fa118';
    //         data: 'Mark';
    //     },
    //     {
    //         _id: '657689b2-4721-4f04-bf61-7638781cee69';
    //         data: 'mark@gmail.com';
    //     },
    // ];
};
