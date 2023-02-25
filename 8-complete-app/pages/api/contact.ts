import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body

        if (
            !email?.trim()
            || !email.match(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)
            || !name?.trim()
            || !message?.trim()
        ) return res.status(422).json({ message: 'Missing inputs' })

        const sentEmail = { email: email.trim(), name: name.trim(), message: message.trim() }

        console.log(sentEmail)
        setTimeout(() => {
            return res.status(201).json({ message: 'Email sent succewssfully', email: sentEmail })
        }, 5000)
    }
}
