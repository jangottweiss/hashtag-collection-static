module.exports = {
  siteMetadata: {
    title: `Hashtags`,
    description: `Static Gatsby Hashtag App`,
    author: `@jan`,
  },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Hashtag Selection",
        short_name: "Hashtags",
        start_url: `/categories`,
        background_color: `#20638c`,
        theme_color: `#20638c`,
        display: `minimal-ui`,
        icon: `src/images/icons/icon-512x512.png`, // This path is relative to the root of the site.        
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
