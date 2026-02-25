"use strict";

export class LoginModel {
  constructor() {
    this.apiBaseUrl = import.meta.env.VITE_API_URL;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error(res.code);
      }

      //Code 200
      return res;
    } catch (error) {
      throw error;
    }
  }
}
