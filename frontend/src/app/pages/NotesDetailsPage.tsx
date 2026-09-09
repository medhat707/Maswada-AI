import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useEffect, useState } from "react";
import type { Note } from "@/types";


function NotesDetailsPage() {

    const [note, setNote] = useState<Note | null>(null);
    const { getNoteById, updateNote, deleteNote} = useNotesAPI();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const[userEdited, setUserEdited] = useState(false);

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setNote((prev) => prev? { ...prev, title: e.target.value} : null);
        setUserEdited(true)
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
        setNote((prev) => prev? { ...prev, content: e.target.value} : null);
        setUserEdited(true);
    }

    const handleSave = async()=>{
        if (!note) return;
        await updateNote(note.id, {title: note.title, content: note.content});
        setUserEdited(false);
    }

    const handleDeleteClick = async()=>{
        if (!note) return;
        await deleteNote(note.id);
        navigate(-1);
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
                <Button variant="outline" className="cursor-pointer" onClick={handleBackClick}><ArrowLeft />Back</Button>
                <Button variant="destructive" className="cursor-pointer" onClick={handleDeleteClick}><Trash />Delete</Button>

            </div>
            <div className="flex flex-col gap-4">
                <Input 
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
            <div className="cursor-pointer flex justify-end">
                <Button onClick={handleSave} disabled={!userEdited}>Save</Button>
            </div>
        </GlassCard>


    )

}


export default NotesDetailsPage;