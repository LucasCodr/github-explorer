import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
    hasError: boolean;
}

export const Title = styled.h1`
    font-size: 48px;
    color: #3A3A3A;    
    margin-top: 80px;
    max-width: 450px;
    line-height: 56px;    
`;

export const Form = styled.form<FormProps>`
    max-width: 700px;
    margin-top: 40px;
    display: flex;
    height: 70px;

    input {
        flex: 1;
        height: 70px;
        border: 0;
        padding: 0 0 0 20px;
        border-radius: 5px 0 0 5px;
        border: 2px solid #fff;
        border-right: 0;
        
        ${(props) => props.hasError && css`
            border-color: #c53030;
        `}

        &::placeholder {
            color: #a8a8b3;
        }        
    }

    button {
        width: 210px;
        background: #04D361;
        color: #fff;
        border-radius: 0 5px 5px 0;
        border: 0;
        font-weight: bold;
        transition: background-color 0.3s;

        &:hover {
            background: ${shade(0.2, '#04D361')};            
        }
    }
`;

export const Repository = styled.div`
    margin-top: 80px;
    max-width: 700px;

    a {
        background-color: #fff;
        border-radius: 5px;
        width: 100%;
        padding: 24px;
        display: block;
        text-decoration: none;
        transition: transform .3s;

        display: flex;
        align-items: center;

        & + a {
            margin-top: 16px;
        }

        &:hover {
            transform: translateX(10px);
        }

        img {
            border-radius: 100%;
            height: 83px;
            margin-right: 20px;
        }

        div {
            margin-left: 16px;
            flex: 1;

            strong {
                font-size: 20px;
                color: #3D3d4d;
            }

            p {
                font-size: 18px;
                color: #A8A8B3;
            }
        }

        svg {
            margin-left: auto;
        }
    }    
`;

export const Error = styled.div`
    display: block;
    color: #c53030;
    margin-top: 8px;
`;