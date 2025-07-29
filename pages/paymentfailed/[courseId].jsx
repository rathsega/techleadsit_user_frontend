import { useRouter } from 'next/router';
const DirectPayment = () => {
    const router = useRouter();
    const { courseId } = router.query;
    return (
        <section className="failed-section">
            <img src='/images/payment_gateway/Process-Declined-icon.gif' className="gif-size" />
            <div className="payment-appearance">
                <p className="payment-f-heading">Your Payment has been Failed!!</p>
                <p className="payment-f-para">Your payment could not be processed due to a technical issue. Any debited amount
                    will be refunded within 4-5 business days.</p>
                <button className="retry-btn" onClick={(e) => { router.push('/pay/' + courseId); }}>
                    Retry Payment <img src='/images/payment_gateway/Retry-btn-icon.png' height="14"
                        className="ms-2 Right-plan-arrow" />
                </button>
            </div>
        </section>
    )
}

export default DirectPayment;