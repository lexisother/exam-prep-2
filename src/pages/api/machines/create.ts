import type { APIRoute } from 'astro';
import { db } from '../../../lib/db';

export const POST: APIRoute = async (context) => {
  const formData = await context.request.formData();
  const data = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      formData.getAll(key).length > 1 ? formData.getAll(key) : formData.get(key),
    ]),
  );

  const machine = await db.arcadeMachine.create({
    data: {
      name: String(data.name),
      price: Number(data.price),
      modelNumber: Number(data.modelNumber),
    },
  });

  return context.redirect(`/machines/${machine.id}`, 302);
};
