import {API_BASE_URL} from "@/lib/utils"
import type { CreateSummaryDTO, CreateSummaryResponseDTO, CreateTranslateDTO, CreateTranslateResponseDTO } from "@/types";
import { useAuth } from "@clerk/clerk-react";


export function useAIFeatures(){

        const { getToken } = useAuth();

        const translate = async (note: CreateTranslateDTO) => {
    
        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/ai/translate', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

        const data: CreateTranslateResponseDTO  = await response.json();
        return data.result;
    };

    const summarize = async (note: CreateSummaryDTO) => {
    
        const token = await getToken();
        if (!token) {
            throw new Error("User is not authenticated");
        }

        const response = await fetch(API_BASE_URL + '/api/ai/summarize', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })

        const data: CreateSummaryResponseDTO  = await response.json();
        return data.result;
    };
    return {translate, summarize};

} 

export default useAIFeatures;