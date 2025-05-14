import { LoginState } from '@/lib/definitions';
import { SignupState } from '@/lib/definitions';
import { ConfirmState } from '@/lib/definitions';

export async function signin(data: LoginState) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/login`,
      {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return { success: false, message: response.text() || 'Войти не удалось' };
    } else {
      const { token } = await response.json();
      localStorage.setItem('token', token);

      return { success: true };
    }
  } catch {
    return { success: false, message: ':( Что-то пошло не так.' };
  }
}

export async function signup(data: SignupState) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return {
        success: false,
        message: response.text() || 'Регистрация не удалась',
      };
    } else {
      const { token } = await response.json();
      localStorage.setItem('token', token);

      return { success: true };
    }
  } catch {
    return { success: false, message: ':( Что-то пошло не так.' };
  }
}

export async function confirmationLink() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/confirmation-link`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );

    if (!response.ok) {
      return { success: false, message: response.text() || 'Ошибка сервера' };
    } else {
      return {
        success: true,
        message: 'Ссылка для подтверждения отправлена на почту',
      };
    }
  } catch {
    return { success: false, message: ':( Что-то пошло не так.' };
  }
}
export async function confirmEmail(data: ConfirmState) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/confirm`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      return { success: false, message: response.text() || 'Ошибка сервера' };
    } else {
      return { success: true };
    }
  } catch {
    return { success: false, message: ':( Что-то пошло не так.' };
  }
}

export async function checkEmailConfirmed() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Accounts/check-email-confirmed`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
    if (!response.ok) {
      return { checkEmail: false };
    } else {
      return { checkEmail: true };
    }
  } catch {
    return { checkEmail: false };
  }
}

export async function orders() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const a = await response.json();

    return { a };
  } catch {
    return;
  }
}
