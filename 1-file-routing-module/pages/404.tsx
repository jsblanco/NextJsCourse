import { useRouter } from 'next/router';

export default function ErrorPage() {
	const router = useRouter();
	console.log(router.query.missingPg);

	return (
		<div>
			<h1>This URL does not exist</h1>
		</div>
	);
}
