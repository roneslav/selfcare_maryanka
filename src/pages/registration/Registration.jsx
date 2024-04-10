import {Field, Form, Formik, useField} from "formik";
import * as Yup from 'yup';
import FormError from "../../components/formError/formError";
import { useNavigate } from 'react-router-dom';

import './registration.css';

const CustomTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name} className='checkout-box__label'>{label}</label>
            <input className="text-input" {...field} {...props} />
            <FormError touched={meta.touched} error={meta.error} />
        </>
    )
}

const goBack = () => {
    window.history.back();
};

function Registration (){
    const navigate = useNavigate();
    const master_name = ['Майстер 1', 'Майстер 2', 'Майстер 3'];
    const record_services = ['Послуга 1', 'Послуга 2', 'Послуга 3'];
    const master_name_options = master_name.map((master_name, key) => (
        <option value={master_name} key={key}>
            {master_name}
        </option>
    ));
    const record_services_options = record_services.map((record_services, key) => (
        <option value={record_services} key={key}>
            {record_services}
        </option>
    ));

    return(
        <section>
            <div className="ckeckout-box">
                <div className="checkout-box__formik">
                    <Formik
                        initialValues={{
                            client_name: '',
                            client_number: '',
                            master_name: '',
                            record_services: '',
                        }}
                        validationSchema={Yup.object({
                            client_name: Yup.string()
                                .min(3, 'Повинно бути, як мінімум, 3 літери')
                                .max(45, 'Повинно бути, максимум, 45 літер')
                                .required('Обовязково'),

                            client_number: Yup.string()
                                .matches(/^\+38\d{10}$/, 'Неправильний номер телефону')
                                .required('Обовязково'),

                            master_name: Yup.string().required('Виберіть майстра серед запропонованих').oneOf(master_name),

                            record_services: Yup.string().required('Виберіть одну серед запропонованих послуг').oneOf(record_services),
                        })}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            setTimeout(() => {
                                console.log(JSON.stringify(values, null, 2));
                                resetForm();
                                setSubmitting(false);

                                navigate('/success');
                            }, 1000)
                        }}
                    >
                        {props => (
                            <Form>
                                <div className='checkout-box__forms'>
                                    <h1 className='checkout-box__title'>Запис</h1>
                                    <CustomTextInput label='Імя та прізвище' name='client_name' type='text'
                                                     placeholder='Марія Іванюк' className='checkout-box__label'/>
                                    <CustomTextInput label='Номер телефону' name='client_number' type='text'
                                                     placeholder='+38...' className='checkout-box__label'/>
                                    <label className='checkout-box__label'>Імя майстра</label>
                                    <Field label='Імя майстра' name="master_name" as="select" className="text-input"
                                           required>
                                        <option value={""}>Виберіть майстра</option>
                                        {master_name_options}
                                    </Field>
                                    <label className='checkout-box__label'>Послуга майстра</label>
                                    <Field label='Послуга' name="record_services" as="select" className="text-input"
                                           required>
                                        <option value={""}>Виберіть послугу</option>
                                        {record_services_options}
                                    </Field>
                                </div>

                                <div className='btn-checkout'>
                                    <button className='btn-to-catalog' onClick={goBack}>
                                        Повернутись назад
                                    </button>
                                    <button type='submit' className='btn-to-catalog'>
                                        {props.isSubmitting ? 'Завантаження...' : 'Підтвердити'}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
}

export default Registration;