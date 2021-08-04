import PasswordItem from "./PasswordItem";
export default function PasswordItemList({ passwords }) {
  return (
    <div className="w-full h-full">
      {passwords?.length !== 0 ? (
        passwords.map(password => {
          return <PasswordItem key={password.id} {...password} />;
        })
      ) : (
        <div>
          <h1 className="font-title text-center text-black">
            No Passwords Yet.
          </h1>
        </div>
      )}
    </div>
  );
}
