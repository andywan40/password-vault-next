import Link from "next/link";
export default function PasswordItem({
  id,
  name,
  description,
  username,
  password,
}) {
  return (
    <div className="border border-solid border-indigo-200 text-center p-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl">{name}</h1>
      <h6 className="text-md">{description}</h6>
      <p>username: {username}</p>
      <p>password: {password}</p>
      <Link href="/details/1">
        <a className="bg-indigo-500 text-white p-3 mt-3 rounded-md block w-1/2">
          More Info
        </a>
      </Link>
    </div>
  );
}
