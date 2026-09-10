import type { AutoSaveState } from "@/types";
import { CircleAlertIcon, CircleCheckIcon, Loader2Icon } from "lucide-react";

type Props = {
    autoSaveStatus: AutoSaveState;
}

export function AutoSaveIndicator({autoSaveStatus} : Props){


    switch(autoSaveStatus){
        case "saving":
            return  <span className="text-sm text-zinc-500" >
            <Loader2Icon className="size=4"/>
            saving 
            </span>
        case "saved":
            return  <span className="text-sm text-green-500 flex items-center gap-2"> 
            <CircleCheckIcon className="size=4"/>
            saved successfully
            </span>
        case "unsaved":
            return  <span className="text-sm text-orange-500 flex items-center gap-2">
                <CircleAlertIcon className="size=4"/> 
                unsaved 
                 </span>
        case "initial":
        default:
            return null;


    }

 
}