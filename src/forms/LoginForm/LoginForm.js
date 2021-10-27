import s from './LoginForm.module.scss'
import classNames from 'classnames'
import Field from 'components/Field/Field'
import PasswordField from 'components/PasswordField/PasswordField'
import Button from 'components/Button/Button'
import { useFormik } from 'formik'
import { object, string } from 'yup'

const LoginForm = ({ onSubmit }) => {
  const { errors, values, handleSubmit, handleChange, touched, setFieldError } =
    useFormik({
      initialValues: {
        email: '',
        password: ''
      },
      validationSchema: object({
        email: string()
          .required('Email is required')
          .email('Email is not valid'),
        password: string()
          .required('Password is required')
          .min(6, 'Password should contain 6 and more symbols')
          .max(512, 'Password is too long')
      }),
      onSubmit: values =>
        onSubmit(values).catch(err => {
          const message = err.response.data.message
          const status = err.response.status
          if (status === 404) {
            setFieldError('email', message)
          } else if (status === 403) {
            setFieldError('password', message)
          }
        })
    })
  return (
    <form
      className={s.loginForm}
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div className={classNames('authFormBody', s.body)}>
        <Field
          className={s.field}
          value={values.email}
          onChange={handleChange}
          error={errors.email && touched.email && errors.email}
          name='email'
          label='Email:'
          type='email'
          placeholder='Type your email'
        />
        <PasswordField
          className={s.field}
          value={values.password}
          onChange={handleChange}
          error={errors.password && touched.password && errors.password}
          name='password'
          label='Password:'
          placeholder='Type your password'
        />
      </div>
      <Button className={s.loginBtn} type='submit'>
        Login
      </Button>
    </form>
  )
}

export default LoginForm
