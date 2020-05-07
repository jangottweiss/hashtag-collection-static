import React from 'react'

const TagContext = React.createContext({
    tags: [],    
    addTag: () => { },
    addTags: () => { },
})

export default TagContext