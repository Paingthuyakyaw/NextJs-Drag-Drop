import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { DragEvent } from "react";
import { motion } from "framer-motion";
import { IconTrash } from "@tabler/icons-react";

import DropZone from "./dropzone";

import { cardProp } from "@/app/page";

interface cardItemProp {
  cardItem: cardProp;
  handleDragStart: (e: DragEvent<HTMLDivElement>, id: string) => void;
  deleteCard: (id: string) => void;
}

const CardItem = ({ cardItem, handleDragStart, deleteCard }: cardItemProp) => {
  return (
    <>
      <DropZone beforeId={cardItem.id} column={cardItem.column} />
      <motion.div layout layoutId={cardItem.id}>
        <Card
          className=" relative"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, cardItem.id)}
        >
          <p className=" top-2 z-20 right-2 absolute">
            <Button
              isIconOnly
              className=" cursor-pointer"
              color="danger"
              size="sm"
              variant="light"
              onClick={() => deleteCard(cardItem.id)}
            >
              <IconTrash className=" cursor-pointer" size={20} />
            </Button>
          </p>
          <CardHeader className="flex pb-0 gap-3">
            <Image
              isBlurred
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
              width={40}
            />
            <div className="flex flex-col">
              <p
                className={`text-md  font-semibold  ${SelectColor.get(cardItem.column)} `}
              >
                NextUI
              </p>
              <p className="text-[12px] text-default-500">nextui.org</p>
            </div>
          </CardHeader>
          <CardBody className=" text-neutral-500 text-[12px]">
            {cardItem?.title}
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
};

export default CardItem;

const SelectColor = new Map([
  ["task", "text-danger-500"],
  ["todo", "text-warning-500"],
  ["doing", "text-primary-500"],
  ["done", "text-success-500"],
]);
