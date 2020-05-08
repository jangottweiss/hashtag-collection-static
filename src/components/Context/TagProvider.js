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

    const addTags = (newTags, removeExisting = false) => {
        if (Array.isArray(newTags)) {
            if(removeExisting) {
                const toRemove = newTags.filter(newTag => tags.includes(newTag));
                setTags([...tags, ...newTags.filter(newTag => !tags.includes(newTag))]);
                setTags([...tags.filter(t => !toRemove.includes(t))]);
                return;
            }
            setTags([...tags, ...newTags.filter(newTag => !tags.includes(newTag))]);                                
        }
    }


    useEffect(() => {

    }, [tags])

    return (
        <TagContext.Provider
            value={{
                tags,
                addTag,
                addTags,
            }}
        >
            {children}
        </TagContext.Provider>
    )
}

export default TagProvider