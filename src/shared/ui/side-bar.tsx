import { DragItem } from "./interfaces"

interface SideBarProps{
    setBoxes:React.Dispatch<React.SetStateAction<DragItem[]>>
}

export const SideBar = ({setBoxes}:SideBarProps)=>{
    return <div style={{width:'300px', background:"#F4F4F4"}}>
        <h1>sidebar</h1>
        <button onClick={()=>{
            setBoxes(prev=>([...prev, {id:Date.now().toString(), top:0, left:0, title:`box ${prev.length}`}]))
        }}>add box</button>
    </div>
}