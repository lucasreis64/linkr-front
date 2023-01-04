import { useState } from "react";
import { URLS } from "../../assets/constants/constants";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { carregamento } from "../../assets/animations/animations";
import Swal from "sweetalert2";
import { CadastroContainer } from "./SignUpStyled";

let tempoMs;

export default function SignUp(props) {
    const { onFirstLoad, setOnFirstLoad } = props;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
        url: "",
    });
    const [loading, setLoading] = useState(false);
    tempoMs = 400;

    function handleForm(e) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const config = {
            method: "post",
            data: { ...form },
        };
        const login = axios(URLS.SIGNUP, config);
        login.then(() => {
            setLoading(false);
            setOnFirstLoad(false);
            navigate("/sign-in");
        });
        login.catch(({ response }) => {
            if (response.status === 409) {
                Swal.fire({
                    icon: "error",
                    title: "Conflito!",
                    text: "Usuário já existe!",
                    footer: "Tente novamente!",
                });
            } else if (response.status === 422) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: response.errors,
                    footer: "Tente novamente!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro desconhecido!",
                    text: "Cheque sua conexão com a internet!",
                    footer: "Tente novamente!",
                });
            }
        });
    }

    return (
        <CadastroContainer loading={loading} firstLoad={onFirstLoad}>
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
                    value={form.email}
                    onChange={handleForm}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleForm}
                    required
                />
                <input
                    name="username"
                    type="username"
                    placeholder="username"
                    value={form.username}
                    onChange={handleForm}
                    required
                />
                <input
                    name="url"
                    type="url"
                    placeholder="picture url"
                    value={form.url}
                    onChange={handleForm}
                    required
                />
                {loading ? (
                    carregamento
                ) : (
                    <button type="submit">Cadastrar</button>
                )}
            </form>
            <Link to="/">
                <p>Switch back to log in</p>
            </Link>
        </CadastroContainer>
    );
}

export function tempo() {
    tempoMs += 50;
    return tempoMs + "ms";
}
