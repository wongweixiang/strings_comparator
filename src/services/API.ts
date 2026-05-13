import { createSearchParams } from "react-router-dom";

const baseUrl = "/api/proxy";

const API = {
  get: async (
    endpoint: string,
    options?: {
      searchParams?: URLSearchParams | any;
    },
  ) => {
    const { searchParams } = options || {};

    let response;

    try {
      const params =
        searchParams && Object.keys(searchParams).length > 0
          ? "?" + createSearchParams(searchParams).toString()
          : "";

      response = await fetch(baseUrl + endpoint + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Network error");
    }
  },
  post: async (endpoint: string, body: object) => {
    let response;

    try {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });

      response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      throw new Error("Network error");
    }
  },
  delete: async (endpoint: string) => {
    let response;

    try {
      response = await fetch(baseUrl + endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return await response.json();
    } catch (error) {
      console.error("Error deleting data:", error);
      throw new Error("Network error");
    }
  },
};

export default API;
