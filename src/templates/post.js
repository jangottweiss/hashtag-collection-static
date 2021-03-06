import React, { useContext, useEffect } from "react";
import { graphql } from "gatsby";
import { useSliderInput } from '../hooks/input-hook';
import { useDebounce } from '../hooks/debounce-hook';

// MD Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Layout from '../components/layout';
import Slider from '@material-ui/core/Slider';

// Components
import TagContext from '../components/Context/TagContext';
import HashtagChips from '../components/hashtah-chips';


const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1.5),
    },
    slider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    }
}));


export default function Template({ data }) {
    const classes = useStyles();

    const tagContext = useContext(TagContext)
    const { markdownRemark } = data
    const { frontmatter } = markdownRemark
    const { hashtags } = frontmatter;

    const { value, bind, setValue } = useSliderInput(hashtags.length - (hashtags.length - tagContext.tags.filter((t) => hashtags.includes(t)).length));
    const debouncedSliderVal = useDebounce(value, 350);

    useEffect(() => {
        console.log('NEW');
        setValue(hashtags.length - (hashtags.length - tagContext.tags.filter((t) => hashtags.includes(t)).length));
    }, [tagContext.tags, hashtags, setValue])

    const getRandomElements = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    const handleRandomSelect = (newNo) => {
        const noSelectedTags = tagContext.tags.filter((t) => hashtags.includes(t)).length;
        const noDiff = newNo - noSelectedTags;
        console.log(noDiff)
        let changes = [];
        if (noDiff === 0) {
            return;
        } else if (noDiff > 0) {
            changes = getRandomElements(
                hashtags.filter((t) => !tagContext.tags.includes(t)),
                noDiff,
            )
            tagContext.addTags(changes);
        } else if (noDiff < 0) {
            changes = getRandomElements(
                tagContext.tags.filter((t) => hashtags.includes(t)),
                Math.abs(noDiff),
            )

            tagContext.addTags(changes, true);
            return;
        }
    }

    useEffect(() => {
        console.log('Slider Changed Debounced');
        handleRandomSelect(debouncedSliderVal);
    }, [debouncedSliderVal]);

    return (
        <TagContext.Consumer>
            {tagContext => (
                <Layout>
                    <Button
                        fullWidth
                        onClick={() => tagContext.addTags(hashtags)}
                        variant="contained"
                        className={classes.button}
                    >
                        Add All Tags
                    </Button>
                    <div className={classes.slider}>
                        <Slider
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={hashtags.length}

                            {...bind}
                        />
                    </div>
                    <HashtagChips
                        tags={hashtags}
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