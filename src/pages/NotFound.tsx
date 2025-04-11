
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">الصفحة غير موجودة</h2>
        <p className="text-gray-600 mt-2">لم نتمكن من العثور على الصفحة التي تبحث عنها</p>
        
        <Link to="/">
          <Button className="mt-6">
            العودة إلى الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
