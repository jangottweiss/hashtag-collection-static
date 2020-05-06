import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostLink from "../components/post-link"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => true) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  return (
    <Layout>
      <div>{Posts}</div>
    </Layout>
  )

}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
      edges {
        node {
          id          
          frontmatter {
            hashtags
            path
            title
          }
        }
      }
    }
  }
`