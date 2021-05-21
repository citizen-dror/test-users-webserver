import React, { useState, useEffect, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';

import MyCard from '../components/MyCard';
import MySelect from '../components/MySelect';
// import CitiesService from '../services/citiesService';
import UsersService from '../services/usersService';
import { macthHeb, macthInt, formatDate } from '../services/utils';
import { User } from '../interfaces/user.interface';

const StudentsForm: React.FC<{}> = () => {
    //const [ firstName, setFirstName ] = useState('');
    const [form, setForm] = useState({} as User);
    const [errors, setErrors] = useState({} as User);
    const [birthDate, setBirthDate] = useState(new Date());
    const [citisArr, setCitisArr] = useState([] as any[]);

 

    /**
     * update state from UI
     * @param field name of field
     * @param value user input
     */
    const setField = (field: any, value: any) => {
        setForm({
            ...form,
            [field]: value
        })
        // clean error object
        const felErr = (errors as any)[field];
        if (!!felErr) setErrors({
            ...errors,
            [field]: null
        })
    };

    const onSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
        setField('city_id', event.target.value);
    };
    const pickBirthDate = (date: Date | null | [Date, Date]) => {
        if (date && date instanceof Date) {
            setBirthDate(date);
        }
    }
    /**
     * validate all the contorols 
     * @returns error obejct with un-valid contol messges. 
     * if all controls are valid will be emtpy obeject  
     */
    const validateForm = () => {
        const { first_name, last_name, israel_id, city_id } = form;
        const newErrors = {} as User;
        // firstName errors
        if (!first_name || first_name === '') newErrors.firstName = 'First Name cannot be blank!';
        // else if (!macthHeb(first_name)) newErrors.firstName = 'First Name should be in hebrew!'
        else if (first_name.length > 20) newErrors.firstName = 'First Name is too long!'

        // lastName errors
        if (!last_name || last_name === '') newErrors.lastName = 'Last Name cannot be blank!';
        // else if (!macthHeb(last_name)) newErrors.lastName = 'Last Name should be in hebrew!';
        else if (last_name.length > 20) newErrors.lastName = 'Last Name is too long!'
        
        return newErrors
    }
    /**
     * validate the input, and if all is ok send the data to the server
     * @param e 
     */
    const handleSubmit = (e: any) => {
        e.preventDefault()
        // get new errors object
        const newErrors = validateForm()
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            const { first_name, last_name, userId } = form;
            const user: User = {
                userId: userId, 
                firstName: first_name,
                lastName: last_name,
            };
            UsersService.postUser(user)
                .then((data: any | undefined) => {
                if (data) {
                    const {userId} = data;
                    if (userId && userId > 0){
                        alert('User details were updated!');
                    } else {
                        alert('Undale to update User details');
                    }
                  
                }
            });
           
        }
    }
    const styles = {
        div1: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        card: {
            width: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
    return (
        <div style={styles.div1}>
            <MyCard style={styles.card}>
                <Form>
                    <Form.Group controlId="studentsForm.first_name">
                        <Form.Label>First Name: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('first_name', e.target.value)}
                            isInvalid={!!errors.first_name}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.first_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="studentsForm.last_name">
                        <Form.Label>Last Name: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('last_name', e.target.value)}
                            isInvalid={!!errors.last_name}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.last_name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="studentsForm.dateBirth">
                        <Form.Label>Date Of Birth: </Form.Label>
                        <br />
                        {/* <DatePicker
                            className="form-control"
                            selected={birthDate}
                            dateFormat="dd/MM/yyyy"
                            onChange={date => pickBirthDate(date)}
                        /> */}
                        <Form.Control.Feedback type='invalid'>
                            {errors.birth_date}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="studentsForm.israel_id">
                        <Form.Label>Israel ID: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('israel_id', e.target.value)}
                            isInvalid={!!errors.israel_id}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.israel_id}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="studentsForm.city_id">
                        <Form.Label>City: </Form.Label>
                        <MySelect
                            data={citisArr}
                            keyProp='city_id' valProp='city_name'
                            onChange={onSelectCity}
                            isInvalid={!!errors.city_id}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.city_id}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>{' '}
                </Form>
            </MyCard>
        </div>
    )
}

export default StudentsForm;
