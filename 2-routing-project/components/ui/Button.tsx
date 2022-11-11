import Link from 'next/link';
import { ReactNode } from 'react';
import classes from './button.module.css'

interface ButtonProps {
    children: ReactNode
    link: string
}

export default function Button({ link, children }: ButtonProps) {
    return <Link href={link} className={classes.btn}>{children}</Link>
}
