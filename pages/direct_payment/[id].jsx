import DirectPayments from './DirectPayments'
import { useRouter } from 'next/router';
const DirectPayment = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <DirectPayments courseId={id}></DirectPayments>
    )
}

export default DirectPayment;