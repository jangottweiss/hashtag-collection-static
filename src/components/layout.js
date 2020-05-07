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
import StickyFooter from './sticky-footer'
import "./layout.css"

import { navigate } from '@reach/router';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Drawer from '@material-ui/core/Drawer';
import Chip from '@material-ui/core/Chip';

import TagContext from '../components/Context/TagContext'

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
              <StickyFooter>
                <BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue === 'tags') {
                      setDrawer(true);
                      return;
                    }
                    console.log(newValue);
                    navigate(newValue);

                  }}
                  showLabels
                  className={classes.root}
                >
                  <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
                  <BottomNavigationAction value="copy" label="Copy" icon={<FileCopyIcon />} />
                  <BottomNavigationAction value="tags" label="Tags" icon={<LocalOfferIcon />} />

                </BottomNavigation>

              </StickyFooter>
              <Drawer anchor='bottom' open={drawer} onClose={() => setDrawer(false)}>
                <div className={classes.chips}>
                  {tags.tags.map(tag => (
                    <Chip key={tag} label={`#${tag}`} color='primary' onClick={() => tags.addTag(tag)} />
                  ))}
                </div>
              </Drawer>
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
