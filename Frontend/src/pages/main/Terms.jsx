import React from 'react'
import Menubar from '../../components/Menubar'

const Terms = () => {
  return (
    <div className='page'>
      <Menubar heading="Terms of Service"/>
      <div className="p-4 text-gray-800 dark:text-gray-300 overflow-auto">
        <p className="text-sm text-gray-500 mb-6">Effective Date: 5th June, 2025</p>

        <p className="mb-6">
          These Terms of Service (“Terms”) govern your access to and use of the Parental Control web dashboard and desktop application (“Service”). By using our Service, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use the Service.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Use of the Service</h2>
          <p>
            You may use the Service only in compliance with these Terms and all applicable laws. You agree to use the Service solely for monitoring and managing devices under your legal guardianship.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Account Registration</h2>
          <p>
            To use certain features of the Service, you must register an account. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. License</h2>
          <p>
            We grant you a limited, non-exclusive, non-transferable license to use the Service solely for personal, non-commercial purposes in accordance with these Terms and any applicable licensing terms displayed within the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Use the Service for any unlawful or unauthorized purpose</li>
            <li>Access or monitor devices without proper legal guardianship or consent</li>
            <li>Attempt to reverse engineer or compromise the security of the Service</li>
            <li>Interfere with the normal operation of the Service or attempt unauthorized access to systems or data</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Data and Privacy</h2>
          <p>
            Our collection and use of your personal data are governed by our Privacy Policy. By using the Service, you consent to the practices described therein.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Service at any time for violation of these Terms, suspected abuse, or any unlawful activity. Upon termination, all rights granted to you under these Terms will cease immediately.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Disclaimers</h2>
          <p>
            The Service is provided “as is” without warranty of any kind, either express or implied. We do not guarantee uninterrupted or error-free operation, or that the Service will meet your specific needs.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of or inability to use the Service.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Modifications</h2>
          <p>
            We reserve the right to modify or update these Terms at any time. If changes are made, we will notify users through the dashboard or via email. Continued use of the Service after any such changes constitutes your acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>If you have any questions or concerns about these Terms, please contact us at:</p>
          <a href="mailto:harshitpanwar1327@gmail.com" className="text-blue-500 underline">harshitpanwar1327@gmail.com</a>
        </section>
      </div>
    </div>
  )
}

export default Terms