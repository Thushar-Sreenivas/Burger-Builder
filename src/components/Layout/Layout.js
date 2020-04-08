import React from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import classes from '../Layout/Layout.css'

const layout = ( props ) => (
    <Auxiliary> 
    <div>Toolbar, Sidedrawer, Backdrop</div>
    <main className={classes.content}>
        {props.children}
    </main>
    </Auxiliary>   
)

export default layout