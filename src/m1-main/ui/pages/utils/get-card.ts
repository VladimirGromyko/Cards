import { CardsType } from "m1-main/dal/cards-api";

export const getCard = (cards: CardsType[]) => {
  const sum = cards.reduce((acc, card) => {
    if (card.grade) {
      return acc + (6 - card.grade) * (6 - card.grade);
    } else return acc + 6 * 6;
  }, 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = card.grade
        ? acc.sum + (6 - card.grade) * (6 - card.grade)
        : acc.sum + 6 * 6;
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  // console.log('test: ', sum, rand, res)

  return cards[res.id + 1];
};
