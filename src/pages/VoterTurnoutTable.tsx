import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

function VoterTurnoutTable() {
  return (
    <div>
    <Table className="border border-black">
        <TableHeader>
            <TableRow className="border border-black">
                <TableHead className="border border-black"></TableHead>
                <TableHead className="border border-black text-center text-black font-bold">TOTAL</TableHead>
                <TableHead className="border border-black text-center bg-green-600 text-black font-bold">JKNC</TableHead>
                <TableHead className="border border-black text-center bg-orange-500 text-black font-bold">BJP</TableHead>
                <TableHead className="border border-black text-center bg-blue-500 text-black font-bold">AINC</TableHead>
                <TableHead className="border border-black text-center bg-green-700 text-black font-bold">PDP</TableHead>
                <TableHead className="border border-black text-center bg-gray-500 text-black font-bold">OTH</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow className="border border-black">
                <TableCell className="border border-black text-center">ABOVE 80%</TableCell>
                <TableCell className="border border-black text-center">30</TableCell>
                <TableCell className="border border-black text-center">5</TableCell>
                <TableCell className="border border-black text-center">5</TableCell>
                <TableCell className="border border-black text-center">10</TableCell>
                <TableCell className="border border-black text-center">10</TableCell>
                <TableCell className="border border-black text-center">5</TableCell>
            </TableRow>
        </TableBody>
    </Table>
    </div>
  )
}

export default VoterTurnoutTable