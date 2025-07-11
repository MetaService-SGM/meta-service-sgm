const API_BASE_URL = 'https://meta-service-sgm.fly.dev';

interface ApiResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const apiService = {
  async registerEmployee(data: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar funcionário');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Adicione outros métodos conforme necessário
};