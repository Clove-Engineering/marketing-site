import PlasmicLoader from "@plasmicapp/loader";
import React from "react";
import styles from "../../styles/Actions.module.css"

/**
 * This component is a wrapper for the Header component so that the menuIcon toggles the Header open or closed
 */
const Actions = (props) => {
  return (
    <PlasmicLoader
      component="Actions"
      componentProps={{
        ...props,
        action1: {
          props: {
            children: <>Purchase from <a className={styles.action_link} href="/partners">businesses assessed by Clove</a></>,
          }
        },
        action2: {
          props: {
            children: <><a className={styles.action_link} href="/contact">Encourage</a> your favourite local business to get assessed</>,
          }
        }
      }}
    />
  )
}

export default Actions;