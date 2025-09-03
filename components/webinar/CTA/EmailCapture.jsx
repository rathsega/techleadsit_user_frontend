import React, { useState } from 'react'
// import './EmailCapture.css'

const EmailCapture = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmail('')
  }

  // return (
  //   <div className="email-capture">
  //     <div className="email-content">
  //       <h3 className="email-title">Not Able to Attend the Webinar Session?</h3>
  //       <p className="email-subtitle">
  //         No worries! We'll send the webinar session recording to your inbox.
  //       </p>
        
  //       <form onSubmit={handleSubmit} className="email-form">
  //         <label htmlFor="email" className="email-label">Drop Your mail here</label>
  //         <div className="email-input-group">
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="Enter your email address"
  //             className="email-input"
  //             required
  //           />
  //           <button type="submit" className="email-submit">
  //             Submit Now
  //           </button>
  //         </div>
  //       </form>
  //     </div>
      
  //     <div className="email-image">
  //       <img 
  //         src="https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-07-18/zhGaJqQHAg.png" 
  //         alt="Email illustration"
  //       />
  //     </div>
  //   </div>
  // )
}

export default EmailCapture
