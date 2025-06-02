import DeleteAirport from "./DeleteAirport";

const AirportTableRow = ({ rowObject, backendURL, refreshAirport }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteAirport rowObject={rowObject} backendURL={backendURL} refreshAirport={refreshAirport} />
        </tr>
    )
}

export default AirportTableRow;