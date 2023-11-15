import React, { createContext, useContext, useState } from "react"

const ResultContext = createContext();
const baseUrl = "https://google-search74.p.rapidapi.com/"

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoadig] = useState(false);
    const [searchTerm, setSearchTerm] = useState('World Cup')

    const getResults = async (type) => {
        setIsLoadig(true)
        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '1a4079a4f7msh90d4e39c7988a1cp104673jsna891e3e0f596',
                'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
            }
        })
        const data = await response.json()
        if(type.includes("/news")){
            setResults(data.entries)
        }else if(type.includes('/images')){
            setResults(data.image_results)
        }else{
            setResults(data.results)
        }
        console.log("data", data)
        setIsLoadig(false)
    }
    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}
export const useResultContext = () => useContext(ResultContext)