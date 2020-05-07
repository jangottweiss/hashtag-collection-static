const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const tagTemplate = path.resolve("src/templates/post.js")
  const categoryTemplate = path.resolve("src/templates/category.js")

  const result = await graphql(`
    {
      tagRemark: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      categoryGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `)
  if (result.errors) {
    console.error(result.errors)
  }

  const posts = result.data.tagRemark.edges
  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: tagTemplate,
    })
  })

  const categories = result.data.categoryGroup.group
  categories.forEach(cat => {
    createPage({
      path: `/category/${_.kebabCase(cat.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: cat.fieldValue,
      },
    })
  })
}