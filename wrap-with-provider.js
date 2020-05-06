import React from 'react'
import TagProvider from './src/components/Context/TagProvider'

// eslint-disable-next-line import/prefer-default-export
export default ({ element }) => (
    <TagProvider>{element}</TagProvider>
)