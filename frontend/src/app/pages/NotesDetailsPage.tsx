import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Book, Languages } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import useNotesAPI from "@/hooks/useNotesAPI";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import type { Note } from "@/types";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import { AutoSaveIndicator } from "@/components/common/AutoSaveIndicator";
import { useAutoSave } from "@/hooks/useAutoSave";
import useAIFeatures from "@/hooks/useAIFeatures";
import { translationDirection } from "@/lib/utils";
import { DropdownMenuDemo } from "@/components/common/DropdownMenu";


function NotesDetailsPage() {


    const [note, setNote] = useState<Note | null>(null);
    const { getNoteById, updateNote, deleteNote} = useNotesAPI();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const[userEdited, setUserEdited] = useState(false);
    const {translate, summarize, rewrite} = useAIFeatures();
    const intl = useIntl();

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
        toast.success(intl.formatMessage({ id: "noteDetails.savedSuccess" }));
    }, [note, updateNote])
    
    // handling autosave
    const { autoSaveStatus, setAutoSaveStatus } = useAutoSave({ note, userEdited, handleSave });


    const handleDeleteClick = async()=>{
        if (!note) return;
        await deleteNote(note.id);
        navigate(-1);
        toast.success(intl.formatMessage({ id: "noteDetails.deletedSuccess" }));
    }
            

    // adding ai feature: translate
    const handleTranslate  = async()=>{
        if (!note) return;
        const result = await translate({noteId: note.id})
        if(result){
            setNote(prev=> prev? {...prev, content: result} : null);
            setUserEdited(true);
            setAutoSaveStatus("unsaved");
            return
        }

        toast.error(intl.formatMessage({ id: "noteDetails.translateError" }));

    }

    // adding ai feature: summarize notes
    const handleSummary = async()=>{
        if (!note) return;
        const result = await summarize({noteId: note.id})
        if(result){
            setNote(prev=> prev? {...prev, content: result} : null);
            setUserEdited(true);
            setAutoSaveStatus("unsaved");
            return
        }

        toast.error(intl.formatMessage({ id: "noteDetails.summarizeError" }));
    }

    // allow detecting the translated text direction
    const detectTextDirection = useMemo(()=> translationDirection(note?.content || ""),[note?.content])

    // enhancing the note text
    const handleRewriteClick = async(mode: string)=>{
        if (!note) return;
        const result = await rewrite({noteId: note.id , mode})
        if(result){
            setNote(prev=> prev? {...prev, content: result} : null);
            setUserEdited(true);
            setAutoSaveStatus("unsaved");
            return
        }

        toast.error(intl.formatMessage({ id: "noteDetails.rewriteError" }));
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
                <Button variant="outline" className="cursor-pointer" onClick={handleBackClick}><ArrowLeft /><FormattedMessage id="noteDetails.back" /></Button>
                <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
                </div>
                <DeleteDialog
                    buttonText={intl.formatMessage({ id: "noteDetails.deleteNote" })}
                    title={intl.formatMessage({ id: "noteDetails.deleteNote" })}
                    description={intl.formatMessage({ id: "noteDetails.deleteDescription" })}
                    handleDelete={handleDeleteClick} />

            </div>
            <div className="flex items-center gap-4">
                <Button onClick={handleTranslate}><Languages /><FormattedMessage id="noteDetails.translate" /></Button>
                <Button onClick={handleSummary}><Book /><FormattedMessage id="noteDetails.summarize" /></Button>
                <DropdownMenuDemo 
                   handleRewrite={handleRewriteClick}
                />
            </div>
            <div className="flex flex-col gap-4">
                <Textarea 
                value={note?.title || ""}  
                className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 !text-3xl font-bold" 
                placeholder={intl.formatMessage({ id: "noteDetails.titlePlaceholder" })}
                onChange={handleTitleChange} />
                <Textarea 
                dir={detectTextDirection}
                value={note?.content || ""}  
                className="bg-transparent dark:bg-transparent border-none focus-visible:ring-0 min-h-[400px]" 
                placeholder={intl.formatMessage({ id: "noteDetails.contentPlaceholder" })}
                onChange={handleContentChange}  />
            </div>

        </GlassCard>


    )

}


export default NotesDetailsPage;