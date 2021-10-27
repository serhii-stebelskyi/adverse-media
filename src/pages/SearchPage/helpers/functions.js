import XLSX from "xlsx";

export const splitFileName = (originalName) => {
  const nameSplit = originalName.split(".");
  const name = nameSplit.slice(0, nameSplit.length - 1).join(".");
  const type = "." + nameSplit[nameSplit.length - 1];
  return { name, type };
};

export const downloadCSVFile = (data, filename) => {
  const blob = new Blob([data], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", `${filename}.csv`);
  pom.click();
};

export const formatDataToExport = (data) => {
  const result = [];
  data.forEach((e) => {
    const company = {
      id: e.id,
      title: e.title,
    };
    e.media.forEach((media, index) => {
      company[`Media title ${index + 1}`] = media.title;
      company[`Media link ${index + 1}`] = media.url;
    });
    result.push(company);
  });
  return result;
};

export const arrayToCsv = (data) => {
  return formatDataToExport(data)
    .map((e) => Object.values(e))
    .map((row) =>
      row
        .map(String)
        .map((v) => v.replaceAll('"', '""'))
        .map((v) => `"${v}"`)
        .join(",")
    )
    .join("\r\n");
};

export const arrayToExcel = (data, filename) => {
  const formattedData = formatDataToExport(data);
  let binaryWS = XLSX.utils.json_to_sheet(formattedData);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, binaryWS, "Binary values");
  XLSX.writeFile(wb, `${filename}.xlsx`);
};
