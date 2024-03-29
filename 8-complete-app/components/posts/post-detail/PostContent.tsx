import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { BlogPost } from '../../helper/types';
import classes from './PostContent.module.css';
import { PostHeader } from './PostHeader';

export const PostContent = ({ post }: { post: BlogPost }) => {

    const components = {
        p: (paragraph) => {
            const { node } = paragraph;

            if (node.children[0].tagName === 'img') {
                const image = node.children[0];

                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.properties.alt}
                            width={600}
                            height={450}
                        />
                    </div>
                );
            }
            return <p>{paragraph.children}</p>;
        },

        code: (code) => {
            const { className, children } = code;
            const language = className?.split('-')[1]; // className is something like language-js => We need the "js" part here
            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children}
                />
            );
        }

    }

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={`/images/posts/${post.slug}/${post.image}`}/>
            <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
        </article>
    )
}
