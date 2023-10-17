const PaymentSuccessPage = () => {
  return (
    <div className='mt-5 pt-5 d-flex'>
      <div className='card' style={{ width: '40rem' }}>
        <div className='card-body'>
          <h2 className='card-title'>Order placed, thanks!</h2>
          <h5 className='card-subtitle mb-2 text-muted'>
            Confirmation will be sent to your email.
          </h5>
        </div>
      </div>
    </div>
  );
};
export default PaymentSuccessPage;
