import Button from '../button/button';

const Footer = () => {
  return (
    <div
      style={{
        height: 350,
        width: '100vw',
        backgroundColor: '#eee',
        borderTop: 'solid 1px #d9d9d9',
        color: '#161625',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div className='container d-flex flex-column' style={{ height: '70%' }}>
        <div
          style={{
            paddingTop: '2rem',
            paddingBottom: '2rem',
            gap: '3rem',
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          className='flex-wrap'
        >
          <div>
            <h5 className='fw-bold mb-3'>Save 10%</h5>
            <div className='fs-5'>Keep up to date on our new collections.</div>
            <form className='fs-5'>
              <div class='mb-3'>
                <input
                  type='email'
                  placeholder='Enter your email address'
                  className='form-control mb-3 mt-2'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                />
                <Button type='submit' buttonType='small'>
                  Submit
                </Button>
              </div>
            </form>
          </div>
          <div></div>
          <div></div>
          <div>
            <h5 className='fw-bold mb-3'>Shop</h5>
            <div className='fs-5'>All</div>
            <div className='fs-5'>Themes</div>
            <div className='fs-5'>Seasonal</div>
            <div className='fs-5'>Mens</div>
            <div className='fs-5'>Womens</div>
          </div>
          <div>
            <h5 className='fw-bold mb-3'>Brand</h5>
            <div className='fs-5'>About Us</div>
            <div className='fs-5'>Contact</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: 'solid 1px #d9d9d9' }}>
        <div
          className='container d-flex flex-wrap flex-column'
          style={{
            gap: '1rem',
            paddingTop: '.5rem',
            paddingBottom: '.5rem',
            height: '100%',
          }}
        >
          <div className='d-flex justify-content-end fs-5 '>
            <div className='me-3 text-decoration-underline'>
              Terms of Service
            </div>
            <div className='text-decoration-underline'>Privacy Policy</div>
          </div>
          <div className='d-flex align-items-center'>
            <div className='text-secondary flex-fill d-flex align-items-center'>
              <Button buttonType='small'>Log in</Button>
              <div className='ms-4'>$ USD &#183; EN</div>
            </div>
            <div>Copyright 2023. All rights reserved.</div>
            {/* <Button buttonType='small'>Back to top</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
