import Link from 'next/link';
import { ReactNode } from 'react';
import classes from './button.module.css'

interface ButtonProps {
    children: ReactNode
    onClick?: (event: any) => void,
    link?: string
}

export default function Button({ link, onClick, children }: ButtonProps) {
    return link
        ? <Link href={link} className={classes.btn}>{children}</Link>
        : onClick
            ? <button className={classes.btn} onClick={onClick}>{children}</button>
            : <a className={classes.btn} href="#">{children}</a>
}
