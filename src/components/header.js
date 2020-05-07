import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));



const Header = ({ siteTitle, tags }) => {
  const classes = useStyles();
  console.log(tags);
  return (
    <header
      style={{
        background: '#20638C',
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h2 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle} ({tags.length})
          </Link>
        </h2>
        {/* <div className={classes.root}>
          {tags && tags.map(tag => (
            <Chip key={tag} label={`#${tag}`} />
          ))}
        </div> */}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
