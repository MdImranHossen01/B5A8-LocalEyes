'use client';

import { useState } from 'react';
import { PaymentForm } from '@/components/payment/PaymentForm';

interface PaymentModalProps {
  bookingId: string;
  amount: number;
  tourTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentModal({
  bookingId,
  amount,
  tourTitle,
  isOpen,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSuccess = () => {
    setPaymentCompleted(true);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 pt-30 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
            {!paymentCompleted && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            )}
          </div>
          <p className="text-gray-600">
            {tourTitle}
          </p>
        </div>

        {/* Payment Form */}
        <div className="p-6">
          <PaymentForm
            bookingId={bookingId}
            amount={amount}
            onSuccess={handleSuccess}
            onCancel={onClose}
          />
        </div>

      
      </div>
    </div>
  );
}