import styles from './app.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldsScheme = yup
	.object()
	.shape({
		email: yup
			.string()
			.email()
			.matches(/^.+@.+\..+$/, 'Неверный email.')
			.min(0, 'Поле не должно быть пустым.')
			.required(),
		password1: yup
			.string()
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
				'Неверный пароль. Пароль может содержать строчную, прописаную, цифру и спецсимвол - от шести и более символов.',
			)
			.max(20, 'Должно быть меньше 20 символов.')
			.min(6, 'Должно быть больше шести символов.')
			.required(),
		password2: yup
			.string()
			.oneOf([yup.ref('password1'), null], 'Пароли должны совпадать.')
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
				'Неверный пароль. Пароль может содержать строчную, прописаную, цифру и спецсимвол - от шести и более символов.',
			)
			.required(),
	})
	.required();

export const App = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password1: '',
			password2: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;
	const passwordError1 = errors.password1?.message;
	const passwordError2 = errors.password2?.message;

	const handleReset = () => {
		reset();
	};

	const onSubmit = (formData) => {
		console.log('formData: ', formData);
		handleReset();
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.wrap}>
					<label className={styles.label} htmlFor="name">
						Введите email:
					</label>
					<input
						id="email"
						className={styles.input}
						placeholder="Почта"
						type="email"
						name="email"
						{...register('email')}
					/>
					{emailError && <p className={styles.error}>{emailError}</p>}
				</div>

				<div className={styles.wrap}>
					<label className={styles.label} htmlFor="password">
						Введите пароль:
					</label>
					<input
						id="password"
						className={styles.input}
						placeholder="Пароль"
						type="password"
						name="password"
						{...register('password1')}
					/>
					{passwordError1 && <p className={styles.error}>{passwordError1}</p>}
				</div>

				<div className={styles.wrap}>
					<label className={styles.label} htmlFor="password">
						Введите пароль повторно:
					</label>
					<input
						id="password"
						className={styles.input}
						placeholder="Пароль"
						type="password"
						name="password"
						{...register('password2')}
					/>
					{passwordError2 && <p className={styles.error}>{passwordError2}</p>}
				</div>

				<button className={styles.button} type="button" onClick={handleReset}>
					Сброс
				</button>

				<button
					className={styles.button}
					type="submit"
					disabled={!!emailError || !!passwordError1 || !!passwordError2}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
