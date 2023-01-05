import styled from "styled-components";
import { deslizarCima, tremerZoom } from "../../assets/animations/animations";
import { tempo } from "../SignInPage/SignInPage";

export const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;
	box-sizing: border-box;
	background-color: #333333;
	height: 100vh;
	width: 100vw;
	animation: ${deslizarCima} ${tempo};
	z-index: 2;
	position: absolute;
	top:0px;
	left: 0px;

	.logo{
		position: sticky;
		top: 0;
		text-align: center;
		background-color: black;
		width: 100%;
		padding: 20px 0px;
		margin-bottom: 40px;
		animation: ${deslizarCima} ${tempo};
		filter: drop-shadow(0px 6px 11px #4f4e4e);

		h1{
			color: white !important;
			font-family: 'Passion One';
			font-weight: 700;
			font-size: 76px;
			animation: ${tremerZoom} ${"500ms"} 1 ${tempo};
		}
		h2{
			color: white !important;
			font-family: 'Oswald';
			font-style: normal;
			font-weight: 700;
			font-size: 23px;
		}
	}
	.formulary{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 10px;
		margin-bottom: 20px;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 80%;
		gap: 10px;
		margin-bottom: 20px;
	}
	input {
		padding-left: 8px;
		height: 55px;
		background: #ffffff;
		border: 1px solid #d5d5d5;
		border-radius: 6px;
		box-sizing: border-box;
		animation: ${deslizarCima} ${tempo};
		outline: none;
		filter: drop-shadow(0px 16px 5px black);
		&::placeholder {
			font-weight: 700;
			font-size: 22px;
			color: #9F9F9F;
			font-family: "Oswald";
		}
	}
	input.check {
		width: 15px;
		height: 15px;
		margin-left: 10px;
		animation: ${deslizarCima} ${tempo};
		filter: drop-shadow(0px 2px 2px black);
	}
	label {
		font-size: 15px;
		color: white;
		filter: drop-shadow(0px 6px 5px black);
		font-family: "Oswald";
		animation: ${deslizarCima} ${tempo};
	}
	button {
		font-family: 'Oswald';
		font-style: normal;
		font-weight: 700;
		font-size: 22px;
		width: 100%;
		height: 55px;
		color: white;
		background-color: #1877F2;
		border-radius: 6px;
		border: none;
		filter: drop-shadow(0px 6px 5px black);
		display: flex;
		align-items: center;
		justify-content: center;
		animation: ${(props) => (props.loading ? "none" : deslizarCima)} ${tempo};
	}
	p {
		margin-top: 17px;
		font-family: 'Lato';
		text-decoration: underline;
		font-weight: bold;
		font-size: 17px;
		color: white;
		animation: ${deslizarCima} ${tempo};
		filter: drop-shadow(0px 6px 5px black);
	}
	@media (min-width: 600px) {
	display: flex;
	flex-direction: row;
	.formulary{
		width: 535px;
		height: 100%;
		justify-content: center;
	}
	.logo{
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-left: 10%;
		align-items: flex-start;
		justify-content: center;
		h1{
			font-size: 106px;
		}
		h2{
			font-size: 43px;
		}
	}
}
`;
