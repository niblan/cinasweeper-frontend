import { Link } from "react-router-dom";
import "./button.sass";

export default function Button({ href, onClick, children }: { href?: string, onClick?: () => void, children: string | JSX.Element | JSX.Element[] }) {
    return href ? (
        <Link className="button" to={href} onClick={onClick}>
            {children}
        </Link>
    ) : (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}