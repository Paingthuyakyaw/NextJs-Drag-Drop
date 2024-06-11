"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { IconCirclePlusFilled } from "@tabler/icons-react";

import { data } from "@/api";
import Column from "@/components/column";

export interface cardProp {
  title: string;
  id: string;
  column: string;
}

export default function Home() {
  const [cards, setCards] = useState<cardProp[]>(data);

  return (
    <section className=" px-12 mt-4">
      <div className=" flex items-center justify-between">
        <h4 className=" text-2xl font-bold">Drag&Drop</h4>
        <div className="">
          <Button color="primary">
            <p>Add to cart</p>
          </Button>
        </div>
      </div>
      <div className=" grid grid-cols-4 gap-5 mt-5">
        <Column cards={cards} column="task" setCards={setCards} title="TASK" />
        <Column cards={cards} column="todo" setCards={setCards} title="TODO" />
        <Column
          cards={cards}
          column="doing"
          setCards={setCards}
          title="IN PROGRESS"
        />
        <Column
          cards={cards}
          column="done"
          setCards={setCards}
          title="Finished"
        />
      </div>
    </section>
  );
}
