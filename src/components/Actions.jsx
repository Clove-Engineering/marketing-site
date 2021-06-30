import PlasmicLoader from "@plasmicapp/loader";
import React from "react";

/**
 * This component is a wrapper for the Header component so that the menuIcon toggles the Header open or closed
 */
const Actions = (props) => {
  return (
    <PlasmicLoader
      component="Actions"
      componentProps={{
        ...props,
        action2: {
          props: {
            children: <><a href="/contact">Encourage</a> your favourite local business to get assessed</>,
          }
        }
      }}
    />
  )
}

export default Actions;