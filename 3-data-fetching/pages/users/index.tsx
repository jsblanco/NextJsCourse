export default function UserProfilePage({ user }) {
    return <h1>{user.name}</h1>
}

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    console.log(req, res)

    return {
        props: {
            user: {
                name: 'Jorge'
            }
        }
    }
}
