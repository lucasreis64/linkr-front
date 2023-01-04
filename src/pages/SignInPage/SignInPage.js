import { useContext, useState } from "react";
import { URLS } from "../../assets/constants/constants";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { carregamento } from "../../assets/animations/animations";
import Swal from "sweetalert2";
import { contexto } from "../../context/userContext";
import { LoginContainer } from "./SignInStyled";

let tempoMs;

export default function SignIn(params) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { permanecerConectado, setPermanecerConectado, setToken } =
        useContext(contexto);
    tempoMs = 400;

    async function handleSubmit(event) {
        try {
            event.preventDefault();
            setLoading(true);
            const login = await axios.post(URLS.LOGIN, {
                email: email,
                password: password,
            });
            if (permanecerConectado) {
                const userInfoSerializada = JSON.stringify(login.data);
                localStorage.setItem("userInfo", userInfoSerializada);
            }
            setToken(login.data);
            navigate("/timeline");
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuário ou senha incorretos!",
                footer: "Tente novamente!",
            });
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <LoginContainer loading={loading}>
            <div className="logo">
                <h1>linkr</h1>
                <h2>
                    save, share and discover
                    <br />
                    the best links on the web
                </h2>
            </div>
            <form action="/hoje" onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {loading ? (
                    <button>{carregamento}</button>
                ) : (
                    <button type="submit">Entrar</button>
                )}
                <label>
                    Permanecer conectado?
                    <input
                        className="check"
                        type="checkbox"
                        checked={permanecerConectado}
                        onChange={() =>
                            setPermanecerConectado(!permanecerConectado)
                        }
                    />
                </label>
            </form>
            <Link to="/sign-up">
                <p>First time? Create an account!</p>
            </Link>
        </LoginContainer>
    );
}

export function tempo() {
    tempoMs += 50;
    return tempoMs + "ms";
}
