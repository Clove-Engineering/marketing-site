import PlasmicLoader from "@plasmicapp/loader";
import React, {useState} from "react";

/**
 * This component is a wrapper for the Header component so that the menuIcon toggles the Header open or closed
 */
const Header = (props) => {
    const [open, setOpen] = useState(false)

    return (
        <PlasmicLoader
            component="Header"
            componentProps={{
                ...props,
                open: open,
                menuIcon: {
                    props: {
                        onClick: () => setOpen(!open),
                    }
                }
            }}
        />
    )
}

export default Header;