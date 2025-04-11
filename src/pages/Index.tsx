
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Sales from "./Sales";
import Invoices from "./Invoices";
import NotFound from "./NotFound";

const Index = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default Index;
