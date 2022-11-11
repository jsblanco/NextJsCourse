import Link from 'next/link';

export default function ClientsPage() {

	const clients = [
		{ id: 1, name: 'Juanito' },
		{ id: 2, name: 'Jaimito' },
		{ id: 3, name: 'Jorgito' },
		{ id: 4, name: 'Jeremías' },
		{ id: 5, name: 'Jacobo ' },
	];
	return (
		<div>
			<h1>Clients page</h1>
			<ul>
				{clients.map((client) => (
					<li>
						<Link 
						// href={`/clients/${client.id}`}
						href={{
							pathname: '/clients/[id]',
							query: {id: client.id}
						}}
						>{client.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
