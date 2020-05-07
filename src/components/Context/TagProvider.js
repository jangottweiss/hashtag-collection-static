import React, { useState, useEffect } from 'react'
import TagContext from './TagContext'

const TagProvider = ({ children }) => {
    const [tags, setTags] = useState([])


    const addTag = (tag) => {
        if (tags.includes(tag)) {                  
            setTags([...tags.filter(t => t !== tag)]);
            return;
        }
        setTags([...tags, tag]);
    }


    useEffect(() => {

    }, [tags])

    return (
        <TagContext.Provider
            value={{
                tags,
                addTag,
            }}
        >
            {children}
        </TagContext.Provider>
    )
}

export default TagProvider