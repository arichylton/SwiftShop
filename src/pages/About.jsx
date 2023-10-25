import './About.scss';

const About = () => {
  return (
    <section className='d-flex flex-column' style={{ minHeight: '100vh' }}>
      <div className='d-flex flex-column mt-5'>
        <div>
          <div
            className='pb-4 mb-3'
            style={{
              fontFamily: 'merriweather',
              minWidth: '100vw',
              paddingTop: '120px',
            }}
          >
            <div
              className='fw-bold container'
              style={{
                fontFamily: 'merriweather',
                fontSize: '2.2rem',
              }}
            >
              About Us
            </div>

            <div
              className='container fs-5 pt-3'
              style={{
                lineHeight: '2.2rem',
                borderBottom: 'solid 1px #eee',
                paddingBottom: '40px',
              }}
            >
              Welcome to SwiftShop, your premier destination for seamless online
              shopping. At SwiftShop, we're passionate about simplifying your
              shopping experience. Our user-friendly app offers a diverse range
              of products, from fashion to electronics, all just a tap away.
              We're committed to providing you with the best deals, impeccable
              customer service, and secure, lightning-fast transactions. Join us
              and discover a world of convenience, where shopping is as swift as
              your dreams. SwiftShop - Shop with speed, style, and satisfaction.
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: 100 }}>
          <div
            className='pb-4 mb-3 container w-100'
            style={{
              fontFamily: 'merriweather',
              paddingTop: '60px',
            }}
          >
            <div
              className='fw-bold'
              style={{
                fontFamily: 'merriweather',
                fontSize: '2.2rem',
              }}
            >
              Contact
            </div>
            <div className='d-flex flex-column mb-4'>
              Need help? Send us a message!
            </div>
            <form
              method='post'
              action='/contact#contact_form'
              id='contact_form'
              acceptCharset='UTF-8'
              className='contact-form'
            >
              <input type='hidden' name='form_type' value='contact' />
              <input type='hidden' name='utf8' value='✓' />
              <div className='mb-4'>
                <label htmlFor='ContactFormName'>First name</label>
                <input
                  className='form-input'
                  type='text'
                  name='contact[name]'
                  id='ContactFormName'
                  placeholder='First name'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='ContactFormName'>Email</label>
                <input
                  className='form-input'
                  type='email'
                  name='contact[email]'
                  id='ContactFormEmail'
                  spellCheck='false'
                  autoComplete='off'
                  autoCapitalize='off'
                  placeholder='Email'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='ContactFormName'>Message</label>
                <textarea
                  rows='10'
                  className='form-input'
                  name='contact[body]'
                  id='ContactFormMessage'
                  placeholder='Message'
                />
              </div>
              <button
                type='submit'
                className={`button-container text-nowrap`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
