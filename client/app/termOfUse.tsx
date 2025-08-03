export default function TermOfUse() {  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 my-10 text-gray-800" style={{ boxShadow: '1px 5px 5px 5px #ddd' }}>
      <h1 className="text-3xl font-bold mb-2 text-indigo-700 text-center">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-6 text-center"><strong>Last Updated: [Insert Date]</strong></p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">1. Using PalHola</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You must be <strong>18 years or older</strong> to use PalHola.</li>
          <li>You may need to create an account. Please provide accurate and updated information.</li>
          <li>You are responsible for keeping your login information safe. Do not share your account.</li>
          <li>You must follow all laws while using PalHola.</li>
          <li>You agree not to use PalHola to harm others or break any laws.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">2. Privacy</h2>
        <p>
          We take your privacy seriously. Please check our
          <a
            href="/privacy-policy"
            className="text-indigo-600 underline hover:text-indigo-800 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>{" "}
          for details on how we collect, use, and protect your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">3. Content You Share</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You own the content you share, but you give us permission to display or adapt it to run our service.</li>
          <li>You must not post anything illegal, abusive, sexually explicit, or offensive.</li>
          <li>Don’t post content that infringes on someone else’s rights.</li>
          <li>You are responsible for everything you share on PalHola.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">4. User Conduct Rules</h2>
        <p className="mb-1">You <strong>must not</strong>:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Pretend to be someone else or use someone else’s account.</li>
          <li>Harass, threaten, or harm others.</li>
          <li>Share spam or scam content.</li>
          <li>Upload viruses or anything that might harm the platform.</li>
          <li>Record or share private conversations without permission.</li>
          <li>Violate privacy or intellectual property rights.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">5. Subscriptions & Payments</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Some features on PalHola may require a paid subscription.</li>
          <li>Subscriptions renew automatically unless you cancel at least 24 hours before the renewal date.</li>
          <li>PalHola may offer virtual coins. These are non-refundable and can’t be transferred or used outside the app.</li>
          <li>Inactive accounts for more than 3 months may have their coin balance frozen.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">6. Changes to Services</h2>
        <p>
          We may update or change our services or terms. If changes are significant, we’ll post a notice.
          Continuing to use PalHola means you accept the new terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">7. Account Suspension or Termination</h2>
        <p>We may suspend or delete accounts that:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Break these Terms,</li>
          <li>Pose a risk to others, or</li>
          <li>Remain inactive for a long time.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">8. Third-Party Links</h2>
        <p>
          PalHola may link to other websites or services. We are not responsible for what happens on those platforms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">9. Limitation of Liability</h2>
        <p>
          We try to keep our service reliable, but we can’t promise it will always work perfectly.
          PalHola is provided “as-is,” and we are not responsible for data loss, interruptions, or other damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">10. Disputes & Arbitration</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>We’ll first try to solve disputes informally with you.</li>
          <li>Unresolved issues will go to arbitration, not court.</li>
          <li>You give up the right to join a class action.</li>
          <li>You can opt out of arbitration by emailing us within 30 days of agreeing to these Terms.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">11. Other Legal Details</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>These Terms are governed by the laws of [Insert Region].</li>
          <li>If any part is invalid, the rest still applies.</li>
          <li>You can’t transfer your account to anyone else.</li>
          <li>These Terms are the full agreement between you and PalHola.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">12. Contact Us</h2>
        <p>
          If you have questions, email us at{" "}
          <a
            href="mailto:support@palhola.com"
            className="text-indigo-600 underline hover:text-indigo-800 transition"
          >
            support@palhola.com
          </a>.
        </p>
      </section>
    </div>
  )
}
