import { UserController } from '../userController';

const userController = new UserController();

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || 1;
  return userController.getUser(id);
}

export async function POST(request) {
  return userController.createUser(request);
}
