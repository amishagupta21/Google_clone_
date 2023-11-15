import React, { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import { useResultContext } from "../Contexts/ResultContextProvider"

import Links from "./Links"

const Search = () => {
    const [text, setText] = useState('Elon Musk')
    const { setSearchTerm } = useResultContext()
    const [debouncedValue] = useDebounce(text, 300)

    useEffect(() => {
        if (debouncedValue) setSearchTerm(debouncedValue)
    }, [debouncedValue])
    return (
        <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
            <input value={text} type="text" className="sm:w-64 w-48 h-12 dark:bg-gray-200 border rounded-full shadow-sm outline-none pl-6 pr-16 text-black hover:shadow-lg"
                placeholder="search or type URL"
                onChange={(e) => {
                    setText(e.target.value)
                }} />
            {!text && (
                <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 "
                    onClick={() => { setText("") }}>
                    X
                </button>
            )}
            <Links />
        </div>
    )
}
export default Search