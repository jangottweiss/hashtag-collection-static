// Gatsby supports TypeScript natively!
import React, { useRef, useState } from "react"
import TagContext from '../components/Context/TagContext'
// import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import * as copy from 'clipboard-copy';

import Layout from "../components/layout"

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

const CopyPage = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);
    const classes = useStyles();


    function copyToClipboard(tags) {
        debugger;
        copy(tags);
    };


    return (

        <TagContext.Consumer>
            {tagContext => (
                <Layout>
                    {/* <div className={classes.root}>
                        {tagContext.tags.map(tag => (
                            <Chip
                                key={tag}
                                label={`#${tag}`}
                                color={tagContext.tags.includes(tag) ? 'primary' : 'default'}
                                onClick={() => tagContext.addTag(tag)} />
                        ))}
                    </div> */}

                    <div>
                        <Button fullWidth
                            onClick={() => copyToClipboard(tagContext.tags.map(t => `#${t}`).join(' '))}>
                                Copy
                        </Button>
                        {copySuccess}
                    </div>

                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth
                            id="standard-multiline-static"
                            label="Hashtags"
                            multiline
                            ref={textAreaRef}
                            rows={4}
                            value={tagContext.tags.map(t => `#${t}`).join(' ')}
                        />
                    </form>
                </Layout>
            )
            }
        </TagContext.Consumer >
    )
}

export default CopyPage
