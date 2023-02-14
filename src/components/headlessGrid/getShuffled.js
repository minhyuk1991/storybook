export const getShuffled = (items) => {
    items = [...items];
    const shuffled = [];
    while (items.length) {
        const rand = Math.floor(Math.random() * items.length);
        shuffled.push(items.splice(rand, 1)[0]);
    }
    return shuffled;
};
