import React, { useState, useEffect } from 'react';
import { Title, Form, Repository, Error } from './styles';

import { IoIosArrowForward } from 'react-icons/io';

import logo from '../../assets/logo.svg';

import api from '../../services/api';
import { Link } from 'react-router-dom';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {

    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepos = localStorage.getItem('@GithubExplorer:repositories');

        if (storagedRepos)
            return JSON.parse(storagedRepos);
        else
            return [];
    });

    useEffect(() => {

        localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));

    }, [repositories])

    async function handleAddRepository(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!newRepo || !newRepo.match(/[/]/)) return setInputError('Digite o autor/nome do repositório!');

        try {

            const resp = await api.get(`/repos/${newRepo}`);

            const repository = resp.data;

            setRepositories([...repositories, repository]);

            setNewRepo('');
            setInputError('');

        } catch (e) {

            setInputError('Erro ao buscar o repositório!');
        }
    }

    return (
        <>
            <img src={logo} alt="Github Explorer Logo" />
            <Title>Explore repositórios do Github</Title>

            <Form onSubmit={handleAddRepository} hasError={!!inputError}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repository>
                {repositories.map(repo => (
                    <Link to={`/repository/${repo.full_name}`} key={repo.full_name}>
                        <img
                            src={repo.owner.avatar_url}
                            alt={repo.owner.login} />
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>
                        <IoIosArrowForward color="#C9C9D4" size={20} />
                    </Link>
                ))}
            </Repository>
        </>
    )
}

export default Dashboard;