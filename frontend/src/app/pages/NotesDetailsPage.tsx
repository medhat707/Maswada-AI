import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useCallback, useEffect, useState } from "react";
import type { AutoSaveState, Note } from "@/types";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { AutoSaveIndicator } from "@/components/common/AutoSaveIndicator";
import { useAutoSave } from "@/hooks/useAutoSave";
import useAIFeatures from "@/hooks/useAIFeatures";


function NotesDetailsPage() {


    const [note, setNote] = useState<Note | null>(null);
    const { getNoteById, updateNote, deleteNote} = useNotesAPI();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const[userEdited, setUserEdited] = useState(false);
    const {translate} = useAIFeatures();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setNote((prev) => prev? { ...prev, title: e.target.value} : null);
        setUserEdited(true);
        setAutoSaveStatus("unsaved");

    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setNote((prev) => prev? { ...prev, content: e.target.value} : null);
        setUserEdited(true);
        setAutoSaveStatus("unsaved");
    }

    const handleSave = useCallback( async()=>{
        if (!note) return;
        setAutoSaveStatus("saving");
        await updateNote(note.id, {title: note.title, content: note.content});
        setUserEdited(false);
        setAutoSaveStatus("saved");
        toast.success("Note saved successfully");
    }, [note, updateNote])
    
    // handling autosave
    const { autoSaveStatus, setAutoSaveStatus } = useAutoSave({ note, userEdited, handleSave });


    const handleDeleteClick = async()=>{
        if (!note) return;
        await deleteNote(note.id);
        navigate(-1);
        toast.success("Note deleted successfully");
    }
            

    // adding ai feature: translate
    const handleTranslate  = async()=>{
        if (!note) return;
        const result = await translate({noteId: note.id})
        if(result){
            setNote(prev=> prev? {...prev, content: result} : null);
            setUserEdited(true);
            setAutoSaveStatus("unsaved");
            toast.success("Note saved successfully");
            return
        }

        toast.error("Failed to translate note");

    }

    useEffect(() => {
        const fetchNote = async ()=> {
            if (!id) return;
            const note = await getNoteById(id);
            if (note) {
                setNote(note);
            }
        };

        fetchNote();
    }, [ getNoteById, id]);





    return (



        <GlassCard className="flex flex-col gap-4 p-4">
            <div className="justify-between flex justify-between">
                <div className="flex gap-2 items-center">
                <Button variant="outline" className="cursor-pointer" onClick={handleBackClick}><ArrowLeft />Back</Button>
                <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
                </div>
                <DeleteDialog   
                    buttonText="Delete Note" 
                    title="Delete Note" 
                    description="This will permanently delete this note." 
                    handleDelete={handleDeleteClick} />

            </div>
            <div>
                <Button onClick={handleTranslate}><Languages />Translate</Button>
            </div>
            <div className="flex flex-col gap-4">
                <Textarea 
                value={note?.title || ""}  
                className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0" 
                placeholder="title" 
                onChange={handleTitleChange} />
                <Textarea 
                value={note?.content || ""}  
                className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]" 
                placeholder="content"
                onChange={handleContentChange}  />
            </div>

        </GlassCard>


    )

}


export default NotesDetailsPage;