import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';
export default props => {
  return (
    <Droppable direction="horizontal" droppableId="container">
      {(provided, snapshot) => {
        console.log(provided);
        console.log(snapshot);
        return (
          <div
            ref={provided.innerRef}
            className={className(styles['container'], {
              [styles['container-move']]: snapshot.isDraggingOver,
            })}
            {...provided.droppableProps}
          >
            <h2>I am a droppable!</h2>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};