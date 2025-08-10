"use client"
import { useStorage } from "@liveblocks/react"
import { colorToCss } from "~/utils";
import LayerComponent from "./LayerComponent";

export default function Canvas(){
    const roomColor = useStorage((root)=>root.roomColor);
    const layerIds = useStorage((root)=>root.layerIds);
    return(
        <div className="flex h-screen w-full">
            <main className="fixed left-0 right-0 h-screen overflow-y-auto ">
                <div
                    style={{
                        backgroundColor:roomColor? colorToCss(roomColor):"#1e1e1e"
                    }}
                    className="h-full w-full touch-none"
                >{
                    layerIds?.map((layerId)=>(
                        <LayerComponent key={layerId} id={layerId} />
                    ))
                }
                    
                </div>
            </main>
        </div>
    );

}