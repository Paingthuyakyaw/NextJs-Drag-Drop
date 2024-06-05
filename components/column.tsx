import { Dispatch, DragEvent, SetStateAction, useState } from "react";
import { Chip, card } from "@nextui-org/react";

import CardItem from "./card";
import DropZone from "./dropzone";

import { cardProp } from "@/app/page";

interface dataProp {
  column: string;
  cards: cardProp[];
  setCards: Dispatch<SetStateAction<cardProp[]>>;
  title: string;
}

type ColorType =
  | "danger"
  | "warning"
  | "primary"
  | "success"
  | "default"
  | "secondary";

const Column = ({ column, cards, setCards, title }: dataProp) => {
  const [active, setActive] = useState<boolean>(false);

  const filterCard = cards.filter((c) => c.column === column);

  // set Color
  const color = SelectColor.get(column) as ColorType | undefined;

  // get Dropzone Indicators
  const getAllIndicators = (): HTMLDivElement[] => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  };

  const getNearestIndicators = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  // dropzope Active State
  const dropZoneActive = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getAllIndicators();

    clearHighlights(e, indicators);
    const el = getNearestIndicators(e, indicators);

    el?.element.classList.add("bg-blue-500");
  };

  const clearHighlights = (
    e: DragEvent<HTMLDivElement>,
    els?: HTMLDivElement[]
  ) => {
    const indicators = els || getAllIndicators();

    indicators.forEach((indicator) => {
      indicator.classList.remove("bg-blue-500");
    });

    const el = getNearestIndicators(e, indicators);

    if (el && el.element) {
      el.element.classList.remove("bg-blue-500");
    }
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("cardId", id);
    setActive(true);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dropZoneActive(e);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    clearHighlights(e);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getAllIndicators();
    const el = getNearestIndicators(e, indicators);

    const beforeId = el.element.dataset.before;

    if (beforeId !== cardId) {
      // const updateCard = [...cards];

      const findCard = cards.find((c) => c.id === cardId);

      if (!findCard) return;
      let updateCardColumn: cardProp = { ...findCard, column };

      if (!updateCardColumn) return;

      const newCard = cards.filter((c) => c.id !== updateCardColumn.id);

      const equalBeforeID = beforeId === "-1";

      if (equalBeforeID) {
        newCard.push(updateCardColumn || []);
      } else {
        const insertIndex = newCard.findIndex((c) => c.id === beforeId);

        newCard.splice(insertIndex, 0, updateCardColumn);
      }

      setCards(newCard);
    }
  };

  return (
    <div className="">
      <div className=" border-b-2 pb-2 flex items-center justify-between">
        <h5 className=" text-neutral-700 text-left font-bold">{title}</h5>
        <Chip color={color} size="sm" variant="flat">
          {filterCard.length}
        </Chip>
      </div>
      <div
        className=" h-full  pt-5 space-y-3"
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {filterCard.map((cardItem) => (
          <CardItem
            key={cardItem.id}
            cardItem={cardItem}
            handleDragStart={handleDragStart}
          />
        ))}
        <DropZone beforeId={null} column={column} />
      </div>
    </div>
  );
};

export default Column;

const SelectColor = new Map<string, ColorType>([
  ["task", "danger"],
  ["todo", "warning"],
  ["doing", "primary"],
  ["done", "success"],
]);
