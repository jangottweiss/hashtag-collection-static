/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

import { navigate } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import TagContext from '../components/Context/TagContext'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = useState([])
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <TagContext.Consumer>
      {tags => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} tags={tags.tags} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main>{children}</main>
            <footer>             
              <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                  console.log(newValue);
                  navigate(newValue);
                  setValue(newValue);
                }}
                showLabels
                className={classes.root}
              >
                <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction value="copy" label="Copy" icon={<FileCopyIcon />} />                
              </BottomNavigation>
            </footer>
          </div>
        </>
      )}
    </TagContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
