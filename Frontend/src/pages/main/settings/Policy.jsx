import React from 'react'
import Menubar from '../../../components/Menubar'

const Policy = () => {
  return (
    <div className='page'>
      <Menubar heading="Privacy Policy"/>
      <div className="p-4 text-gray-800 dark:text-gray-300 overflow-auto">
        <p className="text-sm text-gray-500 mb-6">Effective Date: 5th June, 2025</p>

        <p className="mb-6">
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Parental Control application and dashboard. By accessing or using our services, you agree to the collection and use of information in accordance with this policy.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside pl-4">
            <li><strong>Parent/Guardian Information:</strong> Name, email address, account credentials, license details.</li>
            <li><strong>Child Device Information:</strong> Device ID, system information, app usage, screen activity, installed applications, alerts.</li>
            <li><strong>Usage Data:</strong> Log files, session data, access times, device IP address.</li>
            <li><strong>Support Interactions:</strong> Any messages or attachments submitted through support requests or feedback forms.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
          <p>We use collected information for the following purposes:</p>
          <ul className="list-disc list-inside pl-4">
            <li>To provide and maintain our services</li>
            <li>To monitor and analyze child device activity</li>
            <li>To improve performance, features, and user experience</li>
            <li>To respond to inquiries and provide customer support</li>
            <li>To send administrative information and reports</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing and Disclosure</h2>
          <p>We do not sell or rent your personal data. However, we may disclose information in the following circumstances:</p>
          <ul className="list-disc list-inside pl-4">
            <li>With your consent</li>
            <li>To comply with legal obligations or valid legal processes</li>
            <li>To protect the rights, property, and safety of our users or others</li>
            <li>With trusted third-party service providers who assist in operating our services under strict confidentiality agreements</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>We take data protection seriously and implement a variety of security measures to safeguard your personal information, including:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Encryption of sensitive data during storage and transmission</li>
            <li>Role-based access control</li>
            <li>Regular vulnerability assessments and patching</li>
            <li>Secure authentication and login mechanisms</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Data Retention</h2>
          <p>We retain your data only for as long as necessary to fulfill the purposes outlined in this policy or as required by applicable law. Upon account deletion, your data is removed from our systems within a reasonable timeframe.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Access and review your data</li>
            <li>Request corrections to inaccurate data</li>
            <li>Delete your account and associated information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          <p className="mt-2">To exercise these rights, please contact us at <strong>harshitpanwar1327@gmail.com</strong>.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Children's Privacy</h2>
          <p>
            This service is intended for use by parents or legal guardians. We do not knowingly collect personal data from children directly. All child device information is collected under the supervision of the parent/guardian account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>We reserve the right to update this policy as necessary. We will notify you of any material changes via email or through a prominent notice in the application.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>If you have any questions or concerns regarding this Privacy Policy, you may contact us at:</p>
          <a href="mailto:harshitpanwar1327@gmail.com" className="text-blue-500 underline">harshitpanwar1327@gmail.com</a>
        </section>
      </div>
    </div>
  )
}

export default Policy