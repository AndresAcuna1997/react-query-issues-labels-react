import { FC } from 'react';
import { Issue } from '../interfaces';
import { IssueItem } from './IssueItem';
import { State } from '../interfaces/Issue';

interface Props {
    issues: Issue[];
    state?: State;
    onStateChange: (state: State | undefined) => void;
}

export const IssueList: FC<Props> = ({ issues, state, onStateChange }) => {




    return (
        <div className="card border-white">
            <div className="card-header bg-dark">
                <ul className="nav nav-pills card-header-pills">
                    <li className="nav-item">
                        <a className={`nav-link ${!state ? 'active' : ''}`}
                            onClick={() => onStateChange(undefined)}
                        >All</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${state === State.Open ? 'active' : ''}`}
                            onClick={() => onStateChange(State.Open)}
                        >Open</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${state === State.Closed ? 'active' : ''}`}
                            onClick={() => onStateChange(State.Closed)}
                        >Closed</a>
                    </li>
                </ul>
            </div>
            <div className="card-body text-dark">
                {
                    issues.map(issue => (
                        <IssueItem issue={issue} key={issue.id} />
                    ))

                }
            </div>
        </div>
    )
}
