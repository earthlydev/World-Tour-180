import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateAirline from '../components/CreateAirline';
import UpdateAirline from '../components/UpdateAirline';

function Airlines({ backendURL }) {
    const [airlines, setAirlines] = useState([]);


    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/airlines');
            
            const {airlines} = await response.json();
    
            setAirlines(airlines);

        } catch (error) {
          console.log(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Airlines</h1>

            <table>
                <thead>
                    <tr>
                        {airlines.length > 0 && [
                            <th key="airlineID">Airline ID</th>,
                            <th key="airlineName">Name</th>,
                            <th key="website">Website</th>,
                            <th key="phone">Phone</th>
                        ]}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {airlines.map((airline, index) => (
                        <TableRow key={index} rowObject={airline} backendURL={backendURL} refreshaAirlines={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateAirline backendURL={backendURL} refreshAirline={getData} />
            <UpdateAirline airlines={airlines} backendURL={backendURL} refreshAirline={getData} />    
        </>
    );

} 

export default Airlines;
