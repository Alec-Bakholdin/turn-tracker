import React, { ReactNode } from 'react';
import { arrayMoveImmutable } from 'array-move';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

export default function DraggableList(props: {
  itemIdList: string[];
  renderItem: (id: string, isDragging?: boolean) => ReactNode;
  onUpdateList?: (newList: string[]) => void;
}): React.ReactElement {
  const onDragEnd = (result: DropResult) => {
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    const newList = arrayMoveImmutable(
      props.itemIdList,
      result.source.index,
      result.destination.index
    );

    if (props.onUpdateList) {
      props.onUpdateList(newList);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.itemIdList.map((id, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {props.renderItem(id)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
