type Note = {
    id: string;
    userId: string;
    title: string;
    content: string;
    summary: string | null;
    createdAt: Date;
    updatedAt: Date;
}


type CreateNoteDTO = {
    title: string;
    content: string;
}

type UpdateNoteDTO = {
    title: string;
    content: string;
}

export type {Note, CreateNoteDTO, UpdateNoteDTO};