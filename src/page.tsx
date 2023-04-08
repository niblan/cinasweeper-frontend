import NavBar from "./navbar";
import "./page.sass";

export default function Page({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <div className="app">
            <NavBar />
            <div className="content">{children}</div>
        </div>
    )
};