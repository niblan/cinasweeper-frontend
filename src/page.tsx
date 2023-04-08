import NavBar from "./navbar";

export default function Page({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <>
            <NavBar />
            <div className="content">{children}</div>
        </>
    )
};