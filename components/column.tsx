import { Dispatch, SetStateAction } from "react";

import { cardProp } from "@/app/page";

import { Chip } from "@nextui-org/react";
import CardItem from "./card";

interface dataProp {
  column: string;
  cards: cardProp[];
  setCards: Dispatch<SetStateAction<cardProp[]>>;
  title: string;
}

const Column = ({ column, cards, setCards, title }: dataProp) => {
  const filterCard = cards.filter((c) => c.column === column);

  return (
    <div className="">
      <div className=" border-b-2 pb-2 flex items-center justify-between">
        <h5 className=" text-neutral-700 text-left font-bold">{title}</h5>
        <Chip variant="flat" color="danger" size="sm">
          {filterCard.length}
        </Chip>
      </div>
      <div className=" space-y-2 mt-5">
        {filterCard.map((cardItem) => (
          <CardItem key={cardItem.id} cardItem={cardItem} />
        ))}
      </div>
    </div>
  );
};

export default Column;
