import styled from "styled-components";
import { LoginContainer } from "../SignInPage/SignInStyled";
import { tempo } from "./SignUpPage"; 
import { deslizarCima, tremerZoom } from "../../assets/animations/animations"

export const CadastroContainer = styled(LoginContainer)`
    animation: ${deslizarCima} 100ms;
	.logo {
		animation: ${deslizarCima} ${tempo};
		h1{
			animation: ${tremerZoom} ${"500ms"} 1 ${tempo};
		}
	}
	input {
		animation: ${deslizarCima} ${tempo};
	}
	input.check {
		animation: ${deslizarCima} ${tempo};
	}
	label {
		animation: ${deslizarCima} ${tempo};
	}
	button {
		animation: ${(props) => (props.loading ? "none" : deslizarCima)} ${tempo};
	}
	p {
		animation: ${deslizarCima} ${tempo};
	}
`;
