import { Shield, Truck, RotateCcw, Heart } from "lucide-react";

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm border">
        <Shield className="w-8 h-8 text-green-600 mb-2" />
        <div className="text-sm font-semibold">256-bit SSL</div>
        <div className="text-xs text-gray-500">Secure Payment</div>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm border">
        <Truck className="w-8 h-8 text-blue-600 mb-2" />
        <div className="text-sm font-semibold">FREE Shipping</div>
        <div className="text-xs text-gray-500">On All Orders</div>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm border">
        <RotateCcw className="w-8 h-8 text-purple-600 mb-2" />
        <div className="text-sm font-semibold">30-Day Returns</div>
        <div className="text-xs text-gray-500">Money Back</div>
      </div>
      
      <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm border">
        <Heart className="w-8 h-8 text-red-500 mb-2" />
        <div className="text-sm font-semibold">Gift Guarantee</div>
        <div className="text-xs text-gray-500">Perfect Every Time</div>
      </div>
    </div>
  );
};