import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from '../../api/gitHubApi';
import { Issue } from "../interfaces"
import { State } from "../interfaces/Issue";
import { useEffect, useState } from "react";

interface Props {
    state?: State,
    labels: string[]
    page?: number
}

const getIssues = async ({ labels, state, page = 1 }: Props): Promise<Issue[]> => {

    const params = new URLSearchParams()

    if (state) {
        params.append('state', state)
    }

    if (labels.length > 0) {
        const labelsString = labels.join(',')

        params.append('labels', labelsString)

    }

    params.append('page', page.toString())
    params.append('per_page', '5')

    const { data } = await gitHubApi.get<Issue[]>('/issues', { params })

    return data
}

export const useIssues = ({ state, labels }: Props) => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
    }, [state, labels])

    const issuesQuery = useQuery(
        ['issues', { state, labels, page }],
        () => getIssues({ labels, state, page }),
    )

    const nextPage = () => {
        if (issuesQuery.data?.length === 0) return

        setPage((prevPage) => prevPage + 1)
    }

    const prevPage = () => {

        if (page > 1) setPage((prevPage) => prevPage - 1)

    }

    return { issuesQuery, page: issuesQuery.isFetching ? 'Loading' : page, nextPage, prevPage }
}
