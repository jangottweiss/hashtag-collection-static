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


import TagContext from '../components/Context/TagContext'


// Components
import Footer from './footer';
import BottomDrawer from './bottom-drawer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  drawer: {
    padding: theme.spacing(2),
  }
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [value, setValue] = useState([])
  const [drawer, setDrawer] = useState(false)
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
      {tagContext => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} tags={tagContext.tags} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
            }}
          >
            <main>{children}</main>
            <footer>
              <Footer
                onChange={(item) => {
                  console.log(item)
                  if (item[0] === '/') {
                    navigate(item);
                    return;
                  } 
                  if(item === 'tags') {
                    setDrawer(true);
                  }
                }}
              />
              <BottomDrawer 
                open={drawer}
                onClose={() => setDrawer(false)}
              />

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
