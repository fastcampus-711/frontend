import { CSSProperties } from "react"

export default function MoveArrow({x, y, rotate}: {x:number, y:number, rotate:number}) {

    console.log("X",x)
    console.log("y",y)
    const styles: CSSProperties = {
        transform: `translateX(${x >= 110 ? x-25 : x-10}px) translateY(${y-5}px) rotate(${rotate}deg)`,
        position: "absolute"
    }

    return (
        <div className={`top-0 left-1/2`}
             style={styles}>
            <div className="w-5 h-5 bg-red-500 rounded-full" >
            </div>
         </div>
        
      )
}