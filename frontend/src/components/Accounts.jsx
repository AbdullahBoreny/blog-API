import useUserAccounts from "../customHooks/useUserAccounts";

export default function Accounts() {
    const { accounts, loading, error } = useUserAccounts();
   
    if (error) return <p>{error.message}</p>;
    if (loading) return <p>loading...  </p>;

    return (
        <>
            <div className="accounts">
                {accounts.map(account => <h1 key={account.id}>{account.email}</h1>)}

            </div >
        </>
    );
};