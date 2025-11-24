import { Nyxlab_URL } from "lib";

export const NyxlabApi = {
  async getLeaderboard() {
    const response = await fetch(`${Nyxlab_URL}/rewardservice/point/leaderboard-hunter`);
    if (!response.ok) {
      throw new Error(`Nyxlab API error: ${response.statusText}`);
    }
    return response.json();
  },
};
