import type { CreateNoteDTO, Note, UpdateNoteDTO } from "@/types"
import { useAuth } from "@clerk/clerk-react";
import { useCallback, useState } from "react";


const API_BASE_URL = import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:3001';


function useNotesAPI() {

    const { getToken } = useAuth();

    const getAllNotes = useCallback(async () => {
        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/notes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        const data: { notes: Note[] } = await response.json();
        return data.notes;
    }, [getToken]);

    const createNote = async (note: CreateNoteDTO) => {

        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/notes', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

        const data: { note: Note } = await response.json();
        return data.note;
    };


    const getNoteById = useCallback(async (id: string) => {
        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/notes/' + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        const data: { note: Note } = await response.json();
        return data.note;
    }, [getToken]);


    const updateNote = async(id:string, note: UpdateNoteDTO) =>{

        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/notes/' + id, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

        const data: { note: Note } = await response.json();
        return data.note;
    }

    const deleteNote = async(id:string) =>{

        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/notes/' + id, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })

        return response.ok;
    
    }

return {getAllNotes, createNote, getNoteById, updateNote, deleteNote}

}


export default useNotesAPI;
