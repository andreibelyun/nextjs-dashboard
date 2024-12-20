import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentInvoiceId = params.id;

  const [currentInvoiceData, customers] = await Promise.all([
    fetchInvoiceById(currentInvoiceId),
    fetchCustomers(),
  ]);

  if (!currentInvoiceData) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${currentInvoiceId}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={currentInvoiceData} customers={customers} />
    </main>
  );
}
