import React from 'react'
import Menubar from '../../../components/Menubar'

const FAQ = () => {
  return (
    <div className='page'>
      <Menubar heading="Help / FAQs"/>
      <div className="p-4 text-gray-800 dark:text-gray-300 overflow-auto space-y-6">
        <div>
          <h2 className="text-xl font-semibold">1. What is the Parental Control Dashboard?</h2>
          <p>
            The Parental Control Dashboard is a centralized platform that allows parents to monitor, manage, and control their child's digital activity across registered devices. It provides real-time data, controls, reports, and AI-based insights.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">2. How do I add a child and their devices?</h2>
          <p>
            Navigate to the "Children" section, click on "Add Child," enter the required details, and then associate devices using the device identifier shown in the child’s app on their device.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">3. Can I block specific websites or apps?</h2>
          <p>
            Yes, go to the "Controls" section to set restrictions by app category, specific applications, or website domains. You can also define time limits.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">4. What do I do if a device goes offline?</h2>
          <p>
            If a device is offline, data will be synced once it reconnects. You can check the last active timestamp in the "Monitoring" section.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">5. How do I manage my license?</h2>
          <p>
            The "Settings" section includes the License tab where you can view your license key, check expiry status, and upgrade your plan.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">6. Need more help?</h2>
          <p>
            For further assistance, contact our support team via the "Feedback & Support" option in the Settings menu or email us at <a href="mailto:harshitpanwar1327@gmail.com" className="text-blue-500 underline">harshitpanwar1327@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FAQ