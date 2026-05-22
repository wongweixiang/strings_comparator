import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import chroma from "chroma-js"
import { getColumnStats } from "./getColumnStats"

function Overview() {

    const strings = [
        {
            "name": "Weiss Cannon Blue Rock N Power",
            "material": "Polyester",
            "stiffness": 224,
            "energyReturn": 88.7,
            "stringStringCOF": 0.059,
            "stringBallCOF": 0.654,
            "spinPotential": 11.1
        },
        {
            "name": "Volkl Cyclone Tour 16 (1.30)",
            "material": "Polyester",
            "stiffness": 167.4,
            "energyReturn": 83.2,
            "stringStringCOF": 0.068,
            "stringBallCOF": 0.592,
            "spinPotential": 8.7
        },
        {
            "name": "Wilson Revolve 17 (1.25)",
            "material": "Polyester",
            "stiffness": 192,
            "energyReturn": 87.2,
            "stringStringCOF": 0.066,
            "stringBallCOF": 0.507,
            "spinPotential": 7.7
        }
    ]

    const headerValues = mapColumnNames(strings)

   const statsByColumn = {
    stiffness: getColumnStats(strings, r => r.stiffness),
    energyReturn: getColumnStats(strings, r => r.energyReturn),
    spinPotential: getColumnStats(strings, r => r.spinPotential),
  }

  console.log(statsByColumn)


  return (
    <Table>
      <TableCaption>Tennis Strings</TableCaption>
      <TableHeader>
        <TableRow>
          {headerValues.map(hv => (<TableHead>{hv}</TableHead>))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {strings.map((s) => (
          <TableRow key={s.name}>
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell>{s.material}</TableCell>
            <TableCell  style={{
                backgroundColor: getBg({value: s.stiffness, stats: statsByColumn.stiffness, higherIsBetter: false}),
              }}>{s.stiffness}</TableCell>
            <TableCell className="text-right" style={{
                backgroundColor: getBg({value: s.energyReturn, stats: statsByColumn.energyReturn, higherIsBetter: true}),
              }}>{s.energyReturn}</TableCell>
            <TableCell className="text-right">{s.stringStringCOF}</TableCell>
            <TableCell className="text-right">{s.stringBallCOF}</TableCell>
            <TableCell className="text-right"  style={{
                backgroundColor: getBg({value: s.spinPotential, stats: statsByColumn.spinPotential, higherIsBetter: true}),
              }}>{s.spinPotential}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const mapColumnNames = (data: Record<string, string>[]) => {
    const headerKeys = Object.keys(data[0])

    const headerMapping = {
            "name": "Name",
            "material": "Material",
            "stiffness": "Stiffness",
            "energyReturn": "Energy Return",
            "stringStringCOF": "String / String COF",
            "stringBallCOF": "String / Ball COF",
            "spinPotential": "Spin Potential"
    }
    return headerKeys.map(hk => headerMapping[hk])
}

const getBg = ({value, stats, higherIsBetter} : {value: number, stats: {min: number, max: number, median: number}, higherIsBetter: boolean}) => {
  const spectrum = higherIsBetter ?  ["#ef4444", "#ffffff", "#22c55e"] : ["#22c55e", "#ffffff", "#ef4444"]

  const scale = chroma.scale(spectrum).domain([stats.min, stats.median, stats.max])

  return scale(value).hex()
}

export default Overview;
