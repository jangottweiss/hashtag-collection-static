import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import Layout from "../components/layout" 
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, graphql } from "gatsby"

const CategoryPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const Cats = group
    .map(tag => (
      <Link key={tag.fieldValue} to={`/category/${kebabCase(tag.fieldValue)}/`}>
      <ListItem button>
        <ListItemText primary={`${tag.fieldValue} (${tag.totalCount})`} />
      </ListItem>
      </Link >
    ))

return (
  <Layout>
    <List component="nav" aria-label="main mailbox folders">
      {Cats}
    </List>
  </Layout>
)

}
export default CategoryPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`