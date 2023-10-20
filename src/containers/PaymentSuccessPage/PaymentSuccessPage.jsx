const PaymentSuccessPage = () => {
  return (
    <div className='d-flex' style={{minHeight: '55vh', marginTop: '200px', marginBottom: '80px'}}>
      <div style={{ width: '40rem' }}>
        <div>
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
