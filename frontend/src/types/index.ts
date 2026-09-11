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

type AutoSaveState = "initial" | "saving" | "saved" | "unsaved";

type CreateTranslateDTO = {
    noteId?: string;
    content?: string;
}

type CreateTranslateResponseDTO = {
    result: string;
}

type CreateSummaryDTO = {
    noteId?: string;
    content?: string;
}

type CreateSummaryResponseDTO = {
    result: string;
}

export type {Note, CreateNoteDTO, UpdateNoteDTO, AutoSaveState, CreateTranslateDTO, CreateTranslateResponseDTO, CreateSummaryDTO, CreateSummaryResponseDTO};