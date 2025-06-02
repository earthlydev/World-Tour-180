import DeleteItiDes from "./DeleteItiDes"

const ItiDesTableRow = ({ rowObject, backendURL, refreshItiDes }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}

            <DeleteItiDes rowObject={rowObject} backendURL={backendURL} refreshItiDes={refreshItiDes} />
        </tr>
    )
}

export default ItiDesTableRow;