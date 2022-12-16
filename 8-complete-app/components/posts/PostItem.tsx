import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../helper/types';
import classes from './PostItem.module.css'

export default function PostItem({ post }: { post: BlogPost }) {

    const readableDate = new Date(post.date).toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })

    return (
        <li className={classes.post}>
            <Link href={`/posts/${post.slug}`}>
                <div className={classes.image}>
                    <Image
                        src={`/images/posts/${post.slug}/${post.image}`}
                        alt={post.title}
                        priority
                        sizes="100%"
                        fill/>
                </div>
                <div className={classes.content}>
                    <h3>{post.title}</h3>
                    <time>{readableDate}</time>
                    <p>{post.excerpt}</p>
                </div>
            </Link>
        </li>
    )
}
