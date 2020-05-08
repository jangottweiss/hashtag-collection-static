import React from "react"
import PropTypes from 'prop-types';

// MD Components
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

// Icons
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    empty: {
        textAlign: 'center',
    }
}));

const HashtagChips = ({ tags, selectedTags, onClick }) => {
    const classes = useStyles();
    return (
        <>
            {
                tags.length > 0
                    ? <>
                        <div className={classes.root}>
                            {tags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={`#${tag}`}
                                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                                    onClick={() => onClick(tag)} />
                            ))}
                        </div>
                    </>
                    :
                    <div className={classes.empty}>
                        There aren't any Hashtags... <br />
                        ...but a slice of Pizza! <LocalPizzaIcon></LocalPizzaIcon>
                    </div>
            }
        </>
    )
}

HashtagChips.propTypes = {
    tags: PropTypes.array.isRequired,
    selectedTags: PropTypes.array,
    onClick: PropTypes.func.isRequired,
}

HashtagChips.defaultProps = {
    tags: [],
    selectedTags: [],
};


export default HashtagChips;