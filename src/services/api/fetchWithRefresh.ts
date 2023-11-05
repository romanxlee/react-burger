import { BASE_URL } from "../../utils/consts";
import { getCookie, setCookie } from "../../utils/cookie";

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  } catch (err) {
    if (
      (err as Error).message === "jwt expired" ||
      (err as Error).message === "You should be authorised"
    ) {
      const refreshRes = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getCookie("refreshToken"),
        }),
      });
      const refreshData = await refreshRes.json();
      if (!refreshData.success) return Promise.reject(refreshData);
      setCookie("accessToken", refreshData.accessToken);
      setCookie("refreshToken", refreshData.refreshToken);
      (options.headers as { [key: string]: string }).authorization =
        refreshData.accessToken;
      const res = await fetch(url, options);
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return Promise.reject(err);
  }
};
