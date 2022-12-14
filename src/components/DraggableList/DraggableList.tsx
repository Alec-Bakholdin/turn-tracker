import React, { useMemo } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Sortable from "./Sortable";
import "./DraggableList.scss";

export default function DraggableList({
  items,
  setItems,
  mapItem,
  useHandle,
}: {
  items: string[];
  setItems: (arr: string[]) => void | Promise<void>;
  mapItem: (item: string) => React.ReactElement;
  useHandle?: boolean;
}): React.ReactElement {
  const order = useMemo(() => items, [items]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    const oldIndex = order.indexOf(active.id.toString());
    const newIndex = over ? order.indexOf(over.id.toString()) : -1;
    const itemOrder = arrayMove(order, oldIndex, newIndex);
    console.log(itemOrder);
    setItems(itemOrder);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        {order.map((item) => (
          <Sortable key={item} id={item} useHandle={useHandle}>
            {mapItem(item)}
          </Sortable>
        ))}
      </SortableContext>
    </DndContext>
  );
}
