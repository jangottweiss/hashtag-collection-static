import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { Link } from "gatsby"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const Posts = edges
    .filter(edge => true) // You can filter your posts based on some criteria
    .map(edge => (
      <Link key={edge.node.id} to={edge.node.frontmatter.path}>
        <ListItem  key={edge.node.id} button>
          <ListItemText primary={`${edge.node.frontmatter.title} (${edge.node.frontmatter.hashtags.length})`} />
        </ListItem>
      </Link>

    ))

  return (
    <Layout>
      <List component="nav" aria-label="main mailbox folders">
        {Posts}
      </List>
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