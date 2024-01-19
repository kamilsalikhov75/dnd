import type { CSSProperties } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Box } from './box'
import type { DragItem } from './interfaces'
import { ItemTypes } from './item-types'
import { SideBar } from './side-bar'

const styles: CSSProperties = {
  width: 'calc(100% - 300px)',
  height: "100vh",
  position: 'relative',
}

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } }
}

export const Container = () => {
  const [boxes, setBoxes] = useState<
  DragItem[]>([
   {id:'1', top: 20, left: 80, title: 'Drag me around' },
    { id:'2',top: 180, left: 20, title: 'Drag me too' },
  ])

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      console.log(id);
      
      setBoxes(
        boxes.map(box=>{
          if (box.id===id){
            return {...box, left, top}
          }
          return box
        })
      )
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  return (
    <div style={{display:"flex"}}>
      <SideBar setBoxes={setBoxes}/>
      <div ref={drop} style={styles}>
    {boxes.map((box) => {
      const { left, top, title } = box
      return (
        <Box
          key={box.id}
          id={box.id}
          left={left}
          top={top}
        >
          {title}
        </Box>
      )
    })}
  </div>
    </div>
    

  )
}
