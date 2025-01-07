export default function TermsPage() {
  return (
    <div className="min-h-screen ">
      {/* Terms of Service Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using WanderSmart services, you agree to be bound
              by these Terms of Service. If you disagree with any part of the
              terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p>
              WanderSmart provides an AI-powered trip planning platform. We use
              advanced algorithms and artificial intelligence to create
              personalized travel itineraries based on user preferences and
              input.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p>
              To access certain features of the Service, you must create an
              account. You are responsible for maintaining the confidentiality
              of your account and password. You agree to accept responsibility
              for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. User Content
            </h2>
            <p>
              Users may post content such as reviews, comments, and photos. You
              retain all rights to your content, but grant WanderSmart a
              non-exclusive, worldwide, royalty-free license to use, modify, and
              display the content in connection with the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Intellectual Property
            </h2>
            <p>
              The Service and its original content, features, and functionality
              are owned by WanderSmart and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Payment and Refunds
            </h2>
            <p>
              WanderSmart operates on a token-based system. Tokens are
              non-refundable once purchased. We reserve the right to change our
              pricing structure at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p>
              WanderSmart shall not be liable for any indirect, incidental,
              special, consequential or punitive damages resulting from your use
              of the Service or any related travel activities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Governing Law
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws of [Your Jurisdiction], without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              We will provide notice of any significant changes. Your continued
              use of the Service after such modifications constitutes your
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> iamsagarsangwan@gmail.com
              <br />
              <strong>Address:</strong> nhi hai bhai address
            </p>
          </section>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
