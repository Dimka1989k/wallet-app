import styled from "styled-components";
import { device } from "./utils/mixin";

export const Logo = styled.img`
  margin-top: 40px;
  width: 80px;
  height: 80px;
  align-self: center;

  ${device.mobile} {
    width: 60px;
    height: 60px;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;

  ${device.mobile} {
    display: flex;
    flex-direction: row;
    padding-left: 60px;
    padding-right: 60px;
  }
`;

export const Button = styled.button`
  margin-top: 40px;
  color: white;
  background: -webkit-linear-gradient(left, #e5771b, #753d16);
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  border-width: 1px;
  padding: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2em;

  :hover {
    background: -webkit-linear-gradient(left, #e5771b, #e5771b);
  }

  ${device.mobile} {
    margin-left: auto;
  }
`;

export const ButtonSend = styled.button`
  margin-top: 20px;
  color: white;
  background: -webkit-linear-gradient(left, #e5771b, #753d16);
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  border-width: 1px;
  padding: 15px 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.2em;

  :hover {
    background: -webkit-linear-gradient(left, #e5771b, #e5771b);
  }
`;

export const Title = styled.h3`
  color: white;
  border-radius: 5px;
  border: none;
  margin-right: 20px;

  :last-child {
    margin-right: 0px;
  }
`;

export const Container = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  background: -webkit-linear-gradient(left, #e5771b, #753d16);
  padding-left: 15px;
  padding-right: 15px;

  ${device.mobile} {
    margin-left: auto;
  }

  :hover {
    background: -webkit-linear-gradient(left, #e5771b, #e5771b);
  }
`;

export const ContainerForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  border: 2px solid #e5771b;
  border-radius: 5px;
  padding: 20px;
  max-width: 400px;
  margin-left: 10px;
  margin-right: 10px;

  ${device.mobile} {
    margin-left: 60px;
    margin-right: 60px;
  }
`;

export const Input = styled.input`
  border-radius: 5px;
  margin-top: 20px;
  padding: 15px;
  border: 2px solid #e5771b;
  color: ${(props) => props.inputColor || "#e5771b"};

  :first-child {
    margin-top: 0px;
  }

  ::placeholder {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.57;
    color: #e5771b;
    padding-left: 10px;
  }

  :focus {
    outline: none;
  }
`;

export const ContainerLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-top: 60px;
  background: -webkit-linear-gradient(left, #e5771b, #753d16);
  padding: 15px;
  max-width: 400px;

  a {
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 1.2em;
  }
`;
