import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyCard from '../components/MyCard';
import UserService from '../services/usersService';
//import {sqlDateToUiFormat} from '../services/utils';

const UsersTable: React.FC<{}> = () => {
    const [usrsArr, setUsersArr] = useState([] as any[]);
    useEffect(() => {
        UserService.getAll()
            .then((data: any[] | undefined) => {
                if (data !== null && data !== undefined) {
                    setUsersArr(data);
                }
            });
    }, []);
    return (
        <MyCard>
            <Table striped responsive bordered size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {usrsArr.map((item: any) => {
                        return <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </MyCard>
    )
}

export default UsersTable;
