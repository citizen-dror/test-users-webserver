import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyCard from '../components/MyCard';
import UserService from '../services/usersService';
import { User } from '../interfaces/user.interface';
//import {sqlDateToUiFormat} from '../services/utils';

const UsersTable: React.FC<{}> = () => {
    const [usrsArr, setUsersArr] = useState([] as any[]);
    useEffect(() => {
        UserService.getAll()
            .then((data: any[] | undefined) => {
                if (data !== null && data !== undefined) {
                    console.table(data)
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
                    {usrsArr.map((item: User) => {
                        return <tr key={item.userId}>
                            <td>{item.userId}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </MyCard>
    )
}

export default UsersTable;
