import React from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
const Tags = ({ pageContext, data }) => {
    const { category } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} tag group${
        totalCount === 1 ? "" : "s"
        } tagged with "${category}"`
    return (
        <div>
            <h1>{tagHeader}</h1>
            <ul>
                {edges.map(({ node }) => {
                    // const { slug } = node.fields
                    const { title, path } = node.frontmatter
                    return (
                        <li key={title}>
                            <Link to={path}>{title}</Link>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Tags
export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000      
      filter: { frontmatter: { category: { in: [$category] } } }
    ) {
      totalCount
      edges {
        node {     
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`