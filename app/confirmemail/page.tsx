import { confirmEmail, checkEmailConfirmed } from '@/components/actions/auth';

export default async function Page(props: {
  searchParams?: Promise<{
    userid?: string;
    token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const rawToken = searchParams?.token;
  const data = {
    authorizationId: searchParams?.userid || '',
    confirmationToken: encodeURIComponent(rawToken as string) || '',
  };

  console.log(data);

  const { success } = await confirmEmail(data);
  console.log(success);
  const { checkEmail } = await checkEmailConfirmed();
  if (checkEmail) {
    console.log('Подтверждение удалось');
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-2xl font-bold text-red-600">Подтверждение</h1>
      <p className="text-gray-700">{checkEmail === false ? 'false' : 'true'}</p>
    </div>
  );
}
