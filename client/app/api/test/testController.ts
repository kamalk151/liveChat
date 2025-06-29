// import apiRoutes from '@/config/apiRoutes';

export class UserController {
  
  async getUser(id) {
    const { url, method } = apiRoutes.getUser;

    try {
      const response = await fetch(`${url}/${id}`, { method });
      if (!response.ok) throw new Error('Failed to fetch user');

      const data = await response.json();
      return Response.json({ user: data });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  async createUser(request) {
    const { url, method } = apiRoutes.createUser;

    try {
      const body = await request.json();
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to create user');

      const data = await response.json();
      return Response.json({ user: data });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
