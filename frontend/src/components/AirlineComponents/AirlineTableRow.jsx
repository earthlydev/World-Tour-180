import DeleteAirline from "./DeleteAirline";

const AirlineTableRow = ({ rowObject, backendURL, refreshAirline }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteAirline rowObject={rowObject} backendURL={backendURL} refreshAirline={refreshAirline} />
        </tr>
    )
}

export default AirlineTableRow;