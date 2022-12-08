import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext, {
	NotificationStatus,
} from '../../store/notification-context';

function Comments(props) {
	const { eventId } = props;
	const { showNotification } = useContext(NotificationContext);

	const [showComments, setShowComments] = useState(false);
	const [commentList, setCommentList] = useState([]);
	const [loadingComments, setLoadingComments] = useState(false);

	useEffect(() => {
		if (showComments) {
			updateCommentList();
			setShowComments(true);
		}
	}, [showComments]);

	function updateCommentList() {
		setLoadingComments(true);
		fetch(`/api/comments/${eventId}`)
			.then((response) => response.json())
			.then((data) => {
				setCommentList(data.comments);
				setLoadingComments(false);
			});
	}

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData) {
		showNotification({
			title: 'Thank you!',
			message: 'Your comment is being registered for this event.',
			status: NotificationStatus.PENDING,
		});

		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				if (response.ok) return response.json();

				response.json().then((data) => {
					throw new Error(data.message);
				});
			})
			.then((data) => {
				updateCommentList();
				showNotification({
					title: 'Success!',
					message: 'Your comment was added successfully',
					status: NotificationStatus.SUCCESS,
				});
			})
			.catch((error) =>
				showNotification({
					title: 'Something went wrong',
					message: `We were unable to registernyour comment, please try again later. ${
						error.message && 'Error message: ' + error.message
					}`,
					status: NotificationStatus.ERROR,
				})
			);
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && !loadingComments && (
				<CommentList comments={commentList} />
			)}
			{showComments && loadingComments && <p>Loading comments...</p>}
			{showComments && <NewComment onAddComment={addCommentHandler} />}
		</section>
	);
}

export default Comments;
