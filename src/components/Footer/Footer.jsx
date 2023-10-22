import Button from '../button/button';
import { Link } from 'react-router-dom';
import './Footer.scss'

const Footer = () => {
  return (
    <div
      style={{
        minHeight: 350,
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
            
          }}
          className='flex-wrap ps-4 pe-4 top-footer-container'
        >
          <div>
            <h5 className='fw-bold mb-3'>Save 10%</h5>
            <div className='fs-5'>Keep up to date on our new collections.</div>
            <form className='fs-5'>
              <div className='mb-3'>
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
            <h5 className='fw-bold mb-3'>
              <Link to='all'>Shop</Link>
            </h5>
            <div className='fs-5'>
              <Link to='themes'>Themes</Link>
            </div>
            <div className='fs-5'>
              <Link to='seasonal'>Seasonal</Link>
            </div>
            <div className='fs-5'>
              <Link to='mens'>Mens</Link>
            </div>
            <div className='fs-5'>
              <Link to='womens'>Womens</Link>
            </div>
          </div>
          <div>
            <h5 className='fw-bold mb-3'>Brand</h5>
            <div className='fs-5'>About Us</div>
            <div className='fs-5'>Contact</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: 'solid 1px #d9d9d9' }}>
        <div className='container'>
          <div
            className=' d-flex flex-wrap flex-column ps-4 pe-4'
            style={{
              gap: '1rem',
              paddingTop: '.5rem',
              paddingBottom: '.5rem',
              height: '100%',
            }}
          >
            <div className='d-flex fs-5 bottom-footer-container'>
              <a href='/#'>
                <Button type='submit' buttonType='small'>
                  Back To Top
                </Button>
              </a>

              <div className='d-flex'>
                <div className='me-3 text-decoration-underline text-nowrap text-center'>
                  Terms of Service
                </div>
                <div className='text-decoration-underline text-nowrap'>
                  Privacy Policy
                </div>
              </div>
            </div>
            <div className='d-flex align-items-center'>
              <div className='text-secondary flex-fill d-flex align-items-center'>
                <div className=''>$ USD &#183; EN</div>
              </div>
              <div>Copyright 2023. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
