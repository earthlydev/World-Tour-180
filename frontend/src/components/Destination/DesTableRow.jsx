import DeleteDestination from './DeleteDestination';

const DesTableRow = ({ rowObject, backendURL, refreshDestination }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteDestination rowObject={rowObject} backendURL={backendURL} refreshDestination={refreshDestination} />
        </tr>
    )
}

export default DesTableRow;