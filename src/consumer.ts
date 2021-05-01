import { doesNotMatch } from "assert/strict";
import { SQSEvent } from "aws-lambda"; 
import postgres from "postgres";

const sql = postgres({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  db: process.env.DB_NAME as string,
});

export const handler = async function (event: SQSEvent): Promise<void> {
  console.log(`Records received: ${JSON.stringify(event.Records)}`)
  const messages = event.Records.map(rec => {
    return {
      "message_id": rec.messageId,
      "body": rec.body,
      "sent": rec.attributes.SentTimestamp
    };
  });
  await sql`INSERT INTO public.message ${sql(messages)}`;
  console.log(`Messages inserted: ${messages}`);
}