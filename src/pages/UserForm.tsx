import React, { useState, useEffect, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import DatePicker from "react-datepicker";
import 'bootstrap/dist/css/bootstrap.min.css';

import MyCard from '../components/MyCard';
import MySelect from '../components/MySelect';
import UsersService from '../services/usersService';
import timezonesService from '../services/timezonesService';
// import { macthHeb, macthInt, formatDate } from '../services/utils';
import { User } from '../interfaces/user.interface';


const StudentsForm: React.FC<{}> = () => {
    //const [ firstName, setFirstName ] = useState('');
    const [form, setForm] = useState({} as User);
    const [errors, setErrors] = useState({} as User);
    const [timeZonesArr, setTimeZonesArr] = useState([] as any[]);

    /**
     * load timeZones combo
     */
     useEffect(() => {
        timezonesService.getAll()
            .then((data: any[] | undefined) => {
                if (data !== null && data !== undefined) {
                    data.unshift({
                        name: "Select Time Zone",
                        utcOffset: "Select Time Zone"
                    })
                    setTimeZonesArr(data);
                }
            });
    }, []);
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

    const onSelectTimeZone = (event: ChangeEvent<HTMLSelectElement>) => {
        setField('timeZone', event.target.value);
    };

    /**
     * validate the contorols 
     * @returns error obejct with un-valid contol messges. 
     * if all controls are valid will be emtpy obeject  
     */
    const validateForm = () => {
        const { firstName, lastName } = form;
        const newErrors = {} as User;
        // firstName errors
        if (!firstName || firstName === '') newErrors.firstName = 'First Name cannot be blank!';
        // else if (!macthHeb(firstName)) newErrors.firstName = 'First Name should be in hebrew!'
        else if (firstName.length > 20) newErrors.firstName = 'First Name is too long!'

        // lastName errors
        if (!lastName || lastName === '') newErrors.lastName = 'Last Name cannot be blank!';
        // else if (!macthHeb(lastName)) newErrors.lastName = 'Last Name should be in hebrew!';
        else if (lastName.length > 20) newErrors.lastName = 'Last Name is too long!'
        
        return newErrors
    }
    /**
     * validate the input, if all is ok, send the data to the server
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
            const { firstName, lastName, userId, timeZone , webSite, phoneSkype, about } = form;
            const user: User = {
                userId: userId, 
                firstName: firstName,
                lastName: lastName,
                timeZone: timeZone,
                webSite: webSite,
                phoneSkype: phoneSkype,
                about: about
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
                    <Form.Group controlId="usersForm.firstName">
                        <Form.Label>First Name: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('firstName', e.target.value)}
                            isInvalid={!!errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usersForm.lastName">
                        <Form.Label>Last Name: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('lastName', e.target.value)}
                            isInvalid={!!errors.lastName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usersForm.timeZone">
                        <Form.Label>Time Zone: </Form.Label>
                        <MySelect
                            data={timeZonesArr}
                            keyProp='name' valProp='name'
                            onChange={onSelectTimeZone}
                            isInvalid={!!errors.timeZone}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.timeZone}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usersForm.webSite">
                        <Form.Label>WebSite: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('webSite', e.target.value)}
                            isInvalid={!!errors.webSite}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.webSite}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usersForm.phoneSkype">
                        <Form.Label>Phone/Skype: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('phoneSkype', e.target.value)}
                            isInvalid={!!errors.phoneSkype}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.phoneSkype}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="usersForm.about">
                        <Form.Label>About Me: </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => setField('about', e.target.value)}
                            isInvalid={!!errors.phoneSkype}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.about}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>{' '}
                </Form>
            </MyCard>
        </div>
    )
}

export default StudentsForm;
