"use client";

import { useStoreConfig } from "@/lib/config";
import { getPageClasses, getCardClasses } from "@/lib/theme";

export default function CateringPage() {
  const storeConfig = useStoreConfig();
  const pageClasses = getPageClasses();
  const cardClasses = getCardClasses();

  return (
    <div className={pageClasses.wrapper}>
      <div className={pageClasses.container}>
        <div className="text-center mb-8">
          <h1 className={pageClasses.title}>Catering Services</h1>
          <p className="text-lg text-gray-600">
            Let us cater your next event with our delicious {storeConfig.name} menu!
          </p>
        </div>

        <div className={`${cardClasses.wrapper} mb-8`}>
          <div className={cardClasses.content}>
            <h2 className={cardClasses.header}>Catering Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600">
                  <strong>Phone:</strong> {storeConfig.phone}<br />
                  <strong>Email:</strong> {storeConfig.email}<br />
                  <strong>Address:</strong> {storeConfig.address}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Catering Features</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Custom menu planning for your event</li>
                  <li>• Delivery and setup services</li>
                  <li>• Professional presentation</li>
                  <li>• Dietary accommodation available</li>
                  <li>• Flexible serving options</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimum Orders</h3>
                <p className="text-gray-600">
                  Catering orders require a minimum of 10 people. Please contact us at least 48 hours in advance for catering requests.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600">
            Ready to plan your catering event? Contact us today!
          </p>
        </div>
      </div>
    </div>
  );
}