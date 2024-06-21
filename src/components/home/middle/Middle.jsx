import React from 'react'
import './Middle.css'

const Middle = () => {
  return (
    <div className='middle'>
      <div className='c1'>
        <div className='featurebox'>
          <h3 className='fb1'>Clinic News</h3>
          <div className='line1'></div>
          <p className='fb1'>
            qwert uiop asdf ghjk lzxc vbnm qwert yuiop asdfg
            hjkl zxcv bnm qwe rtyui op asd fgh hjkl zxc vbn.
          </p>
          <p className='fb1'>
            <button className='fb1button'>Read More</button>
          </p>
        </div>
      </div>
      <div className='c2'>
        <div className='featurebox'>
          <h3 className='fb1'>Top Doctors</h3>
          <div className='line1'></div>
          <p className='fb1'>
            qwerty uiop asdf ghjk lzxc vbnm qwert yuiop asdfg
            hjkl zxcv bnm qwe rtyui op asd fgh hjkl zxc vbn.
          </p>
          <p className='fb1'>
            <button className='fb1button'>Read More</button>
          </p>
        </div>
      </div>
      <div className='c3'>
        <div className='featurebox'>
          <h3 className='fb1'>24/7 Service</h3>
          <div className='line1'></div>
          <p className='fb1'>
            qwerty uiop asdf ghjk lzxc vbnm qwert yuiop asdfg
            hjkl zxcv bnm qwe rtyui op asd fgh hjkl zxc vbn.
          </p>
          <p className='fb1'>
            <button className='fb1button'>Read More</button>
          </p>
        </div>
      </div>
      <div className='c4'>
        <div className='featurebox'>
          <h3 className='fb1'>Opening Hours</h3>
          <div className='line1'></div>
          <p className='fb1'>
          Monday - Friday : 8.00 - 17.00 <br/>
          Saturday : 9.00 - 13.00 <br/>
          Sunday : 14.00 - 17.00 <br/>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Middle