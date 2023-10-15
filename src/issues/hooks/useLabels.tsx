import { useQuery } from "@tanstack/react-query"
import { gitHubApi } from "../../api/gitHubApi"
import { Label } from "../interfaces"

const getLabels = async (): Promise<Label[]> => {
  const { data } = await gitHubApi.get<Label[]>('/labels?per_page=100', {
    headers: {
      Authorization: null
    }
  })
  return data
}

export const useLabels = () => {

  const labelsQuery = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
      // initialData: [],
      placeholderData: [{
        "id": 1649755876,
        "node_id": "MDU6TGFiZWwxNjQ5NzU1ODc2",
        "url": "https://api.github.com/repos/facebook/react/labels/Component:%20Fast%20Refresh",
        "name": "Component: Fast Refresh",
        "color": "473bcc",
        "default": false,
        "description": ""
      }]
    }
  )

  return labelsQuery
}
