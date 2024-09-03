import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TableData() {
  const constituencyData = [
    { constituency: "Jammu" },
    { constituency: "Kathua" },
    { constituency: "Srinagar" },
    { constituency: "Poonch" },
    { constituency: "Samba" },
    { constituency: "Rajouri" },
    { constituency: "Udhampur" },
    { constituency: "Reasi" },
    { constituency: "Ramban" },
    { constituency: "Doda" },
    { constituency: "Kishtwar" },
    { constituency: "Anantnag" },
    { constituency: "Pulwama" },
    { constituency: "Kupwara" },
  ];

  return (
    <div style={{width:"60%",height:'30%'}}>
      <Table className="border border-black">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/1 bg-black text-white flex justify-center items-center">
              Constituency
            </TableHead>
            <TableHead
              className="text-center text-white"
              style={{ background: "#ff914d" }}
            >
              BJP
            </TableHead>
            <TableHead
              className="text-center text-white"
              style={{ background: "#5271ff" }}
            >
              INC
            </TableHead>
            <TableHead
              className="text-center text-white"
              style={{ background: "#2f6a0d" }}
            >
              JMK
            </TableHead>
            <TableHead
              className="text-center text-white"
              style={{ background: "#a6a6a6" }}
            >
              OTH
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {constituencyData.map((data, index) => (
            <TableRow className="border border-black" key={index}>
              <TableCell className="p-2 font-medium text-center border border-black">{data.constituency}</TableCell>
              <TableCell className="p-2 font-medium text-center border border-black"></TableCell>
              <TableCell className="p-2 font-medium text-center border border-black"></TableCell>
              <TableCell className="p-2 font-medium text-center border border-black"></TableCell>
              <TableCell className="p-2 font-medium text-center border border-black"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableData;
