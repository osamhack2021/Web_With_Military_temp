import React, {useState} from 'react';
import RegisterForm from '../../components/register/RegisterForm';
import RegisterTemplate from '../../components/register/RegisterTemplate';
import {register} from '../../modules/userAuth';
import { useDispatch } from 'react-redux';
import { withRouter  } from 'react-router-dom';

const RegisterPage = ({history}) => {
    const dispatch = useDispatch();

    const [error, setError] = useState({email: false});

    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
    });

    const clearEmail = () => {
        setForm({
            ...form,
            email: ''
        })
    };

    const onChange = e => {
        const nextForm={
            ...form,
            [e.target.name]: e.target.value
        };
        setForm(nextForm);
    }

    const onSubmit = e => {
        e.preventDefault();

        let formData = {
            email: form.email,
            password: form.password,
            name: form.name,
        }
        
        dispatch(register(formData))
            .then(res => {
                if(res.userData) return history.push('/main');
                if(res.registerFailure.email){
                    clearEmail();
                    setError({ email: true });
                    return;
                }
            });
    }
    
    /*
    useEffect(() => {
        console.log(error);
    }, [error]);
    */

    return(
        <RegisterTemplate>
            <RegisterForm form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
        </RegisterTemplate>
    )
};

export default withRouter(RegisterPage);