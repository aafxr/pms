import {DD_Suggestion} from "./dadata";

const apiKey = process.env.REACT_APP_DADATA_API_KEY as string

export type FetchCompanyReturnType = {
    suggestions: DD_Suggestion[]
}

export async function fetchCompanyByINN(inn:string){
    const options: RequestInit = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + apiKey
        },
        body: JSON.stringify({query: inn})
    }
    const res = await fetch('http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party',options)
    const data = await res.json()
    return data as FetchCompanyReturnType
}