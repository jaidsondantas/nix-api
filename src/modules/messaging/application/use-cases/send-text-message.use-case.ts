import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SendTextMessageUseCase {
  async execute(id: string, message: string): Promise<void> {
    const url = `${process.env.API_WHATSAPP_NODE_JS}/message/text?key=${process.env.INSTANCE_KEY_WHATSAPP_JS}`;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams();
    data.append('id', id);
    data.append('message', message);

    await axios.post(url, data, { headers });
  }
}
