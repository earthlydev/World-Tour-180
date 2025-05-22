import DeleteCustomer from './DeleteCustomer';

const CustomerTableRow = ({ rowObject, backendURL, refreshCustomer }) => {
    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value}</td>
            ))}
            
            <DeleteCustomer rowObject={rowObject} backendURL={backendURL} refreshCustomer={refreshCustomer} />
        </tr>
    )
}

export default CustomerTableRow;