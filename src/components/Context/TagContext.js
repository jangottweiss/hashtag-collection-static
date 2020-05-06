import React from 'react'

const TagContext = React.createContext({
    tags: [],    
    addTag: () => { },
})

export default TagContext