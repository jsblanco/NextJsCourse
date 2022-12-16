import Image from 'next/image';
import classes from './Hero.module.css'

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/jorge-doodle.png" alt="Jorge" width={300} height={300}/>
            </div>
            <h1>Hi! I'm Jorge</h1>
            <p>Welcome to my humble miniature showcase. I mostly paint 40k models and Historicals, especially romans!</p>
        </section>
    )
}
