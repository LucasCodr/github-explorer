import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { IoIosReturnLeft, IoIosArrowForward } from 'react-icons/io';
import { Header, RepositoryInfo, Issues } from './styles';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface RepositoryParams {
    name: string;
}

interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface Issue {
    title: string;
    id: number;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {

        async function loadData() {

            const [repositoryResponse, issuesResponse] = await Promise.all([
                api.get(`/repos/${params.name}`),
                api.get(`/repos/${params.name}/issues`)
            ]);

            setRepository(repositoryResponse.data);
            setIssues(issuesResponse.data)
        }

        loadData();

    }, [params.name])

    return (
        <>
            <Header>
                <img src={logo} alt="Github Explorer" />
                <Link to="/">
                    <IoIosReturnLeft size={20} color="#a8a8b3" />
                Voltar
            </Link>
            </Header>

            {
                repository && (
                    <RepositoryInfo>
                        <header>
                            <img src={repository.owner.avatar_url} alt={repository?.owner.login} />
                            <div>
                                <strong>{repository?.full_name}</strong>
                                <p>{repository?.description}</p>
                            </div>
                        </header>
                        <ul>
                            <li>
                                <strong>{repository?.stargazers_count}</strong>
                                <span>Stars</span>
                            </li>
                            <li>
                                <strong>{repository?.forks_count}</strong>
                                <span>Forks</span>
                            </li>
                            <li>
                                <strong>{repository?.open_issues_count}</strong>
                                <span>Issues</span>
                            </li>
                        </ul>
                    </RepositoryInfo>
                )
            }


            <Issues>
                {issues.map(issue => (
                    <a href={issue.html_url} key={issue.id} rel="noreferrer noopener" target="_blank">
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <IoIosArrowForward color="#C9C9D4" size={20} />
                    </a>
                ))}
            </Issues>
        </>
    )
}

export default Repository;