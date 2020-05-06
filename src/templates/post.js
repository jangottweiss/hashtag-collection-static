import React from "react"
import { graphql } from "gatsby"
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Layout from '../components/layout'

import TagContext from '../components/Context/TagContext'

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

export default function Template(props) {
    const data = props.data;
    const pageContext = props.pageContext;
    const classes = useStyles();
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter } = markdownRemark

    console.log(pageContext);

    return (
        <TagContext.Consumer>
            {tagContext => (
                <Layout>
                    <div className={classes.root}>
                        {frontmatter.hashtags.map(tag => (
                            <Chip 
                                key={tag} 
                                label={`#${tag}`} 
                                color={tagContext.tags.includes(tag) ? 'primary' : 'default'}
                                onClick={() => tagContext.addTag(tag)} />
                        ))}
                    </div>                   
                </Layout>
            )}
        </TagContext.Consumer>
    )
    // return (

    //     // <div className="blog-post">
    //         {/* <h1>{frontmatter.title} ({frontmatter.hashtags.length})</h1>            
    //         {frontmatter.hashtags.map((tag) =>
    //             <Button variant="contained" color="primary">#{tag}</Button>
    //         )} */}
    //         {/* <div
    //             className="blog-post-content"
    //             dangerouslySetInnerHTML={{ __html: html }}
    //         /> */}
    //     {/* </div> */}
    // )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {      
      frontmatter {        
        path
        title
        hashtags
      }
    }
  }
`