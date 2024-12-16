

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-rose-50">


            {/* Privacy Policy Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

                <div className="space-y-8 text-gray-700">
                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                        <p>
                            At WanderSmart, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, such as:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Personal information (e.g., name, email address)</li>
                            <li>Travel preferences and interests</li>
                            <li>User-generated content (e.g., reviews, comments)</li>
                            <li>Payment information (processed securely through third-party providers)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Process transactions and send related information</li>
                            <li>Send you technical notices, updates, and support messages</li>
                            <li>Respond to your comments and questions</li>
                            <li>Personalize your experience using our AI-powered trip planning features</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
                        <p>
                            We may use third-party services to help us operate our business and the website or administer activities on our behalf. These parties are bound by confidentiality agreements and are restricted from using the information for any other purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 mt-2">
                            <li>Access and receive a copy of your personal data</li>
                            <li>Rectify inaccurate personal data</li>
                            <li>Request the deletion of your personal data</li>
                            <li>Object to the processing of your personal data</li>
                            <li>Request restrictions on the processing of your personal data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the Last Updated date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="mt-2">
                            <strong>Email:</strong> privacy@wandersmart.com<br />
                            <strong>Address:</strong> 123 Travel Lane, Adventure City, AC 12345
                        </p>
                    </section>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>
            </div>

            {/* Footer */}

        </div>
    )
}

