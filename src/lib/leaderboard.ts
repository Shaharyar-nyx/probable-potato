import { CYBERBAY_URL } from "lib";

export const cyberbayApi = {
  async getLeaderboard() {
    const response = await fetch(`${CYBERBAY_URL}/rewardservice/point/leaderboard-hunter`);
    if (!response.ok) {
      throw new Error(`Cyberbay API error: ${response.statusText}`);
    }
    return response.json();
  },
};
