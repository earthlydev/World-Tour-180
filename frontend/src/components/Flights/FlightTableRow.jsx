import DeleteFlight from "./DeleteFlight";

const FlightTableRow = ({ rowObject, backendURL, refreshFlight }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteFlight rowObject={rowObject} backendURL={backendURL} refreshFlight={refreshFlight} />
        </tr>
    )
}

export default FlightTableRow;