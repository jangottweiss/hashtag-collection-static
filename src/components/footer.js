import React, { useState } from "react"

// MD Components
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// MD Icons
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AllInboxIcon from '@material-ui/icons/AllInbox';

// Components
import StickyFooter from './sticky-footer'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
    },
}));

const Footer = ({onChange}) => {
    const classes = useStyles();

    return (
        <StickyFooter>
            <BottomNavigation
                onChange={(event, newValue) => {
                    onChange(newValue)
                    // setValue(newValue);
                    // if (newValue === 'tags') {
                    //     setDrawer(true);
                    //     return;
                    // }                    
                    // navigate(newValue);

                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction value="/categories" label="Categories" icon={<AllInboxIcon />} />
                <BottomNavigationAction value="/" label="All Groups" icon={<AllInclusiveIcon />} />
                <BottomNavigationAction value="tags" label="Tags" icon={<LocalOfferIcon />} />
            </BottomNavigation>
        </StickyFooter>
    )
}

export default Footer;