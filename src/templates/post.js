import React from "react";
import { graphql } from "gatsby";

// MD Components
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';

// Components
import TagContext from '../components/Context/TagContext';
import HashtagChips from '../components/hashtah-chips';

export default function Template(props) {
    const data = props.data;        
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter } = markdownRemark

    return (
        <TagContext.Consumer>
            {tagContext => (
                <Layout>
                    <Button onClick={() => tagContext.addTags(frontmatter.hashtags)}>Add All Tags</Button>
                    <HashtagChips
                        tags={frontmatter.hashtags}
                        selectedTags={tagContext.tags}
                        onClick={(tag) => tagContext.addTag(tag)} />
                </Layout>
            )}
        </TagContext.Consumer>
    )
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