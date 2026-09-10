import type { AutoSaveState, Note } from "@/types";
import { useEffect, useState } from "react";


export type Props  = {
    note: Note | null,
    userEdited: boolean,
    handleSave: () => void
}


export function useAutoSave({note, userEdited, handleSave} : Props){

    const[autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveState>("initial")

    useEffect(() => {

            if(!note || !userEdited) return;

            console.log("note changed1 ... ")

            const timeoutId= setTimeout(() => {
                handleSave();
            },2000)

            return () => clearTimeout(timeoutId);

        }, [ note?.title, note?.content, handleSave, userEdited]);

        

        return {autoSaveStatus, setAutoSaveStatus};
}

