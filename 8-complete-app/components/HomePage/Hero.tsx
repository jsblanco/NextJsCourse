import Image from 'next/image';
import classes from './Hero.module.css'

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src="/images/site/jorge.png" alt="Jorge" width={300} height={300}/>
            </div>
            <h1>Hi! I'm Jorge</h1>
            <p>I blog about stuff I like, like frontend dev and 40k</p>
        </section>
    )
}
