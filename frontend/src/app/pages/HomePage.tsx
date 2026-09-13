import { ArrowUpRight, Filter, Sparkles } from "lucide-react"

import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useAuth, useUser } from "@clerk/clerk-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { FormattedMessage, useIntl } from "react-intl"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useNavigate } from "react-router-dom"



export function HomePage() {


  const {getAllNotes , createNote} = useNotesAPI();
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const intl = useIntl();
  const [searchQuery, setSearchQuery] =  useState("");

  const handleAddNote = async () => {
    const note = await createNote({title: intl.formatMessage({ id: "home.newNoteTitle" }), content: ""});
    navigate(`/notes/${note.id}`);
  }
  

  const handleNoteClick = (id: string) =>{
    navigate(`/notes/${id}`);
  }
 

  // handle search notes
  const handleSearchNotes = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
  } 
  const filteredNotes = useMemo(() => {
    if(!searchQuery.trim()){
      return notes;
    }

    const query = searchQuery.toLowerCase ();
    return notes.filter((note) => 
      note.title.toLowerCase().includes(query)
    )
  }, [notes, searchQuery] )

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    }
    fetchData();
  }, [getAllNotes]);



  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold"><FormattedMessage id="home.myNotes" /></h1>
          <Button onClick={handleAddNote}>
            <Plus />
            <FormattedMessage id="home.addNotes" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground hei" />
          <Input onChange={handleSearchNotes} className="pl-10" placeholder={intl.formatMessage({ id: "home.searchPlaceholder" })} />        
        </div>
        <div className="flex flex-col gap-4">
          {filteredNotes.map((note) => (
            <GlassCard onClick={ ()=>handleNoteClick(note.id)} key = {note.id} className= "p-4 cursor-pointer">
              <h2 className= "text-lg">{note.title}</h2>
            </GlassCard>

        ))}
        </div>
      </GlassCard>

    </div>
  )
}
