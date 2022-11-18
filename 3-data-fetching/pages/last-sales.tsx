import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface Sale {
    id: string,
    username: string,
    volume: string,
}

export default function LastSalesPage(props) {
    const [sales, setSales] = useState<Sale[]>(props.sales);

    // const [isLoading, setIsLoading] = useState(false);
    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
    //         .then(response => response.json())
    //         .then(data => {
    //             const sales = [];
    //             for (const key in data)
    //                 sales.push({ ...data[key], id: key });
    //             setSales(sales);
    //             setIsLoading(false);
    //         });
    // }, [])
    // if (isLoading) return <p>Loading...</p>
    // if (sales.length === 0) return <p>No sales available</p>

    const { data, error, } = useSWR(
        'https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/sales.json',
        (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if (data) {
            const sales = [];
            for (const key in data)
                sales.push({ ...data[key], id: key });
            setSales(sales);
        }
    }, [data])

    if (error) return <p>There was an error loading the last sales</p>
    if (!data && !sales) return <p>Loading...</p>
    if (sales.length === 0) return <p>No sales available</p>

    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>{sale.username}: {sale.volume} units</li>)}
        </ul>
    )
}

export async function getStaticProps() {

    return fetch('https://learningnextjs-39e4f-default-rtdb.europe-west1.firebasedatabase.app/sales.json')
        .then(response => response.json())
        .then(data => {
            const sales = [];
            for (const key in data)
                sales.push({ ...data[key], id: key });
            return {
                // revalidate: 5,
                props: { sales },
            }
        });

}
