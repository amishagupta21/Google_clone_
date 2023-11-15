import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultContext } from "../Contexts/ResultContextProvider";
import Loading from "./Loading";

const Results = () => {
  const { getResults, results, searchTerm, isLoading } = useResultContext()
  const location = useLocation()

  useEffect(() => {
    // Disable ESLint warning for the next line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (searchTerm) {
      if (location.pathname === '/videos') {
        getResults(`?query=${searchTerm} videos`);
      } else {
        getResults(`?query=${searchTerm}&num=40`);
      }
    }
    // eslint-disable-next-line
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />
  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ url, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {url.length > 30 ? url.substring(0, 30) : url}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}

        </div>
      )
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ url, title,description }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {title}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {description}
                </p>
              </a>
            </div>
          ))}

        </div>
      )
    case '/news':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ description,links, id,source,title }) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={links?.[0].href} target="_blank" rel="noreferrer" className="hover:underline">
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank" rel="noreferrer">
                        {description}
                  </a>
                </div>
              </a>
            </div>
          ))}

        </div>
      )
    case '/videos':
      return 'SEARCH'
    default:
      return 'ERROR'
  }
}
export default Results