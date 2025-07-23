import { NextRequest } from 'next/server';
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {

  const {clientName} = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: 'Otra-Pinzas-Para-Cabello.fun <noreply@otra.fun>',
      to: ['andytc.andytc@gmail.com'],
      subject: 'Compra Reciente',
      react: EmailTemplate({ firstName: 'Andres', clientName }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}