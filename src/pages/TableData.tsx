import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";

interface RowData {
  ID: number;
  Constituency: string;
  BJP: number;
  INC: number;
  JMK: number;
  OTH: number;
}

interface TableDataProps {
  selectedConstituency?: string; // Adjust the type if necessary
}

const TableData: React.FC<TableDataProps> = ({ selectedConstituency }) => {
  const[data,setData] = useState<RowData[]>([]);
  console.log(selectedConstituency);
  

  useEffect(() => {
    // Fetch the Excel file from the public folder
    fetch('/public/Counts.xlsx')
      .then((response) => {
        console.log('Fetch Response:', response); // Log the fetch response object
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        console.log('ArrayBuffer:', arrayBuffer); // Log the ArrayBuffer
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        console.log('Workbook:', workbook); // Log the parsed workbook
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        console.log('Worksheet:', worksheet); // Log the sheet
        const jsonData = XLSX.utils.sheet_to_json<RowData>(worksheet);
        console.log('JSON Data:', jsonData); // Log the converted JSON data
        setData(jsonData); // Set data to state
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });
  }, []);


  console.log(data);
  

  return (
    <div style={{width:"100%",height:'20%'}}>
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
          {data.map((row, index) => (
             <TableRow
             className={`border border-black ${selectedConstituency === row.Constituency ? 'bg-yellow-300' : ''}`}
             key={index}
             style={{ backgroundColor: selectedConstituency === row.Constituency ? '#f5f519' : undefined }}
           >
              <TableCell className="p-2 font-medium text-center border border-black">{row.Constituency}</TableCell>
              <TableCell className="p-2 font-medium text-center border border-black">{row.BJP}</TableCell>
              <TableCell className="p-2 font-medium text-center border border-black">{row.INC}</TableCell>
              <TableCell className="p-2 font-medium text-center border border-black">{row.JMK}</TableCell>
              <TableCell className="p-2 font-medium text-center border border-black">{row.OTH}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableData;
