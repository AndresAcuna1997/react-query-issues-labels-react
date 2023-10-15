import axios from "axios";

export const gitHubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: { Authorization: 'Bearer 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' }
})