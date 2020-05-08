import React from "react"
import * as copy from 'clipboard-copy';

// MD Components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

// Components
import TagContext from '../components/Context/TagContext'
import HashtagChips from './hashtah-chips';


const useStyles = makeStyles((theme) => ({
    drawer: {
        padding: theme.spacing(2),
    }
}));

const BottomDrawer = ({ open, onClose }) => {
    const classes = useStyles();

    return (
        <TagContext.Consumer>
            {tagContext => (
                <Drawer anchor='bottom' open={open} onClose={() => onClose()}>
                    <div className={classes.drawer}>
                        <Button fullWidth onClick={() => copy(tagContext.tags.map(t => `#${t}`).join(' '))} >Copy ({tagContext.tags.length})</Button>
                        <HashtagChips
                            tags={tagContext.tags}
                            selectedTags={tagContext.tags}
                            onClick={(tag) => tagContext.addTag(tag)} />
                    </div>
                </Drawer>
            )}
        </TagContext.Consumer>
    )
}

export default BottomDrawer;