import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";

import { cardProp } from "@/app/page";

interface cardItemProp {
  cardItem: cardProp;
}

const CardItem = ({ cardItem }: cardItemProp) => {
  return (
    <Card draggable>
      <CardHeader className="flex pb-0 gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-semibold">NextUI</p>
          <p className="text-[12px] text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <CardBody className=" text-neutral-500 text-sm">
        {cardItem?.title}
      </CardBody>
    </Card>
  );
};

export default CardItem;
