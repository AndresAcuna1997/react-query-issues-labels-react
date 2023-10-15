import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from '../../api/gitHubApi';
import { Issue } from "../interfaces"

export const getIssue = async (issueNumber: number): Promise<Issue> => {

    const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`)

    return data
}

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {

    const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueNumber}/comments`)

    return data
}

export const useIssue = (issueNumber: number) => {

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssue(issueNumber),
    )

    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getIssueComments(issueQuery.data!.number),
        {
            enabled: issueQuery.data !== undefined
        }
    )

    return { issueQuery, commentsQuery }
}
