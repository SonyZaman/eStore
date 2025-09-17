'use client';

interface Vendor {
  id: number;
  name: string;
  email: string;
  storeName: string;
  storeDescription: string;
  contactNumber: string;
  address: string;
}

interface StoreProfileProps {
  vendor: Vendor;
  currentEmail: string;
}

const StoreProfile = ({ vendor, currentEmail }: StoreProfileProps) => {
  return (
    <div className="bg-white shadow rounded-lg mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Store Profile</h3>
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Owner Name:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Contact:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.contactNumber}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Store Name:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.storeName}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.storeDescription || 'No description provided'}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Address:</span>
              <p className="mt-1 text-sm text-gray-900">{vendor.address || 'No address provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;