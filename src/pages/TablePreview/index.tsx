import Table, { TColumns } from "@/components/Table";

const columns: TColumns = [
  { label: "Airline", field: "airlineName" },
  { label: "Safety or Life Threat?", field: "safetyLife" },
  { label: "Content Affected", field: "contentAffected" },
  {
    label: "Classification",
    field: "classificationType",
  },
  { label: "Flight/Truck Number", field: "flightTruckNo" },
  { label: "Handler Name", field: "orgName" },
  { label: "Modified Date", field: "modifiedDate" },
  { label: "Modified Time", field: "modifiedTime" },
  { label: "Created Date and Time", field: "reportCreatedTime" },
  { label: "Auth Status", field: "superAdminAuth" },
  { label: "Transport Type", field: "truckType" },
  { label: "Report Prepared By", field: "reportPreparedName" },
  { label: "Shipper Name", field: "shipper" },
  { label: "Consignee Name", field: "consignee" },
  { label: "Issuing Agent", field: "issuingAgent" },
  { label: "Date", field: "flightDate" },
  { label: "Content Nature", field: "contentNature" },
  { label: "Damage to Packing", field: "damgagePacking" },
  { label: "Discovered", field: "damageDiscovered" },
  { label: "Caused By/Discovered By", field: "discoveresCaused" },
];

function TablePreview() {
  const rows: { [key: string]: any }[] = [];

  for (let i = 0; i < 20; i++) {
    const element = {
      airlineName: "Yerevan Avia",
      safetyLife: "yes",
      contentAffected: "unlikely",
      flightTruckNo: "ERV-0000",
      orgName: "Yerevan Avia",
      modifiedDate: "2025-04-15",
      modifiedTime: "19:10:42",
      reportCreatedTime: "2025-04-15 19:10:42",
      truckType: "flight",
      reportPreparedName: "Krishna",
      shipper: null,
      consignee: null,
      issuingAgent: null,
      flightDate: "15-04-2025",
      contentNature: null,
      damgagePacking: "chemical, biological, radioactive leakage or spillage",
      damageDiscovered: "Delivery to agent",
      discoveresCaused: "discoveredby",
      classificationType:
        "Safety Risk - Damage involving safety or property Inspection, Decontamination and verification is required.(e.g. chemical, biological, radioactive leakage or spillage)",
    };

    rows.push(element);
  }

  return (
    <div>
      <Table columns={columns} rows={rows} disableSearch totalRecords={20} />
    </div>
  );
}

export default TablePreview;
