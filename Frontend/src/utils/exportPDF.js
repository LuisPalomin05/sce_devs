import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = ({
  title,
  subtitle,
  columns,
  data,
  fileName = "reporte.pdf",
}) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(title, 14, 15);

  if (subtitle) {
    doc.setFontSize(11);
    doc.text(subtitle, 14, 23);
  }

  autoTable(doc, {
    startY: 30,
    head: [columns],
    body: data,
    styles: {
      fontSize: 10,
      cellPadding: 3,
      valign: "middle",
    },
    headStyles: {
      fillColor: [240, 138, 36],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  doc.save(fileName);
};