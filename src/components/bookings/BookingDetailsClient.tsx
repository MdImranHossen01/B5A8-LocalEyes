/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PaymentModal } from "../payment/PaymentModal";
import Image from "next/image";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

interface Booking {
  _id: string;
  tourist: {
    _id: string;
    name: string;
    profilePic?: string;
    email: string;
  } | null;
  name?: string;
  email?: string;
  phone?: string;
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    meetingPoint: string;
    duration: number;
    tourFee: number;
  };
  date: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  numberOfPeople: number;
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "refunded";
  specialRequests?: string;
  createdAt: string;
}

interface BookingDetailsClientProps {
  booking: Booking;
}

export function BookingDetailsClient({ booking }: BookingDetailsClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [status, setStatus] = useState(booking.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const isGuide = !!(user?.id && booking.guide && user.id === booking.guide._id);
  const isOwnBooking =
    !booking.tourist ||
    (!!user?.id && !!booking.tourist && user.id === booking.tourist._id) ||
    isGuide;
  const canManage = user?.role === "admin" && booking.status === "pending";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-redNote:800 border-red-200",
    };
    return (
      colors[status as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const handleStatusUpdate = async (newStatus: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to mark this booking as ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, proceed',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl font-semibold px-4 py-2',
        cancelButton: 'rounded-xl font-semibold px-4 py-2',
      }
    });

    if (!result.isConfirmed) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${booking._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus as any);
        toast.success(`Booking status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("An error occurred while updating the booking");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const escapeHtml = (str: string) => {
      if (typeof str !== 'string') return str;
      return str.replace(/[&<>"']/g, (m) => {
        switch (m) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#039;';
          default: return m;
        }
      });
    };

    const formattedBookingDate = new Date(booking.createdAt || Date.now()).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formattedTourDate = formatDate(booking.date);

    const bookingId = escapeHtml(booking._id.substring(0, 8).toUpperCase());
    const customerName = escapeHtml(booking.tourist?.name || booking.name || 'Traveler');
    const customerEmail = escapeHtml(booking.tourist?.email || booking.email || 'N/A');
    const customerPhone = booking.phone ? escapeHtml(booking.phone) : '';
    const tourTitle = escapeHtml(booking.tour.title);
    const meetingPoint = escapeHtml(booking.tour.meetingPoint);
    const duration = escapeHtml(String(booking.tour.duration));
    const paymentStatus = escapeHtml(booking.paymentStatus);

    const invoiceContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${bookingId}</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; background: #fff; }
            .invoice-box { max-width: 750px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 25px; }
            .logo { font-size: 22px; font-weight: bold; color: #2563eb; font-style: italic; }
            .invoice-title { font-size: 20px; font-weight: 700; color: #0f172a; text-align: right; }
            .invoice-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
            .info-grid { display: flex; justify-content: space-between; margin-bottom: 30px; gap: 20px; }
            .info-col { flex: 1; }
            .info-col h4 { margin: 0 0 10px 0; color: #2563eb; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
            .info-col p { margin: 4px 0; font-size: 14px; color: #334155; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 30px; }
            table th { background-color: #f8fafc; color: #475569; font-size: 13px; font-weight: 600; text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; }
            table td { padding: 14px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #334155; }
            .total-section { display: flex; justify-content: flex-end; margin-top: 20px; }
            .total-table { width: 280px; }
            .total-table div { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
            .total-table .grand-total { border-top: 2px solid #2563eb; padding-top: 10px; margin-top: 6px; font-size: 18px; font-weight: bold; color: #2563eb; }
            .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
            .badge-paid { background: #dcfce7; color: #15803d; }
            .badge-pending { background: #fef9c3; color: #a16207; }
            .footer { margin-top: 40px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <div class="logo">Khulna Tours & Travels</div>
              <div>
                <div class="invoice-title">BOOKING INVOICE</div>
                <div class="invoice-sub">Invoice #${bookingId}</div>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-col">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                ${customerPhone ? `<p><strong>Phone:</strong> ${customerPhone}</p>` : ''}
              </div>
              <div class="info-col" style="text-align: right;">
                <h4>Booking Info</h4>
                <p><strong>Booking Date:</strong> ${formattedBookingDate}</p>
                <p><strong>Tour Date:</strong> ${formattedTourDate}</p>
                <p><strong>Payment Status:</strong> 
                  <span class="badge ${booking.paymentStatus === 'paid' ? 'badge-paid' : 'badge-pending'}">
                    ${paymentStatus}
                  </span>
                </p>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Item / Tour Title</th>
                  <th>People</th>
                  <th>Price / Person</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>${tourTitle}</strong><br/>
                    <span style="font-size: 12px; color: #64748b;">Meeting Point: ${meetingPoint} | Duration: ${duration} hrs</span>
                  </td>
                  <td>${booking.numberOfPeople}</td>
                  <td>${formatCurrency(booking.tour.tourFee)}</td>
                  <td style="text-align: right;">${formatCurrency(booking.totalAmount)}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-section">
              <div class="total-table">
                <div><span>Subtotal:</span> <span>${formatCurrency(booking.totalAmount)}</span></div>
                <div class="grand-total"><span>Total Amount:</span> <span>${formatCurrency(booking.totalAmount)}</span></div>
              </div>
            </div>

            <div class="footer">
              <p>Thank you for booking with Khulna Tours & Travels!</p>
              <p style="font-size: 11px;">This is a computer-generated invoice and requires no signature.</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(invoiceContent);
    printWindow.document.close();
  };

  if (!isOwnBooking && user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-8">
            You don&apos;t have permission to view this booking.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Top Banner Header */}
      <div className="bg-white border-b border-slate-200/80 shadow-xs mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-blue-600 mb-4 transition-colors group cursor-pointer"
          >
            <span className="mr-1 group-hover:-translate-x-0.5 transition-transform">←</span> Back to Dashboard
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Booking Details
                </h1>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                  #{booking._id.substring(0, 8).toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                Booked on {new Date(booking.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold border capitalize shadow-2xs ${getStatusColor(
                  status
                )}`}
              >
                <span className="w-2 h-2 rounded-full mr-2 animate-pulse bg-current"></span>
                {status}
              </div>

              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span>📄</span> Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Hero Highlight Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
              <div className="relative h-48 sm:h-56 w-full bg-slate-100">
                <Image
                  src={booking.tour.images?.[0] || "/profile.jpg"}
                  alt={booking.tour.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-blue-600/90 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-0.5 rounded-md mb-2 inline-block">
                    Tour Package
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {booking.tour.title}
                  </h2>
                </div>
              </div>

              {/* Tour Key Stats Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">📅 Date</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                      {new Date(booking.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">⏰ Time</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">
                      {new Date(booking.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">⏱️ Duration</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">
                      {booking.tour.duration} Hours
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium mb-1">👥 Group Size</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">
                      {booking.numberOfPeople} Persons
                    </p>
                  </div>
                </div>

                <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Meeting Point
                    </h3>
                    <div className="flex items-start gap-2.5 text-slate-800 text-sm bg-blue-50/50 p-3 rounded-xl border border-blue-100/60">
                      <span className="text-blue-600 text-base mt-0.5">📍</span>
                      <span className="font-medium">{booking.tour.meetingPoint}</span>
                    </div>
                  </div>

                  {canManage && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Host Actions
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate("confirmed")}
                          disabled={isUpdating}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Accept Booking
                        </button>
                        <button
                          onClick={() => handleStatusUpdate("cancelled")}
                          disabled={isUpdating}
                          className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Payment & Financial Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>💳</span> Payment Summary
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${booking.paymentStatus === "paid"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : booking.paymentStatus === "refunded"
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                >
                  {booking.paymentStatus}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Price per person ({booking.numberOfPeople}x)</span>
                  <span className="font-medium text-slate-900">{formatCurrency(booking.tour.tourFee)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Service & Taxes</span>
                  <span className="font-medium text-emerald-600">Included</span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-base">Total Amount</span>
                  <span className="font-extrabold text-xl text-blue-600">{formatCurrency(booking.totalAmount)}</span>
                </div>
              </div>

              {booking.status === "confirmed" &&
                booking.paymentStatus === "pending" &&
                user?.id && booking.tourist &&
                user.id === booking.tourist._id && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>💳</span> Pay Now ({formatCurrency(booking.totalAmount)})
                    </button>
                  </div>
                )}
            </div>

            {/* Special Requests if present */}
            {booking.specialRequests && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Special Requests / Notes
                </h3>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/60 italic leading-relaxed">
                  &ldquo;{booking.specialRequests}&rdquo;
                </p>
              </div>
            )}

            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span>💬</span> Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traveler Card */}
                <div className="p-4 border border-slate-200/80 rounded-xl bg-slate-50/50">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className="font-semibold text-slate-900 text-sm truncate">
                        {booking.tourist?.name || booking.name || "Traveler"}
                      </h4>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                        Customer
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      ✉️ {booking.tourist?.email || booking.email}
                    </p>
                    {booking.phone && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        📞 {booking.phone}
                      </p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Quick Actions Panel */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-2.5">
                <button
                  onClick={() => router.push(`/tours/${booking.tour._id}`)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg group-hover:bg-blue-200 transition-colors">👁️</span>
                    <span>View Tour Listing</span>
                  </div>
                  <span>→</span>
                </button>

                <button
                  onClick={() => {
                    const targetId = isGuide ? booking.tourist?._id : booking.guide._id;
                    if (targetId) router.push(`/profile/${targetId}`);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-purple-100 text-purple-700 rounded-lg group-hover:bg-purple-200 transition-colors">👤</span>
                    <span>View Host Profile</span>
                  </div>
                  <span>→</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200/80 hover:bg-slate-50 text-slate-700 transition-all text-xs font-semibold group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-slate-100 text-slate-700 rounded-lg">📄</span>
                    <span>Download Invoice (PDF)</span>
                  </div>
                  <span>↓</span>
                </button>

                {status === "pending" && isGuide && (
                  <button
                    onClick={() => handleStatusUpdate("cancelled")}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 transition-all text-xs font-semibold cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">❌</span>
                      <span>Cancel Request</span>
                    </div>
                  </button>
                )}

                {status === "confirmed" && (
                  <button
                    onClick={() => handleStatusUpdate("completed")}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all text-xs font-semibold cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">✅</span>
                      <span>Mark as Completed</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Vertical Timeline Node List */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Booking Progress
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Node 1 */}
                <div className="relative">
                  <div className="absolute -left-[1.85rem] top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Booking Created</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>

                {/* Node 2 */}
                <div className="relative">
                  <div className={`absolute -left-[1.85rem] top-0.5 w-3.5 h-3.5 rounded-full ring-4 ring-white ${status === "confirmed" || status === "completed" ? "bg-emerald-500" : "bg-amber-400"
                    }`}></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      {status === "confirmed" || status === "completed" ? "Booking Confirmed" : "Confirmation Pending"}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {status === "confirmed" ? "Host accepted booking" : "Awaiting host approval"}
                    </p>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="relative">
                  <div className={`absolute -left-[1.85rem] top-0.5 w-3.5 h-3.5 rounded-full ring-4 ring-white ${booking.paymentStatus === "paid" ? "bg-emerald-500" : "bg-slate-300"
                    }`}></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Payment Status</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 capitalize">
                      {booking.paymentStatus === "paid" ? "Payment received" : "Payment pending"}
                    </p>
                  </div>
                </div>

                {/* Node 4 */}
                <div className="relative">
                  <div className={`absolute -left-[1.85rem] top-0.5 w-3.5 h-3.5 rounded-full ring-4 ring-white ${status === "completed" ? "bg-purple-500" : "bg-slate-300"
                    }`}></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Tour Experience</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {formatDate(booking.date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showPaymentModal && (
        <PaymentModal
          bookingId={booking._id}
          amount={booking.totalAmount}
          tourTitle={booking.tour.title}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            window.location.reload();
          }}
        />
      )}
    </div>
  );
}
