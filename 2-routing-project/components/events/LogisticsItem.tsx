import React, { ReactNode } from 'react';
import classes from './LogisticsItem.module.css';

function LogisticsItem({children }: { children: ReactNode }) {

    return (
        <li className={classes.item}>
      <span className={classes.icon}>
      </span>
            <span className={classes.content}>{children}</span>
        </li>
    );
}

export default LogisticsItem;
