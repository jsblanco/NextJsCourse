import classes from './comment-list.module.css';

function CommentList({ comments }) {
    return (
        <ul className={classes.comments}>
            {comments?.map(item =>
                <li key={item._id}>
                    <p>{item.text}</p>
                    <div>
                        By <address>{item.name}</address>
                    </div>
                </li>
            )}
        </ul>
    );
}

export default CommentList;
