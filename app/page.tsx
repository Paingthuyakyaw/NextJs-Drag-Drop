"use client";
import { useState } from "react";

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
      <div className="">
        <h4 className=" text-2xl font-bold">Drag&Drop</h4>
      </div>
      <div className=" grid grid-cols-4 gap-5 mt-5">
        <Column cards={cards} column="task" setCards={setCards} title="Task" />
      </div>
    </section>
  );
}
