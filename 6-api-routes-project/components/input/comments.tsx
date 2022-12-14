import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
    const { eventId } = props;

    const [showComments, setShowComments] = useState(false);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        if (showComments)
            fetch(`/api/comments/${eventId}`)
                .then(response => response.json())
                .then(data => {
                    setShowComments(true);
                    setCommentList(data.comments);
                })
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(console.log)
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler}/>}
            {showComments && <CommentList comments={commentList}/>}
        </section>
    );
}

export default Comments;
